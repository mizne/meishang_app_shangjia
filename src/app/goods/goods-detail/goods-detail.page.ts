import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.page.html',
  styleUrls: ['./goods-detail.page.scss'],
})
export class GoodsDetailPage implements OnInit {
  public params;
  public data;
  public sj;
  public goods;
  public msg;
  public messageGoods;
  public msgnum;
  public totalmsg;
  imgSrc = 'https://img2.imgtn.bdimg.com/it/u=2021196284,732698940&fm=26&gp=0.jpg';
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  RecordId: string;
  goodsID: string;
  sult: any;
  constructor(public router: Router, public http: HttpClient,
              public storage: Storage, public nav: NavController,
              public toast: ToastController) { }

  ngOnInit() {
    // 获取商品携带的id
    let str = this.router.url;
    this.goodsID = str.substring(str.length - 24);
  }

  ionViewWillEnter() {
    this.save();
    this.detail();
    this.mesageNum();
    this.mcount();
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

  back() {
    // this.router.navigateByUrl('/tabs/goods-manage')
    this.nav.back();
  }

  all() {
    // this.router.navigateByUrl('/tabs/goods-evaluate-edit/'+this.goodsID)
  }

  id() {
  }

  editName() {
    this.router.navigateByUrl('/tabs/goods-edit-type/' + this.goodsID);
  }

  // 下架商品
  down() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'), this.storage.get('Token'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId, token]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.sj = {
          'tenantId': this.TenantId,
          'userId': this.UserId,
          'params': {
            'recordId': this.goodsID,
            'setValue': {
              'IsShow': false,
              'IsRecycled': false
            }

          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.sj).subscribe(res => {
          if ((res as any).resCode == 0) {
            this.pack('下架成功', 2000);
            this.nav.back();
          }
        }, error => {
        });
      });
  }

  // 下架商品
  up() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'), this.storage.get('Token'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId, token]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.sj = {
          'tenantId': this.TenantId,
          'userId': this.UserId,
          'params': {
            'recordId': this.goodsID,
            'setValue': {
              'IsShow': true,
              'IsRecycled': false
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.sj).subscribe(res => {
          if ((res as any).resCode == 0) {
            this.pack('上架成功', 2000);
            this.nav.back();
          }
        }, error => {
        });
      });
  }

  // 删除商品
  delete() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'), this.storage.get('Token'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId, token]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.goods = {
          'tenantId': this.TenantId,
          'userId': this.UserId,
          'params': {
            'recordId': this.goodsID,
            'setValue': {
              'IsShow': false,
              'IsRecycled': true
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.goods).subscribe(res => {
          if ((res as any).resCode == 0) {
            this.pack('删除成功', 2000);
            this.nav.back();
          }
        }, error => {
        });
      });
  }

  // 获取商品评论
  detail() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;
        this.data = {
          'userId': this.UserId,
          'tenantId': this.TenantId,
          'params': {
            'condition': {
              'ExhibitionId': this.RecordId,
              'ExhibitorId': this.ExhibitorId,
              'ProductId': this.goodsID
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ProductVisitInfoMessage', this.data).subscribe(res => {
          if ((res as any).resCode == 0) {
          }
        }, error => {
        });
      });
  }

  // 获取商品详情
  save() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
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
          if ((res as any).resCode == 0) {
            this.sult = (res as any).result[0];
          }
        }, error => {
        });
      });
  }

  // 查询商品留言
  mesageNum() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.msg = {
          'tenantId': 'a5758e24357d7ada5edca6c496563ba9',
          'userId': '5c862e0e76afe0fb6a1ba544',
          'params': {
            'condition': {
              'ExhibitionId': '5ca5c21285492e6834bb2880',
              'ExhibitorId': '5ca56ff39326a61cfe3c9f6a',
              'ProductId': '5cbff89dd645ee66b22478ce'
            },
            'options': {
              'pageIndex': 1, 'pageSize': 10

            },
            'properties': [
              'ProductId.Product.___all',
              'ExhibitorExhibitionInfoId.ExhibitorExhibitionInfo.___all'
            ],
            'childObjects': [
              {
                'fieldName': 'VisitInfoMessageComment',
                'reference': {
                  'object': 'VisitInfoMessageComment',
                  'field': 'ProductVisitInfoMessageId'
                }
              }
            ]
          }
        };
        this.http.post('https://api.baizhanke.com/v2/data/queryList/ProductVisitInfoMessage', this.msg).subscribe(res => {
          if ((res as any).resCode == 0) {
            this.messageGoods = (res as any).result;
          }
        }, error => {
        });
      });
  }

  // 查询商品留言
  mcount() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.msgnum = {
          'tenantId': 'a5758e24357d7ada5edca6c496563ba9',
          'userId': '5c862e0e76afe0fb6a1ba544',
          'params': {
            'condition': {
              'ExhibitionId': '5ca5c21285492e6834bb2880',
              'ExhibitorId': '5ca56ff39326a61cfe3c9f6a',
              'ProductId': '5cbff89dd645ee66b22478ce'
            },
          }
        };
        this.http.post('https://api.baizhanke.com/v2/data/queryCount/ProductVisitInfoMessage', this.msgnum).subscribe(res => {
          if ((res as any).resCode == 0) {
            this.totalmsg = (res as any);
          }
        }, error => {
        });
      });
  }
}
