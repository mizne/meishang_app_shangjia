import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertController, ModalController, NavParams, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ClipboardService } from 'ngx-clipboard';
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-send-goods',
  templateUrl: './send-goods.page.html',
  styleUrls: ['./send-goods.page.scss'],
})
export class SendGoodsPage implements OnInit {
  public params;
  public data;
  public dd;
  public pp;
  public order;
  public orderID; // 订单id
  public OrderDetailList; // 订单详情arr
  public totalPrice;
  public orderNumber; // 订单数量
  public orderTime; // 下单时间
  public OrderProList; // 订单内商品详情arr
  detail: any;
  msg: any;
  routesList: any;
  routesInfo: any;
  TenantId: string;
  orderPrice: number;
  UserId: string;
  ExhibitorId: string;
  RecordId: string;
  goodsName: string;
  searchArr: any;
  show: boolean;
  reason = [{ Name: '商品超过七天' }, { Name: '商品损坏' }, { Name: '恶意' }];
  public actionRefuseList;
  public actionRefuseObj;
  public receiveName;
  public receivePhone;
  public receiveProvince;
  public receiveCity;
  public receiveArea;
  public receiveDetail;
  constructor(
    public toast: ToastController,
    private clip: ClipboardService,
    public http: HttpClient,
    public storage: Storage,
    public dialog: MatDialog,
    public alertController: AlertController,
    public router: Router,
    public modalCtrl: ModalController,
    public nav: NavController,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    // this.afterSell()
    // this.toBe()
    // 获取orderID
  }

  ionViewWillEnter() {
    this.actionRefuseObj = {};
    this.actionRefuseList = [];
    const str = this.router.url;
    this.orderID = str.substring(str.length - 24);
    this.orderDetail();
    this.queryOrderDetail();
    this.totalPrice = 0;
    this.show = true;
    this.queryRefuseList();
  }

  // 跳转发货页面
  goToSend() {
    this.router.navigateByUrl('/tabs/order-send', {
      queryParams: {
        orderid: this.orderID
      }
    });
  }

