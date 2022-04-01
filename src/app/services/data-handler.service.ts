import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/TestData";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {TaskDAOArray} from "../data/dao/impl/taskDAOArray";
import {CategoryDAOArray} from "../data/dao/impl/categoryDAOArray";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks)
  // categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories)
  private taskDaoArray = new TaskDAOArray()
  private categoryDAOArray = new CategoryDAOArray()

  constructor() {
  }

 /* public getCategories() {
    this.categoriesSubject.next(TestData.categories)
  }*/

/*  public fillTasks() {
    this.tasksSubject.next(TestData.tasks)
  }*/

/*  public fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category)
    this.tasksSubject.next(tasks)
  }*/

  getAllTasks(): Observable<Task[]> {
    return this.taskDaoArray.getAll()
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDAOArray.getAll()
}
}
