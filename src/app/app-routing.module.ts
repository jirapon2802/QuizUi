import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent }, 
  { path: 'quiz/:userId/:loadQuiz', component: QuizComponent },
  { path: 'summary/:userId', component: SummaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
