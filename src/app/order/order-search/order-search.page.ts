import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.page.html',
  styleUrls: ['./order-search.page.scss'],
})
export class OrderSearchPage implements OnInit {
  public params;
  public data;

  TenantId: string;
  orderPrice: number;
  UserId: string;
  ExhibitorId: string;
  RecordId: string;
  goodsName: string;
  searchArr: any;
  orderArr;
  show: boolean;
  orderid: string;
  express = [{ Name: '中通' }, { Name: '圆通' }, { Name: '天天' }];
  constructor(public toast: ToastController, public router: Router,
              public alertController: AlertController, public http: HttpClient, public storage: Storage) { }

  ngOnInit() {

  }

  back() {
    this.router.navigateByUrl('/tabs/order-manage');
  }

  // 查看详情
  toDetail(id) {
    this.router.navigateByUrl('/tabs/send-goods/' + id);
  }

  // 搜索提示
  async presentToast() {
    const toast = await this.toast.create({
      message: '搜索失败,请重新输入',
      duration: 2000,
      position: 'middle',
      color: 'dark',
      cssClass: 'toast-exhibitor',
    });
    toast.present();
  }

  // 确定信息并发货
  dis() {
    this.show = !this.show;
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderid,
            'setValue': {
              'state': '202'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resMsg === 'success') {
          }
        }, error => {
        });
      });
  }

  // 发货
  send(id) {
    this.orderid = id;
    this.show = !this.show;
  }

  // 确认退款
  sure1(id) {
    this.show = !this.show;
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': id,
            'setValue': {
              'state': '303'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resMsg === 'success') {
          }
        }, error => {
        });
      });
  }

  // 修改金额
  async editMoney() {
    const alert = await this.alertController.create({
      header: '修改商品金额',
      inputs: [
        {
          name: 'name',
          type: 'number',
          placeholder: '请输入修改的金额',
          value: ''
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: '确定',
          handler: (res) => {
            this.orderPrice = Number(res.name);
            Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
            this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
              .then(([tenantId, userId, exhibitorId, recordId]) => {
                this.TenantId = tenantId;
                this.UserId = userId;
                this.ExhibitorId = exhibitorId;
                this.RecordId = recordId;
                this.params = {
                  'tenantId': this.TenantId,
                  'userId': this.UserId,
                  'params': {
                    'recordId': '5a5733f1213a078426cc7aa2',
                    'setValue': {
                      'Sum': this.orderPrice
                    }
                  }
                };

                this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.params).subscribe(res => {
                  if ((res as any).resMsg === 'success') {
                    const result = res as any;
                  }
                }, error => {
                });
              });
          }
        }
      ]
    });
    await alert.present();
  }

  // 搜索订单号
  search() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              'RecordId': this.goodsName,
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
            this.orderArr = (res as any).result;
          } else {
            this.presentToast();
          }
        }, error => {
        });
      });
  }

  // 查看评价
  view(id) {
    this.router.navigateByUrl('/tabs/goods-evaluate-edit/' + id);
  }

  selldetail(id) {
    this.router.navigateByUrl('/tabs/after-sell-detail/' + id);
  }

  // 查看物流
  logistic(id) {
    this.router.navigateByUrl('/tabs/logistics-info/' + id);
  }
}
