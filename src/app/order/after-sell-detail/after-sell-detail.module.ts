import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AfterSellDetailPage } from './after-sell-detail.page';
import { MatButtonModule, MatMenuModule, MatCheckboxModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AfterSellDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
MatMenuModule,MatCheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AfterSellDetailPage]
})
export class AfterSellDetailPageModule {}
