import { modals } from './../../financial/modals/index';
// import { BindTelComponent } from './../bind-tel/bind-tel.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController, ModalController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Wechat } from '@ionic-native/wechat/ngx';
import { BindPhonePage } from '../../bind-phone/bind-phone.page';
import { AppComponent } from '../../app.component';
declare var Act1Plugin: any;
@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss']
})
export class PasswordPage implements OnInit {
  public params;
  public tel;
  passwords: string;
  public dapa;
  public ten;
  public user;
  public exhi;
  public tr;
  data: any;
  public ss;
  constructor(
    public modalController: ModalController,
    public storage: Storage,
    public router: Router,
    public http: HttpClient,
    public toastController: ToastController,
    public wechat: Wechat,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {

  }

  // 调用modals
  async open() {
    this.storage.remove('isBack');
    this.storage.get('isBack').then((value) => {
      console.log(value);
    });
    const modal = await this.modalController.create({
      component: BindPhonePage,
      componentProps: { value: 123 },
      cssClass: 'test',
      showBackdrop: false,
    });
    // const data = await modal.onDidDismiss();
    // console.log(data);
    modal.onDidDismiss().then(
      () => {
        this.storage.get('isBack').then((value) => {
          // 点击返回 未绑定手机
          if (value) {
            console.log('1');
          } else {// 绑定手机
            console.log('2');
          }
        });
      },
      () => {
      }
    );
    return await modal.present();
  }

  //  输入错误提示
  async loginFailure() {
    const toast = await this.toastController.create({
      message: '手机号或密码错误,请重新输入',
      duration: 3000,
      position: 'top',
      color: 'danger',
      // cssClass: 'toast-wrapper',
      cssClass: 'login',
    });
    toast.present();
  }

  login() {
    this.router.navigateByUrl('/tabs/verification');
  }

  async presentToast(msg) {
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

  // 密码登录
  password() {
    let testphone = this.tel;
    // var testpattern1 = (/^[1][3458][012356789][0-9]+$/).test(testphone);
    var testpattern1 = (/^((13[0-9])|(14[5,7,9])|(15[^4])|(18[0-9])|(17[0,1,3,5,6,7,8]))\d{8}$/).test(testphone);
    if (testpattern1) {
      Promise.all([
        this.presentLoading('登录中...')
      ]).then(() => {
        this.params = {
          'params': {
            'Type': '1',
            UserPassword: this.passwords,
            UserName: this.tel,
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/Login', this.params).subscribe(res => {
          let data = res as any;
          if (data.resCode == '0') {
            let arrlist = data.result;
            // 循环判定type为1的结果
            for (let i = 0; i < arrlist.length; i++) {
              if (arrlist[i].Type == '1') {
                // 获取的结果存储在storage
                // this.ten = arrlist[i].TenantId;
                this.tr = arrlist[i].RecordId;
                this.storage.set('ExhibitorId', this.tr);
                this.user = arrlist[i].UserId;
                this.storage.set('UserId', this.user);
                this.storage.set('token', arrlist[i].token);
                this.storage.set('UserName', arrlist[i].UserName);
                this.storage.set('Phone', arrlist[i].Phone);
                this.dapa = {
                  'params': {
                    'condition': {
                      'ExName': '美尚云讯'
                    }
                  }
                };
                this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Exhibition', this.dapa).subscribe(res => {
                  let da = (res as any);
                  if (da.resCode == '0') {
                    // this.ten = da.result[0].TenantId;
                    this.exhi = da.result[0].RecordId;
                    this.storage.set('MSRecordId', da.result[0].RecordId);
                    this.storage.set('MSTenantId', da.result[0].TenantId);
                    Promise.all([
                      this.storage.get('MSTenantId')
                    ]).then(([tenantId]) => {
                      this.params = {
                        'tenantId': tenantId,
                        'userId': this.user,
                        'params': {
                          'condition': {
                            'ExhibitionId': this.exhi,
                            'ExhibitorId': this.tr
                          },
                        }
                      };
                      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', this.params)
                        .subscribe(res => {
                          if ((res as any).resCode == '0') {
                            const exLogo = (res as any).result[0].Logo;
                            const exName = (res as any).result[0].StockName;
                            this.storage.set('exLogo', exLogo);
                            this.storage.set('exName', exName);
                            let ss = (res as any).result[0];
                            this.storage.set('ExhibitorExhibitionInfoId', ss.RecordId);
                            this.storage.get('ExhibitorExhibitionInfoId').then((val) => {
                              console.log('Your ExhibitorExhibitionInfoId is', val);
                            });
                            if (ss) {
                              this.passwords = '';
                              this.tel = '';
                              this.loadingController.dismiss({
                              });
                              Promise.all([
                                this.storage.get('MSTenantId'),
                                this.storage.get('UserId'),
                                this.storage.get('MSRecordId'),
                                this.storage.get('ExhibitorId')
                              ]).then(([tenantId1, userId, recordId, exhibitorId]) => {
                                const params = {
                                  'tenantId': tenantId1,
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
                                    if (res) {
                                      this.ss = (res as any).result[0];
                                      if (this.ss.ApproveState === '1') {
                                        this.presentToast('店铺审核中');
                                        this.router.navigateByUrl('/tabs/examine-tip');
                                      } else if (this.ss.ApproveState === '2') {
                                        this.presentToast('登录成功');
                                        this.router.navigateByUrl('/tabs/tab1');
                                      } else {
                                        this.presentToast('完善店铺信息');
                                        this.router.navigateByUrl('/tabs/store-certification');
                                      }
                                      if (this.ss.HasFreeZe === true) {
                                        this.presentToast('店铺已被冻结');
                                        this.router.navigateByUrl('/tabs/frozen-tip');
                                      }
                                    }
                                  });
                              });
                            } else {
                              this.loadingController.dismiss({
                              });
                              this.presentToast('登录失败');
                            }
                          } else {
                            this.loadingController.dismiss({
                            });
                            this.presentToast('登录失败');
                          }
                        });
                    });
                  } else {
                    this.loadingController.dismiss({
                    });
                    this.presentToast('登录失败');
                  }
                });
              }
            }
          } else {
            this.loadingController.dismiss({
            });
            this.loginFailure();
          }
        });
      });
    } else {
      this.loginFailure();
    }
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
          if ((res as any).resMsg === 'success') {
            const ExhibitorExId = (res as any).result[0].RecordId;
            const UserId = (res as any).result[0].UserId;
            const ExhibitorId = (res as any).result[0].ExhibitorId;
            const exLogo = (res as any).result[0].Logo;
            const exName = (res as any).result[0].StockName;
            this.storage.set('exLogo', exLogo);
            this.storage.set('exName', exName);
            this.storage.set('UserId', UserId);
            this.storage.set('ExhibitorId', ExhibitorId);
            this.storage.set('ExhibitorExhibitionInfoId', ExhibitorExId);
          }
        });
    });
  }

  // 模态框 绑定手机号
  async presentModal1(acess) {
    const modal = await this.modalController.create({
      component: BindPhonePage,
      // cssClass: 'addMyCart',
      componentProps: {},
      showBackdrop: false,
    });
    // const { data } = await modal.onDidDismiss();
    modal.onDidDismiss().then(
      () => {
        this.storage.get('isBack').then((value) => {
          // 点击返回 未绑定手机
          if (value) {
          } else {// 绑定手机
            this.presentToast('绑定成功');
            this.wechatLogin(acess);
          }
          this.storage.remove('isBack');
        });
      },
      () => { }
    );
    return await modal.present();
  }
  // 微信登录
  wechatLogin(accessTokenResponse) {
    var that = this;
    // 根据手机号查询是否注册
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('MSUserId'),
      this.storage.get('phoneWechat'),
      that.storage.get('MSRecordId'),
    ]).then(([tenantId, userId, phoneWechat, recordId]) => {
      // 查询手机号是否已注册
      // let phone = '13770713191'
      let queryIsSign = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            ExhibitionId: recordId,
            Tel: phoneWechat
          }
        }
      };
      // 查询展商表手机号是否已注册
      that.http
        .post(
          AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo',
          queryIsSign
        )
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            // 已注册 弹出提示
            let UserId = (res as any).result[0].UserId;
            let ExhibitorId = (res as any).result[0].ExhibitorId;
            let ExhibitorExId = (res as any).result[0].RecordId;
            let Tel = (res as any).result[0].Tel;
            const exLogo = (res as any).result[0].Logo;
            const exName = (res as any).result[0].StockName;
            that.storage.set('exLogo', exLogo);
            that.storage.set('exName', exName);
            that.storage.set('UserId', UserId);
            // ExhibitorRecordId
            that.storage.set('ExhibitorId', ExhibitorId);
            that.storage.set(
              'ExhibitorExhibitionInfoId',
              ExhibitorExId);
            // that.router.navigateByUrl('')
            // 根据ExhibitorRecordId查出
            // update ExhibitorExhibitioninfo
            // openid unionid nickname logo
            let sex = accessTokenResponse.sex;
            sex = sex + '';
            let updateExhibitor = {
              tenantId: tenantId,
              userId: userId,
              params: {
                recordId: ExhibitorExId,
                setValue: {
                  OpenId: accessTokenResponse.openid,
                  Unicode: accessTokenResponse.unionid,
                  Logo: accessTokenResponse.headimgurl,
                  StockName: accessTokenResponse.nickname,
                  Tel: phoneWechat,
                  Phone: phoneWechat
                  // Sex: accessTokenResponse.sex+'',
                }
              }
            };
            that.http
              .post(
                AppComponent.apiUrl + '/v2/data/update/ExhibitorExhibitionInfo',
                updateExhibitor
              )
              .subscribe(res => {
                if ((res as any).resCode == 0) {
                  // let ExhibitorInfo = (res as any).result;
                  that.storage.set(
                    'StockName',
                    accessTokenResponse.nickname
                  );
                  that.storage.set(
                    'Logo',
                    accessTokenResponse.headimgurl
                  );
                  // 更新Exhibitor
                  let queryExhibitorData1 = {
                    tenantId: tenantId,
                    userId: userId,
                    params: {
                      recordId: ExhibitorId,
                      setValue: {
                        OpenId: accessTokenResponse.openid,
                        Unicode: accessTokenResponse.unionid,
                        Logo: accessTokenResponse.headimgurl,
                        StockName: accessTokenResponse.nickname,
                        Tel: phoneWechat,
                        Phone: phoneWechat
                      }
                    }
                  };
                  that.http.post(
                    AppComponent.apiUrl + '/v2/data/update/Exhibitor',
                    queryExhibitorData1
                  )
                    .subscribe(res => {
                      if ((res as any).resCode == 0) {
                        // let ExhibitorInfo = (res as any).result;
                        // 登录接口
                        Promise.all([
                          that.presentLoading('登录中...')
                        ]).then(() => {
                          let loginData = {
                            params: {
                              Type: '1',
                              Phone: phoneWechat,
                              LoginType: '手机号码登录'
                            }
                          };
                          that.http.post(AppComponent.apiUrl + '/v2/data/Login', loginData).subscribe(res => {
                            let result = res as any;
                            if (result.resCode === 0) {
                              for (let i = 0; i < result.result.length; i++) {
                                if (result.result[i].Type == '1') {
                                  // 获取token
                                  that.storage.set('token', result.result[i].token);
                                  that.storage.set('UserId', result.result[i].UserId);
                                  that.storage.set('ExhibitorId', result.result[i].RecordId);
                                  that.search();
                                  that.loadingController.dismiss({
                                  });
                                  Promise.all([
                                    that.storage.get('MSTenantId'),
                                    that.storage.get('UserId'),
                                    that.storage.get('MSRecordId'),
                                    that.storage.get('ExhibitorId')
                                  ]).then(([tenantId1, userId1, recordId1, exhibitorId]) => {
                                    const params = {
                                      'tenantId': tenantId1,
                                      'userId': userId1,
                                      'params': {
                                        'condition': {
                                          'ExhibitionId': recordId1,
                                          'ExhibitorId': exhibitorId
                                        },
                                      }
                                    };
                                    that.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', params)
                                      .subscribe(res => {
                                        if (res) {
                                          that.ss = (res as any).result[0];
                                          if (that.ss.ApproveState === '1') {
                                            that.presentToast('店铺审核中');
                                            that.router.navigateByUrl('/tabs/examine-tip');
                                          } else if (that.ss.ApproveState === '2') {
                                            that.presentToast('登录成功');
                                            that.router.navigateByUrl('/tabs/tab1');
                                          } else {
                                            that.presentToast('完善店铺信息');
                                            that.router.navigateByUrl('/tabs/store-certification');
                                          }
                                          if (that.ss.HasFreeZe === true) {
                                            that.presentToast('店铺已被冻结');
                                            that.router.navigateByUrl('/tabs/frozen-tip');
                                          }
                                        }
                                      });
                                  });
                                }
                              }
                            } else {
                              that.presentToast('登录失败');
                              that.loadingController.dismiss({
                              });
                            }
                          });
                        });
                      } else {
                        that.presentToast('登录失败');
                      }
                    });
                }
              });
          } else {
            // 注册展商
            let body = {
              'tenantId': tenantId,
              'userId': userId,
              'params': {
                'records': [
                  {
                    'Tel': phoneWechat,
                    'Type': '1',
                    'ExhibitionHall': 'default',
                    'ProductTypeInfo': '商品',
                    'ExhibitionId': recordId,
                    'CompId': '',
                    'CompanyName': phoneWechat,
                    'ShortName': '',
                    'CompanyNameEn': '',
                    'ShortNameEn': '',
                    'LinkList': [
                      {
                        'LinkId': '',
                        'admin': 1,
                        'UserName': phoneWechat,
                        'NickName': '',
                        'LinkName': '',
                        'LinkMob': phoneWechat,
                        'UserPassword': '888888'
                      }
                    ],
                    'ProductList': [
                    ],
                    'StockName': accessTokenResponse.nickname,
                    'OpenId': accessTokenResponse.openid,
                    'Unicode': accessTokenResponse.unionid,
                    'Logo': accessTokenResponse.headimgurl,
                    'Sex': accessTokenResponse.sex,
                    'Country': accessTokenResponse.country,
                    'Province': accessTokenResponse.province,
                    'City': accessTokenResponse.city,
                    'Phone': phoneWechat
                  }
                ]
              }
            };
            that.http
              .post(
                AppComponent.apiUrl + '/v2/data/syncDatas/Exhibitor',
                body
              )
              .subscribe(function (res: any) {
                if (res.resCode == 0) {
                  let UserId = res.result[0].UserId;
                  let ExhibitorId = res.result[0].ExhibitorId;
                  that.storage.set('UserId', UserId);
                  // ExhibitorRecordId
                  that.storage.set('ExhibitorId', ExhibitorId);
                  Promise.all([
                    that.presentLoading('登录中...')
                  ]).then(() => {
                    let loData = {
                      'params': {
                        'Type': '1',
                        'Phone': phoneWechat,
                        'LoginType': '手机号码登录'
                      }
                    };
                    // 登录接口
                    that.http.post(AppComponent.apiUrl + '/v2/data/Login', loData).subscribe(res => {
                      let result = res as any;
                      if (result.resCode === 0) {
                        for (let i = 0; i < result.result.length; i++) {
                          if (result.result[i].Type == '1') {
                            // 获取token
                            that.storage.set('token', result.result[i].token);
                            that.storage.get('token').then((val) => {
                              console.log('Your token is', val);
                            });
                            that.search();
                            that.loadingController.dismiss({
                            });
                            Promise.all([
                              that.storage.get('MSTenantId'),
                              that.storage.get('UserId'),
                              that.storage.get('MSRecordId'),
                              that.storage.get('ExhibitorId')
                            ]).then(([tenantId1, userId1, recordId1, exhibitorId]) => {
                              const params = {
                                'tenantId': tenantId1,
                                'userId': userId1,
                                'params': {
                                  'condition': {
                                    'ExhibitionId': recordId1,
                                    'ExhibitorId': exhibitorId
                                  },
                                }
                              };
                              that.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', params)
                                .subscribe(res => {
                                  if (res) {
                                    that.ss = (res as any).result[0];
                                    if (that.ss.ApproveState === '1') {
                                      that.presentToast('店铺审核中');
                                      that.router.navigateByUrl('/tabs/examine-tip');
                                    } else if (that.ss.ApproveState === '2') {
                                      that.presentToast('登录成功');
                                      that.router.navigateByUrl('/tabs/tab1');
                                    } else {
                                      that.presentToast('完善店铺信息');
                                      that.router.navigateByUrl('/tabs/store-certification');
                                    }
                                    if (that.ss.HasFreeZe === true) {
                                      that.presentToast('店铺已被冻结');
                                      that.router.navigateByUrl('/tabs/frozen-tip');
                                    }
                                  }
                                });
                            });
                          }
                        }
                      } else {
                        that.loadingController.dismiss({
                        });
                        that.presentToast('登录失败');
                      }
                    });
                  });
                }
              }),
              error => {
                console.log('===========获取token，openID err============');
              };
          }
        });
    });
  }
  wechatLogin2() {
    var that = this;
    // 获取用户是否安装微信
    try {
      let scope = 'snsapi_userinfo',
        state = '_' + (+new Date());
      that.wechat
        .isInstalled()
        .then(installed => {
          that.wechat
            .auth(scope, state)
            .then(response => {
              // that.presentToast('授权登录中....');
              let res = response;
              // 在调用service的getAccessToken方法获取access_token，和acopenid，
              // 2. 后台获取token，openID, 获取用户信息并返回
              that.http
                .post(
                  AppComponent.apiUrl + '/v2/data/wxExhibitorGetUserInfoByLoginForMeishang',
                  {
                    code: res.code
                  }
                )
                .subscribe(function (res1: any) {
                  if (res1.resCode == 0) {
                    // 用户输入手机号查询是否注册
                    //   注册 调用登陆
                    //   未注册 调用注册
                    // that.wechatLogin(accessTokenResponse);
                    // that.presentToast('授权登录中....');
                    let openid = res1.result.openid;
                    let unionid = res1.result.unionid;
                    Promise.all([
                      that.storage.get('MSTenantId'),
                      that.storage.get('MSUserId'),
                      that.storage.get('MSRecordId')
                    ]).then(([tenantId, userId, recordId]) => {
                      let queryIsSign = {
                        tenantId: tenantId,
                        userId: userId,
                        params: {
                          condition: {
                            ExhibitionId: recordId,
                            OpenId: openid,
                            Unicode: unionid
                          }
                        }
                      };
                      // 查询展商表
                      that.http
                        .post(
                          AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo',
                          queryIsSign
                        )
                        .subscribe(res => {
                          if ((res as any).resCode == 0) {
                            const exLogo = (res as any).result[0].Logo;
                            const exName = (res as any).result[0].StockName;
                            that.storage.set('exLogo', exLogo);
                            that.storage.set('exName', exName);
                            // 微信直接登录注册过
                            let userInfo = (res as any).result[0];
                            // 存缓存
                            that.storage.set(
                              'ExhibitorExhibitionInfoId',
                              userInfo.RecordId
                            );
                            that.storage.set(
                              'ExhibitorId',
                              userInfo.ExhibitorId
                            );
                            that.storage.set(
                              'StockName',
                              userInfo.NickName
                            );
                            that.storage.set(
                              'Logo',
                              userInfo.Logo
                            );
                            Promise.all([
                              that.presentLoading('登录中...')
                            ]).then(() => {
                              let loginData = {
                                params: {
                                  Type: '1',
                                  Phone: userInfo.Tel,
                                  LoginType: '手机号码登录'
                                }
                              };
                              that.http.post(AppComponent.apiUrl + '/v2/data/Login', loginData)
                                .subscribe(res => {
                                  let result = res as any;
                                  if (result.resCode === 0) {
                                    for (let i = 0; i < result.result.length; i++) {
                                      if (result.result[i].Type == '1') {
                                        // 获取token
                                        that.storage.set('token', result.result[i].token);
                                        that.storage.get('token').then((val) => {
                                          console.log('Your token is', val);
                                        });
                                        that.search();
                                        that.loadingController.dismiss({
                                        });
                                        Promise.all([
                                          that.storage.get('MSTenantId'),
                                          that.storage.get('UserId'),
                                          that.storage.get('MSRecordId'),
                                          that.storage.get('ExhibitorId')
                                        ]).then(([tenantId1, userId1, recordId1, exhibitorId]) => {
                                          const params = {
                                            'tenantId': tenantId1,
                                            'userId': userId1,
                                            'params': {
                                              'condition': {
                                                'ExhibitionId': recordId1,
                                                'ExhibitorId': exhibitorId
                                              },
                                            }
                                          };
                                          that.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', params)
                                            .subscribe(res => {
                                              if (res) {
                                                that.ss = (res as any).result[0];
                                                if (that.ss.ApproveState === '1') {
                                                  that.presentToast('店铺审核中');
                                                  that.router.navigateByUrl('/tabs/examine-tip');
                                                } else if (that.ss.ApproveState === '2') {
                                                  that.presentToast('登录成功');
                                                  that.router.navigateByUrl('/tabs/tab1');
                                                } else {
                                                  that.presentToast('完善店铺信息');
                                                  that.router.navigateByUrl('/tabs/store-certification');
                                                }
                                                if (that.ss.HasFreeZe === true) {
                                                  that.presentToast('店铺已被冻结');
                                                  that.router.navigateByUrl('/tabs/frozen-tip');
                                                }
                                              }
                                            });
                                        });
                                      }
                                    }
                                  } else {
                                    that.loadingController.dismiss({
                                    });
                                    that.presentToast('授权登录失败');
                                  }
                                });
                            });
                          } else {
                            // 微信没有登录过，登陆成功后绑定手机号
                            that.presentModal1(res1.result);
                          }
                        });
                    });
                  } else {
                    this.presentToast('获取微信信息失败');
                  }
                }), error => {};
            }).catch(reason => {
              this.presentToast('微信授权失败');
            });
        })
        .catch(reason => {
          this.presentToast('暂未发现微信客户端');
        });
    } catch (error) {
      this.presentToast('登录失败');
    } finally {
    }
  }

  agreement() {
    this.router.navigateByUrl('/tabs/agreement');
  }

  // 直播
  live() {
    const resultData = {
      id: '',
      userSig: '',
      token: '',
      title: 'test直播间',
      cover: 'https://main.qcloudimg.com/raw/18c5ada2476fc2ac7d344350e2ad298e.png',
    };
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId')
    ]).then(([tenantId, userId]) => {
      // const requestData = {
      //   tenantId,
      //   userId,
      //   params: {
      //     condition: {
      //       RecordId: userId
      //     }
      //   }
      // };

      // 账号1
      // const requestData = {
      //   'tenantId':'532ad4c34138982cbb4e9397d26d107f',
      //   'userId':'5c1b0f1d3b428de40c40eecd',
      //   'params': {
      //     'condition': {
      //       'RecordId': '5c1b0f1d3b428de40c40eecd'
      //     }
      //   }
      // };
      // 账号2
      const requestData = {
        'tenantId': '532ad4c34138982cbb4e9397d26d107f',
        'userId': '5c20919d18f692289df0fd51',
        'params': {
          'condition': {
            'RecordId': '5c20919d18f692289df0fd51'
          }
        }
      };
      this.http.post('http://192.168.1.20:8081/portal-web/sxb/getUserInfo', requestData)
        .subscribe(res => {
          if ((res as any).code === 'true') {
            resultData.id = (res as any).userName;
            resultData.userSig = (res as any).userSig;
            resultData.token = (res as any).token;
            Act1Plugin.Login(resultData);
          }
        }, () => {
          this.presentToast('获取用户信息失败');
        });
    });
  }

  // 加载框
  async presentLoading(msg) {
    const loading = await this.loadingController.create({
      message: msg,
      // duration: 1500
    });
    await loading.present();
    loading.onDidDismiss().then(() => {
    }, () => { });
  }
}
