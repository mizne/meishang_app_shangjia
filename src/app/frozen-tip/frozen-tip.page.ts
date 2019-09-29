import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-frozen-tip',
  templateUrl: './frozen-tip.page.html',
  styleUrls: ['./frozen-tip.page.scss'],
})
export class FrozenTipPage implements OnInit {

  constructor(private router: Router, private http: HttpClient,
              public storage: Storage, public nav: NavController, public toast: ToastController) { }

  ngOnInit() {
    this.search();
  }

  refreshStatus() {
    this.search();
  }

  // 查询店铺审核状态
  search() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      const params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId
          },
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', params)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            if ((res as any).result[0].HasFreeZe === false) {
              this.nav.back();
            } else {
              this.msgTip('您的商铺已被冻结');
            }
          }
        });
    });
  }

  // 信息不能为空提示
  async msgTip(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }
}
