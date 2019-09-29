import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreChangePasswordPage } from './store-change-password.page';
import { MatDividerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: StoreChangePasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StoreChangePasswordPage]
})
export class StoreChangePasswordPageModule {}
