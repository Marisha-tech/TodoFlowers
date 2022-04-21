import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {DataHandlerService} from "../../services/data-handler.service";
import {Task} from "../../model/Task";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EditTaskDialogComponent} from "../../dialog/edit-task-dialog/edit-task-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";
import {OperType} from "../../dialog/operType";
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  public dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>()// контейнер - источник данных для таблицы displayedColumns

  //ссылки на компоненты таблицы
  @ViewChild(MatPaginator) private paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  public tasks?: Task[] // напрямую не присваиваем значения в переменную, только через @Input
  public priorities: Priority[] // список приоритетов для фильтрации задач

  //текущие задачи для отображения на странице
  @Input('tasks')
  public set setTasks(tasks: Task[]) {//напрямую не присваиваем значения в переменную, только через @Input
    this.tasks = tasks
    this.fillTable()
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities
  }

  @Output()
  deleteTask = new EventEmitter<Task>()

  @Output()
  updateTask = new EventEmitter<Task>()

  @Output()
  selectCategory = new EventEmitter<Category>() //нажали на категорию из списка задач

  @Output()
  filterByTitle = new EventEmitter<string>();

  @Output()
  filterByStatus = new EventEmitter<boolean>();

  @Output()
  filterByPriority = new EventEmitter<Priority>()

  @Output()
  private addTask = new EventEmitter<Task>();

  @Input()
  selectedCategory: Category

  //поиск
  public searchTaskText: string; // текущее значение для поиска задач
  public selectedStatusFilter: boolean = null;   // по-умолчанию будут показываться задачи по всем статусам (решенные и нерешенные)
  public selectedPriorityFilter: Priority = null; // поиск по приоритету

  public isMobile: boolean

  constructor(
    private dataHandler: DataHandlerService, // доступ к данным
    private dialog: MatDialog, // работа с диалоговым окном
    public deviceService: DeviceDetectorService, // для определения типа устройства
  ) {
    this.isMobile = deviceService.isMobile()
  }

  ngOnInit() {

    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks)

    //dataSource обязательно нужно создавать для таблицы. В него присваивается любой источник (БД, массивы, JSON)
    this.dataSource = new MatTableDataSource<Task>(this.tasks)
    // this.fillTable() //заполняем таблицы данными (задачи) и всеми метаданными

    this.onSelectCategory(null)
  }

  // в этом методе уже все проинициализировано, поэтому можно присваивать объекты. Иначе может быть ошибка undefined
  /*
    ngAfterViewInit() {
      this.addTableObjects()
    }
  */

  toggleClickCompleted(task: Task) {
    task.completed = !task.completed
  }

  //в зависимости от статуса задачи вернуть цвет названия
  getPriorityColor(task: Task): string {

    if (task.completed) {
      return '#f8f9fa' //TODO вынести цвета в константы (magic strings, magic numbers)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color
    }

    return '#fff' //TODO вынести цвета в константы (magic strings, magic numbers)
  }

  //показывает задачи с применением текущих всех условий (категория, поиск, фильтры и пр)
  private fillTable(): void {

    if (!this.dataSource) {
      return
    }
    this.dataSource.data = this.tasks //обновить источник данных (тк данные массива tasks обновились)

    this.addTableObjects()
    this.dataSource.sortingDataAccessor = (task, colName: string) => {
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority?.id : ''
        }
        case 'category': {
          return task.category ? task.category?.title : ''
        }
        case 'date': {
          return task.date ? task.date.getTime() : 0
        }
        case 'title': {
          return task.title
        }
        default: {
          return task.title
        }
      }
    }
  }


  private addTableObjects(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    // console.log(this.dataSource)
  }

  //диалоговое окно редактирования для добавления задачи
  openEditTaskDialog(task: Task): void {

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: [task, 'Редактирование задачи', OperType.EDIT],
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      //обработка результатов

      if (result === 'complete') {
        task.completed = true // ставим статус задачи как выполненная
        this.updateTask.emit(task)
      }

      if (result === 'activate') {
        task.completed = false //возвращает статус задачи как невыполненная
        this.updateTask.emit(task)
        return;
      }

      if (result === 'delete') {
        this.deleteTask.emit(task)
        return;
      }

      if (result as Task) { // если нажали ок и есть результат
        this.updateTask.emit(task)
        return
      }
    })
  }

  // диалоговое окно подтверждения удаления
  openDeleteDialog(task: Task): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {dialogTitle: 'Подтвердите действие', message: `Вы действительно хотите удалить задачу: "${task.title}"?`},
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask.emit(task)
      }
    })
  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed
    this.updateTask.emit(task)
  }

  onSelectCategory(category: Category): void {
    this.selectCategory.emit(category)
  }

  //фильтрация по названию
  onFilterByTitle() {
    this.filterByTitle.emit(this.searchTaskText)
  }

  // фильтрация по статусу
  onFilterByStatus(value: boolean) {
    // на всякий случай проверяем изменилось ли значение (хотя сам UI компонент должен это делать)
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  // фильтрация по приоритету
  onFilterByPriority(value: Priority) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value
      this.filterByPriority.emit(this.selectedPriorityFilter)
    }
  }

  //диалоговое окно для добавления задачи
  openAddTaskDialog() {
    const task = new Task(null, '', false, null, this.selectedCategory)

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Добавление задачи', OperType.ADD]})

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTask.emit(task)
      }
    })
  }

  // цвет приоритета
  getMobilePriorityBgColor(task: Task) {

    if (task.priority !== null && !task.completed) {
      return task.priority.color
    }
    return 'none'
  }
}
