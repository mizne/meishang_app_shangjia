import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-financial-manage',
  templateUrl: './financial-manage.page.html',
  styleUrls: ['./financial-manage.page.scss'],
})
export class FinancialManagePage implements OnInit {
  public params;
  public data;
  public much;
  public haveBalanceValue;
  public noBalanceValue;
  public accountAmountForGet;
  constructor(public router: Router, public http: HttpClient,
    public storage: Storage) { }

  ngOnInit() {

  }
  ionViewWillEnter() {
    this.money();
  }
  cash() {
    this.router.navigateByUrl('/tabs/withdraw');
  }
  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }
  income() {
    this.router.navigateByUrl('/tabs/income-details');
  }
  record() {
    this.router.navigateByUrl('/tabs/withdraw-record');
  }
  beSettle() {
    this.router.navigateByUrl('/tabs/been-settled');
  }
  noSettle() {
    this.router.navigateByUrl('/tabs/no-settle');
  }

  // 财务管理查询接口
  money() {
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
          'condition': {
            //  'ExhibitionId':recordId,
            'ExhibitorId': exhibitorId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CustomerAccount', this.params).subscribe(res => {
        if ((res as any).resMsg === 'success') {
          this.much = (res as any).result[0];
          this.haveBalanceValue = (res as any).result[0].HaveBalanceValue.toFixed(2);
          this.noBalanceValue = (res as any).result[0].NoBalanceValue.toFixed(2);
          this.accountAmountForGet = (res as any).result[0].AccountAmountForGet.toFixed(2);
        }
      }, error => {
      });
    });
  }






}


