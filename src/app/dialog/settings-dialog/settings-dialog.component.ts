import {Component, OnInit} from '@angular/core';
import {Priority} from "../../model/Priority";
import {MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../services/data-handler.service";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {

  public priorities: Priority[]

  constructor(
    private dialogRef: MatDialogRef<SettingsDialogComponent>, // для возможности работы с текущим диалоговым окном
    private dataHandler: DataHandlerService // ссылка на сервис для работы с данными
  ) {
  }

  ngOnInit(): void {
    //получаем все значения, чтобы отобразить настройку цветов
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities)
  }

  // кнопка закрыть окно
  onClose() {
    this.dialogRef.close(false)
  }

  public onAddPriority(priority: Priority) {
    this.dataHandler.addPriority(priority).subscribe()
  }

  public onDeletePriority(priority: Priority) {
    this.dataHandler.deletePriority(priority.id).subscribe()
  }

  public onUpdatePriority(priority: Priority) {
    this.dataHandler.updatePriority(priority).subscribe()
  }
}
