import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-evaluate',
  templateUrl: './evaluate.page.html',
  styleUrls: ['./evaluate.page.scss'],
})
export class EvaluatePage implements OnInit {
  public cardInfoList;
  public productId;
  constructor(public router: Router,
              public http: HttpClient,
              public storage: Storage,
              public nav: NavController) { }

  ngOnInit() {
    const aa = this.router.url;
    const arr = aa.split('/');
    this.productId = arr[2];
    this.cardInfoList = [];
    this.queryCommentList();
  }

  back() {
    this.nav.back();
  }

  // 商品评价
  queryCommentList() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('MSRecordId')])
    .then(([tenantId, userId, exhibitorId, recordId]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            ExhibitionId: recordId,
            ExhibitorId: exhibitorId,
            ProductId: this.productId,
            IsEvaluate: true
          },
          properties: ['ProductId.Product.___all', 'VisitorId.Visitor.___all']
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ProductVisitInfoMessage', requestData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.cardInfoList = (res as any).result;
          }
        }, error => {
        });
    });
  }

  // 点赞
  appreciate() {
  }

  // 商品评价的评论
  comment(recordId) {
    this.router.navigateByUrl('/goods-comments/' + recordId);
  }

  classification(value) {
    if (value) {
      return '暂无规格';
    } else {
      return '暂无规格';
    }
  }

  checkPVNumber(number) {
    if (number) {
      return number;
    } else {
      return 0;
    }
  }
}