  // 无效
  goToSend2() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'IsPostSale': true,
              'state': '202'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
            console.log('======已发货=====');
            this.order();
          }
        }, error => {
        });
      });
    this.show = !this.show;
  }

  // 发货
  // send() {
  //   // this.sell()
  //   Promise.all([this.storage.get('TenantId'), this.storage.get('UserId'),
  //   this.storage.get('ExhibitorId'), this.storage.get('RecordId')])
  //     .then(([tenantId, userId, exhibitorId, recordId]) => {
  //       this.data = {
  //         'tenantId': tenantId,
  //         'userId': userId,
  //         'params': {
  //           'recordId': this.orderID,
  //           'setValue': {
  //             'IsPostSale': true,
  //             'state': '202'
  //           }
  //         }
  //       };
  //       this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
  //         if ((res as any).resCode === 0) {
  //           this.nav.back();
  //         }
  //       }, error => {
  //       });
  //     });
  // }

  // 复制提示
  async copyTip() {
    const toast = await this.toast.create({
      message: '复制成功',
      duration: 2000,
      position: 'middle',
      color: 'medium',
      cssClass: 'cp',
    });
    toast.present();
  }

  // 复制订单号
  copy(text) {
    // this.clipboard.copy(text);
    this.clip.copyFromContent(text);
    this.copyTip();
  }

  // 返回订单
  back() {
    this.nav.back();
  }

  // 跳转售后详情
  selldetail() {
    this.router.navigateByUrl('/tabs/after-sell-detail/' + this.orderID);
  }

  // 查看评价
  view(id) {
    this.router.navigateByUrl('/tabs/goods-evaluate-edit/' + id);
  }
  // 查看物流
  // logistic() {
  //   this.router.navigateByUrl('/tabs/logistics-info/' + this.orderID);
  // }

  // 发货弹框
  async sell() {
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: '发货人',
          value: ''
        },
      ],
    });
    await alert.present();
  }

  // 查看物流接口
  getRouteInfo() {
    // 时间
    const time = new Date();
    const mon = time.getMonth() + 1;
    // 物流运单号 测试：3914855547508
    const nu = '3914855547508';
    const com = 'auto';
    const showapi_timestamp = '' + time.getFullYear() + mon + time.getDate() + time.getHours() + time.getMinutes() + time.getSeconds();
    console.log('==========showapi_timestamp========' + showapi_timestamp);
    const senderPhone = '';
    const receiverPhone = '';
    // let showapi_appid='91960'
    const showapi_appid = '93622';
    // let showapi_sign = '826b824d42204275b0aec642662605ad'
    const showapi_sign = '9d7b3ef5b485441281530bc1d76c4fd5';

    this.http
      .post(
        'https://route.showapi.com/64-19?showapi_appid=' + showapi_appid + '&showapi_sign=' + showapi_sign + '&showapi_timestamp=' + showapi_timestamp + '&com=' + com + '&nu=' + nu + '&senderPhone=&receiverPhone=', {}
      )
      .subscribe(res => {
          this.routesList = (res as any).showapi_res_body;
          this.routesInfo = (this.routesList as any).data;
          // console.log('======' + JSON.stringify(this.routesList))
          // console.log('======' + JSON.stringify(this.routesInfo))
        }
      );
  }

  // 查询订单详情
  orderDetail() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.order = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition':
            {
              'ExhibitionId': recordId,
              'RecordId': this.orderID
            },
            'properties': [
              'ProductId.Product.___all', 'myAddress.Address.___all'
              // 'ExhibitorExhibitionInfoId.ExhibitorExhibitionInfo.___all'
            ],
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order', this.order).subscribe(res => {
          if (res) {
            this.OrderDetailList = (res as any).result[0];
            // this.receiveName = (res as any).result[0].myAddress.Name;
            // this.receivePhone = (res as any).result[0].myAddress.Phone;
            // this.receiveProvince = (res as any).result[0].myAddress.Province;
            // this.receiveCity = (res as any).result[0].myAddress.City;
            // this.receiveArea = (res as any).result[0].myAddress.Area;
            // this.receiveDetail = (res as any).result[0].myAddress.AddressDetail;
          } else {
            console.log(123);
          }
        });
      });
  }

  // 查询订单内商品详情
  queryOrderDetail() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('token'),
      this.storage.get('MSRecordId')]).then(([tenantId, userId, exhibitorId, token, recordId]) => {
        // let data = [];
        // this.orderID.forEach(element => {
        //   let e = {
        //     orderID: element
        //   }
        //   data.push(e);
        // });
        const queryOrderData = {
          tenantId: tenantId,
          UserId: userId,
          params: {
            condition: {
              // $or: data
              OrderId: this.orderID
            },
            properties: ['ProductId.Product.___all', 'orderID.Order.___all']
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/OrderLineItem',
        queryOrderData, { headers: { Authorization: 'Bearer' + token } })
          .subscribe(ress => {
            const res = (ress as any);
            if (res.resCode === 0) {
              this.OrderProList = res.result;
              this.OrderProList.forEach(element => {
                this.totalPrice += parseFloat(element.ProductPrice) * parseInt(element.ProductNum);
              });
              // this.totalPrice = res.result[0].orderID.Sum;
              // this.orderNumber = res.result[0].orderID.RecordId;
              // this.orderTime = res.result[0].orderID.CreatedAt;
            }
          });
      });
  }

  // 拒绝退款
  refuse1() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'state': '302'
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

  // 拒绝退款退货
  refuse2() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'state': '312'
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

  // 拒绝换货
  refuse3() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'state': '322'
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

  // 同意退款
  agree1() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'state': '301'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
          }
        }, error => {
        });
      });
  }
  // 同意退款退货
  agree2() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'state': '311'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
          }
        }, error => {
        });
      });
  }

  // 同意换货
  agree3() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'state': '321'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
          }
        }, error => {
        });
      });
  }

  // 换货中
  agree4() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {

        this.data = {

          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': this.orderID,
            'setValue': {
              'state': '323'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.data).subscribe(res => {
          if ((res as any).resCode === 0) {
          }
        }, error => {
        });
      });
  }

  // 查询拒绝理由
  queryRefuseList() {
    var queryName = '';
    if (this.OrderDetailList.state === '323') {
      queryName = '商品换货不同意原因设置';
    } else {
      queryName = '商品售后不同意原因设置';
    }
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, recordId]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            ExhibitionId: recordId,
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
                text: element.Name,
                icon: 'checkmark-circle-outline',
                role: element.Name
              };
              this.actionRefuseList.push(JSON.parse(JSON.stringify(this.actionRefuseObj)));
            });
            this.actionRefuseList.push({
              text: '取消',
              role: 'cancel',
              icon: 'close',
            });
          }
        }, error => {
        });
    });
  }

  // 拒绝退款
  async refuseMoney(recordId, state) {
    const actionSheet = await this.actionSheetController.create({
      header: '请选择不同意理由：',
      buttons: this.actionRefuseList
    });
    actionSheet.onDidDismiss().then((e) => {
      if (e.role !== 'cancel') {
        this.refuseOrder(e.role, recordId, state);
      }
    }, () => { });
    await actionSheet.present();
  }

  // 售后-拒绝接口
  refuseOrder(reason, recordId, state) {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId')
    ]).then(([tenantId, userId]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          recordId: recordId,
          setValue: {
            Reason: reason,
            IsApprove: false
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/SalesServiceRecord', requestData)
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
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId')
    ]).then(([tenantId, userId]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          recordId: recordId,
          setValue: {
            IsApprove: true
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/SalesServiceRecord', requestData)
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
            this.orderDetail();
          }
        }, error => {
        });
    });
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      cssClass: 'toast-wrapper',
      position: 'middle'
    });
    toast.present();
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
            Promise.all([
              this.storage.get('MSTenantId'),
              this.storage.get('UserId')
            ]).then(([tenantId, userId]) => {
              this.params = {
                'tenantId': tenantId,
                'userId': userId,
                'params': {
                  'recordId': index,
                  'setValue': {
                    'Sum': this.orderPrice
                  }
                }
              };
              this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', this.params).subscribe(res => {
                if ((res as any).resMsg === 'success') {
                  this.orderDetail();
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
    this.nav.navigateForward(['/tabs/order-send'], {
      queryParams: {
        orderid: id
      }
    });
  }

  // 已发货 查看物流
  logistic(id) {
    this.router.navigateByUrl('/tabs/logistics-info/' + id);
  }

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
            this.nav.back();
          }
        }, (err) => {
      });
    });
  }
}
