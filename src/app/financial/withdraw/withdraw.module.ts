import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WithdrawPage } from './withdraw.page';
import { MatDividerModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: WithdrawPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,MatDividerModule,MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WithdrawPage]
})
export class WithdrawPageModule {}
