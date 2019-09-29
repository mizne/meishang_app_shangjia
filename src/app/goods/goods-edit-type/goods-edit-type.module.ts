import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsEditTypePage } from './goods-edit-type.page';
import { MatButtonModule, MatCheckboxModule, MatListModule, MatDividerModule, MatRadioModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GoodsEditTypePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,MatCheckboxModule,MatListModule,MatDividerModule,MatRadioModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsEditTypePage]
})
export class GoodsEditTypePageModule {}
