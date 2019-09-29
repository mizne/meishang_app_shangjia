import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NavController, ToastController, ActionSheetController, LoadingController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { ESdkObsService } from './../../esdk-obs.service';
declare var Act1Plugin: any;
@Component({
  selector: 'app-appoint-live',
  templateUrl: './appoint-live.page.html',
  styleUrls: ['./appoint-live.page.scss']
})
export class AppointLivePage implements OnInit {
  public params;
  liveType: string;
  liveTitle: string;
  liveTime: string;
  liveBg;
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  ExhibitionId: string;
  RecordId: string;
  startTime: string;
  endTime: string;
  apply: boolean;
  public resultData;
  constructor(
    public router: Router,
    public http: HttpClient,
    public storage: Storage,
    public toast: ToastController,
    public camera: Camera,
    public nav: NavController,
    private esdkObsService: ESdkObsService,
    private actionSheetController: ActionSheetController,
    public loadingController: LoadingController,
    ) {
    this.startTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
    this.endTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString();
  }

  ngOnInit() {
    this.resultData = {
      id: '',
      userSig: '',
      token: '',
      title: 'test直播间',
      cover: 'https://main.qcloudimg.com/raw/18c5ada2476fc2ac7d344350e2ad298e.png',
      tenantId: '',
      UserId: '',
      recordId: '',
      AliveState: '2'
    };
  }

  ionViewWillEnter() {
    this.liveBg = 'https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/1560305725724-0.740-image.png';
  }
  back() {
    this.router.navigateByUrl('/tabs/course-manage');
  }

  // 预约直播
  live() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('MSUserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId')
    ]).then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId]) => {
      this.params = {
        'tenantId': tenantId,
        'UserId': userId,
        'params': {
          'record': {
            'Name': '课程',
            'Title': this.liveTitle,
            AppointmentStartTime: this.startTime,
            AppointmentEndTime: this.endTime,
            'CourseFirstImage': this.liveBg,
            'CourseIntroduction': '',
            'CourseList': [{ 'title': '', 'image': [], 'video': [], 'introduce': '' }],
            'ExhibitionId': recordId,
            'ExhibitorId': exhibitorId,
            'ExhibitorExhibitionInfoId': exhibitorExhibitionInfoId,
            'AliveState': '0'
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/insert/BroadcastAppointment', this.params)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.islive('预约成功,开始直播吧', 2000);
            this.apply = !this.apply;
            // 存缓存
            this.storage.set('LIVERecordId', (res as any).result.RecordId);
            this.storage.get('LIVERecordId').then((val) => {
              console.log('Your LIVERecordId is', val);
            });
          }
        }, error => {
          console.log(error);
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
          this.livebg(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType =  this.camera.PictureSourceType.PHOTOLIBRARY;
          this.livebg(sourceType);
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

  // 获取直播背景
  livebg(Type) {
    var that = this;
    // 重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。
    // mediaType        PICTURE、VIDEO、ALLMEDIA
    const options: CameraOptions = {
      quality: 100,
      sourceType: Type,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE                // 上传图片
    };
    this.presentLoading('图片上传中...');
    this.camera.getPicture(options).then((file) => {
      try {
        let base64Image = 'data:image/jpeg;base64,' + file;     // 上传图片
        let teachingData = {
          url: base64Image
        };
        // that.http.post(AppComponent.apiUrl + '/v2/data/upload', teachingData)
        //   .subscribe(res => {
        //     that.islive('图片上传中', 3000);
        //     let result_info = (res as any).result;
        //     that.liveBg = result_info;
        //     // that.islive('上传成功',1000)
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.liveBg = location;
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
      // Handle error
    });
  }

  // 信息不能为空提示
  async msgTip() {
    const toast = await this.toast.create({
      message: '申请失败,请完善信息',
      duration: 2000,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  async islive(msg, sec) {
    const toast = await this.toast.create({
      message: msg,
      duration: sec,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  // 判断申请直播
  applyLive() {
    if (this.liveTitle == null || this.liveType == null || this.liveBg == null || this.endTime == null || this.startTime == null) {
      this.msgTip();
    } else {
      this.live();
    }
  }

  // 改变直播中状态
  ChangeAliveState1() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('MSUserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId'),
      this.storage.get('LIVERecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId, exhibitorExhibitionInfoId, LIVERecordId]) => {
      const updateAliveState = {
        'tenantId': tenantId,
        'UserId': userId,
        'params': {
          'recordId': LIVERecordId,
          'setValue': {
            'AliveState': '1'
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/BroadcastAppointment', updateAliveState)
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            // alert('ChangeAliveState1 suc')
          }
        }, error => {
          console.log('====ChangeAliveState1 error===');
        });
    });
  }

  // 开始直播
  StartLive() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('LIVERecordId'),
      // this.storage.get('MSTenantId'),
      // this.storage.get('MSUserId')
    ]).then(([tenantId, userId, LIVERecordId]) => {
      this.resultData.tenantId = tenantId;
      this.resultData.UserId = userId;
      this.resultData.recordId = LIVERecordId;
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
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'recordId': userId
          }
        }
      };
      this.http.post('http://47.96.113.171:8100/portal-web/sxb/getUserInfo', requestData)
      // this.http.post('http://192.168.199.207:8081/portal-web/sxb/getUserInfo', requestData)
        .subscribe(res => {
          // alert('======点击开始直播=====');
          // alert(JSON.stringify(requestData));
          if ((res as any).code === 'true') {
            this.resultData.id = (res as any).userName;
            this.resultData.userSig = (res as any).userSig;
            this.resultData.token = (res as any).token;
            // alert('======跳转直播=====');
            this.ChangeAliveState1();
            Act1Plugin.Login(this.resultData);
          } else {
            alert(JSON.stringify((res as any)));
          }
        }, () => {
          // alert('getUserInfo failed');
        });
    });
  }
}
