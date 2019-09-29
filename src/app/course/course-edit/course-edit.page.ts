import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ESdkObsService } from './../../esdk-obs.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, LoadingController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.page.html',
  styleUrls: ['./course-edit.page.scss']
})
export class CourseEditPage implements OnInit {
  public courseDetailsInfo;
  public courseId;
  public goodsList;
  public courseDetails;
  public routesInfo;
  public courselist;
  form: FormGroup;
  postBack = [];
  public arr;
  public params;
  public data;
  public ExhibitorId;
  courseTt: string;
  backCover;
  courseIntroduce: string;
  TenantId: string;
  UserId: string;
  RecordId: string;
  image: string;
  video: string;
  introduce: string;
  title: string;
  public courseMoney: number;
  public isUplodaing;
  public progress1;
  public progress;
  public progressIndex;

  // 上传视频中，返回键停止请求
  public videoUploadRate = 0;
  public subscription: Subscription = Subscription.EMPTY;
  public rate;

  public courseState;
  public courseApproveReason;

  public checkMoreFlag;
  constructor(
    public router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public storage: Storage,
    public camera: Camera,
    public toast: ToastController,
    public nav: NavController,
    public loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private esdkObsService: ESdkObsService,
  ) {
    const str = this.router.url;
    this.courseId = str.substring(str.length - 24);
  }

  ngOnInit() {
    this.progressIndex = 0;
    // this.arr = [{image:'',title:'',video:'',introduce:''}];
    // this.arr ===this.courseDetailsInfo
    this.rate = 0;
  }

  ionViewWillEnter() {
    // 页面进入之前调接口
    this.getCourseDetails();
    this.checkMoreFlag = false;
  }

  // 修改课程
  editCourse() {
    if (this.courseMoney === null || this.courseMoney === undefined) {
      this.courseMoney = 0;
    }
    this.arr.forEach((element, index) => {
      if (element.title === '' || undefined === element.title) {
        element.title = '第' + (index + 1 ) + '节标题';
      }
    });
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
    ]).then(([tenantId, userId, recordId]) => {
      const co = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'recordId': this.courseId,
          'setValue': {
            CourseTitle: this.courseTt,
            CourseFirstImage: this.backCover,
            CourseIntroduction: this.courseIntroduce,
            CourseList: this.arr,
            ProductPrice: this.courseMoney,
            IsCourseApprove: '0'
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', co)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.presentToast('修改成功', 1000);
            this.nav.back();
          }
        });
    });
  }

  // 添加节数
  gotoadd() {
    const ss = {
    };
    this.arr.push(ss);
  }

  // 删除节数
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

  // 查询课程详情
  getCourseDetails() {
    // this.courseId
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
    ]).then(([tenantId, userId, recordId]) => {
      const courseData = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            ExhibitionId:  recordId,
            RecordId: this.courseId
          },
          options: { 'pageIndex': 1, 'pageSize': 10 },
          childObjects: [
            {
              'fieldName': 'Product',
              'reference': {
                'object': 'Product',
                'field': 'ProductId'
              }
            }
          ]
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product', courseData)
        .subscribe(res => {
          this.courseDetailsInfo = (res as any).result;
          this.goodsList = (res as any).result[0];
          this.courseTt = (this.goodsList).CourseTitle;
          this.backCover = (this.goodsList).CourseFirstImage;
          this.arr = (this.goodsList as any).CourseList;
          this.routesInfo = (this.goodsList as any).Product;
          this.courseIntroduce = (this.goodsList as any).CourseIntroduction;
          this.courseState = (res as any).result[0].IsCourseApprove;
          this.courseApproveReason = (res as any).result[0].CourseApproveReason;
        });
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
          this.courseSon(sourceType, index);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.courseSon(sourceType, index);
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
        const base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        // let base64Image = 'data:video/jpeg;base64,' + file;    // 上传视频
        const teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     const result_info = (res as any).result;
        //     // alert(result_info)
        //     that.backCover = result_info;
        //     // that.presentToast('上传成功', 1000);
        //     that.loadingController.dismiss({
        //     });
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.backCover = location;
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
  courseSon(Type, index) {
    const that = this;
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
// courevideo1(e,index) {
//   var that = this;
//     try {

//       const file = e.srcElement.files[0]; // 获取图片 或者 视频 这里只操作一张图片
//       alert(JSON.stringify(file))
//       this.video = window.URL.createObjectURL(file); // 获取上传的图片临时路径
//       var reader = new FileReader();
//       reader.readAsDataURL(file);

//       reader.onload = function (params: any) {
//         alert(JSON.stringify(params))
//         let base64Image = params.target.result;
//         let teachingData = {
//           url: base64Image
//         };
//         that.http
//           .post(
//             AppComponent.apiUrl + '/v2/data/upload',
//             // 'https://api.baizhanke.com/v2/data/upload',
//             teachingData
//           )
//           .subscribe(res => {
//             let result_info = (res as any).result;
//             that.arr[index].video = result_info;
//             that.presentToast('上传成功',1000)
//           });
//       }
//     } catch (error) {
//     }
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
      console.log(`upload video error: ${err.message}`)
      // that.loadingController.dismiss({
      // });
      alert(`上传视频错误: ${err.message}`);
    });

    // try {
    //   const file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
    //   this.video = window.URL.createObjectURL(file); // 获取上传的图片临时路径
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   this.presentLoading('视频上传中...');
    //   reader.onload = function (params: any) {
    //     const base64Image = params.target.result;
    //     const teachingData = {
    //     url: base64Image
    //     };
    //     that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
    //     // 'https://api.baizhanke.com/v2/data/upload',
    //       .subscribe(res => {
    //         const result_info = (res as any).result;
    //         // that.presentToast('视频上传成功', 1000);
    //         that.arr[i].video = result_info;
    //         e.target.value = '';
    //         that.loadingController.dismiss({
    //         });
    //         // const video = document.querySelector('video');
    //         // video.addEventListener('loadeddata', (event) => {
    //         //   that.captureImage();
    //         // });
    //         // setTimeout(() => {
    //         //   that.pauseVideo();
    //         // }, 2700);
    //       });
    //   };
    // } catch (error) {
    //   that.loadingController.dismiss({
    //   });
    // }
  }

  pauseVideo() {
    const video = document.querySelector('video');
    if (video.currentTime >= 1) {
      video.pause();
    }
  }
  // captureImage() {
  //   const canvas = document.createElement('canvas');
  //   const video = document.querySelector('video');
  //   const scale = 0.8;
  //   canvas.width = video.videoWidth * scale;
  //   canvas.height = video.videoHeight * scale;
  //   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

  //   const src = canvas.toDataURL('image/png');
  //   console.log(src);
  // }

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

  checkMoreInfo() {
    if (this.checkMoreFlag) {
      this.checkMoreFlag = false;
    } else {
      this.checkMoreFlag = true;
    }
  }

  changeBtn() {
    if (this.checkMoreFlag) {
      return '收起';
    } else {
      return '详细原因';
    }
  }
}
