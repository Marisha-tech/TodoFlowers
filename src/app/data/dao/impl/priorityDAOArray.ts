import {PriorityDAO} from "../interface/priorityDAO";
import {Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

// реализация работы с приоритетами в виде массивов
// все методы DAO возвращают тип Observable, для реактивных возможностей
// для работы с БД - нужно изменить реализацию каждого метода, чтобы обращался не к массивам, а делал RESTful запрос или напрямую к БД
export class PriorityDAOArray implements PriorityDAO {

  static priorities = TestData.priorities // тестовые данные

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities)
  }

  add(priority: Priority): Observable<Priority> {

    // если id пустой - генерируем его
    if (priority.id === null || priority.id === 0) {
      priority.id = this.getLastIdPriority()
    }
    TestData.priorities.push(priority);

    return of(priority)

  }

  delete(id: number): Observable<Priority> {
    TestData.tasks.forEach(task => {
      if (task.priority && task.priority.id === id) {
        task.priority = null
      }
    })

    const tmpPriority = TestData.priorities.find(t => t.id === id); // удаляем по id
    TestData.priorities.splice(TestData.priorities.indexOf(tmpPriority), 1);

    return of(tmpPriority);
  }

  update(priority: Priority): Observable<Priority> {
    const tmp = TestData.priorities.find(t => t.id === priority.id); // обновляем по id
    TestData.priorities.splice(TestData.priorities.indexOf(tmp), 1, priority);

    return of(priority);
  }

  // нужно только для реализации данных из массивов (т.к. в БД id создается автоматически)
  // генерирует id для нового значения
  private getLastIdPriority(): number {
    return Math.max.apply(Math, TestData.priorities.map(c => c.id)) + 1;
  }
}
