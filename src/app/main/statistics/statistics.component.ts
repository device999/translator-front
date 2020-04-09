import { Component, OnInit } from '@angular/core';
import { StatisticsService } from './statistics.service';
import { StatModel } from './statistics';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public statistics: StatModel[] = [];

  constructor(private statService: StatisticsService ) { }

  ngOnInit() {
    this.statService.getStatisticData()
      .subscribe(data => {
        this.statistics = data;
      });
  }

}
