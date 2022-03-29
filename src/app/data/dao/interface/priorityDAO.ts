import {CommonDAO} from "./commonDAO";
import {Priority} from "../../../model/Priority";

//специфичные методы для работы с приоритетами (методы, которые не входят в обычный CRUD)
export interface PriorityDAO extends CommonDAO<Priority>{
  //здесь будут специфичные методы для работы с категориями (на будущее)
}
