import {
  Component,
  OnInit
} from '@angular/core';
import {
  Words
} from '../words';
import {
  WordService
} from '../word.service';
import {
  Router,
  ActivatedRoute,
  NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-edit-word',
  templateUrl: './edit-word.component.html',
  styleUrls: ['./edit-word.component.css']
})
export class EditWordComponent implements OnInit {
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
  mySubscription: any;
  constructor(private wordService: WordService, private router: Router, private route: ActivatedRoute) {
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

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.wordService.getWordById(id).subscribe(data => {
      this.wordModel = data;
      this.detectSpeechType(this.wordModel);
    });
  }



  speechPartChange(event: any) {
    const speechType: string = event.target.value;
    this.wordModel.noun = false;
    this.wordModel.pronoun = false;
    this.wordModel.verb = false;
    this.wordModel.other = false;
    this.wordModel.adjective = false;
    this.wordModel.adverb = false;
    if (speechType.toLowerCase() === 'noun') {
      this.wordModel.noun = true;
    } else if (speechType.toLowerCase() === 'adverb') {
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

  detectSpeechType(word: Words) {
    if (word.noun === true) {
      this.wordModel.wordType = 'noun';
    } else if (word.adverb === true) {
      this.wordModel.wordType = 'Adverb';
    } else if (word.adjective === true) {
      this.wordModel.wordType = 'Adjective';
    } else if (word.verb === true) {
      this.wordModel.wordType = 'Verb';
    } else if (word.pronoun === true) {
      this.wordModel.wordType = 'Pronoun';
    } else if (word.other === true) {
      this.wordModel.wordType = 'Other';
    }
  }

  germanText(event: any) {
    this.wordModel.german = event.target.value;
  }

  russianText(event: any) {
    this.wordModel.russian = event.target.value;
  }

  onSubmit() {
    this.wordService.putWord(this.wordModel, this.wordModel.id).subscribe(data => console.log(data));
    this.router.navigate(['/edit/' + this.wordModel.id]);
  }

  viewWords() {
    this.router.navigate(['/words']);
  }

}
