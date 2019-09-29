import { ESdkObsService } from './../../esdk-obs.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { ActionSheetController } from '@ionic/angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-course-release',
  templateUrl: './course-release.page.html',
  styleUrls: ['./course-release.page.scss']
})
export class CourseReleasePage implements OnInit {
  form: FormGroup;
  postBack = [];
  public arr;
  public params;
  public data;
  public ExhibitorId;
  public videoPoster;
  courseTt: string;
  courseCover;
  courseIntroduce: string;
  public courseMoney: number;
  TenantId: string;
  UserId: string;
  RecordId: string;
  image: string;
  video: string;
  introduce: string;
  title: string;
  public progressIndex;
  public isUplodaing;
  public progress1;
  public progress;
  // 上传视频中，返回键停止请求
  public subscription: Subscription = Subscription.EMPTY;
  public rate;
  public flag;
  constructor(
    public router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public storage: Storage,
    public camera: Camera,
    public toast: ToastController,
    public loadingController: LoadingController,
    private esdkObsService: ESdkObsService,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.progressIndex = 0;
    this.arr = [{}];
    this.isUplodaing = false;
    this.rate = 0;
    this.courseCover = '';
  }

  gotoadd() {
    const ss = {
    };
    this.arr.push(ss);
    console.log(JSON.stringify(this.arr));
  }

  gotodelete(index) {
    this.arr.splice(index, 1);
  }

  back() {
    const test = document.getElementById('feature') as HTMLInputElement;
    if (test.value !== null || test.value !== undefined || test.value !== '') {
      test.value = '';
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isUplodaing = false;
    }
    this.router.navigateByUrl('/tabs/course-manage');
  }

  // test
  testTitle() {
    this.arr.forEach((element, index) => {
      if (element.title === '' || undefined === element.title) {
        element.title = '第' + (index + 1 ) + '节标题';
      }
    });
  }

