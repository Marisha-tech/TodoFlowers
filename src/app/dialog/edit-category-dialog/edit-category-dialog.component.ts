import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../model/Category";
import {DataHandlerService} from "../../services/data-handler.service";
import {Priority} from "../../model/Priority";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-category-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss']
})
export class EditCategoryDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [string, string],
    private dialog: MatDialog,
  ) {
  }
  public dialogTitle: string // текст для диалогового окна
  categoryTitle: string; // текст для названия категории (при редактировании или добавлении)
  canDelete = true; // можно ли удалять объект (активна ли кнопка удаления)


  ngOnInit(): void {

    this.categoryTitle = this.data[0] // категория для редактирования
    this.dialogTitle = this.data[1] // переданный заголовок диалогового окна
  }

  onConfirm(): void {
    //  передаем добавленную/измененную категорию в обработчик
    //  что с ним будут делать - уже задача этого компонента
    this.dialogRef.close(this.categoryTitle)
  }
  onCancel() {
    this.dialogRef.close(false)
  }

  delete(): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите удаление',
        message: `Хотите удалить категорию "${this.categoryTitle}"?`
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete') //нажали удалить
      }
    })
  }
}
