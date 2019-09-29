import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WithdrawRecordPage } from './withdraw-record.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawRecordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WithdrawRecordPage]
})
export class WithdrawRecordPageModule {}
