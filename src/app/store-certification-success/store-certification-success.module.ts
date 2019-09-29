import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreCertificationSuccessPage } from './store-certification-success.page';
import { MatDividerModule } from '@angular/material';
const routes: Routes = [
  {
    path: '',
    component: StoreCertificationSuccessPage
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
  declarations: [StoreCertificationSuccessPage]
})
export class StoreCertificationSuccessPageModule {}
