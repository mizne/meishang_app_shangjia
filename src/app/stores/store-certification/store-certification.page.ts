import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NavController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppComponent } from '../../app.component';
import { ESdkObsService } from './../../esdk-obs.service';
@Component({
  selector: 'app-store-certification',
  templateUrl: './store-certification.page.html',
  styleUrls: ['./store-certification.page.scss'],
})
export class StoreCertificationPage implements OnInit {
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  RecordId: string;
  IDName;
  IDNum;
  license: string;
  // img: string='https://img4.imgtn.bdimg.com/it/u=2153937626,1074119156&fm=26&gp=0.jpg';
  // img1: string='https://img0.imgtn.bdimg.com/it/u=1396060710,1965075756&fm=26&gp=0.jpg';
  // img2: string='https://img0.imgtn.bdimg.com/it/u=2950114293,2240042191&fm=26&gp=0.jpg';
  img;
  img1;
  img2;
  public params;
  public isShow;
  public isWrite;
  public exRecordId;
  public state;
  public authRecordId;
  public IDPhone;
  constructor(public router: Router, public storage: Storage, public toast: ToastController,
    private imagePicker: ImagePicker, public http: HttpClient, public nav: NavController, public camera: Camera,
    public loadingController: LoadingController,
    private esdkObsService: ESdkObsService,
    private actionSheetController: ActionSheetController) { }

  ngOnInit() {
  }

  back() {
    this.nav.back();
  }

  ionViewWillEnter() {
    this.IDName = '';
    this.IDPhone = '';
    this.IDNum = '';
    this.license = '';
    this.img = '';
    this.img1 = '';
    this.img2 = '';
    this.search();
    // this.img = '../../assets/img/sakura.jpg';
    // this.img1 = '../../assets/img/sakura.jpg';
    // this.img2 = '../../assets/img/sakura.jpg';
    this.storage.clear();
  }

