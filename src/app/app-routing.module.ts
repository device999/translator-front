import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EntryComponent } from './main/entry/entry.component';
import { RandomComponent } from './main/quiz/random/random.component';
import { AddWordComponent } from './main/words/add-word/add-word.component';
import { AllWordsComponent } from './main/words/all-words/all-words.component';
import { StatisticsComponent } from './main/statistics/statistics.component';
import { EditWordComponent } from './main/words/edit-word/edit-word.component';
import { LoadDataComponent } from './main/quiz/load-data/load-data.component';

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
    path: 'play/:id',
    component: LoadDataComponent,
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
  {
    path: 'edit/:id',
    component: EditWordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
