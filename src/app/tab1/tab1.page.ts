import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
import { Platform } from '@ionic/angular';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as parser from 'fast-xml-parser';
declare var cordova;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public params;
  public da;
  public ss;
  public days1;
  public days;
  storeName: string;
  todayMoney: string;
  yesterMoney: string;
  todayOrder: string;
  yesterdayOrder: string;
  todayview: string;
  yesterdayview: string;
  public today;
  public yesterday;

  public todayBusinessVolume;
  public yesterdayBusinessVolume;

  public versionCode;
  constructor(private router: Router, private http: HttpClient,
              public storage: Storage, private platform: Platform,
              private appUpdate: AppUpdate, public alertController: AlertController,
              public iab: InAppBrowser) { }

  ngOnInit() {
    this.search();
  }

  ionViewWillEnter() {
    this.search();

    this.today = this.getNowFormatDate('今天');
    this.yesterday = this.getNowFormatDate('昨天');
    this.Today(this.today);
    this.Yesterday(this.yesterday);
    this.getAPPVersion();
    this.queryUpdate();
  }

  refreshHomeData() {
    this.Today(this.today);
    this.Yesterday(this.yesterday);
  }

  getNowFormatDate(state) {
    const date = new Date();
    const seperator1 = '-';
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    var strDate = 0;
    if (state === '今天') {
      strDate = date.getDate();
    } else if (state === '昨天') {
      strDate = date.getDate() - 1;
    }
    const currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }

  // 查询每天数据
  Today(date) {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      this.da = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId,
            Date: date + ''
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfoState', this.da)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.days1 = (res as any).result[0];
            this.todayBusinessVolume = (res as any).result[0].BusinessVolume.toFixed(2);
          }
        });
    });
  }

  // 查询每天数据
  Yesterday(date) {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      this.da = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId,
            Date: date + ''
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfoState', this.da)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.days = (res as any).result[0];
            this.yesterdayBusinessVolume = (res as any).result[0].BusinessVolume.toFixed(2);
          }
        });
    });
  }

  // 查询店铺信息
  search() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      this.params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId
          },
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', this.params)
        .subscribe(res => {
          if (res) {
            this.ss = (res as any).result[0];
            if (this.ss.ApproveState === '1') {
              this.router.navigateByUrl('/tabs/examine-tip');
            } else if (this.ss.ApproveState === '2') {
              return;
            } else {
              this.router.navigateByUrl('/tabs/store-certification');
            }
            if (this.ss.HasFreeZe === true) {
              this.router.navigateByUrl('/tabs/frozen-tip');
            }
          }
        });
    });
  }

  lesson() {
    this.router.navigateByUrl('/tabs/lesson-list');
  }
  addgoods() {
    this.router.navigateByUrl('/tabs/goods-add/none&add');
  }
  msg() {
    this.router.navigateByUrl('/tabs/infor');
  }
  store() {
    this.router.navigateByUrl('/tabs/store');
  }
  storeManage() {
    this.router.navigateByUrl('/tabs/store-management');
  }
  courseManage() {
    this.router.navigateByUrl('/tabs/course-manage');
  }
  goodsManage() {
    this.router.navigateByUrl('/tabs/goods-manage');
  }
  orderManage() {
    this.router.navigateByUrl('/tabs/order-manage');
  }
  financial() {
    this.router.navigateByUrl('/tabs/financial-manage');
  }
  data() {
    this.router.navigateByUrl('/tabs/choose-day');
    // this.router.navigateByUrl('/waterpull');
  }
  market() {
    this.router.navigateByUrl('/tabs/marketing-activity');
  }

  queryUpdate() {
    const isAndroid = this.platform.is('android');
    const isIOS = this.platform.is('ios');
    if (isAndroid) {
      const updateUrl = 'http://www.meishangyunxun.com/app/updatestore.xml';
      this.appUpdate.checkAppUpdate(updateUrl).then(() => {
      });
    }
    if (isIOS) {
      cordova.getAppVersion.getVersionNumber().then((version) => {
        this.http.get('http://www.meishangyunxun.com/app/updatestore.xml',
          { headers: new HttpHeaders({ Accept: 'text/html,application/xhtml+xml,application/xml' }),
            responseType: 'text'
          }).subscribe(text => {
            if (parser.validate(text) === true) {
              const jsonObj = parser.parse(text);
              const stringVer = version;
              const test = stringVer.replace('.', '0');
              const test1 = test.replace('.', '0');
              const test2 = parseInt(test1, 10);
              if (test2 < jsonObj.update.version) {
                this.presentAlertIOSUpdate();
              }
            }
          });
      });
    }
  }

  async presentAlertIOSUpdate() {
    const alertTest3 = await this.alertController.create({
      header: '',
      subHeader: '',
      message: '美尚荟有更新啦！是否更新？',
      buttons: [{
        text: '取消',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: '更新',
        role: 'Ok',
        cssClass: 'secondary',
        handler: (blah) => {
          const browser = this.iab.create('https://itunes.apple.com/cn/app/id1470917735?mt=8', '_system');
          browser.show();
        }
      }],
    });
    await alertTest3.present();
  }

  getAPPVersion() {
    cordova.getAppVersion.getVersionNumber().then((version) => {
      this.versionCode = version;
    });
  }
}
