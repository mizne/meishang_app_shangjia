import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AppComponent } from '../../app.component';
import { ESdkObsService } from './../../esdk-obs.service';
@Component({
  selector: 'app-type-second',
  templateUrl: './type-second.page.html',
  styleUrls: ['./type-second.page.scss'],
})
export class TypeSecondPage implements OnInit {
  public firstid;
  // secondImg='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg';
  secondImg;
  secondname;
  constructor(
    public camera: Camera,
    public router: Router,
    public http: HttpClient,
    public storage: Storage,
    public nav: NavController,
    public toast: ToastController,
    private esdkObsService: ESdkObsService,
    private actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    // 获取一级分类的id
    let str = this.router.url;
    this.firstid = str.substring(str.length - 24);
  }

  // 添加二级分类
  second() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        let dd2 = {
          'userId': userId,
          'tenantId': tenantId,
          'params': {
            'condition': {
              // 'Name': this.secondname,
              // 'ExhibitionId': recordId,
              // 'ExhibitorId': exhibitorId,
              'CategoryFirstId': this.firstid,
              // 'Image':this.secondImg
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategorySecond', dd2).subscribe(res => {
          if ((res as any).resCode == 0) {
            let CategorySecondList = (res as any).result;
            let CategorySecondNameList = [];
            CategorySecondList.forEach(element => {
              CategorySecondNameList.push(element.Name);
              // element.Name.push(CategorySecondNameList)
            });
            if (CategorySecondNameList.indexOf(this.secondname) === -1) {
              // CategorySecondNameList.push(this.secondname);
              let dd = {
                'userId': userId,
                'tenantId': tenantId,
                'params': {
                  'record': {
                    'Name': this.secondname,
                    'ExhibitionId': recordId,
                    'ExhibitorId': exhibitorId,
                    'CategoryFirstId': this.firstid,
                    'Image': this.secondImg,
                  }
                }
              };
              this.http.post(AppComponent.apiUrl + '/v2/data/insert/CategorySecond', dd).subscribe(res => {
                if ((res as any).resCode === 0) {
                  let categorySecondId = (res as any).result.RecordId;
                  this.pack('添加分类成功', 1000);
                  // this.router.navigateByUrl('tabs/goods-add');
                  this.nav.back();
                  this.secondname = '';
                } else {
                  console.log('insert CategorySecond error');
                }
              });
            } else {
              this.pack('分类名称重复,请重新输入', 1000);
              this.secondname = '';
            }
          } else {
            let dd = {
              'userId': userId,
              'tenantId': tenantId,
              'params': {
                'record': {
                  'Name': this.secondname,
                  'ExhibitionId': recordId,
                  'ExhibitorId': exhibitorId,
                  'CategoryFirstId': this.firstid,
                  'Image': this.secondImg,
                }
              }
            };
            this.http.post(AppComponent.apiUrl + '/v2/data/insert/CategorySecond', dd).subscribe(res => {
              if ((res as any).resCode === 0) {
                let categorySecondId = (res as any).result.RecordId;
                this.pack('添加分类成功', 1000);
                // this.router.navigateByUrl('tabs/goods-add');
                this.nav.back();
                this.secondname = '';
              } else {
                console.log('insert CategorySecond error');
              }
            });
          }
        },
          // this.http.post(AppComponent.apiUrl + '/v2/data/insert/CategorySecond', dd).subscribe(res => {
          //   if ((res as any).resCode == 0) {
          //     let categorySecondId = (res as any).result.RecordId
          //     this.pack('添加分类成功', 1000)
          //     this.nav.back()
          //   }
          // },
          error => {
          });
      });
  }

  unique(arr1) {
    const res = new Map();
    return arr1.filter((a) => !res.has(a.Type) && res.set(a.Type, 1));
  }

  // 判断是否完善信息
  done() {
    if (this.secondname == undefined || this.secondImg == undefined) {
      this.pack('请完善信息', 1000);
    } else {
      // this.pack('添加成功',1000)
      this.second();
    }
  }

  back() {
    this.nav.back();
    this.secondImg = '';
    this.secondname = '';
  }

  // 封装提示函数
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
        //     that.secondImg = result_info;
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.secondImg = location;
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

  // 上传封面弹窗
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传封面',
      buttons: [{
        text: '拍照',
        // icon: 'share',
        handler: () => {
          let sourceType = this.camera.PictureSourceType.CAMERA;
          this.logoo(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
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
}
