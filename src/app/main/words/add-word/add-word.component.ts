import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Words } from '../words';
import { WordService } from '../word.service';
import { Router } from '@angular/router';


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

  wordModel: Words =  {
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

  ngOnInit() {
  }

  speechPartChange(event: any) {
    const speechType: string = event.target.value;
    if (speechType.toLowerCase() === 'noun') {
      this.wordModel.noun = true;
    } else if (speechType.toLowerCase() === 'adverb' ) {
      this.wordModel.adverb = true;
    } else if (speechType.toLowerCase() === 'verb') {
      this.wordModel.verb = true;
    } else if (speechType.toLowerCase() === 'adjective') {
      this.wordModel.adjective = true;
    } else if (speechType.toLowerCase() === 'pronoun') {
      this.wordModel.pronoun = true;
    } else if (speechType.toLowerCase() === 'other') {
      this.wordModel.other = true;
    }
  }

  germanText(event: any) {
    this.wordModel.german = event.target.value;
  }

  russianText(event: any) {
    this.wordModel.russian = event.target.value;
  }

  onSubmit() {
    this.addWordService.postWord(this.wordModel).subscribe(data =>  console.log(data));
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/add-word']);
  }

  viewWords() {
    this.router.navigate(['/words']);
  }

}
