import { Injectable } from '@angular/core';

//This service is for saving the tokens and usernames for the application
//on logout the token and username are removed

//There is an extra function for clearing the localStorage completely

@Injectable({
  providedIn: 'root'
})
export class SavetokenService {

  constructor() {}

  save(name: string, value: string){
    localStorage.setItem('chatoken'+name, value);
  }
  
  get(name: string): string{
    return localStorage.getItem('chatoken'+name);
  }

  unset(name: string){
    localStorage.removeItem('chatoken'+name);
  }

  clear(){
    localStorage.clear();
  }

}