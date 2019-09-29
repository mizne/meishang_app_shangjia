import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-goods-search',
  templateUrl: './goods-search.page.html',
  styleUrls: ['./goods-search.page.scss'],
})
export class GoodsSearchPage implements OnInit {
  public params;
  imgSrc="https://img3.imgtn.bdimg.com/it/u=1617048790,3246657087&fm=26&gp=0.jpg";
  TenantId:string;
  UserId:string;
  ExhibitorId:string;
  RecordId:string;
  goodsName:string;
  searchArr:any;
  public shu;
  public shuju
  public sj;
  constructor(public router:Router,public http:HttpClient,public storage:Storage,public alertController:AlertController,public toast:ToastController) { }

  ngOnInit() {
   
  }

  ionViewWillEnter(){

  }
  back() {
    this.router.navigateByUrl('/tabs/goods-manage')
  }
  goDetail(id){
    this.router.navigateByUrl('/tabs/goods-detail/'+id)

  }
  // 封装提示函数
  async pack(msg,sec) {
    const toast = await this.toast.create({
      message:msg,
      duration: sec,
      position: 'middle',

      color: 'dark',
      cssClass: 'toast-exhibitor',
    });
    toast.present();
  }


  // 查看评价
  view(id){
    this.router.navigateByUrl('/tabs/goods-evaluate-edit/'+id)
  }
  

// 下架提示
  async alert() {
    const alert = await this.alertController.create({
      header: '下架提示',
     
      message: '下架成功',
      buttons: ['确定']
    });
  
    await alert.present();
  }
// 上架提示
async alertup() {
  const alert = await this.alertController.create({
    header: '上架提示',
   
    message: '上架成功',
    buttons: ['确定']
  });

  await alert.present();
}
// 上架提示
async alertdelete() {
  const alert = await this.alertController.create({
    header: '删除提示',
   
    message: '删除成功',
    buttons: ['确定']
  });

  await alert.present();
}



  // 商品搜索
  search(){
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
        "params":{
          "condition":{
            "IsRecycled":false,
            "ExhibitionId":this.RecordId,
            "$or": [{
              "productTitle": "/"+this.goodsName+"/"}
    
              ]
          }
          
        }
      };
    
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product',this.params).subscribe(res=>{
        if((res as any).resMsg=='success'){
          let result=res as any
          
          this.searchArr=result.result
        }else{
          this.pack('没有搜到此商品,请重新输入',2000)
        }
    
      },error=>{
        
      })
    })
    

  }

  
// 上架商品
up(index){
  Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
  this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
  .then(([tenantId, userId,exhibitorId,recordId]) => {
    this.TenantId=tenantId
    this.UserId= userId
    this.ExhibitorId=exhibitorId
    this.RecordId=recordId
   
    this.shu={
      "tenantId":this.TenantId,
      "userId":this.UserId,
      "params":{
        "recordId":index,
          "setValue":{
              "IsShow" :true
          }
          
      }
    };
  
    this.http.post(AppComponent.apiUrl + '/v2/data/update/Product',this.shu).subscribe(res=>{
      if(res){
        this.alertup()

      }
      
    },error=>{
      
    })
  })
}
// 下架商品
down(index){
  Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'), this.storage.get("Token"),
  this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
  .then(([tenantId, userId,exhibitorId,recordId,token]) => {
    this.TenantId=tenantId
    this.UserId= userId
    this.ExhibitorId=exhibitorId
    this.RecordId=recordId
    

    this.shuju={
      "tenantId":this.TenantId,
      "userId":this.UserId,
      "params":{
        "recordId":index,
          "setValue":{
              "IsShow" :false
          }
          
      }
    };
  
    this.http.post(AppComponent.apiUrl + '/v2/data/update/Product',this.shuju).subscribe(res=>{
      if((res as any).resMsg=='success'){
        let result=res as any
        this.alert()
        
        
      }
     
     
    },error=>{
      
    })
  })
}
// 删除商品
delete(index){

   Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),this.storage.get("Token"),
  this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
  .then(([tenantId, userId,exhibitorId,recordId,token]) => {
    this.TenantId=tenantId
    this.UserId= userId
    this.ExhibitorId=exhibitorId
    this.RecordId=recordId
  
   
    this.sj={
      "tenantId":this.TenantId,
      "userId":this.UserId,
      "params":{
        "recordId":index,
          "setValue":{
              "IsShow" :false,
              "IsRecycled":true
          }
      }
    };
  
    this.http.post(AppComponent.apiUrl + '/v2/data/update/Product',this.sj).subscribe(res=>{
      if((res as any).resCode==0){
        this.alertdelete()
        this.search()
      }
     
    },error=>{
      
    })
  })
}

}
