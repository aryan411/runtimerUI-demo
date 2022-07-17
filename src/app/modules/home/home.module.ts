import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    SurveyListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPageScrollModule,
    FormsModule,
  ],
  exports:[
    HomeComponent,
    SurveyListComponent
  ]
})
export class HomeModule { }
