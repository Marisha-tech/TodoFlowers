import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent implements OnInit {
  dialogTitle: string;
  message: string;

  constructor(
    private dialogRef: MatDialogRef<AboutDialogComponent>,// для работы с текущим диалоговым окном
    @Inject(MAT_DIALOG_DATA) private data: { dialogTitle: string, message: string } // данные, которые передаются
  ) {

    //  текст для диалогового окна
    this.dialogTitle = data.dialogTitle// заголовок
    this.message = data.message //сообщение
  }

  ngOnInit(): void {
  }

  // нажали ок
  onConfirm(): void {
    this.dialogRef.close(true)
  }
}
