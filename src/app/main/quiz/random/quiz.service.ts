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


  private loadedQuiz: BehaviorSubject < Quiz[] > = new BehaviorSubject([]);
  private adjustedQuiz: BehaviorSubject < Quiz[] > = new BehaviorSubject([]);

  constructor(private http: HttpClient) {
  }

  getQuizes(): Observable < Quiz[] > {
    return new Observable(fn => this.loadedQuiz.subscribe(fn));
  }

  deleteQuiz() {
    this.loadedQuiz.next([]);
  }

  getAdjustedQuiz(): Observable < Quiz[] > {
    return new Observable(fn => this.adjustedQuiz.subscribe(fn));
  }

  deleteAdjustedQuiz() {
    this.adjustedQuiz.next([]);
  }

  loadNewElementToQuiz(newQuiz: Quiz) {
    let loadedData = [ ];
    this.getAdjustedQuiz().subscribe(data => {
      loadedData = data;
    });
    loadedData.push(newQuiz);
    this.adjustedQuiz.next(loadedData);
  }


  getAllQuizzWords() {
    this.deleteQuiz();
    this.http.get < Quiz[] > ('http://localhost:9015/words').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getNounQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/nouns').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getPronounQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/pronouns').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getVerbQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/verbs').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getAdverbQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/adverbs').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getAdjectiveQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/adjectives').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getOtherQuizzWords() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/others').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getMistakes() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/mistakes').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  getArticles() {
    this.deleteQuiz();
    return this.http.get < Quiz[] > ('http://localhost:9015/words/articles').subscribe(data => {
      this.loadedQuiz.next(data);
    });
  }

  // statistic

  incrementCorrectAnswer(wordId: number): any {
    return this.http.get('http://localhost:9015/stats/' + wordId + '/correct');
  }

  incrementWrongAnswer(wordId: number): any {
    return this.http.get('http://localhost:9015/stats/' + wordId + '/wrong');
  }

}
