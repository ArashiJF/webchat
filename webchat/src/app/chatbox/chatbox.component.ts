import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat/chat.service';
import { ApiService } from '../api/api.service';
import { observable } from 'rxjs';
import { SavetokenService } from '../savetoken/savetoken.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  constructor(
    private router: Router,
    private api: ApiService,
    public chat: ChatService,
    private token: SavetokenService
  ) { }

  message: string;
  messages: string[] = [];
  id: string;
  username: string;

  ngOnInit() {
    //retrieve messages from the socket and show them in the app
    this.chat.getMessages().subscribe((message: string)=>{
      this.messages.push(message);
    })
    this.username = this.token.get('user')
  }

  sendMessage() {
    //send messages to the socket 
    this.chat.sendMessage(this.message);
    this.message = '';
  }

  logout(){
    //log out user and then make the authguard take the neccessary action
    this.api.logout();
    this.router.navigateByUrl('/logout');
  }
}