  // 获取营业证件
  busi(Type) {
    if (this.state === '2') {
      return;
    }
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      try {
        let base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        // let base64Image = 'data:video/jpeg;base64,' + file;    // 上传视频
        let teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     let result_info = (res as any).result;
        //     that.img = result_info;
        //     that.msgTip('证件上传中', 1000);
        //     //  that.msgTip('上传成功',1000)
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.img = location;
            that.presentToast('上传成功', 1500);
            that.loadingController.dismiss({
            });
          }, (e) => {
            that.presentToast('上传失败接口', 1500);
            that.loadingController.dismiss({
            });
          });
      } catch (error) {
        that.presentToast('上传失败catch', 1500);
        that.loadingController.dismiss({
        });
      }
    }, (err) => {
      console.log(err);
      that.presentToast('上传失败camera', 1500);
      that.loadingController.dismiss({
      });
      // Handle error
    });
  }

  // 获取身份证照片
  id1(Type) {
    if (this.state === '2') {
      return;
    }
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      try {
        let base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        // let base64Image = 'data:video/jpeg;base64,' + file;    // 上传视频
        let teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     let result_info = (res as any).result;
        //     that.img1 = result_info;
        //     that.msgTip('证件上传中', 1000);
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.img1 = location;
            that.presentToast('上传成功', 1500);
            that.loadingController.dismiss({
            });
          }, (e) => {
            that.presentToast('上传失败', 1500);
            that.loadingController.dismiss({
            });
          });
      } catch (error) {
        that.presentToast('上传失败', 1500);
        that.loadingController.dismiss({
        });
      }
    }, (err) => {
      console.log(err);
      that.presentToast('上传失败', 1500);
      that.loadingController.dismiss({
      });
      // Handle error
    });
  }

  // 获取身份证照片
  id2(Type) {
    if (this.state === '2') {
      return;
    }
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
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      try {
        let base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        // let base64Image = 'data:video/jpeg;base64,' + file;    // 上传视频
        let teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     let result_info = (res as any).result;
        //     that.img2 = result_info;
        //     that.msgTip('证件上传中', 1000);
        //     // that.msgTip('上传成功',1000)
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.img2 = location;
            that.presentToast('上传成功', 1500);
            that.loadingController.dismiss({
            });
          }, (e) => {
            that.presentToast('上传失败', 1500);
            that.loadingController.dismiss({
            });
          });
      } catch (error) {
        that.presentToast('上传失败', 1500);
        that.loadingController.dismiss({
        });
      }
    }, (err) => {
      console.log(err);
      that.presentToast('上传失败', 1500);
      that.loadingController.dismiss({
      });
      // Handle error
    });
  }

  // 信息不能为空提示
  async msgTip(msg, sec) {
    const toast = await this.toast.create({
      message: msg,
      duration: sec,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  // 添加店铺认证信息
  certifi() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId'),
      this.storage.get('UserName'),
      this.storage.get('Phone')
    ]).then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId, userName, phone]) => {
      this.params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'record': {
            'CorporateName': this.IDName,
            'CredentialAccount': this.IDNum + '',
            'CredentialImage1': this.img1,
            'CredentialImage2': this.img2,
            'BusinessNumber': this.license + '',
            'BusinessImage': this.img,
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId,
            'ExhibitorExhibitionInfoId': exhibitorExhibitionInfoId,
            'Name': this.IDName,
            'Phone': this.IDPhone
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/insert/AuthExhibitorInfo', this.params)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.updateInfo();
          }
        }, error => {
        });
    });
  }

  // 更新店铺认证信息
  updateCertificationInfo() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId'),
      this.storage.get('UserName'),
      this.storage.get('Phone')
    ]).then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId, userName, phone]) => {
      this.params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'recordId': this.authRecordId,
          'setValue': {
            'CorporateName': this.IDName,
            'CredentialAccount': this.IDNum + '',
            'CredentialImage1': this.img1,
            'CredentialImage2': this.img2,
            'BusinessNumber': this.license + '',
            'BusinessImage': this.img,
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId,
            'ExhibitorExhibitionInfoId': exhibitorExhibitionInfoId,
            'Name': this.IDName,
            'Phone': this.IDPhone,
            'IsApproved': false,
            'IsOperated': false
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/AuthExhibitorInfo', this.params)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.updateInfo();
          }
        }, error => {
        });
    });
  }

  // 判断信息
  save() {
    // 身份证18位和营业执照15位正则
    let id = this.IDNum;
    // let li = this.license;
    var reg = (/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/).test(id);
    // var reg1 = (/^\d{15}$/).test(li);  || reg1 === false
    if (reg === false) {
      this.msgTip('请检查是否合法', 1000);
    } else if (this.IDName === undefined || this.img === undefined ||
               this.license === '' || this.license === undefined ||
               this.img1 === undefined || this.img2 === undefined || this.IDPhone === undefined) {
      this.msgTip('请补全认证信息', 1000);
    } else {
      this.msgTip('认证审核中', 1000);
      if (this.state === '0') {
        this.certifi();
      } else if (this.state === '3') {
        this.updateCertificationInfo();
      }
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
            this.exRecordId = (res as any).result[0].RecordId;
            this.state = (res as any).result[0].ApproveState;
            if ((res as any).result[0].ApproveState === '0') { // 未审核
              this.isShow = true;
              this.isWrite = false;
            } else if ((res as any).result[0].ApproveState === '2') { // 审核通过
              this.isWrite = true;
              this.queryExamineInfo();
            } else if ((res as any).result[0].ApproveState === '3') { // 审核失败
              this.isShow = true;
              this.isWrite = false;
              this.queryExamineInfo();
            }
          }
        });
    });
  }

  // 更新店铺审核状态
  updateInfo() {
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
          'recordId': this.exRecordId,
          'setValue': {
              'ApproveState': '1'
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/ExhibitorExhibitionInfo', this.params)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            // this.nav.back();
            this.router.navigateByUrl('/tabs/examine-tip');
          }
        });
    });
  }

  // 查询审核信息
  queryExamineInfo() {
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
          'properties': [
            'ExhibitorExhibitionInfoId.ExhibitorExhibitionInfo.___all'
          ]
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/AuthExhibitorInfo', this.params)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.authRecordId = (res as any).result[0].RecordId;
            this.IDName = (res as any).result[0].CorporateName;
            this.IDPhone = (res as any).result[0].Phone;
            if (this.state === '3') {
              this.IDNum = (res as any).result[0].CredentialAccount;
              this.license = (res as any).result[0].BusinessNumber;
              this.img = (res as any).result[0].BusinessImage;
              this.img1 = (res as any).result[0].CredentialImage1;
              this.img2 = (res as any).result[0].CredentialImage2;
            } else if (this.state === '2') {
              const idNum1 = (res as any).result[0].CredentialAccount;
              const idNum1First = idNum1.substring(0, 4);
              const idNum1Last = idNum1.substring(idNum1.length - 4);

              const idNum2 = (res as any).result[0].BusinessNumber;
              const idNum2First = idNum2.substring(0, 4);
              const idNum2Last = idNum2.substring(idNum2.length - 4);

              this.IDNum = idNum1First + '**********' + idNum1Last;
              this.license = idNum2First + '*******' + idNum2Last;
              this.img = '';
              this.img1 = '';
              this.img2 = '';
            }
          }
        });
    });
  }

  checkState(state) {
    if (state === '0' || state === '3') {
      return '预计在三个工作日完成人工审核';
    } else if (state === '2') {
      return '您已通过审核';
    }
  }

  checkImgState1(state) {
    if (state === '0' || state === '3') {
      return '上传副本';
    } else if (state === '2') {
      return '已上传';
    }
  }

  checkImgState2(state) {
    if (state === '0' || state === '3') {
      return '上传正面';
    } else if (state === '2') {
      return '已上传';
    }
  }

  checkImgState3(state) {
    if (state === '0' || state === '3') {
      return '上传背面';
    } else if (state === '2') {
      return '已上传';
    }
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

  // 上传封面弹窗
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传封面',
      buttons: [{
        text: '拍照',
        // icon: 'share',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.CAMERA;
          this.busi(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.busi(sourceType);
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

  // 上传封面弹窗
  async presentActionSheetIDCard1() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传封面',
      buttons: [{
        text: '拍照',
        // icon: 'share',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.CAMERA;
          this.id1(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.id1(sourceType);
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

  // 上传封面弹窗
  async presentActionSheetIDCard2() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传封面',
      buttons: [{
        text: '拍照',
        // icon: 'share',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.CAMERA;
          this.id2(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.id2(sourceType);
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
}
