import {Component, Inject, OnInit} from '@angular/core';
import {OperType} from "../operType";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-priority-dialog',
  templateUrl: './edit-priority-dialog.component.html',
  styleUrls: ['./edit-priority-dialog.component.scss']
})
export class EditPriorityDialogComponent implements OnInit {


  public dialogTitle: string // текст для диалогового окна
  public operType: OperType // тип операции
  public priorityTitle: string; // текст для названия приоритета (при редактировании или добавлении)

  constructor(
    private dialogRef: MatDialogRef<EditPriorityDialogComponent>, // для работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [string, string, OperType], // данные, которые передали в диалоговое окно
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {
  }

  ngOnInit(): void {

    // получаем переданные в диалоговое окно данные
    this.priorityTitle = this.data[0] // категория для редактирования
    this.dialogTitle = this.data[1] // переданный заголовок диалогового окна
    this.operType = this.data[2] // тип операции

  }

  canDelete() {

    return this.operType === OperType.EDIT

  }

  // нажали ОК
  onConfirm() {
    //  передаем добавленную/измененную категорию в обработчик
    //  что с ним будут делать - уже задача этого компонента
    this.dialogRef.close(this.priorityTitle)
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel() {

    this.dialogRef.close(false)

  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить приоритет: "${this.priorityTitle}"? (в задаче проставится '')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }
}
