import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { AppComponent } from '../../app.component';

@Injectable()

export class PasswordService {
  private passwordUrl =  AppComponent.apiUrl + "/v2/data/Login";
 
  public params;
  constructor(private http: HttpClient ) {
   
  }
  ngOnInt(){
    this.getProducts();
  }

  getProducts() {
    this.params = {
      "params":{
        "Type":"1",
       
         "Phone":"13951804091",
         "LoginType":"手机号码登录"
      }
    };
    console.log("========post====banner===");

    this.http
      .post(
        AppComponent.apiUrl + "/v2/data/Login",
        this.params
      )
      .subscribe(res => {
        console.log(res);
      });
  }
}
