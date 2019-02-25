import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from '../api/api.service';

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
