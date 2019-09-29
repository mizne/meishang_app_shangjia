import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { MatDividerModule } from '@angular/material';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.page.html',
  styleUrls: ['./order-manage.page.scss'],
})
export class OrderManagePage implements OnInit {
  orderPrice: number;
  public params;
  public data;
  public sj;
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  RecordId: string;
  goodsName: string;
  orderType: '待付款';
  orderArr: any;
  show: boolean;
  CategoriesFirstList;
  orderid: string;
  public activeStyle;
  public OrderList;
  public actionRefuseList;
  public actionRefuseObj;
  express = [{ Name: '中通' }, { Name: '圆通' }, { Name: '天天' }];
  constructor(
    public toastController: ToastController,
    public router: Router,
    public http: HttpClient,
    public storage: Storage,
    public alertController: AlertController,
    public nav: NavController,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    // this.order();
    this.actionRefuseObj = {};
    this.actionRefuseList = [];
    this.getOrderList();
  }

  ionViewWillEnter() {
    this.actionRefuseObj = {};
    this.actionRefuseList = [];
    this.getOrderList();
  }

  dis() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderid,
            'setValue': {
              'IsPostSale': true,
              'state': '202'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
            this.order();
          }
        }, error => {
        });
      });
    this.show = !this.show;
  }
  sendCancel() {
    this.show = !this.show;
  }
  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }
  //
  toSearch() {
    this.router.navigateByUrl('/tabs/order-search');
  }
  // 订单详情
  toDetail(id) {
    this.router.navigateByUrl('/tabs/send-goods/' + id);
  }

  // 所有订单状态查询
  order() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.sj = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              'ExhibitionId': recordId
            },
            childObjects: [
              {
                fieldName: 'OrderLineItem',
                reference: {
                  object: 'OrderLineItem',
                  field: 'OrderId'
                }
              }
            ]
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order', this.sj).subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.orderArr = (res as any).result;
          }
        }, error => {
        });
      });
  }

  // 退款提示
  async quitMoney() {
    const toast = await this.toastController.create({
      message: '订单退款中',
      duration: 3000,
      position: 'top',
      color: 'dark',
      // cssClass: 'toast-wrapper',
      cssClass: 'login',
    });
    toast.present();
  }

  // 查询全部订单
  getOrderList() {
    this.activeStyle = '0';
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId]) => {
      this.sj = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId
          },
          // 'childObjects': [
          //   {
          //     'fieldName': 'OrderLineItem',
          //     'reference': {
          //       'object': 'OrderLineItem',
          //       'field': 'OrderId'
          //     }
          //   }
          // ],
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order', this.sj).subscribe(res => {
        if ((res as any).resMsg === 'success') {
          this.OrderList = (res as any).result;
        } else {
          this.OrderList = [];
        }
      }, error => {
      });
    });
  }
  // 查询状态值订单
  getOrderStateList(states) {
    this.activeStyle = states;
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.sj = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              'ExhibitionId': recordId,
              'ExhibitorId': exhibitorId,
              'state': states
            },
            // 'childObjects': [
            //   {
            //     'fieldName': 'OrderLineItem',
            //     'reference': {
            //       'object': 'OrderLineItem',
            //       'field': 'OrderId'
            //     }
            //   }
            // ]
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order', this.sj).subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.OrderList = (res as any).result;
          } else {
            this.OrderList = [];
          }
        }, error => {
        });
      });
  }

  changeState(state) {
    switch (state) {
      case '101':
        return '待付款';
      case '201':
        return '待发货';
      case '202':
        return '已发货';
      case '301':
        return '同意退款';
      case '302':
        return '拒绝退款';
      case '303':
        return '退款中';
      case '311':
        return '同意退款退货';
      case '312':
        return '拒绝退款退货';
      case '313':
        return '退款退货中';
      case '321':
        return '同意换货';
      case '322':
        return '拒绝换货';
      case '323':
        return '换货中';
      case '401':
        return '已完成';
      case '402':
        return '已关闭';
    }
  }
  // 查询售后
  getOrderStateBoolList() {
    this.activeStyle = '300';
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.sj = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              'ExhibitionId': recordId,
              'ExhibitorId': exhibitorId,
              'IsPostSale': true
            },
            'childObjects': [
              {
                'fieldName': 'OrderLineItem',
                'reference': {
                  'object': 'OrderLineItem',
                  'field': 'OrderId'
                }
              }
            ],

          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order', this.sj).subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.OrderList = (res as any).result;
          } else {
            this.OrderList = [];
          }
        }, error => {
        });
      });
  }

  // 待付款 修改价格
  async presentAlertPrompt(index) {
    const alert = await this.alertController.create({
      header: '修改金额',
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
                    'recordId': index,
                    'setValue': {
                      'Sum': this.orderPrice
                    }
                  }
                };
                this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.params).subscribe(res => {
                  if ((res as any).resMsg === 'success') {
                    const result = res as any;
                    this.getOrderList();
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
  // 待发货 我要发货
  send(id) {
    this.orderid = id;
    this.nav.navigateForward(['/tabs/order-send'], {
      queryParams: {
        orderid: this.orderid
      }
    });
  }
  // 已发货 查看物流
  logistic(id) {
    this.router.navigateByUrl('/tabs/logistics-info/' + id);
  }
  // 售后 售后详情
  selldetail(id) {
    this.router.navigateByUrl('/tabs/after-sell-detail/' + id);
  }
  //  同意退款
  async agreeMoney(index) {
    const alert = await this.alertController.create({
      header: '确定要退款吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
    // Promise.all([this.storage.get('TenantId'), this.storage.get('UserId'),
    // this.storage.get('ExhibitorId'), this.storage.get('RecordId')])
    //   .then(([tenantId, userId, exhibitorId, recordId]) => {
    //     this.data = {
    //       'tenantId': tenantId,
    //       'userId': userId,
    //       'params': {
    //         'recordId': index,
    //         'setValue': {
    //           'state': '303'
    //         }
    //       }
    //     };
    //     this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
    //       if ((res as any).resCode === 0) {
    //         this.order();
    //       }
    //     }, error => {
    //     });
    //   });
  }
  // 拒绝退款
  refuseMoney(recordId, state) {
    this.queryRefuseList(recordId, state);
  }

  async actionSheet(recordId, state) {
    const actionSheet = await this.actionSheetController.create({
      header: '请选择不同意理由：',
      buttons: this.actionRefuseList
    });
    actionSheet.onDidDismiss().then((e) => {
      if (e.role !== 'backdrop') {
        if (e.role !== 'cancel') {
          this.refuseOrder(e.role, recordId, state);
        }
      }
    }, () => { });
    await actionSheet.present();
  }

  // 同意退款退货
  agreeMoneyGoods() {
    console.log('===同意退款退货==');
  }
  // 拒绝退款退货
  refuseMoneyGoods(index) {
    console.log('===拒绝退款退货==');
  }
  // 同意换货
  agreeChangeGoods() {
    console.log('===同意换货==');
  }
  // 拒绝换货
  refuseChangeGoods() {
    console.log('===拒绝换货==');
  }

  // 已完成 查看评价
  view(id) {
    // this.router.navigateByUrl('/tabs/goods-evaluate-edit/' + id);
    this.router.navigateByUrl('/evaluate-list/' + id);
  }
  // 已关闭 删除订单
  deleteOrder(id) {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('token')
    ]).then(([tenantId, userId, token]) => {
      const requestData = {
        tenantId,
        userId,
        params: {
          recordId: id
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/delete/Order', requestData,
        {headers: {Authorization: 'Bearer ' + token}})
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.presentToast('删除成功');
            this.getOrderStateList('402');
          }
        }, (err) => {
      });
    });
  }

  // 查询拒绝理由
  queryRefuseList(recordId, state) {
    this.actionRefuseObj = {};
    this.actionRefuseList = [];
    var queryName = '';
    if (state === '323') {
      queryName = '商品换货不同意原因设置';
    } else {
      queryName = '商品售后不同意原因设置';
    }
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, recordIds]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            ExhibitionId: recordIds,
            Name: queryName
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ApproverReason', requestData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            const list = (res as any).result;
            list.forEach((element, index) => {
              this.actionRefuseObj = {
                text: element.Remark,
                icon: 'checkmark-circle-outline',
                role: element.Remark
              };
              this.actionRefuseList.push(JSON.parse(JSON.stringify(this.actionRefuseObj)));
            });
            this.actionRefuseList.push({
              text: '取消',
              role: 'cancel',
              icon: 'close',
            });
            this.actionSheet(recordId, state);
          }
        }, error => {
        });
    });
  }

  // 售后-拒绝接口
  refuseOrder(reason, recordId, state) {
    var type = '';
    if (state === '303') {
      type = '302';
    } else if (state === '313') {
      type = '312';
    } else if (state === '323') {
      type = '322';
    }
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('token')
    ]).then(([tenantId, userId, token]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            OrderId: recordId,
          },
          setValue: {
            Reason: reason,
            IsApprove: false,
            Type: type
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/updateByCondition/SalesServiceRecord', requestData,
        {headers: {Authorization: 'Bearer ' + token}})
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            if (state === '303') {
              this.updateOrder(recordId, '302');
            } else if (state === '313') {
              this.updateOrder(recordId, '312');
            } else if (state === '323') {
              this.updateOrder(recordId, '322');
            }
          }
        }, error => {
        });
    });
  }

  // 售后-同意接口
  acceptOrder(recordId, state) {
    var type = '';
    if (state === '303') {
      type = '301';
    } else if (state === '313') {
      type = '311';
    } else if (state === '323') {
      type = '321';
    }
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('token')
    ]).then(([tenantId, userId, token]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            OrderId: recordId,
          },
          setValue: {
            IsApprove: true,
            Type: type
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/updateByCondition/SalesServiceRecord', requestData,
        {headers: {Authorization: 'Bearer ' + token}})
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            if (state === '303') {
              this.updateOrder(recordId, '301');
            } else if (state === '313') {
              this.updateOrder(recordId, '311');
            } else if (state === '323') {
              this.updateOrder(recordId, '321');
            }
          }
        }, error => {
        });
    });
  }

  // 更新订单状态
  updateOrder(recordId, state) {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId')
    ]).then(([tenantId, userId]) => {
      const data = {
        tenantId: tenantId,
        userId: userId,
        params: {
          recordId: recordId,
          setValue: {
            IsPostSale: true,
            state: state
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', data)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            if (state === '302' || state === '312' || state === '322') {
              this.presentToast('拒绝成功');
            } else if (state === '301' || state === '311' || state === '321') {
              this.presentToast('同意成功');
            }
            this.getOrderStateBoolList();
          }
        }, error => {
        });
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      cssClass: 'toast-wrapper',
      position: 'middle'
    });
    toast.present();
  }
}
