import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.page.html',
  styleUrls: ['./store-card.page.scss'],
})
export class StoreCardPage implements OnInit {
  tenantId:string;
  userId:string;
  exhibitorId:string;
  recordId:string;
  public params
  constructor(public router:Router,public storage:Storage) { }

  ngOnInit() {
    Promise.all([this.storage.get('MSTenantId'),this.storage.get('UserId'),
    this.storage.get('MSRecordId'),this.storage.get('EXhibitorId')]).then(([a,b,c,d])=>{
        this.tenantId=a,
        this.userId=b;
        this.recordId=c;
        this.exhibitorId=d;
    })
  }
  back(){
    this.router.navigateByUrl('/tabs/store-info')
  }

  card(){
    this.params={
      "tenantId":this.tenantId,
      "userId":this.userId,
     "params":{
             "record":{
                 "Name" : "银行账号信息",
                 "BankName":"南京银行",
                  "BankPayAccount" : "333",
                  "BankPayAccountName" : "luqing",
                  "ExhibitionId" : this.recordId,
                  "ExhibitorId" : this.recordId,
                  "ExhibitorExhibitionInfoId":""
               
             }
         
     }
    }
  }
}
