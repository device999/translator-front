import {
  Component,
  OnInit
} from '@angular/core';
import {
  WordService
} from '../word.service';
import {
  Words
} from '../words';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.css']
})
export class AllWordsComponent implements OnInit {

  public allWords: Words[] = [];
  constructor(private wordService: WordService, private router: Router) {}

  ngOnInit() {
    this.wordService.getAllWords().subscribe(data => {
      data.forEach(element => {
        this.allWords.push(element);
      });
    });
    console.log(this.allWords);
  }

  detectSpeechType(word: Words): string {
    if (word.noun === true) {
      return 'Noun';
    } else if (word.adverb === true) {
      return 'Adverb';
    } else if (word.adjective === true) {
      return 'Adjective';
    } else if (word.verb === true) {
      return 'Verb';
    } else if (word.pronoun === true) {
      return 'Pronoun';
    } else if (word.other === true) {
      return 'Other';
    }
  }

  editWord(wordId) {
    this.router.navigate(['/edit/' + wordId]);
  }

}
