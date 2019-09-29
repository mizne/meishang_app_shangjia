import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-goods-manage',
  templateUrl: './goods-manage.page.html',
  styleUrls: ['./goods-manage.page.scss'],
})
export class GoodsManagePage implements OnInit {
  // 分类部分
  public CategoriesFirstList;
  public CategoriesFirstImage;
  public CategoriesSecondList;
  public VisitorRecordId;
  public firstCategoryId;
  public toastCtrl;
  public isGoods1;
  public isGoods2;
  public searchValue;
  public moreclass;
  public leftStyle;
  public leftid;
  public LackImage;
  change: string = 'friends';
  dis: boolean;
  TenantId: string;
  UserId: string;
  Token: string;
  ExhibitorId: string;
  RecordId: string;
  public params;
  public data;
  public data1;
  public data2;
  public shuju;
  public shu;
  public sj;
  public params1;
  public fun;
  sale;
  saleNone;
  downSale;
  allList: any;
  typeList: [];
  list: [];
  total: [];
  goodsID: string;
  imgSrc = 'assets/img/sakura.jpg';
  onSaleList: any = [{}];

  constructor(public router: Router, public storage: Storage, public http: HttpClient, public alertController: AlertController) { }
  ngOnInit() {
    // this.obtainTypeList()
    // this.goodslist()
    // this.goodslist1()
    // this.all()
  }

  ionViewWillEnter() {
    // this.obtainTypeList()
    this.all();
    this.getCategoriesFirst();
    this.isGoods1 = true;
    this.isGoods2 = false;
    this.searchValue = '';
    this.moreclass = 'test';
    this.leftStyle = 'perStyle';
    this.LackImage = '../../../assets/商品管理/test.png';
    this.querySale();
    this.queryNone();
    this.queryKu();
  }
  // 跳转商品列表
  goList(item) {
    var type = '';
    if (item.Name === '全部') {
      type = 'first';
    } else {
      type = 'second';
    }
    this.router.navigateByUrl('/tabs/every-cateory/' + item.RecordId + '&' + type);
  }

