import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
// import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public params;
  public data;
  constructor(
    public modalController: ModalController,
    public storage: Storage,
    // public router: Router,
    public http: HttpClient,
    public toastController: ToastController,
    public alertController: AlertController,
  ) { }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnInit() {
    this.data = {
      'params': {
        'condition': {
          'ExName': '美尚云讯'
        }
      }
    };
    this.http.post(AppComponent.apiUrl + '/v2/data/queryList/Exhibition', this.data).subscribe(res => {
      if ((res as any).resCode == '0') {
        // console.log((res as any).resCode)
        const ss = (res as any).result[0];
        this.storage.set('MSTenantId', ss.TenantId);
        this.storage.set('MSUserId', ss.UserId);
        this.storage.set('MSRecordId', ss.RecordId);
        this.storage.get('MSTenantId').then((val) => {
          console.log('Your MSTenantId is ' + val);
        });
        this.storage.get('MSUserId').then((val) => {
          console.log('Your MSUserId is ' + val);
        });
        this.storage.get('MSRecordId').then((val) => {
          console.log('Your MSRecordId is ' + val);
        });
      }
    });
  }
}
