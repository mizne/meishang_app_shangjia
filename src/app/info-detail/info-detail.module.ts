import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoDetailPage } from './info-detail.page';
import { MatTabsModule,MatStepperModule,MatButtonModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatStepperModule,MatButtonModule,
    RouterModule.forChild([{ path: '', component: InfoDetailPage }])
  ],
  declarations: [InfoDetailPage]
})
export class InfoDetailPageModule {}
