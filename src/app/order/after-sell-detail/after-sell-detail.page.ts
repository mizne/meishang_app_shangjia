import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-after-sell-detail',
  templateUrl: './after-sell-detail.page.html',
  styleUrls: ['./after-sell-detail.page.scss'],
})
export class AfterSellDetailPage implements OnInit {
  public params;
  public data;
  public aa;
  orderId: string;
  public serviceType;
  public serviceReason;
  public serviceContent;
  constructor(public router: Router, public _d: DomSanitizer,
              public http: HttpClient, public storage: Storage, public nav: NavController) { }

  ngOnInit() {
    const str = this.router.url;
    this.orderId = str.substring(str.length - 24);
    this.querySaleDetail();
  }

  ionViewWillEnter() {
    this.querySaleDetail();
  }

  back() {
    this.nav.back();
  }

  // 同意请求
  agree() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderId,
            'setValue': {
              'Reason': '没有',
              'IsApprove': true
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/SalesServiceRecord', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
            this.nav.back();
          }
        }, error => {
        });
      });
  }

  // 不同意选择
  disagree() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderId,
            'setValue': {
              'Reason': '蒜泥赢',
              'IsApprove': false
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/SalesServiceRecord', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
            this.nav.back();
          }
        }, error => {
        });
      });
  }

  // 查询售后详情
  querySaleDetail() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId')
    ]).then(([tenantId, userId]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            OrderId: this.orderId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/SalesServiceRecord', requestData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.serviceType = (res as any).result[0].Name;
            this.serviceReason = (res as any).result[0].Reason;
            this.serviceContent = (res as any).result[0].Content;
          }
        }, error => {
        });
    });
  }
}
