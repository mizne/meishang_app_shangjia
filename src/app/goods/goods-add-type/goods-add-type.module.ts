import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsAddTypePage } from './goods-add-type.page';
import { MatInputModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GoodsAddTypePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsAddTypePage]
})
export class GoodsAddTypePageModule {}
