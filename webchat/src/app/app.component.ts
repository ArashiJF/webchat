import { Component } from '@angular/core';
import { ChatService } from './chat/chat.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'webchat';
  message: string;
  
  constructor(private chatservice: ChatService) {
  }
 
  
  sendMessage(){
    this.chatservice.sendMessage(this.message);
    this.message = '';
  }
}
