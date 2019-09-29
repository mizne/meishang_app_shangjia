import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AppointLivePage } from './appoint-live.page';
import { MatDividerModule, MatButtonModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: AppointLivePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,MatDividerModule,MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AppointLivePage]
})
export class AppointLivePageModule {}
