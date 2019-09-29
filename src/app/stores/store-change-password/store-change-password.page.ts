import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-store-change-password',
  templateUrl: './store-change-password.page.html',
  styleUrls: ['./store-change-password.page.scss'],
})
export class StoreChangePasswordPage implements OnInit {
  public newPassword1;
  public newPassword;
  constructor(
    public nav: NavController,
    public toastController: ToastController,
    public router: Router,
    private http: HttpClient,
    public storage: Storage,
  ) { }

  ngOnInit() {
    this.newPassword = '';
    this.newPassword1 = '';
  }

  async presentToast(msg, time) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time,
      cssClass: 'toast-wrapper',
      position: 'middle'
    });
    toast.present();
  }

  changePassword() {
    if (this.newPassword == '') {
      // alert('请设置密码')
      this.presentToast('请输入修改密码', 2000);
    } else if (this.newPassword1 != this.newPassword) {
      // alert('两次输入密码不一致')
      this.presentToast('两次输入密码不一致', 2000);
    } else {
      // 修改密码
      Promise.all([
        this.storage.get('MSTenantId'),
        this.storage.get('UserId'),
        this.storage.get('ExhibitionId')
      ]).then(([tenantId, userId, exhibitionId]) => {
        let teachingData = {
          UserId: userId,
          TenantId: tenantId,
          'params': {
            'recordId': userId,
            'Type': '1',
            'setValue': {
              'UserPassword': this.newPassword1
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/User', teachingData)
          .subscribe(res => {
            if ((res as any).resCode == 0) {
              this.presentToast('密码修改成功', 3000);
              this.newPassword = '';
              this.newPassword1 = '';
              this.router.navigateByUrl('/tabs/store-management');
            }
            // this.CategoriesFirstList = (res as any).result;
          });
      });
    }
  }

  back() {
    this.router.navigateByUrl('/tabs/store-management');
  }
}
