import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {OperType} from "../operType";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})

// создание/редактирование категории
export class EditCategoryDialogComponent implements OnInit {

  public dialogTitle: string // текст для диалогового окна
  categoryTitle: string; // текст для названия категории (при редактировании или добавлении)
  // canDelete = true; // можно ли удалять объект (активна ли кнопка удаления)
  public operType: OperType // тип операции

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], // данные, которые передали в диалоговое окно
    private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {  }


  ngOnInit(): void {

    // получаем переданные в диалоговое окно данные
    this.categoryTitle = this.data[0] // категория для редактирования
    this.dialogTitle = this.data[1] // переданный заголовок диалогового окна
    this.operType = this.data[2] // тип операции
    console.log(this.operType, 'Редактирование категории')

  }

  // нажали ОК
  onConfirm(): void {
    //  передаем добавленную/измененную категорию в обработчик
    //  что с ним будут делать - уже задача этого компонента
    this.dialogRef.close(this.categoryTitle)
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel() {
    this.dialogRef.close(false)
  }

  // нажали Удалить
  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите удаление',
        message: `Хотите удалить категорию "${this.categoryTitle}"? (сами задачи не удаляются)`
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete') //нажали удалить
      }
    })
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT
  }
}
