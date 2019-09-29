import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerificationPage } from './verification.page';
import { MatDividerModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage
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
  declarations: [VerificationPage]
})
export class VerificationPageModule {}
