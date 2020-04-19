import { Component, OnInit } from '@angular/core';
import { QuizService } from '../random/quiz.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private quizService: QuizService) {
    this.quizService.getAdjustedQuiz().subscribe(data => {
      if (data.length > 0 ) {
        console.log(data);
      } else {
        console.log('not loaded');
      }
    });
  }
  columnDefs = [
    {headerName: 'Word', field: 'word', filter: true },
    {headerName: 'Correct Answer', field: 'answer', sortable: true },
    {headerName: 'Selected Answer', field: 'givenAnswer', sortable: true},
  ];
  rowData = [];

  ngOnInit(): void {
  }

}
