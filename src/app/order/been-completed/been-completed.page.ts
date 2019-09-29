import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-been-completed',
  templateUrl: './been-completed.page.html',
  styleUrls: ['./been-completed.page.scss'],
})
export class BeenCompletedPage implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  toEdit(){
  
      }
}
