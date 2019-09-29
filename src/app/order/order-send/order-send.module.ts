import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderSendPage } from './order-send.page';
import { MatTabsModule, MatIconModule, MatDividerModule, MatButtonModule, MatDialogModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: OrderSendPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatIconModule,MatDividerModule,MatButtonModule,MatDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderSendPage]
})
export class OrderSendPageModule {}
