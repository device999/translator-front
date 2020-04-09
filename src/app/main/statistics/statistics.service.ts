import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatModel } from './statistics';
import { Observable } from 'rxjs';


@Injectable()
export class StatisticsService {

  constructor(private http: HttpClient) {}

  getStatisticData(): Observable<StatModel[]> {
    return this.http.get<StatModel[]>('http://localhost:8080/stats');
  }

}
