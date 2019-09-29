import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { LoadedRouterConfig } from '@angular/router/src/config';
import { AlertController } from '@ionic/angular';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.page.html',
  styleUrls: ['./course-manage.page.scss'],
})
export class CourseManagePage implements OnInit {
  public params;
  public data;
  public dp;
  i: number = 1;
  isShow: boolean = true;
  TenantId: string;
  UserId: string;
  ExhibitorId: string;
  RecordId: string;
  courseArr;
  lose;
  srcImg = 'https://img3.imgtn.bdimg.com/it/u=3649848103,2026338768&fm=200&gp=0.jpg'
  goodsArr = [
    { srcImg: 'https://img3.imgtn.bdimg.com/it/u=3649848103,2026338768&fm=200&gp=0.jpg', title: '', view: '123', like: '456' },
  ];
  imgsrc = 'https://c.staticblitz.com/assets/client/components/SideMenu/blitz_logo-11cebad97cad4b50bc955cf72f532d1b.png';

  constructor(public router: Router, public _d: DomSanitizer,
              public http: HttpClient, public storage: Storage,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.courseList();
  }

  alive() {
    this.router.navigateByUrl('/tabs/appoint-live');
  }

  back() {
    this.router.navigateByUrl('/tabs/tab1');
  }

  release() {
    this.router.navigateByUrl('/tabs/course-release');
  }

  fileChange(e) {
    const file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
    this.imgsrc = window.URL.createObjectURL(file); // 获取上传的图片临时路径
  }

  // 课程详情
  codetail(id) {
    this.router.navigateByUrl('/tabs/course-edit/' + id);
  }

  // 下架删除课程
  delete(index) {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.dp = {
          'tenantId': tenantId,
          'userId': userId,
          'params': {
            'recordId': index,
            'setValue': {
              'IsShow': false
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.dp).subscribe(res => {
          if ((res as any).resCode == 0) {
            this.coursedown();
          }
        }, error => {
        });
      });
  }

  // 下架删除提示
  async coursedown() {
    const alert = await this.alertController.create({
      message: '操作成功',
      buttons: ['确定']
    });
    await alert.present();
    this.courseList();
  }

  // 获取课程列表
  courseList() {
    Promise.all([this.storage.get('MSTenantId'), this.storage.get('UserId'),
    this.storage.get('ExhibitorId'), this.storage.get('MSRecordId')])
      .then(([tenantId, userId, exhibitorId, recordId]) => {
        this.TenantId = tenantId;
        this.UserId = userId;
        this.ExhibitorId = exhibitorId;
        this.RecordId = recordId;

        this.data = {
          'tenantId': this.TenantId,
          'userId': this.UserId,
          'params': {
            'condition': {
              'ExhibitionId': this.RecordId,
              'ExhibitorId': this.ExhibitorId,
              'SourceType': '商城',
              'ProductType': '课程',
              'IsShow': true
            }
          }
        };
        this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Product', this.data).subscribe(res => {
          if (res) {
            this.lose = (res as any).resCode;
            this.courseArr = (res as any).result;
          } else {
          }
        }, error => {
        });
      });
  }

  dload() {
    this.i++;
    this.params = {
      'tenantId': this.TenantId,
      'userId': this.UserId,
      'params': {
        'recordId': '',
        'setValue': {
          'IsShow': true,
        }
      }
    };

    this.http.post(AppComponent.apiUrl + '/v2/data/update/Product', this.params).subscribe(res => {
      let result = res as any;
    }, error => {
    });
  }

  changeState(state) {
    if (state === '0') {
      return '审核中';
    } else if (state === '2') {
      return '审核未通过';
    }
  }
}
