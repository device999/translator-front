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
    {headerName: 'German', field: 'german', filter: true, width: 250 },
    {headerName: 'Russian', field: 'russian', filter: true, width: 250 },
    {headerName: 'Correct', field: 'corrects', sortable: true, width: 150},
    {headerName: 'Wrong', field: 'wrongs', sortable: true, width: 150},
    {headerName: 'Type', field: 'wordType', sortable: true, filter: true, width: 250}
  ];
  rowData = [];

  ngOnInit() {
    this.statService.getStatisticData()
      .subscribe(data => {
        this.rowData = data;
      });
  }

}
