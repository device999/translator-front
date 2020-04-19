import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  NavigationEnd
} from '@angular/router';

import {
  Quiz
} from './random.model';
import {
  QuizService
} from './quiz.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit, OnDestroy {

  quiz: Quiz[] = [];
  possibleAnswers: string[] = [];
  temporalQuiz: Quiz;
  numberOfQuestions: number = 0;
  mySubscription: any;
  classes: string[] = [];
  roundEnded: boolean = false;
  step: number;

  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  loadStyling() {
    this.classes.push('collection-item');
    this.classes.push('collection-item');
    this.classes.push('collection-item');
    this.classes.push('collection-item');
  }

  ngOnDestroy(): void {
    this.temporalQuiz = null;
    this.quiz = [];
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }


  ngOnInit() {
    const step = Number(this.route.snapshot.paramMap.get('step'));
    this.quizService.getQuizes().subscribe(data => {
      if (data.length > 0) {
        this.quiz = data;
        this.temporalQuiz = data[step];
        this.temporalQuiz.isWrong = true;
        this.possibleAnswers = this.temporalQuiz.wrongAnswers;
        this.possibleAnswers.push(this.temporalQuiz.correctAnswer);
        this.shuffle(this.possibleAnswers);
        this.numberOfQuestions = data.length;
      }
    });
    this.loadStyling();
    this.step = step + 1;
  }



  nextRound() {
    const step = Number(this.route.snapshot.paramMap.get('step')) + 1;
    if (this.quiz[step] != null) {
      this.router.navigate(['/play/' + this.route.snapshot.paramMap.get('id') + '/' + step]);
    } else {
      this.quizService.deleteQuiz();
      this.router.navigate(['/stats']);
    }

  }
  quitQuiz(){
    this.quizService.deleteQuiz();
    this.router.navigate(['/stats']);
  }

  onClickAnswer(answer: string, pos: number) {
    if (!this.roundEnded) {
      if (answer === this.temporalQuiz.correctAnswer) {
        this.classes[pos] += ' correct-answer';
        this.quizService.incrementCorrectAnswer(this.temporalQuiz.id).subscribe();
        this.temporalQuiz.isWrong = false;
      } else {
        this.classes[pos] += ' error-answer';
        this.quizService.incrementWrongAnswer(this.temporalQuiz.id).subscribe();
        this.showCorrectAnswer();
      }
      this.roundEnded = true;
      this.quizService.loadNewElementToQuiz(this.temporalQuiz);
    }

  }

  showCorrectAnswer() {
    for (let index = 0; index < this.possibleAnswers.length; index++) {
      if (this.possibleAnswers[index] === this.temporalQuiz.correctAnswer) {
        this.classes[index] += ' correct-answer';
      }

    }
  }

}