  // 发布教程
  release() {
    if (this.courseMoney === null || this.courseMoney === undefined) {
      this.courseMoney = 0;
    }
    this.flag = true;
    this.arr.forEach((element, index) => {
      if (element.title === '' || undefined === element.title) {
        element.title = '第' + (index + 1 ) + '节标题';
      }
    });
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId'), this.storage.get('ExhibitorExhibitionInfoId')])
      .then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId]) => {
        this.params = {
          tenantId: tenantId,
          userId: userId,
          params: {
            record: {
              ProductName: '',
              SourceType: '商城',
              ProductType: '课程',
              CourseTitle: this.courseTt,
              CourseFirstImage: this.courseCover,
              CourseIntroduction: this.courseIntroduce,
              CourseList: this.arr,
              IsShow: true,
              ExhibitionId: recordId,
              ExhibitorId: exhibitorId,
              ExhibitorExhibitionInfoId: exhibitorExhibitionInfoId,
              ProductPrice: this.courseMoney,
              IsCourseApprove: '0'
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/insert/Product', this.params)
          .subscribe(
            res => {
              if ((res as any).resCode === 0) {
                this.courseTt = '';
                this.courseIntroduce = '';
                this.courseCover = '';
                this.courseIntroduce = '';
                this.courseMoney = 0;
                this.arr = [{}];
                this.router.navigateByUrl('/tabs/course-manage');
              }
            },
            error => {
              console.log(error);
            }
          );
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
          let sourceType =  this.camera.PictureSourceType.CAMERA;
          this.courecover(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.courecover(sourceType);
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

  // 上传子课程封面弹窗
  async presentActionSheetChild(index) {
    const actionSheet = await this.actionSheetController.create({
      header: '上传封面',
      buttons: [{
        text: '拍照',
        // icon: 'share',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.CAMERA;
          this.courecover1(sourceType, index);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.courecover1(sourceType, index);
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

  // 上传课程封面
  courecover(Type) {
    const that = this;
    // 重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。
    // mediaType        PICTURE、VIDEO、ALLMEDIA
    const options: CameraOptions = {
      quality: 80,
      sourceType: Type,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE                // 上传图片
      // mediaType: this.camera.MediaType.VIDEO               // 上传视频
    };
    this.presentLoading('图片通过华为云OBS服务上传中...');
    this.camera.getPicture(options).then((file) => {
      try {
        const base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        // let base64Image = 'data:video/jpeg;base64,' + file;    // 上传视频
        const teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     const result_info = (res as any).result;
        //     that.courseCover = result_info;
        //     // this.videoPoster = result_info;
        //     // that.presentToast('上传成功', 1000);
        //     that.loadingController.dismiss({
        //     });
        //   });

        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.courseCover = location;
            // alert(location);
            // this.videoPoster = result_info;
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
      console.log(err);
      that.presentToast('上传失败', 1500);
      that.loadingController.dismiss({
      });
    });
  }

  // 上传子课程封面
  courecover1(Type, index) {
    this.presentLoading('图片上传中...');
    const that = this;
    const options: CameraOptions = {
      quality: 100,
      sourceType: Type,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE                // 上传图片
      // mediaType: this.camera.MediaType.VIDEO               // 上传视频
    };
    this.camera.getPicture(options).then((file) => {
      try {
        const base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        // let base64Image = 'data:video/jpeg;base64,' + file;    // 上传视频
        const teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     // that.presentToast('图片上传中',4000)
        //     const result_info = (res as any).result;
        //     that.arr[index].image = result_info;
        //     // that.presentToast('上传成功', 1000);
        //     that.loadingController.dismiss({
        //     });
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.arr[index].image = location;
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
      console.log(err);
      that.presentToast('上传失败', 1500);
      that.loadingController.dismiss({
      });
    });
  }

  // 上传子课程视频
  // courevideo1(e, index) {
  //   const that = this;
  //   try {
  //     const file = e.srcElement.files[0]; // 获取图片 或者 视频 这里只操作一张图片
  //     this.video = window.URL.createObjectURL(file); // 获取上传的图片临时路径
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     this.presentLoading('视频上传中...');
  //     reader.onload = function (params: any) {
  //       alert(JSON.stringify(params));
  //       const base64Image = params.target.result;
  //       const teachingData = {
  //         url: base64Image
  //       };
  //       that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
  //           // 'https://api.baizhanke.com/v2/data/upload',
  //         .subscribe(res => {
  //           const result_info = (res as any).result;
  //           that.arr[index].video = result_info;
  //           that.loadingController.dismiss({
  //           });
  //         });
  //     };
  //   } catch (error) {
  //     that.loadingController.dismiss({
  //     });
  //   }
  // }

  // 取消上传视频
  goToCancel() {
    const test = document.getElementById('feature') as HTMLInputElement;
    test.value = '';
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.isUplodaing = false;
    }
  }

  // 上传视频
  fileChange(e, i) {
    const that = this;
    this.progressIndex = i;
    const file = e.srcElement.files[0];
    that.video = window.URL.createObjectURL(file);
    // if (file.size <= 10 * 1024 * 1024) {
    //   that.presentLoading('视频上传中...');
    // }
    this.rate = 0
    that.subscription = that.esdkObsService.uploadFile(file)
    .subscribe((location) => {
      if (typeof location === 'string') {
        this.isUplodaing = false;
        that.presentToast('上传成功', 1500);
        // that.loadingController.dismiss({
        // });
        that.arr[i].video = location;
        e.target.value = '';
        console.log(`upload video success location: ${location}`);
      } else {
        this.isUplodaing = true;
        if (location < this.rate) {
          return;
        }
        this.rate = location;
        let locations = this.rate / 100
        that.progress1 = parseInt(this.rate + "");
        let progressStr = locations + ""
        that.progress = progressStr.substring(0, 4);
      }
    }, (err) => {
      console.log(`upload video error: ${err.message}`);
      // that.loadingController.dismiss({
      // });
      alert(`上传视频错误: ${err.message}`);
    });

    // try {
    //   const file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
    //   // alert(JSON.stringify(file))
    //   this.video = window.URL.createObjectURL(file); // 获取上传的图片临时路径
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   // that.presentToast('视频上传中...', 4000);
    //   this.presentLoading('视频上传中...');
    //   reader.onload = function (params: any) {
    //     // alert(JSON.stringify(params))
    //     const base64Image = params.target.result;
    //     const teachingData = {
    //       url: base64Image
    //     };
    //     that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
    //         // 'https://api.baizhanke.com/v2/data/upload',
    //       .subscribe(res => {
    //         const result_info = (res as any).result;
    //         // that.presentToast('视频上传成功', 1000);
    //         that.loadingController.dismiss({
    //         });
    //         that.arr[i].video = result_info;
    //         // let videoPer = {
    //         //   'url': result_info,
    //         //   'img': that.videoPoster
    //         // }
    //         // that.arr[i].video = videoPer;
    //         e.target.value = '';
    //         // setTimeout(() => {
    //         //   that.pauseVideo();
    //         // }, 2700);
    //       });
    //   };
    // } catch (error) {
    //   that.loadingController.dismiss({
    //   });
    //   alert('error');
    //   alert(JSON.stringify(error));
    // }
  }

  pauseVideo() {
    const video = document.querySelector('video');
    if (video.currentTime >= 1) {
      video.pause();
    }
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

  // 信息不能为空提示
  async msgTip() {
    const toast = await this.toast.create({
      message: '信息、视频或图片不能为空',
      duration: 2000,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  // 课程发布
  bl() {
    if (this.courseTt == null || this.courseIntroduce == null ||
      this.courseCover == null || this.courseCover === undefined || this.courseCover === '') {
      this.msgTip();
    } else {
      this.release();
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
}
