import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { FormsModule } from '@angular/forms';
import { EmailValidateDirective } from './email-validator';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UpdateUserComponent,
    EmailValidateDirective,
  ],
  imports: [CommonModule, AuthRoutingModule, FormsModule],
  exports: [EmailValidateDirective],
})
export class AuthModule {}
