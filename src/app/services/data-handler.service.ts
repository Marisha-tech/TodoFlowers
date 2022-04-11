import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/TestData";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/taskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/categoryDAOArray";
import {PriorityDAOArray} from "../data/dao/impl/priorityDAOArray";
import {Priority} from "../model/Priority";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

// реализации с данными с помощью массива (можно подставлять любые реализации, в том числе с БД. Главное - соблюдать интерфейсы)
  private taskDaoArray = new TaskDAOArray()
  private categoryDAOArray = new CategoryDAOArray()
  private priorityDAOArray = new PriorityDAOArray()

  constructor() {
  }

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAOArray.getAll()
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDAOArray.getAll()
  }

// поиск задач по параметрам
  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task)
  }

  deleteTask(id: number): Observable<Task> {
    return this.taskDaoArray.delete(id)
  }

  deleteCategory(id: number): Observable<Category> {
    return this.categoryDAOArray.delete(id)
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDAOArray.update(category)
  }

  addTask(task: Task): Observable<Task> {
    return this.taskDaoArray.add(task)
  }
}
