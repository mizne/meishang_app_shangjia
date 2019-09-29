import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { ESdkObsService } from './../../esdk-obs.service';
@Component({
  selector: 'app-store-management',
  templateUrl: './store-management.page.html',
  styleUrls: ['./store-management.page.scss'],
})
export class StoreManagementPage implements OnInit {
  public params;
  public data;
  ss: any;
  TenantId: string;
  UserId: string;
  RecordId: string;
  ExhibitorId: string;
  logoSrc;
  public isApproveState;
  constructor(
    public alertController: AlertController,
    public toast: ToastController,
    public camera: Camera,
    public router: Router,
    public storage: Storage,
    public http: HttpClient,
    private imagePicker: ImagePicker,
    public loadingController: LoadingController,
    private esdkObsService: ESdkObsService,
    private actionSheetController: ActionSheetController
  ) { }

  ionViewWillEnter() {
    this.search();
  }

  ngOnInit() {
  }
  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }
  viewStore() {
    this.router.navigateByUrl('/tabs/store');
  }
  storeInfo() {
    this.router.navigateByUrl('/tabs/store-info');
  }
  storeName() {
    this.router.navigateByUrl('/tabs/store-edit-name');
  }
  storeIntroduce() {
    this.router.navigateByUrl('/tabs/store-edit-introduce');
  }
  storeCertification() {
    if (this.isApproveState === '2') {
      this.router.navigateByUrl('/tabs/store-certification-success');
    } else {
      this.router.navigateByUrl('/tabs/store-certification');
    }
  }


  // 退出登录

  async quit() {
    const alert = await this.alertController.create({
      message: '你确定退出美尚荟吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: '确定',
          handler: () => {
            this.storage.clear();
            this.InitStorage();
            this.router.navigateByUrl('/tabs/verification');
          }
        }
      ]
    });

    await alert.present();
  }

  InitStorage() {
    this.data = {
      'params': {
        'condition': {
          'ExName': '美尚云讯'
        }
      }
    };
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Exhibition', this.data).subscribe(res => {
      if ((res as any).resCode === '0') {
        let ss = (res as any).result[0];
        this.storage.set('MSTenantId', ss.TenantId);
        this.storage.set('MSUserId', ss.UserId);
        this.storage.set('MSRecordId', ss.RecordId);
        this.storage.get('MSTenantId').then((val) => {
          // alert('Your TenantId is '+ val);
        });
        this.storage.get('MSUserId').then((val) => {
          // alert('Your UserId is '+val);
        });
        this.storage.get('MSRecordId').then((val) => {
          // alert('Your RecordId is '+val);
        });
      }
    });
  }

  // 提示函数封装
  async logoTip(msg, sec) {
    const toast = await this.toast.create({
      message: msg,
      duration: sec,
      position: 'top',

      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  // 上传封面弹窗
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传封面',
      buttons: [{
        text: '拍照',
        // icon: 'share',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.CAMERA;
          this.logoo(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.logoo(sourceType);
        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
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

  // 提示函数封装
  async presentToast(msg, sec) {
    const toast = await this.toast.create({
      message: msg,
      duration: sec,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  // 添加头像
  logoo(Type) {
    var that = this;
    // 重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。 
    // mediaType        PICTURE、VIDEO、ALLMEDIA
    const options: CameraOptions = {
      quality: 100,
      sourceType: Type,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE                // 上传图片
      // mediaType: this.camera.MediaType.VIDEO               // 上传视频
    };
    this.presentLoading('图片上传中...');
    this.camera.getPicture(options).then((file) => {
      try {
        let base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        // let base64Image = 'data:video/jpeg;base64,' + file;    // 上传视频
        let teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     let result_info = (res as any).result;
        //     that.logoSrc = result_info;
        //     that.editlogo();
        //     // that.logoTip('上传成功',1000)
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.logoSrc = location;
            that.editlogo();
            that.presentToast('上传成功', 1500);
            that.loadingController.dismiss({
            });
          }, (e) => {
            that.presentToast('上传失败', 1500);
            that.loadingController.dismiss({
            });
            alert(`upload image failure: ${e.message}`);
          });
      } catch (error) {
        that.presentToast('上传失败', 1500);
        that.loadingController.dismiss({
        });
      }
    }, (err) => {
      that.presentToast('上传失败', 1500);
      that.loadingController.dismiss({
      });
      console.log(err);
    });
  }

  // 查询店铺信息
  search() {
    Promise.all([
      // this.storage.get('ExhibitorExbihitionInfoId'),
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
          if ((res as any).resCode === 0) {
            this.ss = (res as any).result[0];
            // this.ss.Logo=this.logoSrc
            this.isApproveState = this.ss.ApproveState;
          }
        });
    });
  }

  // 修改logo
  editlogo() {
    Promise.all([
      this.storage.get('ExhibitorExbihitionInfoId'),
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([exhibitorExbihitionInfoId, tenantId, userId, recordId, exhibitorId]) => {
      this.params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'recordId': this.ss.RecordId,
          'setValue': {
            // 'Logo':this.logoSrc,
            'Logo': this.logoSrc,
          }
        }
      };

      this.http.post(AppComponent.apiUrl + '/v2/data/update/ExhibitorExhibitionInfo', this.params)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            // this.logoTip('logo上传中', 3000);
            this.search();
          }
        });
    });
  }

  rePassword() {
    this.router.navigateByUrl('/tabs/store-change-password');
  }
}
