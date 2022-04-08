import {TaskDAO} from "../interface/taskDAO";
import {Category} from "../../../model/Category";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from "../../../model/Task";
import {TestData} from "../../TestData";

export class TaskDAOArray implements TaskDAO {

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id) // удаляем по id
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1)

    return of(taskTmp)
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return of(this.searchTasks(category, searchText, status, priority))
  }

  update(task: Task): Observable<Task> {
    const taskTmp = TestData.tasks.find(t => t.id === task.id) //обновляем по id
    TestData.tasks.splice(TestData.tasks.indexOf(taskTmp), 1, task)
    return of(task)
  }

  private searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {
    let allTasks = TestData.tasks

    // по очереди применяем все условия (какие не пустые)
    if (status !== null) {
      allTasks = allTasks.filter(task => task.completed === status)
    }

    if (category !== null) {
      allTasks = allTasks.filter(todo => todo.category === category)
    }

    if (priority !== null) {
      allTasks = allTasks.filter(task => task.priority === priority)
    }

    if (searchText !== null) {
      allTasks = allTasks.filter(task => task.title.toUpperCase().includes(searchText.toUpperCase())) // учитываем текст
    }

    return allTasks //отфильтрованный массив
  }
}
