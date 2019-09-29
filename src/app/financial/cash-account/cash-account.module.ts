import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashAccountPage } from './cash-account.page';
import { MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: CashAccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashAccountPage]
})
export class CashAccountPageModule {}
