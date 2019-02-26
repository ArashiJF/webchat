import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from '../api/api.service';

//for the implementation of authguard service 
//I followed the steps taken in this tutorial https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
//authguard extends from CanActivate, which, when the user tries to
//access a protected route, it will first check wether the jsonweb token is valid or not
//if its not it will redirect to the login page


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    public router: Router,
    public auth: ApiService,
  ) { }
  canActivate(): boolean{
    if (!this.auth.isAuthenticated()){
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
