import { Injectable } from '@angular/core';

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