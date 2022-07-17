import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private datasource: DataService)
  {
    this.user =  new User();
  }

  authenticate(user: User): Observable<any>
  {
    return this.datasource.authenticate(user);
  }

  storeUserDate(token: any, user: User): void
  {
    this.datasource.storeUserData(token, user);
  }

  get authenticated(): boolean
  {
    return this.datasource.loggedIn();
  }

  logout(): Observable<any>
  {
    return this.datasource.logout();
  }

  registerUser(user: User): Observable<any>
  {
    return this.datasource.registerUser(user);
  }

  updateUser(user: User): Observable<any>
  {
    return this.datasource.updateUser(user);
  }

}