  operate() {
    this.dis = !this.dis;
  }
  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }
  goDetail(id) {
    // this.router.navigateByUrl('/tabs/goods-detail/' + id);
    this.router.navigateByUrl('/tabs/goods-add/' + id + '&edit');
  }
  search() {
    this.router.navigateByUrl('/tabs/goods-search');
  }
  addType() {
    this.router.navigateByUrl('/tabs/goods-add-type');
  }
  addgoods() {
    this.router.navigateByUrl('/tabs/goods-add/none&add');
  }
  edit(id) {
    this.router.navigateByUrl('/tabs/goods-add/' + id + '&edit');
  }

  //  跳转到商品分类
  pro(id) {
    this.router.navigateByUrl('/product-type/' + id);
  }

  // 下架提示
  async alert() {
    const alert = await this.alertController.create({
      header: '下架提示',
      message: '下架成功',
      buttons: ['确定']
    });
    await alert.present();
  }

  // 上架提示
  async alertSuccess() {
    const alert = await this.alertController.create({
      header: '上架架提示',
      message: '上架成功',
      buttons: ['确定']
    });
    await alert.present();
  }

  // 删除提示
  async alertdelete() {
    const alert = await this.alertController.create({
      header: '删除提示',
      message: '删除成功',
      buttons: ['确定']
    });
    await alert.present();
  }

  // 获取商品all的列表
  all() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.data2 = {
          'userId': this.UserId,
          'tenantId': this.TenantId,
          'params': {
            'condition':
            {
              SourceType: '商城',
              ProductType: '商品',
              'ExhibitionId': this.RecordId,
              IsRecycled: false,
              ExhibitorId: exhibitorId
            },
            // 'pageIndex':1,'pageSize':10
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product', this.data2)
          .subscribe(res => {
            if (res) {
              const result = res as any;
              this.allList = result.result;
            }
          }, error => {
          });
      });
  }

  // 查询出售和售罄的数量
  querySale() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        const dd = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              'IsShow': true,
              'IsRecycled': false,
              'SourceType': '商城',
              'ProductType': '商品',
              'ExhibitionId': recordId,
              'ExhibitorId': exhibitorId
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/Product', dd)
          .subscribe(res => {
            if (res) {
              this.sale = (res as any).result;
            }
          }, error => {
          });
      });
  }

  // 查询售罄的数量
  queryNone() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        const dd = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              'IsShow': true,
              'IsRecycled': false,
              'SourceType': '商城',
              'ProductType': '商品',
              'StockNumber': '0',
              'ExhibitionId': recordId,
              'ExhibitorId': exhibitorId
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/Product', dd)
          .subscribe(res => {
            if (res) {
              this.saleNone = (res as any).result;
            }
          }, error => {
          });
      });
  }

  // 查询仓库的的数量
  queryKu() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        const dd = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'condition': {
              'IsShow': false,
              'IsRecycled': false,
              'SourceType': '商城',
              'ProductType': '商品',
              'ExhibitorId': exhibitorId,
              'ExhibitionId': recordId
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/Product', dd)
          .subscribe(res => {
            if (res) {
              this.downSale = (res as any).result;
            }
          }, error => {
          });
      });
  }

  // 上架商品
  up(index) {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.shu = {
          'tenantId': this.TenantId,
          'userId': this.UserId,
          'params': {
            'recordId': index,
            'setValue': {
              'IsShow': true,
              'IsRecycled': false,
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.shu).subscribe(res => {
          if ((res as any).resCode === 0) {
            this.alertSuccess();
            this.all();
            this.querySale();
            this.queryNone();
            this.queryKu();
          }
        }, error => {
        });
      });
  }

  // 下架商品
  down(index) {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'), this.storage.get('Token'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId, token]) => {
        this.TenantId = tenantId,
        this.UserId = userId,
        this.ExhibitorId = exhibitorId,
        this.RecordId = recordId,
        this.Token = token,
        this.shuju = {
          'tenantId': this.TenantId,
          'userId': this.UserId,
          'params': {
            'recordId': index,
            'setValue': {
              'IsShow': false,
              'IsRecycled': false
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.shuju).subscribe(res => {
          if ((res as any).resMsg === 'success') {
            const result = res as any;
            this.alert();
            this.all();
            this.querySale();
            this.queryNone();
            this.queryKu();
          }
        }, error => {
        });
      });
  }

  // 删除商品
  delete(index) {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'), this.storage.get('token'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, token, exhibitorId, recordId]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.sj = {
          'tenantId': this.TenantId,
          'userId': this.UserId,
          'params': {
            'recordId': index,
            'setValue': {
              'IsShow': false,
              'IsRecycled': true
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.sj).subscribe(res => {
          const result = res as any;
          if ((res as any).resCode === 0) {
            this.all();
            this.alertdelete();
            this.querySale();
            this.queryNone();
            this.queryKu();
          }
        }, error => {
        });
      });
  }

  // 查看评价
  detail(id) {
    this.router.navigateByUrl('/evaluate/' + id);
  }

  // 商品一二级分类
  gotoGet1(item) {
    this.firstCategoryId = item.RecordId;
    this.CategoriesFirstImage = item.Image;
    this.getCategoriesSecond();
    this.leftid = item.RecordId;
  }
  gotoGet2() {
    this.isGoods2 = !this.isGoods2;
  }

  // 查询一级分类
  getCategoriesFirst() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, recordId]) => {
      const queryCategoriesFirst = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            ExhibitionId: recordId
          },
          options: {
            sort: {
              Sort: 1
            }
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategoryFirst', queryCategoriesFirst)
        .subscribe(res => {
          this.CategoriesFirstList = (res as any).result;
          this.CategoriesFirstImage = (res as any).result[0].Image;
          this.firstCategoryId = this.CategoriesFirstList[0].RecordId;
          this.leftid = this.CategoriesFirstList[0].RecordId;
          this.getCategoriesSecond();
        });
    });
  }

  // 查询二级分类
  getCategoriesSecond() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      const queryCategoriesSecond = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            ExhibitionId: recordId,
            CategoryFirstId: this.firstCategoryId
          },
          options: {
            sort: {
              Sort: 1
            }
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategorySecond', queryCategoriesSecond)
        .subscribe(res => {
          this.CategoriesSecondList = (res as any).result;
          this.CategoriesSecondList.unshift({
            Name: '全部',
            RecordId: this.firstCategoryId,
            Image: this.CategoriesFirstImage
          });
        });
    });
  }
}
