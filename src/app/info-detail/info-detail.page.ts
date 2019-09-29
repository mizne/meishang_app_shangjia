import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-info-detail',
  templateUrl: './info-detail.page.html',
  styleUrls: ['./info-detail.page.scss'],
})
export class InfoDetailPage implements OnInit {
public params;

  constructor(private router:Router,public http:HttpClient,public storage:Storage) { }

  ngOnInit() {
    this.info()
  }
  back() {
    this.router.navigateByUrl('/tabs/infor')
  }
  info(){
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
    .then(([tenantId, userId,exhibitorId,recordId]) => {
    
      this.params={     
    "tenantId":tenantId,
    "userId":userId,
    "params":{
      "condition":{
      	"ExhibitionId":recordId,
      
      	"ExhibitorId":exhibitorId
      }
    }
      };
    
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/MsgInfo',this.params).subscribe(res=>{
        if((res as any).resCode=='0'){
          
          let result=res as any
        }
      
      },error=>{
        
      })
    })
  }


}
