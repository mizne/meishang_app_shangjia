import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Component, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, ToastController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public url;
  public url1;
  public static apiUrl: string = 'http://meishangapi.xiaovbao.cn'; // 设置全局接口 用于调试
  // public static apiUrl: string = 'https://apiali.xiaovbao.cn/'; // 设置全局接口 用于调试
  sideMenuDisabled = true;
  backButtonPressed: boolean = false; // 用于判断返回键是否触发
  customBackActionSubscription: Subscription;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appMinimize: AppMinimize,
    public navController: NavController,
    public router: Router,
    public toast: ToastController,
    private http: HttpClient,
    public storage: Storage
  ) {
    this.initializeApp();
  }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  async pack(msg, sec) {
    const toast = await this.toast.create({
      message: msg,
      duration: sec,
      position: 'middle',
      color: 'dark',
      cssClass: 'toast-exhibitor',
    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.initRouterListen();
      // this.statusBar.styleDefault()//管理本机状态栏的外观,styleDefault使用默认状态栏（深色文本，浅色背景）。
      // this.splashScreen.hide(); // 显示和隐藏启动画面。
      // 延时隐藏动画
      window.setTimeout(() => {
        this.splashScreen.hide();
        // alert('延时隐藏动画')
      }, 3000);
      // this.queryAdPicture();
      // this.registerBackButtonAction();//注册返回按键事件
      // this.platform.resume.subscribe();//弹出框
    });
    this.customBackActionSubscription = this.platform.backButton.subscribe(() => {
      if (this.router.url === '/tabs/tab1' || this.router.url === '/tabs/password' || this.router.url === '/tabs/verification') {
        if (this.backButtonPressed) {
          this.appMinimize.minimize();
          this.backButtonPressed = false;
        } else {
          this.pack('再按一次退出', 1000);
          this.backButtonPressed = true;
          setTimeout(() => this.backButtonPressed = false, 2000);
        }
      } else if (this.router.url === '/tabs/store-certification' || this.router.url === '/tabs/examine-tip' ||
                this.router.url === '/tabs/frozen-tip') {
        this.appMinimize.minimize();
      } else {
        this.navController.back();
        this.search();
        //  this.backButtonPressed = false;
      }
    });
  }

  initRouterListen() {
    this.router.events.subscribe(event => { // 需要放到最后一个执行
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
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
          if ((res as any).result.length === 0) {
            this.router.navigateByUrl('/tabs/verification');
            return;
          }
        });
    });
  }

  queryAdPicture() {
    const courseData = {
      userId: null,
      tenantId: 'sys',
      params: {
        condition: {
          ExhibitionId: '5d134a9888df65ca9a700569',
          Type: '4'
        }
      }
    };
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitionBanner', courseData)
      .subscribe(res => {
        if ((res as any).resCode === 0) {
          this.storage.set('backGroundPicStore', (res as any).result[0].Name);
        }
      });
  }
}
