import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-store-edit-introduce',
  templateUrl: './store-edit-introduce.page.html',
  styleUrls: ['./store-edit-introduce.page.scss'],
})
export class StoreEditIntroducePage implements OnInit {
  public params;
  public ss;
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  ExhibitionId: string;
  RecordId: string;
  storeIntroduce: string;
  constructor(public storage: Storage, public http: HttpClient, public nav: NavController) {
  }

  ngOnInit() {
    this.search();
  }

  ionViewWillEnter() {
    this.search();
  }

  back() {
    this.nav.back();
  }

  // 查询店铺信息
  search() {
    Promise.all([
      this.storage.get('ExhibitorExbihitionInfoId'),
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([exhibitorExbihitionInfoId, tenantId, userId, recordId, exhibitorId]) => {
      this.params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId
          },
        }
      };

      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', this.params)
        .subscribe(res => {
          if (res) {
            this.ss = (res as any).result[0];
            this.storeIntroduce = this.ss.StockIntroduce;
          }
        });
    });
  }

  // 修改店铺简介
  save() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.params = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.ss.RecordId,
            'setValue': {
              'StockIntroduce': this.storeIntroduce
            }

          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/ExhibitorExhibitionInfo', this.params).subscribe(res => {
          if ((res as any).resCode == 0) {
            this.nav.back();
          }
        }, error => {
          console.log(error);
        });
      });
  }
}
