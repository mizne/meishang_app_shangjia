import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FinancialManagePage } from './financial-manage.page';
import { MatDividerModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: FinancialManagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,MatDividerModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FinancialManagePage]
})
export class FinancialManagePageModule {}
