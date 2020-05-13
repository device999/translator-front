import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  WordService
} from '../word.service';
import {
  Words
} from '../words';
import {
  Router
} from '@angular/router';
import {
  AgGridAngular
} from 'ag-grid-angular';
import {
  AlertService
} from '../../entry/alert/alert.service';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.css']
})
export class AllWordsComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private defaultColDef;
  private rowSelection;
  private rowData: Words[];
  private selectedId = 0;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };


  public allWords: Words[] = [];
  constructor(private wordService: WordService, private router: Router, private alertService: AlertService) {
    this.columnDefs = [{
        headerName: 'Id',
        field: 'id',
        filter: true,
        sortable: true,
        resizable: true,
        width: 100
      },
      {
        headerName: 'German',
        field: 'german',
        filter: true,
        sortable: true,
        resizable: true,
        width: 350,
        editable: true,
      },
      {
        headerName: 'Russian',
        field: 'russian',
        sortable: true,
        filter: true,
        resizable: true,
        width: 350,
        editable: true,
      },
      {
        headerName: 'Type',
        field: 'wordType',
        sortable: true,
        filter: true,
        resizable: true,
        width: 250,
        editable: true,
      },
    ];
    this.rowSelection = 'single';
  }

  onSelectionChanged(event) {
    const selectedRows: any = this.gridApi.getSelectedRows();
    this.selectedId = selectedRows[0].id;
  }
  removeItem() {
    if (this.selectedId === 0) {
      this.alertService.error('Word is not selected', this.options);
    } else {
      this.wordService.deleteWordById(this.selectedId).subscribe();
      this.alertService.success('Deleted', this.options);
    }
  }
  ngOnInit() {
    this.wordService.getAllWords().subscribe(data => {
      data.forEach(element => {
        element.wordType = this.detectSpeechType(element);
      });
      this.rowData = data;
    });
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellValueChanged(event) {
    if (event.column.colId === 'wordType') {
      this.wordService.putWord(this.speechPartChange(event.value, event.data), event.data.id).subscribe(data =>
        console.log(data));
    } else {
      this.wordService.putWord(event.data, event.data.id).subscribe(data => console.log(data));
    }
  }

  speechPartChange(speechType: any, wordModel: Words): Words {
    wordModel.noun = false;
    wordModel.pronoun = false;
    wordModel.verb = false;
    wordModel.other = false;
    wordModel.adjective = false;
    wordModel.adverb = false;
    if (speechType.toLowerCase() === 'noun') {
      wordModel.noun = true;
    } else if (speechType.toLowerCase() === 'adverb') {
      wordModel.adverb = true;
    } else if (speechType.toLowerCase() === 'verb') {
      wordModel.verb = true;
    } else if (speechType.toLowerCase() === 'adjective') {
      wordModel.adjective = true;
    } else if (speechType.toLowerCase() === 'pronoun') {
      wordModel.pronoun = true;
    } else if (speechType.toLowerCase() === 'other') {
      wordModel.other = true;
    }
    return wordModel;
  }

}
