import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderSearchPage } from './order-search.page';
import { MatMenuModule, MatDividerModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: OrderSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderSearchPage]
})
export class OrderSearchPageModule {}
