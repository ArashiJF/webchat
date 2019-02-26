import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { SavetokenService } from '../savetoken/savetoken.service';
import { ChatService } from '../chat/chat.service';

//log out is only a middlepage between the chat box and the login box
//to make the navigation more seamessly and natural

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private token: SavetokenService
  ) { }

  ngOnInit() {
  }

  goback(){
    this.router.navigateByUrl('/login');
  }
}
