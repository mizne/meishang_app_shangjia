import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-examine-tip',
  templateUrl: './examine-tip.page.html',
  styleUrls: ['./examine-tip.page.scss'],
})
export class ExamineTipPage implements OnInit {

  constructor(private router: Router, private http: HttpClient,
              public storage: Storage, public nav: NavController,
              public toast: ToastController, public loadingController: LoadingController) { }

  ngOnInit() {
    this.search();
  }

  refreshStatus() {
    this.search();
  }

  // 查询店铺审核状态
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
          if ((res as any).resMsg === 'success') {
            if ((res as any).result[0].ApproveState === '2') {
              this.Login((res as any).result[0].Tel);
            } else if ((res as any).result[0].ApproveState === '3') {
              this.msgTip('您的审核未通过，请重新提交');
              this.router.navigateByUrl('/tabs/store-certification');
            }
          }
        });
    });
  }

  // 信息不能为空提示
  async msgTip(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
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

  Login(tel) {
    Promise.all([
      this.presentLoading('登录中...')
    ]).then(() => {
      let loData = {
        'params': {
          'Type': '1',
          'Phone': tel,
          'LoginType': '手机号码登录'
        }
      };
      // 登录接口
      this.http.post(AppComponent.apiUrl + '/v2/data/Login', loData).subscribe(res => {
        let result = res as any;
        if (result.resCode === 0) {
          for (let i = 0; i < result.result.length; i++) {
            if (result.result[i].Type == '1') {
              // 获取token
              this.storage.set('token', result.result[i].token);
              this.loadingController.dismiss({
              });
              this.router.navigateByUrl('/tabs/tab1');
            }
          }
        } else {
          this.loadingController.dismiss({
          });
          this.msgTip('登录失败');
        }
      }, error => {
        this.loadingController.dismiss({
        });
        this.msgTip('登录失败');
      });
    });
  }

}
