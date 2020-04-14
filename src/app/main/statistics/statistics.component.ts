import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { StatModel } from './statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  constructor(private statService: StatisticsService ) { }
  columnDefs = [
    {headerName: 'Counter', field: 'id', sortable: true},
    {headerName: 'Word', field: 'word', filter: true },
    {headerName: 'Correct Answers', field: 'corrects', sortable: true },
    {headerName: 'Wrong Answers', field: 'wrongs', sortable: true},
    {headerName: 'Type', field: 'wordType', sortable: true, filter: true}
  ];
  rowData = [];

  ngOnInit() {
    this.statService.getStatisticData()
      .subscribe(data => {
        this.rowData = data;
      });
  }

}
