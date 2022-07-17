import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/gaurds/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {title: 'Login'}},
  { path: 'register', component: RegisterComponent, data: {title: 'Register'}},
  { path: 'update-user', component: UpdateUserComponent,  data: {title: 'Update Account'}, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
