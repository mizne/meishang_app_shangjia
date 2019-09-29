import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.page.html',
  styleUrls: ['./product-type.page.scss'],
})
export class ProductTypePage implements OnInit {
public data2
secId:string;
  constructor(public router:Router,public storage:Storage,public http:HttpClient,public alertController: AlertController,public nav:NavController) { }

  ngOnInit() {
    console.log(this.router)
    let str=this.router.url
    this.secId=str.substring(str.length-24)
    console.log(this.secId)
  }


  ionViewWillEnter(){
   this.second()
  }

back(){
  this.nav.back()
}



  // 根据二级查一级分类
second(){
  Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
  this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
  .then(([tenantId, userId,exhibitorId,recordId]) => {
   

    this.data2={
     
    "tenantId": tenantId,
    "userId": userId,
    "params": {
        "condition": {
            "ExhibitionId": recordId,
            "recordId":  this.secId
        
            
        },
      //    "childObjects":[
      // {
      //    "fieldName":"CategorySecond",
      //        "reference":{
      //         "object":"CategorySecond",
      //         "field":"CategoryFirstId" }}
      //         ],

        properties: ["CategoryFirstId.CategoryFirst.___all"],


    }
      }
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategorySecond',this.data2).subscribe(res=>{
      if(res){
        let result=res as any
       
      }
    },error=>{
      
    })

  })
}

}
