import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../services/data-handler.service";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input()
  public categories?: Category[]

  @Output()
  selectCategory = new EventEmitter<Category>()

  selectedCategory: Category

  constructor(private dataHandler: DataHandlerService) {
  }

  ngOnInit(): void {
    // this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories)
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  showTasksByCategory(category: Category) {
    // this.selectedCategory = category
    // this.dataHandler.fillTasksByCategory(category)
    //если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
    if (this.selectedCategory === category) {
      return
    }
    this.selectedCategory = category //сохраняем выбранную категорию
    console.log(category)
    //вызываем вешний обработчик и передаем туда выбранную категорию
    // this.selectedCategory.next(this.selectedCategory)


  }
}
