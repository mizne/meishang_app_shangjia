import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { AddTeachingNewPage } from '../add-teaching-new/add-teaching-new.page';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { $, $$ } from 'protractor';
// import { ToastController } from "ionic/angular";
import { NavParams } from '@ionic/angular';
import { NgModel } from '@angular/forms';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.page.html',
  styleUrls: ['./add-lesson.page.scss'],
})
export class AddLessonPage implements OnInit {
  public courList;
  public title;
  public UserId;
  public TenantId;
  public ExhibitionId;
  public StepsList;
  public VisitorRecordId;
  public ProductName;
  public FirstPic;
  public CategoriesFirstList;
  public categorySelect;
  public selectOptions;
  public selecText;
  public list;
  public testPicUrl;
  public videoUrl
  public videoPoster
  public PicList
  public videoFile
  public album
  public isFirsrNull
  public addSource//0首页 1 详情页
public teachingId

  constructor(
    public navParams: NavParams,
    public alertController: AlertController,
    public modalController: ModalController,
    public nav: NavController,
    public toastController: ToastController,
    public router: Router,
    private http: HttpClient,
    public storage: Storage,
    private camera: Camera,

    public _d: DomSanitizer // 图片路径转换使用，使用见HMTL文件
  ) { 


    this.addSource = this.navParams.data.source
    if (this.addSource=="1"){
      this.teachingId = this.navParams.data.teachingId
    }
  }

  ngOnInit() {
    this.isFirsrNull = true
    this.album = []
    this.PicList = []
    // console.log("=====new=====this.PicList====" + this.PicList.length + "======")

    this.selecText = ""
    this.FirstPic = ""
    
    // this.goToNextCategory()
    this.ProductName = ""
    this.StepsList = [
      {
        title: "步骤1",
        picList: [
          // "https://img.huizhanren.cn/upload/image/20171228/1AC63030-9B3D-4720-A2FC-4F69C43C0965.png",
          // "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/bd600dbf-bb70-441e-8b12-3a4e1f584659.jpg",
          // "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/f2169cd7-c311-47ea-83f9-9032d938d1f0.jpg",
          // "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/4350ed29-c706-47f2-82aa-d45d4f6d8f5a.jpg",
          // "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/e81cd536-86be-478f-9e43-dbfd2d1a0d65.jpg",
          // "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/ef14ad51-9d8f-4ee1-885c-75f96a1722bf.jpg",
          //      "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/ebfd9d8b-aa30-4484-88ee-e43f260514f0.jpg"
        ],
        desc: "步骤描述信息",
        video: [
          // { "url": "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/1557737410811-0.419-video.mp4", "img":"https://1047.cdn-vod.huaweicloud.com/asset/88bb645d3432f94af14c99660a9c2637/cover/Cover0.jpg"},
          // { "url": "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/1557737410811-0.419-video.mp4", "img": "https://1047.cdn-vod.huaweicloud.com/asset/88bb645d3432f94af14c99660a9c2637/cover/Cover0.jpg" },
          // { "url": "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/1557737410811-0.419-video.mp4", "img": "https://1047.cdn-vod.huaweicloud.com/asset/88bb645d3432f94af14c99660a9c2637/cover/Cover0.jpg" }
        ]
      }
    ];
  }
  ionViewWillEnter() {
    this.queryIsLogin()
    this.goToNextCategory()

  }

  // 判断用户是否登录
  queryIsLogin() {
    Promise.all([
      this.storage.get("VisitorRecordId")

      // this.storage.get("ExhibitionId")

    ]).then(([VisitorRecordId]) => {
      console.log("===tenantId==fdfsd========" + VisitorRecordId)
      // console.log("===tenantId=====fsdfsdfs=====" + exhibitionId)
      if (null == VisitorRecordId) {
        this.modalController.dismiss({
          // 'result': value
          // 'testhaha': "hahahhaha2222"
        })
        console.log("========1暂无1=========")
        alert("请先注册登录")
        //  this.presentToast("请先注册登录",3000)
        //  跳登录注册
        this.router.navigateByUrl("/login-by-phone")
      } else {
        console.log("===========我有缓存哈哈哈哈=============")
      }
    }, function (error) {
      // do something when failure
      console.log("========暂无=========")
    })

  }

