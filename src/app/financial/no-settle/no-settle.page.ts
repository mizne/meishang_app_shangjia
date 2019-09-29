import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-no-settle',
  templateUrl: './no-settle.page.html',
  styleUrls: ['./no-settle.page.scss'],
})
export class NoSettlePage implements OnInit {
public params
public nosettleArr
  constructor(public router:Router,public storage:Storage,public http:HttpClient) { }

  ngOnInit() {
    this.money()

  }
back(){
  this.router.navigateByUrl('/tabs/financial-manage')
 
}

// 查询未结算
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
         "BallanceAccountState": true
       }
       
   }
   
    };
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order',this.params).subscribe(res=>{
    
      if( (res as any).resMsg=='success'){
      this.nosettleArr=(res as any).result
        
      }
    
     
    },error=>{
      
    })
  });
}


}
