import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { SavetokenService } from '../savetoken/savetoken.service';
import { NoticeService } from '../notices/notices.service';
import { Chats } from '../models/chats.model';
import { User } from '../models/user.model';
import { Messages } from '../models/messages.model';
import { filter } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  token: string;

  constructor(
    private http: HttpClient,
    private tokenservice: SavetokenService,
    private notice: NoticeService,
    private router: Router,
  ) {}
  
  // AUTHENTICATION OPERATIONS

  //Check wether token is expired or not!
  public isAuthenticated(): boolean{
    const helper = new JwtHelperService();

    //if the token is null
    if (this.token == null){
      return false;
    }
    //check if it expired
    const istoken = this.tokenservice.get('token');
    return helper.isTokenExpired(istoken);
  }
  // logout and login functions
  //logout if you are logged out you are sent to the login page again
  logout(){
    //using the service called token we unset the user and its token and redirect to the login page
    this.tokenservice.unset('user');
    this.tokenservice.unset('token');
    this.router.navigateByUrl('/login');
  }

  //login function
  //We pass the username along with the password to log in
  login(user: string, password: string){
    //if we recieve the user and the password then we first save the key with storage service
    if (user && password){
      this.tokenservice.save('user',user);
    }
    //we execute the http post to log in with the username and password and we get the token in return
    //we send in the header the type of http authentication process
    this.http.post<{ token: string }>(
      this.apiUrl+'/users/login', {},
      {
        headers: {
          Authorization: 'Basic '+ btoa(user + ':' + password)
        }
      }
    )//with subscribe, r has the token returned by the api, with it we save said token in the class parameter token
    //and also using token service we save it in the local storage, using the notice service, we show a matsnackbar
    //message saying if you have logged in or not
    //then we redirect to the chatbox
    .subscribe(
      r => {
        this.token = r.token;
        this.tokenservice.save('token',r.token);
        this.notice.show('You have logged in!');
        this.router.navigateByUrl('/chat-box')
      },
      //if an exception is raised we show an error message and catch the error
      err => {
        console.log(err);
        this.notice.show('Error, check your credentials');
      }
    );
  }

  // USER OPERATIONS

  register(user: string,password:string){
    //the register endpoint is not protected to let anyone create its user to access
    this.http.post(this.apiUrl+'/users/newuser',{
        username: user,
        password: password
    }).subscribe(
      r => {
        this.notice.show('Registration succesful!');
        this.login(user,password);
      },
      //The api doesnt let anyone to take duplicated usernames, so if there is
      //an exception it will be because the user introduced a name that was already taken
      err => {
        console.log(err);
        this.notice.show("Username taken!");
      }
    );
  }

  //get all users that are registered in the database
  getallusers(){
    return this.http.get<User[]>(this.apiUrl + '/users',
    {
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  //getting user by its id
  getuser(id: string){
    return this.http.get<User>(this.apiUrl+'/users',{
      params:{
        id: id
      },
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  //edit username
  editusername(user: User){
    return this.http.put(this.apiUrl+'/users', user,{
      headers:{
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  //edit password
  edituserpass(user: User, pass: string){
    return this.http.put(this.apiUrl+'/users/password',user,{
      params:{
        password: pass
      },
      headers:{
        'content-type': 'application/json',
        Authorization: 'Bearer ' + this.token
      }
    })
  }


}