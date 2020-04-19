import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { EntryComponent } from './main/entry/entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './main/statistics/statistics.component';
import { AllWordsComponent } from './main/words/all-words/all-words.component';
import { AddWordComponent } from './main/words/add-word/add-word.component';

import { RandomComponent } from './main/quiz/random/random.component';
import { StatisticsService } from './main/statistics/statistics.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './main/header/header.component';
import { WordService } from './main/words/word.service';
import { QuizService } from './main/quiz/random/quiz.service';
import { LoadDataComponent } from './main/quiz/load-data/load-data.component';
import { AgGridModule } from 'ag-grid-angular';
import { ResultsComponent } from './main/quiz/results/results.component';



@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    EntryComponent,
    AllWordsComponent,
    AddWordComponent,
    RandomComponent,
    HeaderComponent,
    LoadDataComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    StatisticsService,
    WordService,
    QuizService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
