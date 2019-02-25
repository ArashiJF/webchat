import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn',[
      transition(':enter',[
        style({ opacity: '0', height: 0}),
        animate('0.5s ease-out', style({opacity: '1', height: '*'})),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  previousurl: string;
  constructor(
    private api : ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.api.isAuthenticated()){
      this.router.navigateByUrl('chat-box');
    }
  }
  authenticate(){
    this.api.login(this.username,this.password);
  }

  gotoregister(){
    this.router.navigateByUrl('register');
  }

}
