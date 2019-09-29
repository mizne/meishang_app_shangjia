import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-goodstype',
  templateUrl: './goodstype.page.html',
  styleUrls: ['./goodstype.page.scss'],
})
export class GoodstypePage implements OnInit {
public params;
public data;
public dd;
public ss;
  constructor(private router:Router,public storage:Storage,public http:HttpClient) { }
isShow:true;
dis:true;
typeList:any;


goodsList:any;

  ngOnInit() {
    this.goods()
    this.search()
    this.type()
 
  }

  back() {
    this.router.navigateByUrl('/tabs/tab1')
  }
  certificate(){
    this.router.navigateByUrl('/tabs/store-certification')
  }
// 跳转页面详情
toDetail(i){
  this.router.navigateByUrl('/tabs/goods-detail/'+this.typeList[i].RecordId)
}

// 商品类别
cate(){
  this.router.navigateByUrl('/tabs/categories')
}

  // 查询商品
  goods(){
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
    .then(([tenantId, userId,exhibitorId,recordId]) => {
      this.params={
        "tenantId":tenantId,
        "userId":userId,
       "params":{
         "condition":{
           "ExhibitionId":recordId,
           "ExhibitorId":exhibitorId,
           SourceType:"商城",
           ProductType:"商品",
           "ProductTypeInfoId":""
         } 
       }
      }
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product',this.params).subscribe(res=>{
      if((res as any).resCode=='0'){
        this.goodsList=(res as any).result
        
      }
      })
    })
  }

  
 // 查询店铺信息
 search() {

  Promise.all([this.storage.get('ExhibitorExbihitionInfoId'),this.storage.get('MSTenantId'),this.storage.get('UserId'),this.storage.get('MSRecordId'),this.storage.get('ExhibitorId')])
  .then(([exhibitorExbihitionInfoId,tenantId,userId,recordId,exhibitorId])=>{
    console.log(recordId+"======")
    this.params = {
      "tenantId":tenantId,
      "userId":userId,
     "params":{
       "condition":{
         "ExhibitionId":recordId,
         "ExhibitorId":exhibitorId
       },
      
     }
    };
   
    this.http.post(AppComponent.apiUrl + "/v2/data/queryList/ExhibitorExhibitionInfo",this.params)
      .subscribe(res => {
        if(res){
          
          this.ss=(res as any).result[0]

        }

      });

  })

   
  }

  // 获取商品分类类别

  type(){
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
    .then(([tenantId, userId,exhibitorId,recordId]) => {
      

      this.data={
        
       "userId" : userId,
       "tenantId" : tenantId,
        "params": {
            "condition": {
                "ExhibitionId":recordId
            },
            "childObjects":[
          {
            "fieldName":"CategorySecond",
                "reference": 
                {
                  "object":"CategorySecond",
                  "field":"CategoryFirstId" }
                }
                  ]

        }
      }
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategorySecond',this.data).subscribe(res=>{
        if(res){
          let arr=res as any
          this.typeList=arr.result;
        }
      },error=>{
        
      })
    })
   
  }
  // 根据类名查商品
  
  
}
