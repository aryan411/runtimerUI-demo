import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/gaurds/auth.guard';
import { DisplayResultsComponent } from './display-results/display-results.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SurveyManagementComponent } from './survey-management/survey-management.component';
import { TakeSurveyComponent } from './take-survey/take-survey.component';

const routes: Routes = [
  {
    path: 'take/:id',
    component: TakeSurveyComponent,
    data: { title: 'Take Survey' },
  },
  {
    path: '',
    component: SurveyManagementComponent,
    data: { title: 'Survey Management' },
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditSurveyComponent,
    data: { title: 'Edit Survey' },
    canActivate: [AuthGuard],
  },
  {
    path: 'results/:id',
    component: DisplayResultsComponent,
    data: { title: 'Results' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
