import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsDetailPage } from './goods-detail.page';
import { MatButtonModule, MatMenuModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GoodsDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,MatMenuModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsDetailPage]
})
export class GoodsDetailPageModule {}
