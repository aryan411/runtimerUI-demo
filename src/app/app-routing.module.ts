import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './modules/shared/error/error.component';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'surveys',
    loadChildren: () =>
      import('./modules/survey/survey.module').then((m) => m.SurveyModule),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent, data: { title: 'Error' } },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
