import {CategoryDAO} from "../interface/categoryDAO";
import {Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  add(category: Category): Observable<Category> {

    if (category.id === null || category.id === 0) {
      category.id = this.getLastIdCategory()
    }

    TestData.categories.push(category)
    return of(category)
  }

  delete(id: number): Observable<Category> {

    // перед удалением нужно в задачах занулить все ссылки на удаление значения
    //в реальной БД сама обновляет все ссылки (cascade update)  - здесь нам приходится делать это все вручную (тк вместо БД - массив)
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null
      }
    })

    const tmpCategory = TestData.categories.find(t => t.id === id) //удаляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1)
    return of(tmpCategory)
  }

  get(id: number): Observable<Category> {
    return undefined;
  }


  update(category: Category): Observable<Category> {

    const tmpCategory = TestData.categories.find(t => t.id === category.id) // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category)
    return of(tmpCategory)
  }

  // находит последний id (чтобы вставить новую запись с id, увеличенным на 1) - в реальной БД не нужно высчитывать id последней категории
  public getLastIdCategory(): number {
    return Math.max.apply(Math, TestData.categories.map(category => category.id)) + 1
  }

  // поиск категории по названию
  search(title: string): Observable<Category[]> {
    return of(TestData.categories.filter(
      cat => cat.title.toUpperCase().includes(title.toUpperCase()))
      .sort((c1, c2) => c1.title.localeCompare(c2.title)))
  }
}
