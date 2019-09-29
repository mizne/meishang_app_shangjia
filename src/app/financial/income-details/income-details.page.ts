import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-income-details',
  templateUrl: './income-details.page.html',
  styleUrls: ['./income-details.page.scss'],
})
export class IncomeDetailsPage implements OnInit {
public params
public incomeArr
  constructor(public router:Router,public storage:Storage,public http:HttpClient,public nav:NavController) { }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.income()
  }
  back(){
    this.nav.back()
  }

  income(){
    Promise.all([this.storage.get('MSTenantId'),this.storage.get('UserId'),this.storage.get('ExhibitorId'),this.storage.get('MSRecordId'),this.storage.get('ExhibitorExhibitionInfoId')])
    .then(([tenantId,userId,exhibitorId,recordId,exhibitorExhibitionInfoId])=>{
      this.params={
        "tenantId":tenantId,
        "userId":userId,
        "params":{
          "condition":{
            "ExhibitionId":recordId,
            "ExhibitorId":exhibitorId,
            "ExhibitorExhibitionInfoId":exhibitorExhibitionInfoId
         },
         "properties": [
                 "CustomerAccountId.CustomerAccount.___all",
                 "OrderNumber.Order.___all",
                 "TradeRecordId.TradeRecords.___all"
          ]
       }
      }
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ReceiptsAndPaymentsDetail',this.params).subscribe(res=>{
      if((res as any).resCode==0){
        this.incomeArr=(res as any).result
      }
      })
    })
  }
}
