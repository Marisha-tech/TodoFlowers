import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./services/data-handler.service";
import {Task} from './model/Task';
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";
import {zip} from "rxjs";
import {concatMap, count, map} from "rxjs/operators";
import {IntroService} from "./services/intro.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // коллекции категорий с количеством незавершенных задач для каждой из них
  public categoryMap = new Map<Category, number>()

  title = 'TodoFlowers';
  tasks: Task[]
  categories: Category[] // все категории
  priorities: Priority[] // все приоритеты

  // статистика
  public totalTasksCountInCategory: number;
  public completedCountInCategory: number;
  public uncompletedCountInCategory: number;
  public uncompletedTotalTasksCategory: number

  //показать/скрыть статистику
  public showStat = true

  // выбранная категория
  public selectedCategory: Category = null;

  // поиск
  public searchTaskText = '' // текущее значение для поиска задач
  // public selectedTask: Task = null
  private searchCategoryText: string;

  // фильтрация
  public statusFilter: boolean
  public priorityFilter: Priority


  constructor(
    private dataHandler: DataHandlerService, // для работы с данными
    private introService: IntroService, // вводная справочная информация с выделением областей
  ) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)

    // заполнить меню с категориями
    this.fillCategories();

    this.onSelectCategory(null) //показать все задачи

    this.introService.startIntroJS(true)
  }

  // изменение категории
  public onSelectCategory(category: Category) {

    this.selectedCategory = category;

    // this.dataHandler.searchTasks(
    //   this.selectedCategory,
    //   null,
    //   null,
    //   null
    // ).subscribe(tasks => {
    //   this.tasks = tasks;
    // });

    this.updateTasksAndStat()
  }

  // обновление задачи
  public onUpdateTask(task: Task) {
    // this.dataHandler.updateTask(task).subscribe(() => {
    //   this.dataHandler.searchTasks(
    //     this.selectedCategory,
    //     null,
    //     null,
    //     null,
    //   ).subscribe(tasks => {
    //     this.tasks = tasks
    //   })
    // })

    // this.dataHandler.updateTask(task).subscribe(cat => {
    //   this.updateTasksAndStat()
    // })

    this.dataHandler.updateTask(task).subscribe(() => {

      this.fillCategories()

      this.updateTasksAndStat()
    })
  }

  // удаление задачи
  // onDeleteTask(task: Task) {
  //   this.dataHandler.deleteTask(task.id).subscribe(cat => {
  //     this.updateTasksAndStat()
  //   })
  // }

  // удаление задачи
  onDeleteTask(task: Task) {

    this.dataHandler.deleteTask(task.id).pipe(
      concatMap(task => {
        return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
          return ({t: task, count})
        }))
      })
    ).subscribe(result => {
      const t = result.t as Task

      // чтобы не обновлять весь список - обновим точечно
      if (t.category){
        this.categoryMap.set(t.category, result.count)
      }
      this.updateTasksAndStat()
    })

  }

  // удаление категории
  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null // открываем категорию "все"
      this.categoryMap.delete(cat) // не забыть удалить категорию из карты
      this.onSearchCategory(this.searchCategoryText)
      this.updateTasks()
    })
  }

  // обновление категории
  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSearchCategory(this.searchCategoryText)
    })
  }

  // фильтрация задач по статусу (все, завершенные, незавершенные)
  onFilterTasksByStatus(status: boolean) {
    this.statusFilter = status
    this.updateTasks()
  }

  //поиск задач
  onSearchTasks(searchString: string) {
    this.searchTaskText = searchString
    this.updateTasks()
  }

  // фильтрация задач по приоритету
  onFilterTasksByPriority(priority: Priority) {
    this.priorityFilter = priority
    this.updateTasks()
  }

  private updateTasks() {
    this.dataHandler.searchTasks(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    ).subscribe((tasks: Task[]) => {
      this.tasks = tasks
    })
  }

//добавление задачи
//   onAddTask(task: Task) {
//     this.dataHandler.addTask(task).subscribe(result => {
//       // this.updateTasks()
//       this.updateTasksAndStat()
//     })
//   }

  //добавление задачи
  onAddTask(task: Task) {

    this.dataHandler.addTask(task).pipe( // сначала добавляем задачу
      concatMap(task => { // используем добавленный task (concatMap - для последовательного выполнения)
        //и считаем количество задач в категории с учетом добавленной задачи
        return this.dataHandler.getUncompletedCountInCategory(task.category).pipe(map(count => {
          return ({t: task, count}) // в итоге получаем массив с добавленной задачей и количеством задач
        }))
      })
    ).subscribe(result => {
      const t = result.t as Task

    //  если указана категория - обновляем счетчик для соответствующей категории
      if (t.category){
        this.categoryMap.set(t.category, result.count)
      }

      this.updateTasksAndStat()
    })

  }

  //добавление категории
  onAddCategory(title: string) {
    this.dataHandler.addCategory(title).subscribe(result => {
      this.fillCategories()
    })
  }


  // private fillCategories() {
  //   this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  // }

  // заполняет категории и количество невыполненных задач по каждой из них (нужно для отображения категорий)
  private fillCategories() {

    // очистка карты, тк возможно был поиск по категории
    if (this.categoryMap) {
      this.categoryMap.clear()
    }

    this.categories = this.categories.sort((a, b) => a.title.localeCompare(b.title))

    // для каждой категории посчитать количество невыполненных задач
    this.categories.forEach(cat => {
      this.dataHandler.getUncompletedCountInCategory(cat).subscribe(count => this.categoryMap.set(cat, count))
    })

  }

  // поиск категории
  onSearchCategory(title: string) {

    this.searchCategoryText = title

    this.dataHandler.searchCategories(title).subscribe(categories => {
      this.categories = categories
    })
  }

  // показывает задачи с применением всех текущих условий (категория, поиск, фильтры и пр)
  updateTasksAndStat() {
    this.updateTasks() //обновить список задач

    //обновить переменные для статистики
    this.updateStat()
  }

  private updateStat() {
    zip(
      this.dataHandler.getTotalCountInCategory(this.selectedCategory),
      this.dataHandler.getCompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedCountInCategory(this.selectedCategory),
      this.dataHandler.getUncompletedTotalCount()
    )

      .subscribe(array => {
        this.totalTasksCountInCategory = array[0]
        this.completedCountInCategory = array[1]
        this.uncompletedCountInCategory = array[2]
        this.uncompletedTotalTasksCategory = array[3] // нужно для категории все
      })
  }

  toggleStat(showStat: boolean) {
    this.showStat = showStat
  }
}
