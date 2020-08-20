import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  QuizService
} from '../random/quiz.service';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService) {}

  ngOnInit() {
    const value = this.route.snapshot.paramMap.get('id');
    if (value.toLowerCase() === 'noun') {
      this.quizService.getNounQuizzWords();
    } else if (value.toLowerCase() === 'adverb') {
      this.quizService.getAdverbQuizzWords();
    } else if (value.toLowerCase() === 'verb') {
      this.quizService.getVerbQuizzWords();
    } else if (value.toLowerCase() === 'adjective') {
      this.quizService.getAdjectiveQuizzWords();
    } else if (value.toLowerCase() === 'pronoun') {
      this.quizService.getPronounQuizzWords();
    } else if (value.toLowerCase() === 'other') {
      this.quizService.getOtherQuizzWords();
    } else if (value.toLowerCase() === 'random') {
      this.quizService.getAllQuizzWords();
    } else if (value.toLowerCase() === 'mistake') {
      this.quizService.getMistakes();
    } else if (value.toLowerCase() === 'article') {
      this.quizService.getArticles();
    }
    this.router.navigate(['/play/' + value + '/0' ]);

  }

}
