import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-been-shipped',
  templateUrl: './been-shipped.page.html',
  styleUrls: ['./been-shipped.page.scss'],
})
export class BeenShippedPage implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  toEdit(){
  
      }
}
