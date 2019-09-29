import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-been-settled',
  templateUrl: './been-settled.page.html',
  styleUrls: ['./been-settled.page.scss'],
})
export class BeenSettledPage implements OnInit {
public params;
public settleArr
  constructor(public router:Router,public http: HttpClient,
    public storage: Storage) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
   this.money()
  }
back(){
  this.router.navigateByUrl('/tabs/financial-manage')
}
// 已结算
money(){
  Promise.all([
    this.storage.get("TenantId"),
    this.storage.get("UserId"),
    this.storage.get("ExhibitorId"),
    this.storage.get("RecordId")
  ]).then(([tenantId, userId, exhibitorId, recordId]) => {
   

    this.params = {
      "tenantId":tenantId,
      "userId":userId,
     "params":{
       "condition":{
         "ExhibitionId":recordId,
         "ExhibitorId":exhibitorId,
         "BallanceAccountState": false
       }
       
   }
   
    };
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order',this.params).subscribe(res=>{
    
      if( (res as any).resMsg=='success'){
      this.settleArr=(res as any).result
        
      }
    
     
    },error=>{
      
    })
  });
}



}
