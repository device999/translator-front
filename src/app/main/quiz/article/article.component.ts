import { Component, OnInit } from '@angular/core';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../random/random.model';
import { QuizService } from '../random/quiz.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

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


  ngOnInit() {
    const step = Number(this.route.snapshot.paramMap.get('step'));
    this.quizService.getQuizes().subscribe(data => {
      if (data.length > 0) {
        this.quiz = data;
        this.temporalQuiz = data[step];
        this.temporalQuiz.isWrong = true;
        this.temporalQuiz.correctAnswer = this.getArticle(data[step].word);
        this.possibleAnswers = this.temporalQuiz.wrongAnswers;
        this.possibleAnswers.push(this.temporalQuiz.correctAnswer);
        this.numberOfQuestions = data.length;
      }
    });
    this.loadStyling();
    this.step = step + 1;
  }

  getArticle(word: string): string{
    var splitted = word.split(" ");
    return splitted[0];
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

  onClickAnswer(answer: string, pos:number) {
    if (!this.roundEnded) {
      if (answer === this.temporalQuiz.correctAnswer) {
        this.classes[pos] += ' correct-answer';
        this.temporalQuiz.isWrong = false;
      } else {
        this.classes[pos] += ' error-answer';
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
