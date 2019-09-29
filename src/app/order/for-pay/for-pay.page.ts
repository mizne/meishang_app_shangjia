import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-for-pay',
  templateUrl: './for-pay.page.html',
  styleUrls: ['./for-pay.page.scss'],
})
export class ForPayPage implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  toEdit(){
  }
}
