import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController , NavParams} from '@ionic/angular';
@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.page.html',
  styleUrls: ['./select-dialog.page.scss'],
})
export class SelectDialogPage implements OnInit {

  constructor(  public toast: ToastController,
    public modalCtrl: ModalController, public nav: NavParams ) { }

  ngOnInit() {
  }

  cancel() {
    // const { data } = await this.modalCtrl.onWillDismiss();
    // console.log(data);
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
