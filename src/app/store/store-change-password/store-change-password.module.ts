import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreChangePasswordPage } from './store-change-password.page';

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
    RouterModule.forChild(routes)
  ],
  declarations: [StoreChangePasswordPage]
})
export class StoreChangePasswordPageModule {}
