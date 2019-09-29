import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsSearchPage } from './goods-search.page';
import { MatMenuModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: GoodsSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatMenuModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsSearchPage]
})
export class GoodsSearchPageModule {}
