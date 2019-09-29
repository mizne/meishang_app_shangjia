import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss']
})
export class WithdrawPage implements OnInit {
  constructor(
    public router: Router,
    public storage: Storage,
    public http: HttpClient,
    public alertController: AlertController,
    public wechat: Wechat,
    public toastController: ToastController,
    ) { }
  public params;
  public money;
  public how;
  public much;
  public accountAmountForGet;

  ngOnInit() {
    this.view();
  }
  back() {
    this.router.navigateByUrl('/tabs/financial-manage');
  }
  account() {
    this.router.navigateByUrl('/tabs/cash-account');
  }
  witch() {
    this.router.navigateByUrl('/tabs/cash-introduce');
  }

  // 模态框 Toast
  async  presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: 'top',
      color: 'secondary',
      // cssClass: 'toast-wrapper',
      cssClass: 'login',
    });
    toast.present();
  }

  // 查询可提现金额
  view() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.params = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              // 'ExhibitionId': recordId,
              'ExhibitorId': exhibitorId,
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CustomerAccount', this.params).subscribe(res => {
          if (res) {
            this.how = (res as any).result[0];
            this.accountAmountForGet = (res as any).result[0].AccountAmountForGet.toFixed(2);
          }
        });
      });
  }

  // 绑定微信账号
  bindWeChat() {
    var that = this;
    // 获取用户是否安装微信
    try {
      let scope = 'snsapi_userinfo', state = '_' + (+new Date());
      that.wechat
        .isInstalled()
        .then(installed => {
          // alert(installed);
          that.wechat
            .auth(scope, state)
            .then(response => {
              that.presentToast('授权登录中....');
              let res = response;
              // alert(res);
              // alert(res.code);
              // 在调用service的getAccessToken方法获取access_token，和acopenid，
              // 2. 后台获取token，openID, 获取用户信息并返回
              that.http
                .post(
                  AppComponent.apiUrl + '/v2/data/wxExhibitorGetUserInfoByLogin',
                  {
                    code: res.code
                  }
                )
                .subscribe(function (res1: any) {
                  if (res1.resCode == 0) {
                    // alert('调用登录中...')
                    // 用户输入手机号查询是否注册
                    //   注册 调用登陆
                    //   未注册 调用注册
                    // that.wechatLogin(accessTokenResponse);
                    // alert('请稍等...')
                    that.presentToast('授权登录中....');
                    let openid = res1.result.openid;
                    let unionid = res1.result.unionid;
                    this.alert('openid = ' + openid);
                    this.alert('unionid = ' + unionid);
                  }
                }),
                error => {
                  console.log('===========获取token，openID err============');
                };
            })
            .catch(reason => {
              console.log('微信授权失败');
              console.log(reason);
            });
        })
        .catch(reason => {
          console.log('没有发现微信客户端');
        });
    } catch (error) {
      console.log(error);
    } finally {
      // alert('finally')
    }
  }

  // 提现
  withdraw() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId')])
      .then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId]) => {
        this.params = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'record': {
              'GetAccountType': '支付宝',
              'AliPayInfoId': '',
              'AccountAmountGet': this.money + '',
              'ExhibitionId': recordId,
              'ExhibitorId': exhibitorId,
              'ExhibitorExhibitionInfoId': exhibitorExhibitionInfoId
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/insert/GetCashApprover', this.params).subscribe(res => {
        });
      });
  }

  // 提现判断
  isCash() {
    if (
      Number(this.how.AccountAmountForGet) < 1 ||
      Number(this.how.AccountAmountForGet) < Number(this.money) ||
      Number(this.money) > 20000 || Number(this.money) < 1
    ) {
      this.alert();
    } else {
      this.alertSuccess();
      this.withdraw();
    }
  }


  // 提现失败
  async alert() {
    const alert = await this.alertController.create({
      // header: '提示',
      message: '提现失败',
      buttons: ['确定']
    });
    await alert.present();
  }


  // 提现成功
  async alertSuccess() {
    const alert = await this.alertController.create({
      // header: '提示',
      message: '申请中,请耐心等待...',
      buttons: ['确定']
    });
    await alert.present();
  }


}
