import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-store-pay',
  templateUrl: './store-pay.page.html',
  styleUrls: ['./store-pay.page.scss'],
})
export class StorePayPage implements OnInit {
public params
public data
alipay:string;
accountName:string;
TenantId:string;
  UserId:string;
  ExhibitorId:string;
  ExhibitionId:string;
  RecordId:string;
  public ali
  constructor(public router:Router,public storage:Storage,public http:HttpClient,public toast:ToastController,public nav:NavController) { }

  ngOnInit() {
    
  }
  back(){
    this.nav.back()
  }
  ionViewWillEnter(){
   this.chat()
  }


  // 如果不存在调用新增接口
  done(){


    let testphone = this.alipay;
    // var testpattern1 = (/^[1][3458][012356789][0-9]+$/).test(testphone);
    
    var testpattern1 = (/^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/).test(testphone);

    if(testpattern1){
      Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),this.storage.get('MSRecordId'),this.storage.get( "ExhibitorExhibitionInfoId")])
      .then(([tenantId, userId,exhibitorId,recordId,exhibitorExhibitionInfoId]) => {
        this.TenantId=tenantId
        this.UserId= userId
        this.ExhibitorId=exhibitorId
        this.RecordId=recordId
        this.params={
          "tenantId":this.TenantId,
          "userId":this.UserId,
         "params":{
                 "record":{
                     "Name" : "支付宝信息",
                      "PayAccount" : this.alipay,
                      "PayAccountName" : this.accountName,
                      "ExhibitionId" : this.RecordId,
                      "ExhibitorId" : this.ExhibitorId,
                      "ExhibitorExhibitionInfoId":exhibitorExhibitionInfoId
          
                 }
         } 
        
        }
        this.http.post(AppComponent.apiUrl + '/v2/data/insert/AliPayInfo',this.params).subscribe(res=>{
          if((res as any).resCode==0){
            this.tips('添加成功',1000)
          this.nav.back()
          }
        },error=>{
          console.log(error)
        })
      })
    }else{
    
      this.tips('请输入合法账号',1000)
      
    }

    
    
  }

  // 如果存在调用修改接口
edit(){
  let testphone = this.alipay;
  // var testpattern1 = (/^[1][3458][012356789][0-9]+$/).test(testphone);
  
  var testpattern1 = (/^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/).test(testphone);


  if(testpattern1){
    
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId'),this.storage.get( "ExhibitorExhibitionInfoId")])
    .then(([tenantId, userId,exhibitorId,recordId,exhibitorExhibitionInfoId]) => {
     
      this.params={
        "tenantId":tenantId,
        "userId":userId,
       "params":{
        "recordId": this.ali.RecordId,
       
  
               "setValue":{
                   "Name" : "支付宝信息",
                    "PayAccount" : this.alipay,
                    "PayAccountName" : this.accountName,
                    
               }
       } 
      }
      this.http.post(AppComponent.apiUrl + '/v2/data/update/AliPayInfo',this.params).subscribe(res=>{
        if((res as any).resCode==0){
          this.tips('修改成功',1000)
          this.nav.back()
        }else{
          this.tips('修改失败',1000)
        }
      },error=>{
        console.log(error)
      })
    })
  
  }else{

    this.tips('请输入合法账号',1000)
   
  }
  
}




  // 先查询是否绑定支付宝
  chat(){
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId'),this.storage.get( "ExhibitorExhibitionInfoId")])
    .then(([tenantId, userId,exhibitorId,recordId,exhibitorExhibitionInfoId]) => {
     
      this.data={
       "tenantId":tenantId,
       "userId":userId,
       "params":
       {
         "condition":{
           "ExhibitionId":recordId
          }
        }
      }
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/AliPayInfo',this.data).subscribe(res=>{
        if((res as any).resCode==0){
          this.ali=(res as any).result[0]
        }
      },error=>{
        console.log(error)
      })
    })
  }


  // 信息不能为空提示
async tips(msg,sec) {
  const toast = await this.toast.create({
  message: msg,
  duration: sec,
  position: 'top',
 
  color:'dark',
  cssClass: 'msg-tip',
  });
  toast.present();
  }
}
