import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "./services/data-handler.service";
import {Task} from './model/Task';
import {Category} from "./model/Category";
import {Priority} from "./model/Priority";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TodoFlowers';
  tasks: Task[]
  categories: Category[]
  priorities: Priority[]

  public selectedCategory: Category = null;

  // поиск
  public searchTaskText = '' // текущее значение для поиска задач

  // фильтрация
  public statusFilter: boolean
  public priorityFilter: Priority

  // public selectedTask: Task = null

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandler.getAllTasks().subscribe(tasks => this.tasks = tasks)
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)

    this.onSelectCategory(null) //показать все задачи
  }

  // изменение категории
  public onSelectCategory(category: Category) {

    this.selectedCategory = category;

    this.dataHandler.searchTasks(
      this.selectedCategory,
      null,
      null,
      null
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

  }

  // обновление задачи
  public onUpdateTask(task: Task) {
    this.dataHandler.updateTask(task).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null,
      ).subscribe(tasks => {
        this.tasks = tasks
      })
    })
  }

  // удаление задачи
  onDeleteTask(task: Task) {
    this.dataHandler.deleteTask(task.id).subscribe(() => {
      this.dataHandler.searchTasks(
        this.selectedCategory,
        null,
        null,
        null,
      ).subscribe(tasks => {
        this.tasks = tasks
      })
    })
  }

  onDeleteCategory(category: Category) {
    this.dataHandler.deleteCategory(category.id).subscribe(cat => {
      this.selectedCategory = null // открываем категорию "все"
      this.onSelectCategory(this.selectedCategory)
    })
  }

  onUpdateCategory(category: Category) {
    this.dataHandler.updateCategory(category).subscribe(() => {
      this.onSelectCategory(this.selectedCategory)
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


}
