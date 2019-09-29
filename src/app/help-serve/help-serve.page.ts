import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-help-serve',
  templateUrl: './help-serve.page.html',
  styleUrls: ['./help-serve.page.scss'],
})
export class HelpServePage implements OnInit, AfterViewInit {
  public sendContent;
  public EEInfoId;
  public messageList;

  public storeLogo;
  public userLogo;
  public timer;
  @ViewChild(IonContent) ionContent: IonContent;

  constructor(public nav: NavController, private http: HttpClient, public storage: Storage, public router: Router) { }

  ngOnInit() {
    const url = this.router.url;
    const splitURL = url.split('/');
    this.EEInfoId = splitURL[3];
  }

  ngAfterViewInit() {
    console.log(this.ionContent);
  }

  ionViewWillEnter() {
    this.queryMessage();
    this.queryStoreLogo();
    this.queryUserLogo();
    this.timer = setInterval(() => {
      this.queryMessage();
    }, 3000);
  }

  // 返回上一页
  canGoBack() {
    clearInterval(this.timer);
    this.nav.back();
  }

  sendMessage() {
    if (this.sendContent === '' || this.sendContent === undefined) {
      return;
    }
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId')
    ]).then(([tenantId, userId, exhibitionId, exhibitorExhibitionInfoId]) => {
      const queryOrderData = {
        userId,
        tenantId,
        params: {
          record: {
            ExhibitionId: exhibitionId,
            Type: '1',
            Content: this.sendContent,
            Logo: this.storeLogo,
            VisitorReceiver: this.EEInfoId,
            StoreSender: exhibitorExhibitionInfoId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/insert/MsgInfo', queryOrderData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.sendContent = '';
            this.queryMessage();
          }
        });
    });
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      that.ionContent.scrollToBottom();
    }, 500);
  }

  queryMessage() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId')
    ]).then(([tenantId, userId, exhibitionId, exhibitorExhibitionInfoId]) => {
      const queryOrderData = {
        userId,
        tenantId,
        params: {
          condition: {
            ExhibitionId: exhibitionId,
            $or: [
              {
                VisitorReceiver: this.EEInfoId,
                StoreSender: exhibitorExhibitionInfoId
              },
              {
                VisitorSender: this.EEInfoId,
                Storeeceiver: exhibitorExhibitionInfoId
              }]
          },
          options: {
            sort: {
              CreatedAtMesc: 1
            }
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/MsgInfo', queryOrderData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.messageList = (res as any).result;
          }
        });
    });
  }

  queryStoreLogo() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId'),
      this.storage.get('ExhibitorExhibitionInfoId')
    ]).then(([tenantId, userId, exhibitionId, exhibitorExhibitionInfoId]) => {
      const queryOrderData = {
        userId,
        tenantId,
        params: {
          condition: {
            ExhibitionId: exhibitionId,
            RecordId: exhibitorExhibitionInfoId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitorExhibitionInfo', queryOrderData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.storeLogo = (res as any).result[0].Logo;
          }
        });
    });
  }

  queryUserLogo() {
    Promise.all([
      this.storage.get('MSTenantId'),
      this.storage.get('UserId'),
      this.storage.get('MSRecordId')
    ]).then(([tenantId, userId, exhibitionId]) => {
      const queryOrderData = {
        userId,
        tenantId,
        params: {
          condition: {
            ExhibitionId: exhibitionId,
            RecordId: this.EEInfoId
          }
        }
      };
      this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Visitor', queryOrderData)
        .subscribe(res => {
          if ((res as any).resMsg === 'success') {
            this.userLogo = (res as any).result[0].Logo;
          }
        });
    });
  }
}
