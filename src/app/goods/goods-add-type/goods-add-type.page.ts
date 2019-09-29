import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-goods-add-type',
  templateUrl: './goods-add-type.page.html',
  styleUrls: ['./goods-add-type.page.scss'],
})
export class GoodsAddTypePage implements OnInit {
  public params;
  public data;
  TenantId:string;
UserId:string;
ExhibitorId:string;
RecordId:string;
typeName:string;

  constructor(public router:Router,public http:HttpClient,public storage:Storage,public nav:NavController) {
    
   }
  

  ngOnInit() {
   
  }
  back() {
    this.nav.back()
  }

// 添加分类
  save(){
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
    .then(([tenantId, userId,exhibitorId,recordId]) => {
      this.TenantId=tenantId
      this.UserId= userId
      this.ExhibitorId=exhibitorId
      this.RecordId=recordId

      
      this.params={
       
          "userId" : this.UserId,
          "tenantId" : this.TenantId,
          "params": {
          "record":{
                    "Name" : this.typeName,
           "ExhibitionId" :this.RecordId,
          
            }  
        }
      };
    
      this.http.post(AppComponent.apiUrl + '/v2/data/insert/CategorySecond',this.params).subscribe(res=>{
        
        let rr=res as any
        if(rr.resMsg=="success"){
         this.nav.back()
         
        }
      },error=>{
  
      })
    })
   
  }
}
