import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EntryComponent } from './main/entry/entry.component';
import { RandomComponent } from './main/quiz/random/random.component';
import { AddWordComponent } from './main/words/add-word/add-word.component';
import { AllWordsComponent } from './main/words/all-words/all-words.component';
import { StatisticsComponent } from './main/statistics/statistics.component';
import { LoadDataComponent } from './main/quiz/load-data/load-data.component';
import { ResultsComponent } from './main/quiz/results/results.component';
import { ArticleComponent } from './main/quiz/article/article.component';

const routes: Routes = [
  {
    path: '',
    component: EntryComponent
  },
  {
    path: 'play',
    redirectTo: 'play/random',
    pathMatch: 'full'
  },
  {
    path: 'play/results',
    component: ResultsComponent,
  },
  {
    path: 'play/:id',
    component: LoadDataComponent,
  },
  {
    path: 'play/article/:step',
    component: ArticleComponent,
  },
  {
    path: 'play/:id/:step',
    component: RandomComponent,
  },
  {
    path: 'words',
    component: AllWordsComponent,
  },
  {
    path: 'add-word',
    component: AddWordComponent,
  },
  {
    path: 'stats',
    component: StatisticsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
