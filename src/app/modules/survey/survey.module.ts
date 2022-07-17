import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyManagementComponent } from './survey-management/survey-management.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';
import { DisplayResultsComponent } from './display-results/display-results.component';
import { CounterDirective } from './counter.directive';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SurveyRoutingModule } from './survey-routing.module';


@NgModule({
  declarations: [    
    QuestionsComponent,
    QuestionFormComponent,
    EditSurveyComponent,
    SurveyManagementComponent,
    TakeSurveyComponent,
    DisplayResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SurveyRoutingModule   
  ]
  
})
export class SurveyModule { }
