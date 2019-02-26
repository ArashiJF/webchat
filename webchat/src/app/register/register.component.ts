import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { User } from '../models/user.model';
import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

//the registration component controls the registration into the database
//if you register succesfully you are redirected to the chat route
//automatically

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  //a little animation whenever you enter the endpoint
  animations: [
    trigger('fadeIn',[
      transition(':enter',[
        style({ opacity: '0', height: 0}),
        animate('0.5s ease-out', style({opacity: '1', height: '*'})),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router
  ) { }
  //variables to get the information for registration from the page
  username: "";
  password: "";

  ngOnInit() {
  }

  gotologin(){
    this.router.navigateByUrl('login');
  }

  registration(){
    this.api.register(this.username,this.password);
  }
}
