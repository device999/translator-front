import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';
import {
  Words
} from './words';
import {
  Quiz
} from '../quiz/random/random.model';


@Injectable()
export class WordService {

  constructor(private http: HttpClient) {}

  postWord(body: Words): Observable < Words > {
    return this.http.post < Words > ('http://localhost:8080/words', body);
  }

  putWord(body: Words, id: number): Observable < Words > {
    return this.http.put < Words > ('http://localhost:8080/words/' + id, body);
  }

  getAllWords(): Observable < Words[] > {
    return this.http.get < Words[] > ('http://localhost:8080/words/all');
  }

  getWordById(id: number): Observable < Words > {
    return this.http.get < Words > ('http://localhost:8080/words/' + id);
  }
}
