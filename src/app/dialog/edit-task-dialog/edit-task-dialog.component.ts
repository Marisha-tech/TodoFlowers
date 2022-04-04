import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../services/data-handler.service";
import {Task} from "../../model/Task";
import {Category} from "../../model/Category";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалоговым окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в диалоговое окно
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog, // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {
  }

  public categories: Category[]
  public priorities: Priority[]

  private dialogTitle: string // заголовок окна
  public task: Task // задача для редактирования/создания

  // сохраняем все назначения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  public tmpTitle: string;
  public tmpCategory: Category
  public tmpPriority: Priority;


  ngOnInit(): void {
    this.task = this.data[0] // задача для редактирования/создания
    this.dialogTitle = this.data[1] // текст для диалогового окна

    //инициализаия начальных значений (записываем в отдельные переменные)
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу
    this.tmpTitle = this.task.title
    this.tmpCategory = this.task.category
    this.tmpPriority = this.task.priority

    this.dataHandler.getAllCategories().subscribe(items => this.categories = items)
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items)
  }

  // нажали ок
  onConfirm(): void {

    //считываем все значения для сохранения в поля задачи
    this.task.title = this.tmpTitle
    this.task.category = this.tmpCategory
    this.task.priority = this.tmpPriority

    //  передаем добавленную/измененную задачу в обработчик
    //  что с ним будут делать - уже задача этого компонента
    this.dialogRef.close(this.task)
  }

  //  нажали кнопку отмены (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(null)
  }
}
