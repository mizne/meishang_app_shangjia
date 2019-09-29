import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertController, ModalController, NavParams, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-order-send',
  templateUrl: './order-send.page.html',
  styleUrls: ['./order-send.page.scss'],
})
export class OrderSendPage implements OnInit {
  public orderid;
  // public express;
  public expressNumber;
  public receiveName;
  public receivePhone;
  public receiveProvince;
  public receiveCity;
  public receiveArea;
  public receiveDetail;
  constructor(
    public http: HttpClient,
    public storage: Storage,
    public dialog: MatDialog,
    public alertController: AlertController,
    public router: Router,
    public modalCtrl: ModalController,
    public nav: NavController,
    public activeRoute: ActivatedRoute,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    // 接收路由传值
    // this.activeRoute.queryParams.subscribe((result) => {
    //   this.orderid = result.orderid;
    // });
    const str = this.router.url;
    const str1 = str.split('=');
    this.orderid = str1[1];
    this.queryInfo();
  }

  back() {
    this.nav.back();
  }

  // 取消
  sendCancel() {
    this.nav.back();
  }

  // 查询收货人信息
  queryInfo() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId]) => {
      const data = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            ExhibitionId: recordId,
            ExhibitorId: exhibitorId,
            RecordId: this.orderid
          },
          properties: ['myAddress.Address.___all']
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Order', data)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.receiveName = (res as any).result[0].myAddress.Name;
            this.receivePhone = (res as any).result[0].myAddress.Phone;
            this.receiveProvince = (res as any).result[0].myAddress.Province;
            this.receiveCity = (res as any).result[0].myAddress.City;
            this.receiveArea = (res as any).result[0].myAddress.Area;
            this.receiveDetail = (res as any).result[0].myAddress.AddressDetail;
          }
        }, error => {
        });
    });
  }

  // 确定
  sendOk() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('MSUserId')
    ]).then(([tenantId, userId]) => {
      const data = {
        tenantId: tenantId,
        userId: userId,
        params: {
          recordId: this.orderid,
          setValue: {
            IsPostSale: true,
            state: '202',
            ExpressNum: this.expressNumber
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/Order', data)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.presentToast('发货成功');
            this.expressNumber = '';
            this.nav.back();
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
