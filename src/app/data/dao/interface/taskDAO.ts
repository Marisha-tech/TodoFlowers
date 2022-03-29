import {CommonDAO} from "./commonDAO";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";
import {Observable} from "rxjs";

//специфичные методы для работы с задачами (методы, которые не входят в обычный CRUD)
export interface TaskDAO extends CommonDAO<Task> {

  //поиск задач по всем параметрам
  //если какой-либо параметр равен null , то он не будет учитываться при поиске
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>

  //количество завершенных задач в заданной категории (если category === null, то для всех категорий)
  getCompletedCountInCategory(category: Category): Observable<number>

  //количество незавершенных задач в заданной категории (если category === null, то для всех категорий)
  getUncompletedCountInCategory(category: Category): Observable<number>

  //количество всех задач в заданной категории (если category === null, то для всех категорий)
  getTotalCountInCategory(category: Category): Observable<number>

  // общее количество всех задач
  getTotalCount(): Observable<number>
}
