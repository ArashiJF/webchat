import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { SavetokenService } from "../savetoken/savetoken.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = 'http://localhost:4000'
  private socket;

  constructor(public tokenService: SavetokenService) { 
    this.socket = io(this.url)
  }

  public sendMessage(message){
    this.socket.emit('new-message',{
      id: this.tokenService.get('user'),
      text: message
    });
  }

  public onlogin(){
    this.socket.connect();
  }

  public onlogout(){
    this.socket.disconnect();
  }

  public getMessages = () =>{
    return Observable.create((observer) => {
      this.socket.on('messages', (messages) => {
        console.log(messages);
        return observer.next(messages);
      });
    });
  }
}
