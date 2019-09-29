import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddGoodsPage } from './add-goods.page';
import { MatCheckboxModule, MatMenuModule, MatButtonModule, MatListModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AddGoodsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatListModule,
    MatCheckboxModule,MatMenuModule,MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddGoodsPage]
})
export class AddGoodsPageModule {}
