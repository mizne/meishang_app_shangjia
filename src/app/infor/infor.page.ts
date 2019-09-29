import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-infor',
  templateUrl: './infor.page.html',
  styleUrls: ['./infor.page.scss'],
})
export class InforPage implements OnInit {
  public titleList;
  public clickActive;

  public storeMsgList;
  public systemMsgList;
  constructor(private router: Router, private http: HttpClient, public storage: Storage) { }

  ngOnInit() {
    this.titleList = [
      { id: 0, name: '系统消息' }, { id: 1, name: '店铺消息' }
    ];
  }

  ionViewWillEnter() {
    this.clickActive = 0;
    this.systemMsg();
  }

  changeContent(i) {
    this.clickActive = i;
    if (this.clickActive === 0) {
      this.systemMsg();
    } else if (this.clickActive === 1) {
      this.storeMsg();
    }
  }

  // 用户消息
  storeMsg() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId')
    ]).then(([tenantId, userId, exhibitionId, exhibitorExhibitionInfoId]) => {
      const queryOrderData = {
        userId,
        tenantId,
        params: {
          condition: {
            ExhibitionId: exhibitionId,
            Storeeceiver: exhibitorExhibitionInfoId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/MsgInfo', queryOrderData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.storeMsgList = (res as any).result;
          }
        });
    });
  }

  // 系统消息
  systemMsg() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId]) => {
      const data = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId,
            'SysSender': 'sys',
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/MsgInfo', data)
        .subscribe(res => {
          // this.user = (res as any).result;
        });
    });
  }

  goToStoreMsg(id) {
    this.router.navigateByUrl('/tabs/help-serve/' + id);
  }

  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }
}
