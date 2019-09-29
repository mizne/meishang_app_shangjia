import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-add-goods',
  templateUrl: './add-goods.page.html',
  styleUrls: ['./add-goods.page.scss'],
})
export class AddGoodsPage implements OnInit {
  public data2;
  public allList;
  ticketID: string;
  public pro;
  public pr;
  public result;
  // imgSrc='https://img3.imgtn.bdimg.com/it/u=1617048790,3246657087&fm=26&gp=0.jpg'
  imgSrc = 'https://img2.imgtn.bdimg.com/it/u=2021196284,732698940&fm=26&gp=0.jpg';

  constructor(public nav: NavController, public router: Router, public storage: Storage,
    public http: HttpClient, public toast: ToastController) { }

  ngOnInit() {
    const str = this.router.url;
    this.ticketID = str.substring(str.length - 24);
  }

  back() {
    this.router.navigateByUrl('/tabs/marketing-activity');
  }

  ionViewWillEnter() {
    this.all();
  }

  // 复选框的状态添加事件
  change(e, id) {
    if (e.detail.checked === true) {
      Promise.all([
        this.storage.get('MSTenantId'),
        this.storage.get('UserId'),
        this.storage.get('ExhibitorId'),
        this.storage.get('MSRecordId'),
        this.storage.get('ExhibitorExhibitionInfoId'),
        this.storage.get('token')])
        .then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId, token]) => {
          this.pro = {
            'tenantId': tenantId,
            'userId': userId,
            'params': [{
              'recordId': id,
              'setValue': {
                PromotionId: this.ticketID
              }
            }]
          };
          this.http.post(AppComponent.apiUrl + '/v2/data/updateList/Product', this.pro,
            { headers: { Authorization: 'Bearer' + ' ' + token } })
            .subscribe(res => {
              if (res) {
                this.result = (res as any);
              }
            }, error => {
            });
        });
    } else {
      Promise.all([
        this.storage.get('MSTenantId'),
        this.storage.get('UserId'),
        this.storage.get('ExhibitorId'),
        this.storage.get('MSRecordId'),
        this.storage.get('ExhibitorExhibitionInfoId'),
        this.storage.get('token')])
        .then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId, token]) => {
          this.pr = {
            'tenantId': tenantId,
            'userId': userId,
            'params': [{
              'recordId': id,
              'setValue': {
                PromotionId: ''
              }
            }]
          };
          this.http.post(AppComponent.apiUrl + '/v2/data/updateList/Product', this.pr,
            { headers: { Authorization: 'Bearer' + ' ' + token } })
            .subscribe(res => {
              if (res) {
              }
            }, error => {
            });
        });
    }
  }

  // 输入验证码错误提示
  async addtip(msg, sec) {
    const toast = await this.toast.create({
      message: msg,
      duration: sec,
      position: 'top',
      color: 'dark',
      // cssClass: 'toast-wrapper',
      cssClass: 'login',
    });
    toast.present();
  }

  // 获取商品all的列表
  all() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data2 = {
          'userId': userId,
          'tenantId': tenantId,
          'params': {
            'condition': {
              SourceType: '商城',
              ProductType: '商品',
              ExhibitionId: recordId,
              IsRecycled: false
            },
            // 'pageIndex':1,'pageSize':10
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product', this.data2)
          .subscribe(res => {
            if (res) {
              const result = res as any;
              this.allList = result.result;
            }
          }, error => {
          });
      });
  }

  ad() {
    if (this.result) {
      this.addtip('添加成功', 2000);
      this.nav.back();
    } else if (this.result === undefined) {
      this.addtip('请添加商品', 2000);
    }
  }
}