  // 确认弹框

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
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
          console.log("=====")
        }
      }, {
        text: '确定',
        role: 'Ok',
        cssClass: 'secondary',
        handler: (blah) => {
          this.modalController.dismiss({
            // 'result': value
            // 'testhaha': "hahahhaha2222"
          })
          // if (this.addSource == "0") {
            
          // } else {
          //   this.router.navigateByUrl('/lessons-details/' + this.teachingId);
          // }

          
        }
      }],

    });

    await alert.present();
  }
  // 返回上一页
  canGoBack() {

    // this.nav.back()
    // this.nav.navigateBack();
    this.presentAlert()
    // this.modalController.dismiss({
    //   // 'result': value
    //   // 'testhaha': "hahahhaha2222"
    // })
  }
  // 新增步骤
  goToAddSteps() {
    console.log("=========新增步骤=======");

    console.log("=============" + this.StepsList.length)
    let size = this.StepsList.length + 1

    let arr_step = {
      title: "步骤" + size,
      picList: [
        // "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/6ea10864-3f35-44ab-b333-8e313061b1ba.png"

      ],
      desc: "步骤描述信息",
      video: []
    };
    this.StepsList.push(arr_step);
  }

  // 删除步骤
  deleteSteps(index) {
    console.log("=======删除步骤=======");
    //  console.log(JSON.stringify(this.StepsList));

    this.StepsList.splice(index, 1);
    //  console.log(JSON.stringify(this.StepsList));

  }

  // 删除图片
  goToDeleteImg(i, k) {
    console.log("========删除图片===========" + i + "===" + k)
    // console.log(JSON.stringify(this.StepsList))
    this.StepsList[i].picList.splice(k, 1);
    // console.log(JSON.stringify(this.StepsList))

  }
  // 删除视频
  goToDeleteVideo(i, k) {
    console.log("========删除视频===========")
    this.StepsList[i].video.splice(k, 1);
  }
  goToAddPicture() {
    console.log("===goToAddPicture=======")

  }

  // 设置封面
  goToSetFirst(i, k) {
    console.log("===goToSetFirst=======")

    // this.FirstPic = this.StepsList[i].picList[0]
    // PicList[0].PicPath=
    this.FirstPic = this.StepsList[i].picList[k]
    let a = {
      PicPath: this.StepsList[i].picList[k]
    }
    this.PicList[0] = a
    // console.log(JSON.stringify(this.PicList))
    this.presentToast("设置成功", 3000)

    // console.log("===========this.FirstPic============" + this.FirstPic)
  }

  // 草稿箱
  goToSave() {
    //
    console.log("=====new=新增教程===========")
    Promise.all([
      this.storage.get("TenantId"),
      this.storage.get("UserId"),
      this.storage.get("ExhibitionId"),
      this.storage.get("VisitorRecordId"),
      this.storage.get("VisitorExhibitionInfoId")
    ]).then(([tenantId, userId, exhibitionId, VisitorRecordId, VisitorExhibitionInfoId]) => {
      // debugger

      // 判断教程封面 赋值默认值


      if (this.PicList.length == 0) {
        console.log("=====教程封面kong==============")
        // let aa = {
        //   PicPath: "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/141be1ba-a4a9-4058-9036-e1338c0f413b.png"
        // }
        // this.PicList.push(aa)
        this.presentToast("请先上传教程封面", 3000)
        // console.log(JSON.stringify(this.PicList))
      } else {

      }
      // console.log(JSON.stringify(this.PicList))
      let teachingData = {
        userId: userId,
        tenantId: tenantId,

        params: {
          record: {
            UserId: userId,
            TenantId: tenantId,
            ProductNumber: "12345677",
            ExhibitionId: exhibitionId,
            ExhibitorId: "",
            ProId: "323232",
            SourceType: "商城",
            ProductType: "教程",
            StepsAlbum: this.album,

            ProductVisitorId: VisitorRecordId,
            CategoryFirstId: this.selecText,
            CategorySecondId: "",
            VisitorExhibitionInfoId: VisitorExhibitionInfoId,
            PicList: this.PicList,
            CourseList: this.StepsList,
            IsRelease: false,
            ProductName: this.ProductName,
            CourseTitle: "秒杀全场只需一秒",
            ProductDescription:
              "观众数据集中管理平台，将全部观众的基础、需求、行为、社交等信息进行集中归类管理，提供营销方案集成。",
            InTime: "2019-04-10T22:12:26.463"
          }
        }
      };
      console.log("======请先选择分类========================" + this.selecText)
      if (this.PicList.length == 0) {
        console.log("=====教程封面kong==============")
        this.presentToast("请先上传教程封面", 3000)
        // let aa = {
        //   PicPath: "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/141be1ba-a4a9-4058-9036-e1338c0f413b.png"
        // }
        // this.PicList.push(aa)
        // // console.log(JSON.stringify(this.PicList))
      } else if (this.ProductName == "") {
        this.presentToast("请填写教程名称", 3000)
      } else if (this.selecText == "") {
        this.presentToast("请先选择分类", 3000)
      } else {
        // console.log(JSON.stringify(this.StepsList))
        console.log("========================" + this.ProductName)
        this.http
          .post(
            AppComponent.apiUrl + "/v2/data/insert/Product",
            teachingData
          )
          .subscribe(res => {
            let result_info = (res as any).result;
            console.log("=================");
            // this.router.navigated();
            // this.router.navigateByUrl('/tabs/tab1');
            this.presentToast("已成功加入草稿箱", 2000)
            this.modalController.dismiss({
              // 'result': value
              // 'testhaha':"hahahhaha2222"
            })
            // this.router.navigateByUrl('');
            if (this.addSource == "0") {
              this.router.navigateByUrl('');
            } else {
              this.router.navigateByUrl('/lessons-details/' + this.teachingId);
            }
            // this.nav.navigateRoot(['/tabs/tab1']);

          });

      }


    });
  }

  setTest() {

    this.FirstPic = "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/141be1ba-a4a9-4058-9036-e1338c0f413b.png"
    if (this.FirstPic != "") {
      alert("haha")
      this.isFirsrNull = false
      console.log("======isFirsrNull=========" + this.isFirsrNull)
    }
    // }else{
    //     this.isFirsrNull = true
    // }

  }

  // 新增教程
  goToAddTeaching() {

    console.log("=====new=新增教程===========")
    Promise.all([
      this.storage.get("TenantId"),
      this.storage.get("UserId"),
      this.storage.get("ExhibitionId"),
      this.storage.get("VisitorRecordId"),
      this.storage.get("VisitorExhibitionInfoId")
    ]).then(([tenantId, userId, exhibitionId, VisitorRecordId, VisitorExhibitionInfoId]) => {
      // debugger

      // 判断教程封面 赋值默认值


      // if (this.PicList.length == 0) {
      //   console.log("=====教程封面kong==============")
      //   this.presentToast("请先上传教程封面",3000)
      //   // let aa = {
      //   //   PicPath: "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/141be1ba-a4a9-4058-9036-e1338c0f413b.png"
      //   // }
      //   // this.PicList.push(aa)
      //   // // console.log(JSON.stringify(this.PicList))
      // } 
      // console.log(JSON.stringify(this.PicList))
      let teachingData = {
        userId: userId,
        tenantId: tenantId,

        params: {
          record: {
            UserId: userId,
            TenantId: tenantId,
            ProductNumber: "12345677",
            ExhibitionId: exhibitionId,
            ExhibitorId: "",
            ProId: "323232",
            SourceType: "商城",
            StepsAlbum: this.album,
            ProductType: "教程",
            ProductVisitorId: VisitorRecordId,
            CategoryFirstId: this.selecText,
            CategorySecondId: "",
            VisitorExhibitionInfoId: VisitorExhibitionInfoId,
            PicList: this.PicList,
            CourseList: this.StepsList,
            IsRelease: true,
            ProductName: this.ProductName,
            CourseTitle: "秒杀全场只需一秒",
            ProductDescription:
              "观众数据集中管理平台，将全部观众的基础、需求、行为、社交等信息进行集中归类管理，提供营销方案集成。",
            InTime: "2019-04-10T22:12:26.463"
          }
        }
      };
      console.log("======请先选择分类========================" + this.selecText)
      if (this.PicList.length == 0) {
        console.log("=====教程封面kong==============")
        this.presentToast("请先上传教程封面", 3000)
        // let aa = {
        //   PicPath: "https://baizhanke-1253522040.cos.ap-chengdu.myqcloud.com/141be1ba-a4a9-4058-9036-e1338c0f413b.png"
        // }
        // this.PicList.push(aa)
        // // console.log(JSON.stringify(this.PicList))
      } else if (this.ProductName == "") {
        this.presentToast("请填写教程名称", 3000)
      } else if (this.selecText == "") {
        this.presentToast("请先选择分类", 3000)
      } else {
        // console.log(JSON.stringify(this.StepsList))
        console.log("========================" + this.ProductName)
        this.http
          .post(
            AppComponent.apiUrl + "/v2/data/insert/Product",
            teachingData
          )
          .subscribe(res => {
            let result_info = (res as any).result;
            console.log("=================");
            // this.router.navigated();
            // this.router.navigateByUrl('/tabs/tab1');
            this.presentToast("发布成功", 2000)
            this.modalController.dismiss({
              // 'result': value
              // 'testhaha':"hahahhaha2222"
            })
           
            if(this.addSource=="0"){
              this.router.navigateByUrl('');
            }else{
              this.router.navigateByUrl('/lessons-details/'+this.teachingId);
            }

            // this.nav.navigateRoot(['/tabs/tab1']);

          });

      }


    });
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
  goToNextCategory() {
    console.log("=========goToNextCategory===========")
    Promise.all([
      this.storage.get("TenantId"),
      this.storage.get("UserId"),
      this.storage.get("ExhibitionId"),

    ]).then(([tenantId, userId, exhibitionId,]) => {
      // debugger

      let teachingData = {
        UserId: userId,
        TenantId: tenantId,

        params: {
          record: {

            ExhibitionId: exhibitionId

          }
        }
      }


      this.http
        .post(
          AppComponent.apiUrl + "/v2/data/queryList/CategoryFirst",
          teachingData
        )
        .subscribe(res => {
          this.CategoriesFirstList = (res as any).result;
          console.log("=================");

          // console.log(JSON.stringify(this.coursesList))
        });


    });
  }


  haha(e) {
    console.log("======i==================")
    // console.log(JSON.stringify(e))
  }
  go() {
    console.log("======i==================" + this.selecText)
  }

  haha1() {
    console.log("======i==================1111" + this.selecText + "111==============")
  }

  // 上传图片视频
  fileChange3(i) {

    var that = this;
    // 重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。 
    // mediaType        PICTURE、VIDEO、ALLMEDIA

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    that.camera.getPicture(options).then((file) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      try {
        // alert(typeof file);
        // alert(file.length);
        // alert(file.indexOf("data:"));
        // image.onload = function (params: any) {
        // let base64Image = 'data:video/jpeg;base64,' + file;
        let base64Image = 'data:image/jpeg;base64,' + file;
        // var base64Image = that.getBase64Image(image);
        let teachingData = {
          url: base64Image
        };
        that.http
          .post(
            AppComponent.apiUrl + "/v2/data/upload",
            teachingData
          )
          .subscribe(res => {
            let result_info = (res as any).result;
            // alert("===success==" + that.testPicUrl)
            // that.testPicUrl = result_info
            that.StepsList[i].picList.push(result_info)
            let pic = {
              "PicPath": result_info
            }
            // this.PicList.push(pic)
            this.album.push(pic)

            // alert(result_info)
            // alert(that.StepsList.length)

          });
        // }
      } catch (error) {
        alert("error");
        alert(JSON.stringify(error));
      }

    }, (err) => {
      console.log(err);
      // Handle error
    });
  }


  test() {
    let arr = "hhahahah1"
    this.StepsList[0].picList.push("hahaha1")
    console.log(JSON.stringify(this.StepsList))
  }
  // 上传封面
  uploadFirst() {
    var that = this;
    // 重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。 
    // mediaType        PICTURE、VIDEO、ALLMEDIA
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((file) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      that.presentToast("图片上传中...", 4000);
      try {
        // alert(typeof file);
        // alert(file.length);
        // alert(file.indexOf("data:"));
        // image.onload = function (params: any) {
        // let base64Image = 'data:video/jpeg;base64,' + file;
        let base64Image = 'data:image/jpeg;base64,' + file;
        // var base64Image = that.getBase64Image(image);
        let teachingData = {
          url: base64Image
        };
        that.http.post(AppComponent.apiUrl + "/v2/data/upload", teachingData)
          .subscribe(res => {
            let result_info = (res as any).result;
            // alert("===success==" + this.testPicUrl)
            that.FirstPic = result_info
            that.isFirsrNull = false
            let a={
              PicPath: result_info
            };
            that.PicList[0] = a;
            that.presentToast("图片上传成功", 1000);
            // this.testPicUrl = result_info
            // alert(result_info)
            // that.test = result_info;
          });
        // }
      } catch (error) {
        this.presentToast("图片上传失败，请重试", 3000)
        // alert("error");
        // alert(JSON.stringify(error));
      }

    }, (err) => {
      console.log(err);
      // Handle error
    });
  }

  // 设置视频封面
  fileChange4(i) {

    var that = this;
    // 重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。 
    // mediaType        PICTURE、VIDEO、ALLMEDIA

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((file) => {
      this.presentToast("上传封面中", 3000)
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      try {
        // alert(typeof file);
        // alert(file.length);
        // alert(file.indexOf("data:"));
        // image.onload = function (params: any) {
        // let base64Image = 'data:video/jpeg;base64,' + file;
        let base64Image = 'data:image/jpeg;base64,' + file;
        // var base64Image = that.getBase64Image(image);
        let teachingData = {
          url: base64Image
        };
        that.http
          .post(
            AppComponent.apiUrl + "/v2/data/upload",
            teachingData
          )
          .subscribe(res => {
            let result_info = (res as any).result;
            // alert("===success==" + this.testPicUrl)
            that.videoPoster = result_info
            alert(result_info)
            that.presentToast("更换封面成功", 3000)
            // that.test = result_info;
          });
        // }
      } catch (error) {
        alert("error");
        alert(JSON.stringify(error));
      }

    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
  // 上传视频
  fileChange(e, i) {
    var that = this;

    try {
      console.log(e)
      const file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
      console.log(file.size + "========")
      //  alert(JSON.stringify(file))
      console.log(JSON.stringify(file))
      // 限制大小
      if (file.size > 1024 * 1024 * 10) {
        alert("请重新上传小于10M的视频")
      } else {

        this.videoUrl = window.URL.createObjectURL(file); // 获取上传的图片临时路径
        var reader = new FileReader();
        reader.readAsDataURL(file);
        that.presentToast("视频上传中...", 5000)
        reader.onload = function (params: any) {
          // alert(JSON.stringify(params))
          let base64Image = params.target.result;
          let teachingData = {
            url: base64Image
          };

          that.http
            .post(
              AppComponent.apiUrl + "/v2/data/upload",
              // "https://api.baizhanke.com/v2/data/upload",
              teachingData
            )
            .subscribe(res => {
              let result_info = (res as any).result;
              that.presentToast("视频上传成功", 1000)
              that.videoUrl = result_info;
              console.log(that.videoUrl + "===== that.videoUrl=========")
              let videoPer = {
                "url": result_info,
                // "img": 
                "img": that.videoPoster
              }
              // 可上传多个视频
              // that.StepsList[i].video.push(videoPer)
              // 单个视频 上传成功即覆盖上次的值
              that.StepsList[i].video[0] = videoPer
              // console.log(JSON.stringify(that.StepsList))
              // 清空
              // that.videoFile=""
              console.log("=======e.target.value===============" + e.target.value)
              console.log(JSON.stringify(that.StepsList))
              e.target.value = ""
              // $('#feature').val('') // 注意1

            });

        }

      }


    } catch (error) {
      // alert("error");
      // alert(JSON.stringify(error));
    }

  }
  // 上传视频
  uploadVideo(i) {
    var that = this;
    // 重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。 
    // mediaType        PICTURE、VIDEO、ALLMEDIA

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      // mediaType: this.camera.MediaType.PICTURE
      mediaType: this.camera.MediaType.VIDEO
    }

    this.camera.getPicture(options).then((file) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      try {
        // alert(typeof file);
        // alert(file.length);
        // alert(file.indexOf("data:"));
        // image.onload = function (params: any) {
        let base64Image = 'data:video/jpeg;base64,' + file;
        // let base64Image = 'data:image/jpeg;base64,' + file;

        // var base64Image = that.getBase64Image(image);
        let teachingData = {
          url: base64Image
        };
        that.http
          .post(
            AppComponent.apiUrl + "/v2/data/upload",
            teachingData
          )
          .subscribe(res => {
            let result_info = (res as any).result;
            // alert("===success==" + this.testPicUrl)
            this.videoUrl = result_info

            let videoPer = {
              "url": result_info,
              "img": this.videoPoster
            }
            this.StepsList[i].video.push(videoPer)
            // console.log(JSON.stringify(this.StepsList))
            // that.test = result_info;
          });
        // }
      } catch (error) {
        alert("error");
        alert(JSON.stringify(error));
      }

    }, (err) => {
      console.log(err);
      // Handle error
    });
  }



}
