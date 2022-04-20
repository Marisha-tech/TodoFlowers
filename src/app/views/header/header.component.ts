import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SettingsDialogComponent} from "../../dialog/settings-dialog/settings-dialog.component";
import {IntroService} from "../../services/intro.service";
import {DeviceDetectorService} from "ngx-device-detector";

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

  // public sidenav: any;


  public isMobile: boolean

  constructor(
    private dialog: MatDialog,
    private introService: IntroService, // вводная справочная информация с выделением областей
    public deviceService: DeviceDetectorService, // для определения типа устройства
  ) {
    this.isMobile = deviceService.isMobile()
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

  showIntroHelp() {
    this.introService.startIntroJS(false)
  }

}
