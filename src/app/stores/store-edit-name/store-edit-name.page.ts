import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Output, EventEmitter } from '@angular/core';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-store-edit-name',
  templateUrl: './store-edit-name.page.html',
  styleUrls: ['./store-edit-name.page.scss'],
})

export class StoreEditNamePage implements OnInit {

  @Output() private event: EventEmitter<Object> = new EventEmitter<Object>();

  public params;
  storeName: string;
  public ss;
  constructor(public nav: NavController, public storage: Storage, public http: HttpClient, public router: Router) { }
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  ExhibitionId: string;
  RecordId: string;

  ngOnInit() {
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
          }
        });
    });
  }

  save() {
    this.event.emit(this.storeName);
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId]) => {
      this.params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'recordId': this.ss.RecordId,
          'setValue': {
            'StockName': this.storeName,
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/ExhibitorExhibitionInfo', this.params)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.nav.back();
          }
        }, error => {
          console.log(error);
        });
    });
  }
}
