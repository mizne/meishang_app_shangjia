import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.page.html',
  styleUrls: ['./store-login.page.scss'],
})
export class StoreLoginPage implements OnInit {
  public params
  constructor(public router:Router,public storage:Storage,public http:HttpClient) { }

  ngOnInit() {
  }
  back(){
    this.router.navigateByUrl('/tabs/tab1')
  }
  storeInfo(){
    this.router.navigateByUrl('/tabs/store-info')
  }

  
  done(){
    this.params={

    }
    this.http.post('',this.params).subscribe(
      res => {},
      error => {
        console.log(error);
      }
      );
  }
}
