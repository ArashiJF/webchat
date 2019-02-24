import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { SavetokenService } from '../savetoken/savetoken.service';
import { Chats } from '../models/chats.model';
import { User } from '../models/user.model';
import { Messages } from '../models/messages.model';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  token: string;

  constructor() { }
}
