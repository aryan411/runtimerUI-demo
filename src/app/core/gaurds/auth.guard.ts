import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  path!: ActivatedRouteSnapshot[];
  route!: ActivatedRouteSnapshot;

  constructor(private router: Router,
              private auth: AuthService){ }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if (this.auth.authenticated)
    {
      // console.log('authenticated');
      return true;
    }
    else
    {
      // console.log('cannnot authenticate');
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
