import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../services/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input()
  public categories?: Category[]

  //выбрали категорию из списка
  @Output()
  selectCategory = new EventEmitter<Category>()

  //удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>()

  //изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>()

  @Input()
  selectedCategory: Category

  //для отображения иконки редактирования при наведении на категорию
  indexMouseMove: number;

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    // this.dataHandler.categoriesSubject.subscribe(categories => this.categories = categories)
    // this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories)
  }

  showTasksByCategory(category: Category): void {
    // this.selectedCategory = category
    // this.dataHandler.fillTasksByCategory(category)
    //если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
    if (this.selectedCategory === category) {
      return
    }
    this.selectedCategory = category //сохраняем выбранную категорию
    console.log(category)
    //вызываем вешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(this.selectedCategory)


  }

  //сохраняет индекс записи категории, над которой в данный момент проходит мышка (а там отображается иконка редактирования)
  showEditIcon(index: number) {
    this.indexMouseMove = index
  }

  //диалоговое окно редактирования категории
  openEditCategoryDialog(category: Category) {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: [category.title, 'Редактирование категории'],
      width: "400px",
    })

    dialogRef.afterClosed().subscribe(result => {

      // обработка результатов
      if (result === 'delete') { // нажали удалить
        this.deleteCategory.emit(category) // вызываем внешний обработчик
        return
      }

      if (typeof (result) === 'string') { // нажали сохранить
        category.title = result as string

        this.updateCategory.emit(category) // вызываем внешний обработчик
        return;
      }

    })
  }
}
