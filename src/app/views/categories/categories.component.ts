import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataHandlerService} from "../../services/data-handler.service";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {EditCategoryDialogComponent} from "../../dialog/edit-category-dialog/edit-category-dialog.component";
import {OperType} from "../../dialog/operType";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input()
  public categories?: Category[]

  @Input()
  selectedCategory: Category

  // категории с количеством активных задач для каждой категории
  @Input('categoryMap')
  set setCategoryMap(categoryMap: Map<Category, number>) {
    this.selectedCategoryMap = categoryMap
  }

  //выбрали категорию из списка
  @Output()
  selectCategory = new EventEmitter<Category>()

  //удалили категорию
  @Output()
  deleteCategory = new EventEmitter<Category>()

  //изменили категорию
  @Output()
  updateCategory = new EventEmitter<Category>()

  // добавили категорию
  @Output()
  addCategory = new EventEmitter<string>() // передаем только название новой категории

  // поиск категории
  @Output()
  searchCategory = new EventEmitter<string>(); // передаем строку для поиска

  //для отображения иконки редактирования при наведении на категорию
  indexMouseMove: number;
  searchCategoryTitle: string; // текущее значение для поиска категорий
  public selectedCategoryMap: Map<Category, number> // список всех категорий и кол-во активных задач

  constructor(
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  showTasksByCategory(category: Category): void {

    //если не изменилось значение, ничего не делать (чтобы лишний раз не делать запрос данных)
    if (this.selectedCategory === category) {
      return
    }
    this.selectedCategory = category //сохраняем выбранную категорию

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
      data: [category.title, 'Редактирование категории', OperType.EDIT],
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

  //диалоговое окно для добавления категории
  openAddCategoryDialog() {

    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: ['', 'Добавление категории', OperType.ADD],
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result as string) // вызываем внешний обработчик
      }
    })
  }

  // поиск категории
  search() {
    if (this.searchCategoryTitle == null) {
      return
    }

    this.searchCategory.emit(this.searchCategoryTitle)
  }
}
