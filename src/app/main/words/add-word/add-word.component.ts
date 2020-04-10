import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import {
  Words
} from '../words';
import {
  WordService
} from '../word.service';
import {
  Router
} from '@angular/router';


@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {

  newWordForm = new FormGroup({
    german: new FormControl(''),
    russian: new FormControl(''),
    speechPart: new FormControl('')
  });

  wordModel: Words = {
    adjective: false,
    german: '',
    russian: '',
    noun: false,
    adverb: false,
    pronoun: false,
    other: false,
    verb: false,
    id: null,
    wordType: null,
  };

  constructor(private addWordService: WordService, private router: Router) {

  }

  ngOnInit() {}

  germanText(event: any) {
    this.wordModel.german = event.target.value;
  }

  russianText(event: any) {
    this.wordModel.russian = event.target.value;
  }

  onClickNoun() {
    this.wordModel.noun = true;
    this.onSubmit();
  }

  onClickAdjective() {
    this.wordModel.adjective = true;
    this.onSubmit();
  }

  onClickOther() {
    this.wordModel.other = true;
    this.onSubmit();
  }

  onClickVerb() {
    this.wordModel.verb = true;
    this.onSubmit();
  }

  onClickPronoun() {
    this.wordModel.pronoun = true;
    this.onSubmit();
  }

  onClickAdverb() {
    this.wordModel.adverb = true;
    this.onSubmit();
  }

  onSubmit() {
    this.addWordService.postWord(this.wordModel).subscribe(data => console.log(data));
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/add-word']);
  }

  viewWords() {
    this.router.navigate(['/words']);
  }

}
