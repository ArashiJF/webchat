import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { AuthGuardService } from './authguard/auth-guard.service';

const routes: Routes = 
[
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' 
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Log in webchat!'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {title: 'Register in webchat!'}
  },
  {
    path: 'chat-box',
    component: ChatboxComponent,
    canActivate: [AuthGuardService],
    data: {title: 'Welcome Back!'}
  },
  { path:'**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
