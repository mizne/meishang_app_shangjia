import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-marketing-activity',
  templateUrl: './marketing-activity.page.html',
  styleUrls: ['./marketing-activity.page.scss'],
})
export class MarketingActivityPage implements OnInit {
  public params;
  public arr;
  constructor(public router: Router, public storage: Storage, public http: HttpClient) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }
  ionViewWillEnter() {
    this.discount();
  }

  // 跳转添加商品优惠
  choice(id) {
    this.router.navigateByUrl('tabs/add-goods/' + id);
  }

  // 获取优惠券
  discount() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId')
    ]).then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId]) => {
      this.params = {
        tenantId: tenantId,
        userId: userId,
        params: {
          record: {
            ExhibitionId: recordId,
            ExhibitorId: exhibitorId,
            ExhibitorExhibitionInfoId: exhibitorExhibitionInfoId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Promotion', this.params)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.arr = (res as any).result;
          }
        });
    });
  }
}
