import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from "../../services/data-handler.service";
import {Task} from "../../model/Task";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиеями переменных класса)
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
  // public dataSource?: MatTableDataSource<Task> = new MatTableDataSource<Task>([]); // контейнер - источник данных для таблицы displayedColumns
  // public dataSource?: MatTableDataSource<Task>; // контейнер - источник данных для таблицы displayedColumns
  public dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>()
  tasks?: Task[]

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit() {
    this.dataHandler.tasksSubject.subscribe(tasks => this.tasks = tasks)
    //dataSource обязательно нужно создавать для таблицы. В него присваивается любой источник (БД, массивы, JSON)
    this.dataSource = new MatTableDataSource<Task>(this.tasks)

    this.refreshTable()
  }

  toggleClickCompleted(task: Task) {
    task.completed = !task.completed
  }

  //в зависимости от статуса задачи вернуть цвет названия
  getPriorityColor(task: Task) {

    if (task.completed) {
      return '#f8f9fa' //TODO вынести цвета в константы (magic strings, magic numbers)
    }

    if (task.priority && task.priority.color) {
      return task.priority.color
    }

    return '#fff' //TODO вынести цвета в константы (magic strings, magic numbers)
  }

  //показывает задачи с применением текущих всех условий (категория, поиск, фильтры и пр)
  private refreshTable() {
    console.log(this.dataSource.data, 'dataSource')
    // this.dataSource.data = this.tasks //обновить источник данных (тк данные массива tasks обновились)
  }
}
