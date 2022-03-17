import {Injectable} from '@angular/core';
import {Category} from "../model/Category";
import {Task} from "../model/Task";
import {TestData} from "../data/TestData";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new Subject<Task[]>()

  constructor() {
  }

  public getCategories(): Category[] {
    return TestData.categories
  }

  public fillTasks() {
    this.tasksSubject.next(TestData.tasks)
  }

  public fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter(task => task.category === category)
    this.tasksSubject.next(tasks)
  }
}
