import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AboutDialogComponent} from "../../dialog/about-dialog/about-dialog.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  site: 'https://lflower.ru/';
  blog: 'https://lflower.ru/';
  year: Date;
  siteName = 'botanical-flower'

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.year = new Date() //текущий год
  }

  // окно о программе
  openAboutDialog() {
    this.dialog.open(AboutDialogComponent, {
      autoFocus: false,
      data: {
        dialogTitle: 'О программе',
        message: 'Данное приложение было создано для ведения учета ухода за растениями'
      },
      width: '400px'
    })
  }
}
