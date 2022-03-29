import {CommonDAO} from "./commonDAO";
import {Category} from "../../../model/Category";
import {Observable} from "rxjs";

//специфичные методы для работы с категориями (методы, которые не входят в обычный CRUD)
export interface CategoryDAO extends CommonDAO<Category> {

  //поиск категории по названию
  search(title: string): Observable<Category[]>
}
