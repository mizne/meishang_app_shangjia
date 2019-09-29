import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-goods-comments',
  templateUrl: './goods-comments.page.html',
  styleUrls: ['./goods-comments.page.scss'],
})
export class GoodsCommentsPage implements OnInit {
  public evaluateId;
  public commentsInfo;
  public commentList;
  public isComment;
  public commentNum;
  public checkExhibitorId;
  constructor(public router: Router,
              public http: HttpClient,
              public storage: Storage,
              public nav: NavController,
              public toast: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const aa = this.router.url;
    const arr = aa.split('/');
    this.evaluateId = arr[2];
    this.commentList = [];
    Promise.all([
      this.storage.get('ExhibitorId')
    ]).then(([exhibitorId]) => {
      this.checkExhibitorId = exhibitorId;
    });
    this.queryCommentsList();
    this.queryCommentsNum();
  }

  back() {
    this.nav.back();
  }

  queryCommentsList() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            // ExhibitorId: exhibitorId,
            ExhibitionId: recordId,
            ProductVisitInfoMessageId: this.evaluateId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/VisitInfoMessageComment', requestData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.commentList = (res as any).result;
            this.isComment = true;
          } else {
            this.commentList = [];
            this.isComment = false;
          }
        }, error => {
        });
    });
  }

  sendComments() {
    if (this.commentsInfo === '' || this.commentsInfo === null || this.commentsInfo === undefined) {
      this.successToast('请填写评论');
      return;
    }
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId'),
      this.storage.get('exLogo'),
      this.storage.get('exName')
    ]).then(([tenantId, userId, recordId, exhibitorId, logo, name]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          record: {
            ExhibitorId: exhibitorId,
            ExhibitionId: recordId,
            ProductVisitInfoMessageId: this.evaluateId,
            Content: this.commentsInfo,
            Logo: logo,
            Name: name
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/insert/VisitInfoMessageComment', requestData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.successToast('评论成功');
            this.commentsInfo = '';
            this.queryCommentsNum();
            this.queryCommentsList();
          }
        }, error => {
        });
    });
  }

  queryCommentsNum() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorId')
    ]).then(([tenantId, userId, recordId, exhibitorId]) => {
      const requestData = {
        tenantId: tenantId,
        userId: userId,
        params: {
          condition: {
            // ExhibitorId: exhibitorId,
            ExhibitionId: recordId,
            ProductVisitInfoMessageId: this.evaluateId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/VisitInfoMessageComment', requestData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.commentNum = (res as any).result;
          }
        }, error => {
        });
    });
  }

  // 提示函数封装
  async successToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top',
      color: 'dark',
      cssClass: 'msg-tip',
    });
    toast.present();
  }

  deleteComment(recordId) {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('token')
    ]).then(([tenantId, userId, token]) => {
      const requestData = {
        tenantId,
        userId,
        params: {
          recordId: recordId
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/delete/VisitInfoMessageComment', requestData,
        {headers: {Authorization: 'Bearer ' + token}})
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.successToast('删除成功');
            this.queryCommentsNum();
            this.queryCommentsList();
          }
        }, (err) => {
      });
    });
  }
}
