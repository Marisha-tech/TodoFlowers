import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }



  onToggleStat(): void {
    this.toggleStat.emit(!this.showStat) // вкл/выкл статистику
  }
}
