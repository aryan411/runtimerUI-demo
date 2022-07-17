import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from 'src/app/core/models/User';
import { AuthService } from 'src/app/core/services/auth/auth.service';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
  public user!: User;

  constructor(private router: Router,
              private auth: AuthService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit(): void
  {
    this.user = new User();
  }

  authenticate(form: NgForm): void
  {
    if (form.valid)
    {
      // perform authentication
      this.auth.authenticate(this.user).subscribe(data => {
        if (data.success)
        {
          this.auth.storeUserDate(data.token, data.user);
          this.router.navigateByUrl('/surveys');
        }
        else
        {
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeOut: 6000});
        }
      });
    }
    else
    {
      this.flashMessage.show('Please fill in all feilds', {cssClass: 'alert-danger', timeOut: 6000});
    }
  }
}
