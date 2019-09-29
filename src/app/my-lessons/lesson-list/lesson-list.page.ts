import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.page.html',
  styleUrls: ['./lesson-list.page.scss'],
})
export class LessonListPage implements OnInit {

public sj;
public data2;
allList:any

imgSrc="https://img2.imgtn.bdimg.com/it/u=2021196284,732698940&fm=26&gp=0.jpg";

  constructor(public router:Router,public storage:Storage,public http:HttpClient,public alertController: AlertController,public modalController:ModalController) { }
  ngOnInit() {
  }

  ionViewWillEnter(){
    this.all()
  }


  

  back() {
    this.router.navigateByUrl('/tabs/tab1')
  }

release(){

  this.router.navigateByUrl('/tabs/add-teaching-new')
 
}






//  跳转到商品分类
pro(id){
  this.router.navigateByUrl('/product-type/'+id)
}


// 删除提示
 async alertdelete() {
  const alert = await this.alertController.create({
    header: '删除提示',
   
    message: '删除成功',
    buttons: ['确定']
  });

  await alert.present();
  
}


// 获取教程的列表
all(){
  Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
  this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
  .then(([tenantId, userId,exhibitorId,recordId]) => {
  
    this.data2={
     
      "tenantId":tenantId,
      "userId":userId,
     "params":{
       "condition":{
         "ExhibitionId":recordId,
         "ProductType":"课程",
         "sourceType":"商城"
         
       }
     }
      }
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ProductItem',this.data2).subscribe(res=>{
      if(res){
        let result=res as any
        this.allList=result.result
      }
    },error=>{
    })

  })
}





// 删除商品
delete(index){
   Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),this.storage.get("token"),
  this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
  .then(([tenantId, userId,token,exhibitorId,recordId]) => {
  
    
    this.sj={

      "tenantId":tenantId,
      "userId":userId,
      "params":{
        "recordId":index,
          "setValue":{
              "IsShow" :false,
              "IsRecycled":true
          }
      }
    };
    console.log(index)
  
    this.http.post(AppComponent.apiUrl + '/v2/data/update/Product',this.sj).subscribe(res=>{
      let result=res as any
    if((res as any).resCode==0){
     this.all()
    
      this.alertdelete()

     
    }
    },error=>{
      
    })
  })
}



}
