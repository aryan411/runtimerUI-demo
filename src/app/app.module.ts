import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './modules/shared/shared.module';
import { SurveyModule } from './modules/survey/survey.module';

export function jwtTokenGetter(): string
{
  return localStorage.getItem('id_token') as string;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FlashMessagesModule.forRoot(),
    NgxPageScrollModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [FlashMessagesService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
