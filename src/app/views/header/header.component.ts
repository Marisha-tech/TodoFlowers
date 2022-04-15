import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  categoryName: string;

  @Input()
  showStat: boolean;

  @Output()
  toggleStat = new EventEmitter<boolean>() // показать/скрыть статистику

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  onToggleStat(): void {
    this.toggleStat.emit(!this.showStat) // вкл/выкл статистику
  }

  // окно настроек приоритетов
  showSettings() {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      autoFocus: false,
      width: '500px'
    })

    // никаких действий не требуется после закрытия окна
  }
}
