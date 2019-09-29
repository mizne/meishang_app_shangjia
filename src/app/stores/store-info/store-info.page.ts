import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.page.html',
  styleUrls: ['./store-info.page.scss'],
})
export class StoreInfoPage implements OnInit {
  TenantId:string;
  UserId:string;
  ExhibitorId:string;
  ExhibitionId:string;
  RecordId:string;
  private params;
  wxAccount:string;
  aliAccount:string;
  constructor(public router:Router,public storage:Storage,public http:HttpClient) { }

  ngOnInit() {
   this.save()
  }
  back(){
    this.router.navigateByUrl('/tabs/store-management')
  }
  storeCard(){
    this.router.navigateByUrl('/tabs/store-card')
  }
  storeWx(){
    this.router.navigateByUrl('/tabs/store-wx')
  }
  storePay(){
    this.router.navigateByUrl('/tabs/store-pay')
  }

  save(){
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
    .then(([tenantId, userId,exhibitorId,recordId]) => {
      this.TenantId=tenantId
      this.UserId= userId
      this.ExhibitorId=exhibitorId
      this.RecordId=recordId

      this.params={
        "tenantId":this.TenantId,
        "userId":this.UserId,
       "params":{
         
              "condition":{
                
              },
               "setValue":{
                   "AliPayInfoId" : "",
                    "WeCahtINfoId" : ""
                 
               }
           
       }
      }
      this.http.post(AppComponent.apiUrl + '/v2/data/update/ExhibitorExhibitionInfo',this.params).subscribe(res=>{
      
      },error=>{
        console.log(error)
      })
    })
   
  }
}
