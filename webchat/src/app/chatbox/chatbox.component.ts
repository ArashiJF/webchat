import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat/chat.service';
import { ApiService } from '../api/api.service';
import { observable, Observable } from 'rxjs';
import { SavetokenService } from '../savetoken/savetoken.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  message: string;
  messages: string[] = [];
  id: string;
  _username: string='';
  users: User[] = [];

  constructor(
    private router: Router,
    private api: ApiService,
    public chat: ChatService,
    private token: SavetokenService
  ) {
    this.api.getallusers().subscribe( (r: User[] )=>{
      this.users = r;
    });
    
  }

  
  ngOnInit() {
    //retrieve messages from the socket and show them in the app
    this.chat.getMessages().subscribe(msg =>{
      console.log(msg);
      this.messages.push(msg);
    });

    this._username = this.token.get('user');
  }

  editname(){
    //redirecto to page to change username
    this.router.navigateByUrl('/edit-username');
  }

  editpass(){
    //redirect to page to change password
    this.router.navigateByUrl('edit-pass')
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
