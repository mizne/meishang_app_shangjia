import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsCommentsPage } from './goods-comments.page';

const routes: Routes = [
  {
    path: '',
    component: GoodsCommentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsCommentsPage]
})
export class GoodsCommentsPageModule {}
