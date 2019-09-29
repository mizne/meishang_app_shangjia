import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-goods-edit-type',
  templateUrl: './goods-edit-type.page.html',
  styleUrls: ['./goods-edit-type.page.scss'],
})
export class GoodsEditTypePage implements OnInit {
  public params;
  public data;
  TenantId:string;
  UserId:string;
  ExhibitorId:string;
  RecordId:string;
  rec:string;
  name:string;
  goodsID:string;
  typeName=[];
  constructor(public router:Router,public http:HttpClient,public storage:Storage,public nav:NavController) { }

  ngOnInit() {
    this.done()
    let str=this.router.url
    this.goodsID=str.substring(str.length-24)
    console.log(this.goodsID)
  }
  go(){
    // this.router.navigateByUrl('/tabs/goods-detail/'+this.goodsID)
    this.nav.back()
  }

  // 修改完成返回上级
  well(){
    this.router.navigateByUrl('/tabs/goods-detail/'+this.goodsID)
  }
  // 修改分类
choice(index){
  
  this.name=this.typeName[index].Name
  this.rec=this.typeName[index].RecordId
 
  Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
    .then(([tenantId, userId,exhibitorId,recordId]) => {
      this.TenantId=tenantId
      this.UserId= userId
      this.ExhibitorId=exhibitorId
      this.RecordId=recordId

      this.data={
        
    "tenantId":this.TenantId,
    "userId":this.UserId,
      "params":{
        "recordId":this.rec,
          "setValue":{
              "Name" :this.name
          }
          
      }
      }
      this.http.post(AppComponent.apiUrl + '/v2/data/update/CategorySecond',this.data).subscribe(res=>{
        if(res&&(res as any).result.length>0){
         
          
        }
      },error=>{
  
      })
    })
  

}
// 获取二级商品分类
  done(){
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
            "condition": {
                "ExhibitionId":this.RecordId
            },
            "childObjects":[
          {
            "fieldName":"CategorySecond",
                "reference":{
                  "object":"CategorySecond",
                  "field":"CategoryFirstId" }}
                  ]
        
        }
      };
    
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategorySecond',this.params).subscribe(res=>{
        if(res&&(res as any).result.length>0){
         
          let result=(res as any).result
          this.typeName=result;
          
        }
        
       
      },error=>{
  
      })
      
    })
    
  }
}

