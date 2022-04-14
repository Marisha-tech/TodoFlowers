import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  @Input()
  completeTasksInCategory: number; // количество решенных задач

  @Input()
  totalTasksInCategory: number; // общее количество задач в категории

  @Input()
  uncompleteTasksInCategory: number; // количество нерешенных задач

  constructor() { }

  ngOnInit(): void {
  }

}
