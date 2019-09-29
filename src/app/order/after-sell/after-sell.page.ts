import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-sell',
  templateUrl: './after-sell.page.html',
  styleUrls: ['./after-sell.page.scss'],
})
export class AfterSellPage implements OnInit {

  constructor(public dialog: MatDialog ,public router:Router,public nav: NavController) { }

  ngOnInit() {
  }
  toSell(){
    this.router.navigateByUrl('/tabs/after-sell-detail')
      }
  back() {
    this.nav.back();
  }
}
