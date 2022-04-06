import {CategoryDAO} from "../interface/categoryDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  add(category: Category): Observable<Category> {
    return undefined;
  }

  delete(id: number): Observable<Category> {

    // перед удалением нужно в задачах занулить все ссылки на удаление значения
    //в реальной БД сама обновляет все ссылки (cascade update)  - здесь нам приходится делать это все вручную (тк вместо БД - массив)
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null
      }
    })

    const tmpCategory = TestData.categories.find(t => t.id) //удаляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1)
    return of(tmpCategory)
  }

  get(id: number): Observable<Category> {
    return undefined;
  }


  search(title: string): Observable<[]> {
    return undefined;
  }

  update(category: Category): Observable<Category> {

    const tmpCategory = TestData.categories.find(t => t.id === category.id) // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category)
    return of(tmpCategory)
  }

}
