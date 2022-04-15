import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Priority} from "../../model/Priority";
import {MatDialog} from "@angular/material/dialog";

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

}
