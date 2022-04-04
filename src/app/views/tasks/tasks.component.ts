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

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиеями переменных класса)
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  public dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>()// контейнер - источник данных для таблицы displayedColumns

  //ссылки на компоненты таблицы
  @ViewChild(MatPaginator) private paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  public tasks?: Task[] // напрямую не присваиваем значения в переменную, только через @Input

  //текущие задачи для отображения на странице
  @Input('tasks')
  public set setTasks(tasks: Task[]) {//напрямую не присваиваем значения в переменную, только через @Input
    this.tasks = tasks
    this.fillTable()
  }

  @Output()
  updateTask = new EventEmitter<Task>()

  constructor(
    private dataHandler: DataHandlerService, // доступ к данным
    private dialog: MatDialog, // работа с диалоговым окном
  ) {
  }

  ngOnInit() {

    // this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks)

    //dataSource обязательно нужно создавать для таблицы. В него присваивается любой источник (БД, массивы, JSON)
    this.dataSource = new MatTableDataSource<Task>(this.tasks)
    this.fillTable() //заполняем таблицы данными (задачи) и всеми метаданными
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
  }

  //диалоговое окно редактирования для добавления задачи
  openEditTaskDialog(task: Task): void {

    const dialogRef = this.dialog.open(EditTaskDialogComponent, {data: [task, 'Редактирование задачи'], autoFocus: false})

    dialogRef.afterClosed().subscribe(result => {
      //обработка результатов
    })
  }
}
