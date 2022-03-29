//стандарнтые методы CRUD (Create, Read, Update, Delete)
import {Observable} from "rxjs";

//все методы возвращают Observable - для асинхронности и работы в реактивном стиле
export interface CommonDAO<T> {

  //получить все значения
  getAll(): Observable<T[]>

  //получить одно значение по id
  get(id: number): Observable<T> //поучение значения по уникальному id

  //обновить значение
  update(T): Observable<T>

  //удалить значение
  delete(id: number): Observable<T> //удаление по id

  //добавить значение
  add(T): Observable<T>
}
