import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController,ToastController } from '@ionic/angular';
import { Wechat } from '@ionic-native/wechat/ngx';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-cash-account',
  templateUrl: './cash-account.page.html',
  styleUrls: ['./cash-account.page.scss'],
})
export class CashAccountPage implements OnInit {
public params;
public alip;
public nickName;
public isBindWeChat:boolean;
public openid;
public unionid;
  constructor(
    public router: Router,
    public storage: Storage,
    public http: HttpClient,
    public alertController: AlertController,
    public wechat: Wechat,
    public toastController: ToastController,
    ) { }

  ngOnInit() {
    this.nickName = '未绑定微信';
    this.isBindWeChat = false;
  }
  ionViewWillEnter(){
  this.alipay()
  }

  back(){
  this.router.navigateByUrl('/tabs/financial-manage')
}

// 去设置阿里账户
ali(){
  this.router.navigateByUrl('/tabs/store-pay')
}

// 查询支付宝信息
alipay(){
  Promise.all([this.storage.get('MSTenantId'),this.storage.get('UserId'),this.storage.get('ExhibitorId'),this.storage.get('MSRecordId'),this.storage.get('ExhibitorExhibitionInfoId')])
  .then(([tenantId,userId,exhibitorId,recordId,exhibitorExhibitionInfoId])=>{
    this.params={
     
    "tenantId":tenantId,
    "userId":userId,
   "params":{
           "condition":{
      
                "ExhibitionId" : recordId,
                // "ExhibitorId" :exhibitorId,
                // "ExhibitorExhibitionInfoId":exhibitorExhibitionInfoId
             
           }

   }
    }
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/AliPayInfo',this.params).subscribe(res=>{
    if((res as any).resCode==0){
      this.alip=(res as any).result[0]
    }
    })
  })
}

// 绑定微信账号
bindWeChat() {
  // alert('绑定微信账号3');
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
                  // that.presentToast('授权登录中....');
                  that.openid = res1.result.openid;
                  that.unionid = res1.result.unionid;
                  that.nickName = res1.result.nickname;
                  that.isBindWeChat = true;
                  // alert(JSON.stringify(res1.result))
                  // alert(that.nickName);
                  that.presentToast('微信绑定成功');
                } else {
                  alert(JSON.stringify(res1));
                }
              }),
              error => {
                alert('获取token，openID err');
                console.log('===========获取token，openID err============');
              };
          })
          .catch(reason => {
            alert('微信授权失败');
            alert(JSON.stringify(reason));
            console.log('微信授权失败');
            console.log(reason);
          });
      })
      .catch(reason => {
        console.log('没有发现微信客户端');
        alert('Failed: ' + reason)
      });
  } catch (error) {
    console.log(error);
    alert('error');
    alert(error);
    alert(JSON.stringify(error));
  } finally {
    // alert('finally')
  }
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
  bindWeChat1() {
    this.nickName = '1';
    this.isBindWeChat = true;
  }
}
