import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from '../../app.component';
@Component({
  selector: "app-withdraw-record",
  templateUrl: "./withdraw-record.page.html",
  styleUrls: ["./withdraw-record.page.scss"]
})
export class WithdrawRecordPage implements OnInit {
  constructor(public router: Router,public storage:Storage,public http:HttpClient) {}
public params;
  ngOnInit() {}
  back() {
    this.router.navigateByUrl("/tabs/financial-manage");
  }

  
  // 查询提现记录
record(){
  Promise.all([this.storage.get('MSTenantId'),this.storage.get('UserId'),this.storage.get('ExhibitorId'),this.storage.get('MSRecordId'),this.storage.get('ExhibitorExhibitionInfoId')])
  .then(([tenantId,userId,exhibitorId,recordId,exhibitorExhibitionInfoId])=>{
    this.params={
      "tenantId":tenantId,
     "userId":userId,
     "params":{
     	"condition":{
     		"TradeType":"0表示非平台自身交易收支，1表示平台自身交易收支",
     		"ExhibitionId":exhibitorId,
     		"ExhibitorId":exhibitorId,
     		"ExhibitorExhibitionInfoId":exhibitorExhibitionInfoId
      }
    }
    }
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/BalanceAccount',this.params).subscribe(res=>{
      
      if(res){
       
      }

    })
  })
}



}
