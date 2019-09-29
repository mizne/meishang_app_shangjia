import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-evaluate-list',
  templateUrl: './evaluate-list.page.html',
  styleUrls: ['./evaluate-list.page.scss'],
})
export class EvaluateListPage implements OnInit {
  public orderId;
  public productList;
  constructor(public router: Router, public storage: Storage, public http: HttpClient, public nav: NavController) { }

  ngOnInit() {
    const aa = this.router.url;
    const arr = aa.split('/');
    this.orderId = arr[2];
    this.queryProductList();
  }

  back() {
    this.nav.back();
  }

  queryProductList() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('token')
    ]).then(([tenantId, userId, token]) => {
      const queryOrderData = {
        tenantId: tenantId,
        UserId: userId,
        params: {
          condition: {
            OrderId: this.orderId
          },
          properties: ['ProductId.Product.___all', 'orderID.Order.___all']
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/OrderLineItem', queryOrderData,
        { headers: { Authorization: 'Bearer' + token } })
        .subscribe(res => {
          if ((res as any).resCode === 0) {
            this.productList = (res as any).result;
          }
        });
    });
  }

  evaDetail(id) {
    this.router.navigateByUrl('/evaluate/' + id);
  }
}
