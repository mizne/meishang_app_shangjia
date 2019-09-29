import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: "app-store-wx",
  templateUrl: "./store-wx.page.html",
  styleUrls: ["./store-wx.page.scss"]
})
export class StoreWxPage implements OnInit {
  constructor(public router: Router,public storage:Storage,public http:HttpClient) {}
  TenantId:string;
  UserId:string;
  ExhibitorId:string;
  ExhibitionId:string;
  RecordId:string;
  private params
  ngOnInit() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'),this.storage.get('MSRecordId')])
    .then(([tenantId, userId,exhibitorId,recordId]) => {
      this.TenantId=tenantId
      this.UserId= userId
      this.ExhibitorId=exhibitorId
      this.RecordId=recordId
    })
  }
  back() {
    this.router.navigateByUrl("/tabs/store-info");
  }
  
}
