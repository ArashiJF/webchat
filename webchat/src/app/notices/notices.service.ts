import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

//this implementation lets us show messages anywhere on the application
//it was taken from Aquapp too.

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(private matsnackbar: MatSnackBar) { }

  show(message: string, action: string = '', obj?: any, f?: string){
    if(f !== undefined && obj !== undefined){
      this.matsnackbar.open(message,action,{
        duration: 2000,
      }).afterDismissed().subscribe((dismiss) => {
        if(dismiss.dismissedByAction){
          obj[f]();
        }
      });
    }else{
      this.matsnackbar.open(message,action, {duration:2000});
    }
  }
}
