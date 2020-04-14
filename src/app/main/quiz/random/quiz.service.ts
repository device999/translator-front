import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  BehaviorSubject
} from 'rxjs';
import {
  Quiz
} from './random.model';



@Injectable()
export class QuizService {


  private quiz: BehaviorSubject < Quiz[] > = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
  }

  getQuizes(): Observable < Quiz[] > {
    return new Observable(fn => this.quiz.subscribe(fn));
  }

  deleteQuiz() {
    this.quiz.next([]);
  }


  getAllQuizzWords() {
    this.deleteQuiz();
    this.http.get < Quiz[] > ('http://localhost:8080/words').subscribe(data => {
      this.quiz.next(data);
    });
  }

  getNounQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:8080/words/nouns').subscribe(data => {
      this.quiz.next(data);
    });
  }

  getPronounQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:8080/words/pronouns').subscribe(data => {
      this.quiz.next(data);
    });
  }

  getVerbQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:8080/words/verbs').subscribe(data => {
      this.quiz.next(data);
    });
  }

  getAdverbQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:8080/words/adverbs').subscribe(data => {
      this.quiz.next(data);
    });
  }

  getAdjectiveQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:8080/words/adjectives').subscribe(data => {
      this.quiz.next(data);
    });
  }

  getOtherQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:8080/words/others').subscribe(data => {
      this.quiz.next(data);
    });
  }

  getMistakes() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:8080/words/mistakes').subscribe(data => {
      this.quiz.next(data);
    });
  }

  // statistic

  incrementCorrectAnswer(wordId: number): any {
    return this.http.get('http://localhost:8080/stats/' + wordId + '/correct');
  }

  incrementWrongAnswer(wordId: number): any {
    return this.http.get('http://localhost:8080/stats/' + wordId + '/wrong');
  }

}
