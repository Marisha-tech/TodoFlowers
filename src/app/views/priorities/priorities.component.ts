import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from "../../model/Priority";
import {MatDialog} from "@angular/material/dialog";
import {EditPriorityDialogComponent} from "../../dialog/edit-priority-dialog/edit-priority-dialog.component";
import {OperType} from "../../dialog/operType";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.scss']
})
export class PrioritiesComponent implements OnInit {

  static defaultColor = '#fff'

  // ------------------------------входящие параметры-------------------------------
  @Input()
  public priorities: Priority[]

  // ------------------------------исходящие действия-------------------------------

  // удалили
  @Output()
  deletePriority = new EventEmitter<Priority>()

  // изменили
  @Output()
  updatePriority = new EventEmitter<Priority>()

  // добавили
  @Output()
  addPriority = new EventEmitter<Priority>()

  constructor(
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего)
  ) {
  }

  ngOnInit(): void {
  }


  // добавление приоритета
  public onAddPriority(): void {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: ['', 'Добавление приоритета', OperType.ADD],
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor)
        this.addPriority.emit(newPriority)
      }

    })

  }

  // удаление приоритета
  delete(priority: Priority): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${priority.title}"? (задачам проставится значение 'Без приоритета')`
      },
      autoFocus: false
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deletePriority.emit(priority)
      }

    })

  }

  // редактирование приоритета
  onEditPriority(priority: Priority): void {

    const dialogRef = this.dialog.open(EditPriorityDialogComponent, {
      data: [priority.title, 'Редактирование приоритета', OperType.EDIT]
    })

    dialogRef.afterClosed().subscribe(result => {

      if (result === 'delete') {
        this.deletePriority.emit(priority)
      }

      if (result) {
        priority.title = result as string
        this.updatePriority.emit(priority)
      }

    })

  }
}
