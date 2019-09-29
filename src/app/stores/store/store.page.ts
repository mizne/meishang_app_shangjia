import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
  public params;
  public data;
  public dd;
  public ss;
  constructor(private router: Router, public storage: Storage, public http: HttpClient,
              public alertController: AlertController) { }
  isShow: true;
  dis: true;
  typeList: any;
  goodsList: any;
  imgSrc = 'https://img2.imgtn.bdimg.com/it/u=2021196284,732698940&fm=26&gp=0.jpg';

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.goods();
    this.search();
  }

  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  certificate() {
    this.router.navigateByUrl('/tabs/store-certification');
  }

  // 跳转页面详情
  toDetail(i) {
    // this.router.navigateByUrl('/tabs/goods-detail/' + i);
    this.router.navigateByUrl('/tabs/goods-add/' + i + '&edit');
  }

  // 商品类别
  cate() {
  }

  // 查询商品
  goods() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.params = {
          userId: userId,
          tenantId: tenantId,
          params: {
            condition: {
              SourceType: '商城',
              ProductType: '商品',
              ExhibitionId: recordId,
              IsRecycled: false,
              ExhibitorId: exhibitorId
            },
            // 'pageIndex':1,'pageSize':10
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product', this.params)
          .subscribe(res => {
            if ((res as any).resCode === 0) {
              this.goodsList = (res as any).result;
            }
          });
      });
  }

  // 查询店铺信息
  search() {
    Promise.all([
      this.storage.get('ExhibitorExbihitionInfoId'),
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')])
      .then(([exhibitorExbihitionInfoId, tenantId, userId, recordId, exhibitorId]) => {
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
            if (res) {
              this.ss = (res as any).result[0];
            }
          });
      });
  }

  // 获取商品分类类别
  type() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.data = {
          'userId': userId,
          'tenantId': tenantId,
          'params': {
            'condition': {
              'ExhibitionId': recordId
            },
            'childObjects': [{
              'fieldName': 'CategorySecond',
              'reference': {
                'object': 'CategorySecond',
                'field': 'CategoryFirstId'
              }
            }]
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CategorySecond', this.data)
          .subscribe(res => {
            if (res) {
              const arr = res as any;
              this.typeList = arr.result;
            }
          }, error => {
          });
      });
  }

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
        const ss = (res as any).result[0];
        this.storage.set('MSTenantId', ss.TenantId);
        this.storage.set('MSUserId', ss.UserId);
        this.storage.set('MSRecordId', ss.RecordId);
      }
    });
  }
}
