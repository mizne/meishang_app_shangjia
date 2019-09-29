import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-every-cateory',
  templateUrl: './every-cateory.page.html',
  styleUrls: ['./every-cateory.page.scss'],
})
export class EveryCateoryPage implements OnInit {
  public UserId;
  public TenantId;
  public ExhibitionId;
  public CategoriesFirstList;
  public CategoriesSecondList;
  public VisitorRecordId;
  public firstCategoryId;
  public toastCtrl;
  public isGoods1;
  public isGoods2;
  public searchValue;
  public coursesList;
  public cateoryId;
  public goodsList;
  public goodsSearchList;
  public isSearch;
  public isSearchNull;
  public isGoodsNull;
  public type;
  constructor(public nav: NavController, public alertController: AlertController,
    public router: Router,
    private http: HttpClient,
    public storage: Storage) { }

  ngOnInit() {
    const aa = this.router.url;
    const arr = aa.split('/');
    const str = arr[3];
    const strr = str.split('&');
    this.cateoryId = strr[0];
    this.type = strr[1];

    this.isSearch = false;
    this.isSearchNull = false;
  }

  // 返回上一页
  back() {
    this.nav.back();
  }

  ionViewWillEnter() {
    if (this.type === 'first') {
      this.getProductsAllList();
    } else if (this.type === 'second') {
      this.getProductsList();
    }
  }

  // 查询商品
  getProductsList() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
    ]).then(([tenantId, userId, MSRecordId]) => {
      let courseData = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            CategorySecondId: this.cateoryId,
            ExhibitionId: MSRecordId,
            IsRecycled: false,
            SourceType: '商城',
            ProductType: '商品'
          },
          properties: ['ProductId.Product.___all'],
          // options: {
          //   pageIndex: 1,
          //   pageSize: 10
          // }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product', courseData)
        .subscribe(res => {
          if ((res as any).resCode == 0) {
            this.goodsList = (res as any).result;
            this.isGoodsNull = false;
          } else {
            this.isGoodsNull = true;
          }
        });
    });
  }

  // 查询所有商品
  getProductsAllList() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
    ]).then(([tenantId, userId, MSRecordId]) => {
      let courseData = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            CategoryFirstId: this.cateoryId,
            ExhibitionId: MSRecordId,
            IsRecycled: false,
            SourceType: '商城',
            ProductType: '商品'
          },
          properties: ['ProductId.Product.___all'],
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product', courseData)
        .subscribe(res => {
          if ((res as any).resCode == 0) {
            this.goodsList = (res as any).result;
            this.isGoodsNull = false;
          } else {
            this.isGoodsNull = true;
          }
        });
    });
  }

  // 查看商品详情
  goToDetails(id) {
    // this.router.navigateByUrl('/tabs/goods-detail/' + id);
    this.router.navigateByUrl('/tabs/goods-add/' + id + '&edit');
  }
}
