import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { debug } from 'util';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.page.html',
  styleUrls: ['./course-details.page.scss']
})
export class CourseDetailsPage implements OnInit {
  public arr1 = [];
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(public nav: NavController, public router: Router, private http: HttpClient, public storage: Storage) { }
  public UserId;
  public TenantId;
  public ExhibitionId;
  public StepsList;
  public VisitorRecordId;
  public courseId;
  public courseDetailsInfo;
  public goodsList;
  public courseDetails;
  public routesInfo;
  public params;
  public ss;
  ngOnInit() {
    let str = this.router.url;
    this.courseId = str.substring(str.length - 24);
    this.courseDetailsInfo = {};
    this.arr1 = [
      '时尚焦点小眼影Carbon',
      '柔遮瑕膏/轻亮粉底液',
      'Ultrasun 优佳全效防晒乳',
      '妙巴黎柔护提亮隔离乳',
      'CUIR葵儿红石榴防护喷雾',
      'JMsolution韩国海洋珍珠防晒棒'
    ];
  }

  ionViewWillEnter() {
    this.getCourseDetails();
    this.getStore();
    this.getTalk();
  }
  // 返回上一页
  back() {
    this.nav.back();
  }

  goToTest() {
    var mm = 'huhu';
    this.arr1.push(mm);
  }

  // 获取店铺头像名称

  getStore() {

    Promise.all([
      this.storage.get('ExhibitorExbihitionInfoId'),
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('RecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([exhibitorExbihitionInfoId, tenantId, userId, recordId, exhibitorId]) => {
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
            ExhibitionId: recordId,
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
      this.http
        .post(AppComponent.apiUrl + '/v2/data/queryList/Product', courseData)
        .subscribe(res => {
          this.courseDetailsInfo = (res as any).result;
          this.goodsList = (res as any).result[0];
          this.courseDetails = (this.goodsList as any).CourseList;
          this.routesInfo = (this.goodsList as any).Product;
        });
    });
  }

  // 获取评论内容
  getTalk() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId')]);
  }
}
