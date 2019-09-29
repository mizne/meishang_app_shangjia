import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsEvaluateEditPage } from './goods-evaluate-edit.page';
import { MatButtonModule, MatMenuModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GoodsEvaluateEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsEvaluateEditPage]
})
export class GoodsEvaluateEditPageModule {}
