import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavParams } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-bind-phone',
  templateUrl: './bind-phone.page.html',
  styleUrls: ['./bind-phone.page.scss'],
})
export class BindPhonePage implements OnInit {
  tel: any;
  yzm: any;
  public aa;
  public Code;
  public userPhone;
  public getCode;
  public getUserCodePhone;
  public exhibitionid;
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public modalController: ModalController,
    public http: HttpClient,
    public nav: NavController,
    public router: Router,
    public storage: Storage,
    public navParams: NavParams,
  ) { }

  ngOnInit() {
    this.Code = '';
  }

  ionViewWillEnter() {
    this.queryExhibition();
  }

  // 输入验证码错误提示
  async loginFailure() {
    const toast = await this.toastController.create({
      message: '验证码错误,请重新输入',
      duration: 3000,
      position: 'top',
      color: 'danger',
      // cssClass: 'toast-wrapper',
      cssClass: 'login',
    });
    toast.present();
  }

  // 验证码倒计时
  verifyCode: any = {
    verifyCodeTips: '获取验证码',
    countdown: 60,
    disable: true
  }


  // 倒计时
  settime() {
    if (this.verifyCode.countdown == 1) {
      this.verifyCode.countdown = 60;
      this.verifyCode.verifyCodeTips = '获取验证码';
      this.verifyCode.disable = true;
      return;
    } else {
      this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
    setTimeout(() => {
      this.verifyCode.verifyCodeTips = '重新获取(' + this.verifyCode.countdown + ')';
      this.settime();
    }, 1000);
  }

  // 获取验证码
  getSmsCode() {
    this.getUserCodePhone = this.userPhone;
    let testphone = this.userPhone;
    // var testpattern1 = (/^[1][3458][012356789][0-9]+$/).test(testphone);
    var testpattern1 = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(
      testphone
    );
    if (testpattern1) {
      let params = {
        params: {
          phoneNumber: this.userPhone,
          ExhibitionId: this.exhibitionid
        }
      };
      this.http
        .post(AppComponent.apiUrl + '/v2/data/getsmscode', params)
        .subscribe(res => {
          if ((res as any).resCode == 0) {
            // 成功
            this.presentToast('验证码发送成功');
            this.verifyCode.disable = true;
            this.settime();
            this.getCode = (res as any).result[0].code;
          } else {
            this.presentToast((res as any).resMsg);
          }
        });
    } else {
      this.presentToast('请输入正确格式的手机号码');
    }
  }

  // 信息不能为空提示
  async msgTip() {
    const toast = await this.toastController.create({
      message: '请输入正确的手机号',
      duration: 2000,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: '确定要离开吗',
      buttons: [{
        text: '取消',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('=====');
        }
      }, {
        text: '确定',
        role: 'Ok',
        cssClass: 'secondary',
        handler: (blah) => {
          this.storage.set('isBack', true);
          this.modalController.dismiss({
            // 'result': 1
            // 'testhaha': 'hahahhaha2222'
          });
          // this.storage.get('isBack').then((value)=>{
          //   console.log(value)
          // })
          // if (this.addSource == '0') {
          // } else {
          //   this.router.navigateByUrl('/lessons-details/' + this.teachingId);
          // }
        }
      }],
    });
    await alert.present();
  }

  // 弹框提示
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'middle'
      // color:'#a2a4ab',
    });
    toast.present();
  }

  // 绑定手机号，跳转登录
  goBackToLogin() {
    const isRegiste = this.queryIsRegiste();
    isRegiste.subscribe(res => {
      if (res) {
        this.presentToast('该手机号已被注册，请重新输入');
      } else {
        let testphone = this.userPhone;
        // var testpattern1 = (/^[1][3458][012356789][0-9]+$/).test(testphone);
        var testpattern1 = /^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(
          testphone
        );
        if (testpattern1 == false) {
          // alert('请输入正确的11位手机号')
          this.presentToast('请输入正确的11位手机号');
        } else if (this.Code == '') {
          this.presentToast('请点击获取验证码');
          // alert('请点击获取验证码')

        } else if (
          this.getCode == this.Code &&
          this.getUserCodePhone == this.userPhone
        ) {
          this.storage.set('phoneWechat', this.userPhone).then((val) => {
            console.log('Your phoneWechat is ' + val);
          });
          this.navParams.data.modal.dismiss({
            'result': '消失的时候返回的内容'
          });
        } else {
          this.presentToast('请输入正确的验证码');
        }
      }
    });
  }
  // 返回上一页
  canGoBack() {
    this.presentAlert();
  }

  queryIsRegiste(): Observable<boolean> {
    const params = {
      'tenantId': 'sys',
      'userId': null,
      'params': {
        'condition': {
          'ExhibitionId': this.exhibitionid,
          'Tel': this.userPhone
        },
      }
    };
    return this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', params)
      .pipe(map(res => {
        if ((res as any).resCode === 0) {
          return true;
        } else {
          return false;
        }
      }));
  }

  queryExhibition() {
    const dapa = {
      'params': {
        'condition': {
          'ExName': '美尚云讯'
        }
      }
    };
    // 通过查询展商是否注册过
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Exhibition', dapa).subscribe(res => {
      let da = res as any;
      if (da.resMsg == 'success') {
        this.exhibitionid = da.result[0].RecordId;
      }
    });
  }
}
