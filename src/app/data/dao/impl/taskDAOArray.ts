import {TaskDAO} from "../interface/taskDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";
import {Priority} from "../../../model/Priority";
import {Task} from "../../../model/Task";

export class TaskDAOArray implements TaskDAO {

  add(T): Observable<Task> {
    return undefined;
  }

  delete(id: number): Observable<Task> {
    return undefined;
  }

  get(id: number): Observable<Task> {
    return undefined;
  }

  getAll(): Observable<Task[]> {
    return undefined;
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
    return undefined;
  }

  update(T): Observable<Task> {
    return undefined;
  }

}
