import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ClipboardModule } from 'ngx-clipboard';
import { SendGoodsPage } from './send-goods.page';
import { MatDividerModule, MatListModule, MatButtonModule, MatDialogModule, MatMenuModule, MatRadioButton } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: SendGoodsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClipboardModule,
    IonicModule,MatDividerModule,MatListModule,MatButtonModule,MatDialogModule,MatMenuModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SendGoodsPage],
  entryComponents: []
})
export class SendGoodsPageModule {}
