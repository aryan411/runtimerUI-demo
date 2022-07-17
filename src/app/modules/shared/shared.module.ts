import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { RouterModule } from '@angular/router';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { SurveyModule } from '../survey/survey.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPageScrollModule,
    SurveyModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
})
export class SharedModule { }
