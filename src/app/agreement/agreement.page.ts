import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.page.html',
  styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {

  constructor(
    public nav:NavController
  ) { }

  ngOnInit() {
  }
  back() {
    this.nav.back()
  }
}
