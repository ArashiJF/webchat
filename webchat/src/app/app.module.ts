import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { 
  MatButtonModule, 
  MatSidenavModule, 
  MatCardModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatSortModule, 
  MatSnackBarModule, 
  MatTooltipModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatService } from './chat/chat.service';
import { LogoutComponent } from './logout/logout.component';
import { EditusernameComponent } from './editusername/editusername.component';
import { PassComponent } from './pass/pass.component';
import { GroupchatComponent } from './groupchat/groupchat.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    LogoutComponent,
    EditusernameComponent,
    PassComponent,
    GroupchatComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
