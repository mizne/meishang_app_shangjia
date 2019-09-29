import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Storage } from "@ionic/storage";
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: "app-goods-evaluate-edit",
  templateUrl: "./goods-evaluate-edit.page.html",
  styleUrls: ["./goods-evaluate-edit.page.scss"]
})
export class GoodsEvaluateEditPage implements OnInit {
  dis: boolean;
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  RecordId: string;
  public params;
  public params1;
  public data;
  public params2;
  public chatArr;
  goodsID:string;
  goodsList:[]=[]
  public messageGoods
  replyMsg:string;
  isreply:boolean
  isShow:boolean;
  msgId:string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public storage: Storage,
    public nav:NavController,
    public toast:ToastController
  ) {
  
   this.replyMsg=''
  }


  ngOnInit() {
   
    console.log(this.router)
    let str=this.router.url
    this.goodsID=str.substring(str.length-24)
    console.log(this.goodsID)
   
  }

ionViewWillEnter(){
  this.detail()
 
}
blurInput(){
  // this.isreply=!this.isreply
  

}

  op() {
    this.dis = !this.dis;
  }
  back() {
    this.nav.back()
  }

  // 提示
async leave(msg,sec){
  const toast = await this.toast.create({
    message: msg,
    duration: sec,
    position: 'top',
   
    color:'dark',
    cssClass: 'msg-tip',
    });
    toast.present();
}


// 查询留言
detail(){
  Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
  this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
  .then(([tenantId, userId,exhibitorId,recordId]) => {
  
    this.data={
    	"tenantId":"a5758e24357d7ada5edca6c496563ba9",
	"userId":"5c862e0e76afe0fb6a1ba544",
	"params":{
		"condition":{
			"ExhibitionId":"5ca5c21285492e6834bb2880",
			"ExhibitorId":"5ca56ff39326a61cfe3c9f6a",
			"ProductId":"5cbff89dd645ee66b22478ce"
		},
		"options":{
			"pageIndex":1,"pageSize":10
			
		},
		"properties":[
			"ProductId.Product.___all",
			"ExhibitorExhibitionInfoId.ExhibitorExhibitionInfo.___all"
		],
		"childObjects":[
			{
				"fieldName":"VisitInfoMessageComment",
				"reference":{
					"object":"VisitInfoMessageComment",
					"field":"ProductVisitInfoMessageId"
				}
			}
		]
	}
      
    };
  
    this.http.post('https://api.baizhanke.com/v2/data/queryList/ProductVisitInfoMessage',this.data).subscribe(res=>{
      if((res as any).resCode==0){
        this.messageGoods=(res as any).result
       
      }
     
    },error=>{

    })
  })
 
}


// 删除留言
  deleteMsg(id){
    Promise.all([
      this.storage.get("TenantId"),
      this.storage.get("UserId"),
      this.storage.get("ExhibitorId"),
      this.storage.get("RecordId"),
      this.storage.get('token')
    ]).then(([tenantId, userId, exhibitorId, recordId,token]) => {
      
      this.params={
       
        "tenantId":"a5758e24357d7ada5edca6c496563ba9",
        "userId":userId,
        "params": [
          {
            "recordId":id
          }
        ]
      };
      
      this.http.post('https://api.baizhanke.com/v2/data/deleteList/ProductVisitInfoMessage',this.params,{headers:{Authorization: 'Bearer'+' '+ token}}).subscribe(res=>{
       if((res as any).resCode==0){
         this.leave('删除成功',2000)
         this.detail()
       }
      
      },error=>{
      
      })
    });
   

  }
// 显示留言输入框兵获取留言Id
  editMsg(i){
    this.isreply=!this.isreply
    this.msgId=i
    
    console.log("========"+this.msgId)
   
  }
// 回复留言
  se(){
    if(this.replyMsg==''){
      this.leave('回复不能为空',2000)
      
      
    }else{
    console.log('03213')
    Promise.all([
      this.storage.get("TenantId"),
      this.storage.get("UserId"),
      this.storage.get("ExhibitorId"),
      this.storage.get("RecordId"),
      this.storage.get('token')

    ]).then(([tenantId, userId, exhibitorId, recordId,token]) => {

      this.params1={
       
        "tenantId":"a5758e24357d7ada5edca6c496563ba9",
        "userId":"5c862e0e76afe0fb6a1ba544",
        "params":{
          "record":{
            "ExhibitionId":"5ca5c21285492e6834bb2880",
            "ExhibitorId":"5ca56ff39326a61cfe3c9f6a",
            "ExhibitorExhibitionInfoId":"5ca5c40985492e6834bb28a6",
            "ProductId":"5cbff89dd645ee66b22478ce",
            "VisitorId":"5c862e0f76afe0fb6a1ba545",
            IsExhibitorReply:"1",
            "ProductVisitInfoMessageId":this.msgId,
            "Logo":"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKT7Exm9wh9wsZCJ9EA1ouicOJeqRib6Yfm2kc3YgtJNSiaswtPqWH46j7YfJKBxdckOjZgwugeoPjLQ/132",
            "Name":"null",
            "Content":this.replyMsg
          }
        }
      };
    console.log(this.msgId)
      this.http.post('https://api.baizhanke.com/v2/data/insert/VisitInfoMessageComment',this.params1,{headers:{Authorization: 'Bearer'+' '+ token}}).subscribe(res=>{
        if((res as any).resCode==0){

  this.isreply=!this.isreply
     
          this.replyMsg=''
          // 回复之后刷新留言,重掉接口
          this.detail()
          
  
        }
       
      },error=>{
  
      })
    });

   }
  }
  
 
}
