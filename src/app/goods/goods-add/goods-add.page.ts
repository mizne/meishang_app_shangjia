import { Component, OnInit, Inject } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { JSONP_ERR_NO_CALLBACK } from '@angular/common/http/src/jsonp';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
import { ESdkObsService } from './../../esdk-obs.service';
import { ProgressBarPage } from '../../progress-bar/progress-bar.page';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
declare var $: any;
@Component({
  selector: 'app-goods-add',
  templateUrl: './goods-add.page.html',
  styleUrls: ['./goods-add.page.scss']
})

export class GoodsAddPage implements OnInit {
  public goods;
  public params;
  public data;
  public dd;
  public dd2;
  public selecText;
  public selecText1;
  TenantId: string;
  UserId: string;
  RecordId: string;
  ExhibitorId: string;
  producetTitle: string;
  size: string;
  price;
  total;
  which: string;
  category2: string;
  categoryFirstId: any;
  categorySecondId: string;
  display: boolean;
  firstPrice;
  allTotal;
  CategoriesFirstList;
  CategoriesSecondList;
  typeGoods: string;
  imgsrc;
  logosec: string;
  public selectSaleArea;
  public selectValue;
  public submitValue;
  public inputValue;
  public goodsID;
  public type;
  public goodsTitle;
  public goodsBtn;
  public requestStr;

  public richTextCtrl = new FormControl(null);
  // public modules = {
  //   toolbar: false
  // };
  public progressBar;
  public progressPercent;
  public videoCancelSubject = new Subject<void>();

  public rate;
  public showProgressBar;
  public distributionModeList;
  public distributionSelect;
  public stockReduceList;
  public stockReduceSelect;
  public specificationsFlag;
  constructor(
    public router: Router,
    public http: HttpClient,
    public storage: Storage,
    public nav: NavController,
    public alertController: AlertController,
    public camera: Camera,
    public toast: ToastController,
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    private esdkObsService: ESdkObsService,
    private actionSheetController: ActionSheetController
  ) {
  }
  ngOnInit() {
    this.goods = [{}];
    this.valueInit();
    this.CategoriesSecondList = [];
    this.selectSaleArea = '请选择销售地区';

    const aa = this.router.url;
    const arr = aa.split('/');
    const str = arr[3];
    const strr = str.split('&');
    this.goodsID = strr[0];
    this.type = strr[1];
    this.goodsTitle = '添加商品';
    this.goodsBtn = '发布';

    this.requestStr = '';
    // this.richTextCtrl.valueChanges.subscribe((v) => {
      // if (v) {
      //   console.log(v);
      //   setTimeout(() => {
      //     console.log(document.getElementsByTagName('iframe')[0].contentWindow.document);
      //   }, 500);
      // }
      // document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('video').style.width = '100%';
    // });
  }

  ionViewWillEnter() {
    this.goToNextCategory();
    this.choice();
    if (this.type === 'edit') {
      this.goodsTitle = '编辑商品';
      this.goodsBtn = '保存';
      this.queryGoodsDetail();
    } else {
      this.goodsTitle = '添加商品';
      this.goodsBtn = '发布';
    }
    this.rate = 0;
    this.showProgressBar = false;
    this.distributionModeList = [
      { id: '1', Name: '快递发货' },
      { id: '2', Name: '同城配送' },
      { id: '3', Name: '到店自取' }
    ];
    this.distributionSelect = '1';

    this.stockReduceList = [
      { id: '0', Name: '下单减库存' },
      { id: '1', Name: '支付减库存' }
    ];
    this.stockReduceSelect = '0';
  }

  // 调用modals
  async selectModal() {
    const modal = await this.modalCtrl.create({
      component: ProgressBarPage,
      componentProps: {
        value: 123
      },
      cssClass: 'selectModalStyle',
      showBackdrop: false,
    });
    // const data = await modal.onDidDismiss();
    // console.log(data);
    modal.onDidDismiss().then(
      () => {
      },
      () => {
      }
    );
    return await modal.present();
  }

  valueInit() {
    this.imgsrc = '';
    // this.imgsrc = 'https://meishang-mobile-bucket.obs.cn-east-2.myhuaweicloud.com/387f1d9b-42c5-425d-9345-e5e22abdab0d ';
    this.producetTitle = '';
    this.firstPrice = 0;
    this.allTotal = 0;
    this.goods = [{}];
    this.selecText = '';
    this.selecText1 = '';
    this.typeGoods = null;
    this.logosec = null;
    this.selectValue = 'allCity';
    this.submitValue = '';
    this.inputValue = '';
  }

