import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreCertificationPage } from './store-certification.page';
import { MatDividerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: StoreCertificationPage
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
  declarations: [StoreCertificationPage]
})
export class StoreCertificationPageModule {}