  handleVideoPercent(percent: number) {
    console.log(`video upload percent: ${percent}`);
    if (percent < this.rate) {
      return;
    }
    this.rate = percent;
    const transNumber = this.rate / 100;
    this.progressBar = transNumber;
    this.progressPercent = parseInt(this.rate).toString();
    if (percent >= 100) {
      this.rate = 0;
      this.progressBar = 0;
      this.progressPercent = 0 + '';
      this.showProgressBar = false;
    } else {
      this.showProgressBar = true;
    }
  }

  cancelUpload() {
    this.rate = 0;
    this.progressBar = 0;
    this.progressPercent = 0 + '';
    this.showProgressBar = false;
    this.videoCancelSubject.next();
    // this.videoCancelSubject.complete();
  }

  // 获取一级分类
  goToNextCategory() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
    ]).then(([tenantId, userId, recordId]) => {
      let teachingData = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'ExhibitionId': recordId
          },
          'options': { 'pageIndex': 1, 'pageSize': 10 }
        }
      };
      this.http
        .post(
          AppComponent.apiUrl + '/v2/data/queryList/CategoryFirst',
          teachingData
        )
        .subscribe(res => {
          this.CategoriesFirstList = (res as any).result;
        });
    });
  }

  // 选择一级查询二级分类
  choice() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      let queryCategoriesSecond = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            ExhibitionId: recordId,
            CategoryFirstId: this.selecText,
            // ExhibitorId: exhibitorId
          }
        }
      };
      this.http
        .post(
          AppComponent.apiUrl + '/v2/data/queryList/CategorySecond',
          queryCategoriesSecond
        )
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.CategoriesSecondList = (res as any).result;
            this.CategoriesSecondList.unshift({
              RecordId: '',
              Name: '全部'
            });
          } else {
            this.CategoriesSecondList = [
              {
                RecordId: '1',
                name: '暂无分类',
              }
            ];
          }
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

  // 上传封面弹窗
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '上传封面',
      buttons: [{
        text: '拍照',
        // icon: 'share',
        handler: () => {
          let sourceType = this.camera.PictureSourceType.CAMERA;
          this.fileChange3(sourceType);
        }
      }, {
        text: '相册',
        // icon: 'heart',
        handler: () => {
          let sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
          this.fileChange3(sourceType);
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

  // 添加商品图片
  fileChange3(Type) {
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
        //     // this.pack('上传成功', 1000);
        //     let result_info = (res as any).result;
        //     that.imgsrc = result_info;
        //     that.loadingController.dismiss({
        //     });
        //   });
        this.esdkObsService.uploadImage(base64Image)
          .subscribe(location => {
            that.imgsrc = location;
            that.pack('上传成功', 1500);
            that.loadingController.dismiss({
            });
          }, (e) => {
            that.pack('上传失败', 1500);
            that.loadingController.dismiss({
            });
            alert(`upload image failure: ${e.message}`);
          });
      } catch (error) {
        that.pack('上传失败', 1500);
        that.loadingController.dismiss({
        });
      }
    }, (err) => {
      console.log(err);
      that.pack('上传失败', 1500);
      that.loadingController.dismiss({
      });
    });
  }

  back() {
    this.nav.back();
    this.valueInit();
    this.cancelUpload();
  }
  // 添加商品规格
  add() {
    let ss = {};
    this.goods.push(ss);
    this.display = true;
  }
  add1() {
    this.display = true;
  }
  // 删除商品规格
  delete(index) {
    this.goods.splice(index, 1);
  }

  cho(e) {
  }

  addgoods() {
    if (this.selecText1 === '1' || this.selecText1 === null || this.selecText1 === undefined) {
      this.pack('请添加并选择分类后发布', 2000);
      return;
    }
    if (this.selectValue === 'allCity') {
      this.submitValue = '全国';
    } else if (this.selectValue === 'otherCity') {
      if (this.inputValue) {
        this.submitValue = this.inputValue;
      } else {
        this.pack('请输入地区', 2000);
        return;
      }
    }
    this.requestStr = this.richTextCtrl.value;
    // 添加商品
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId]) => {
      this.TenantId = tenantId;
      this.UserId = userId;
      this.ExhibitorId = exhibitorId;
      this.RecordId = recordId;
      this.params = {
        'userId': this.UserId,
        'tenantId': this.TenantId,
        'params': {
          'record': {
            'ExhibitionId': this.RecordId,
            'ExhibitorId': this.ExhibitorId,
            'ProId': '323232',
            'PicList': [
              {
                'PicPath': this.imgsrc
              },
            ],
            'ProductName': this.producetTitle,
            'ProductDescription': this.requestStr,
            'ProductPrice': this.firstPrice,
            'productTitle': this.producetTitle,
            'SKU': '件',
            'StockNumber': this.allTotal + '',
            'Specifications': this.goods,
            'Postage': '',
            'ProductTypeInfoId': '',
            'CategoryFirstId': this.selecText,
            'CategorySecondId': this.selecText1,
            'IsShow': true,
            'IsRecycled': false,
            'SourceType': '商城',
            'ProductType': '商品',
            'SalesVolum': '0',
            'SaleArea': this.submitValue,
            DeliveryType: this.distributionSelect,
            StockReduceType: this.stockReduceSelect
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/insert/Product', this.params).subscribe(res => {
        if ((res as any).resCode === 0) {
          this.pack('添加成功', 1000);
          this.nav.back();
          this.valueInit();
        }
      }, error => {
      });
    });
  }

  // 上传logo和填写二级分类确定添加
  second() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.dd = {
          'userId': userId,
          'tenantId': tenantId,
          'params': {
            'record': {
              'Name': this.typeGoods,
              'ExhibitionId': recordId,
              'CategoryFirstId': this.selecText,
              'Image': this.logosec
            }
          }
        };
        this.dd2 = {
          'userId': userId,
          'tenantId': tenantId,
          'params': {
            'condition': {
              // 'Name': this.typeGoods,
              // 'ExhibitionId': recordId,
              'CategoryFirstId': this.selecText
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategorySecond', this.dd2).subscribe(res => {
          if ((res as any).resCode === 0) {
            // this.categorySecondId = (res as any).result.RecordId
            // this.pack('添加分类成功', 1000)
            console.log('resCode == 0');
          } else {
            console.log((res as any));
          }
        },
          // this.http.post(AppComponent.apiUrl + '/v2/data/insert/CategorySecond', this.dd).subscribe(res => {
          //   if ((res as any).resCode == 0) {
          //     this.categorySecondId = (res as any).result.RecordId
          //     this.pack('添加分类成功', 1000)
          //   }
          // },
          error => {
          });
      });
  }

  // 判断是否添加一级分类
  add2() {
    if (this.selecText === '') {
      this.ad2();
    } else {
      console.log(this.selecText);
      this.router.navigateByUrl('/tabs/type-second/' + this.selecText);
    }
  }
  // 添加二级分类弹窗
  async ad1() {
    const alert = await this.alertController.create({
      header: '添加分类',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '请输入添加的分类',
          value: ''
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: '确定',
          handler: (res) => {
            console.log('Confirm Cancel: res');
            this.typeGoods = res.name;

          }
        }
      ]
    });
    await alert.present();
  }

  // 添加二级分类提示
  async ad2() {
    const alert = await this.alertController.create({
      header: '必须先选择品类',
      buttons: [
        {
          text: '确定',
          handler: (res) => {
            console.log('Confirm Cancel: res');

          }
        },
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });
    await alert.present();
  }

  // // 信息不能为空提示
  // async presentToast() {
  //   const toast = await this.toast.create({
  //     message: '信息不能为空',
  //     duration: 2000,
  //     position: 'middle',
  //     color: 'dark',
  //     cssClass: 'toast-exhibitor',
  //   });
  //   toast.present();
  // }
  // // 信息不能为空提示
  // async goodsSuccess() {
  //   const toast = await this.toast.create({
  //     message: '发布成功',
  //     duration: 2000,
  //     position: 'middle',

  //     color: 'dark',
  //     cssClass: 'toast-exhibitor',
  //   });
  //   toast.present();
  // }
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

  // 发布按钮
  release() {
    this.goods.forEach(element => {
      if (element.size && element.price && element.total) {
        this.specificationsFlag = true;
      } else {
        this.specificationsFlag = false;
      }
    });
    if (this.imgsrc === '' || this.producetTitle === '') {
      this.pack('请完善商品图片,标题,价格,库存,', 1000);
    } else if (this.selecText === '') {
      this.pack('请选择品类,分类', 1000);
    } else {
      if (this.specificationsFlag) {
        this.allTotal = 0;
        var list = [];
        this.goods.forEach(element => {
          this.allTotal = this.allTotal + element.total;
          list.push(element.price);
        });
        list.sort();
        this.firstPrice = list[0];
        if (this.type === 'edit') {
          this.updateGoods();
        } else {
          this.addgoods();
        }
      } else {
        this.pack('请完善商品规格', 1000);
      }
    }
  }

  // else if(this.logosec||this.typeGoods){
  //   if(this.logosec==undefined||this.typeGoods==undefined){
  //   this.pack('请完善添加的分类名称,logo',1000)
  //   }
  // }

  returnCategoriesSecondList(name) {
    if (name) {
      return name;
    } else {
      // console.log(name);
      return '暂无分类';
    }
  }

  testtest() {
    console.log(this.selectValue);
  }

  queryGoodsDetail() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId]) => {
      this.params = {
        'tenantId': tenantId,
        'userId': userId,
        'params': {
          'condition': {
            'RecordId': this.goodsID
          },
          'childObjects': [
            {
              'fieldName': 'ProductVisitInfo',
              'reference': {
                'object': 'ProductVisitInfo',
                'field': 'ProductId'
              }
            },
            {
              'fieldName': 'ProductVisitInfoMessage',
              'reference': {
                'object': 'ProductVisitInfoMessage',
                'field': 'ProductId'
              }
            }
          ]
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryByCondition/Product', this.params).subscribe(res => {
        if ((res as any).resCode === 0) {
          this.goods = [];
          this.imgsrc = (res as any).result[0].PicList[0].PicPath;
          this.producetTitle = (res as any).result[0].productTitle;
          if ((res as any).result[0].SaleArea === '全国') {
            this.selectValue = 'allCity';
          } else {
            this.selectValue = 'otherCity';
            this.inputValue = (res as any).result[0].SaleArea;
          }
          this.selecText = (res as any).result[0].CategoryFirstId;
          this.selecText1 = (res as any).result[0].CategorySecondId;
          this.distributionSelect = (res as any).result[0].DeliveryType;
          this.stockReduceSelect = (res as any).result[0].StockReduceType;
          this.richTextCtrl.patchValue((res as any).result[0].ProductDescription);
          if ((res as any).result[0].Specifications.length > 0) {
            this.goods = (res as any).result[0].Specifications;
            this.display = true;
          }
          console.log((res as any).result[0].Specifications.length + '----------------------');
        }
      }, error => {
      });
    });
  }

  updateGoods() {
    if (this.selecText1 === '1' || this.selecText1 === null || this.selecText1 === undefined) {
      this.pack('请添加并选择分类后发布', 2000);
      return;
    }
    if (this.selectValue === 'allCity') {
      this.submitValue = '全国';
    } else if (this.selectValue === 'otherCity') {
      if (this.inputValue) {
        this.submitValue = this.inputValue;
      } else {
        this.pack('请输入地区', 2000);
        return;
      }
    }
    this.requestStr = this.richTextCtrl.value;
    // 修改商品
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitorId, recordId]) => {
      this.TenantId = tenantId;
      this.UserId = userId;
      this.ExhibitorId = exhibitorId;
      this.RecordId = recordId;
      this.params = {
        'userId': this.UserId,
        'tenantId': this.TenantId,
        'params': {
          'recordId': this.goodsID,
          'setValue': {
            'ExhibitionId': this.RecordId,
            'ExhibitorId': this.ExhibitorId,
            'ProId': '323232',
            'PicList': [
              {
                'PicPath': this.imgsrc
              },
            ],
            'ProductName': this.producetTitle,
            'ProductDescription': this.requestStr,
            'ProductPrice': this.firstPrice,
            'productTitle': this.producetTitle,
            'SKU': '件',
            'StockNumber': this.allTotal + '',
            'Specifications': this.goods,
            'Postage': '',
            'ProductTypeInfoId': '',
            'CategoryFirstId': this.selecText,
            'CategorySecondId': this.selecText1,
            'IsShow': true,
            'IsRecycled': false,
            'SourceType': '商城',
            'ProductType': '商品',
            'SalesVolum': '0',
            'SaleArea': this.submitValue,
            DeliveryType: this.distributionSelect,
            StockReduceType: this.stockReduceSelect
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.params).subscribe(res => {
        if ((res as any).resCode === 0) {
          this.pack('修改成功', 1000);
          this.nav.back();
          this.valueInit();
        }
      }, error => {
      });
    });
  }
}

