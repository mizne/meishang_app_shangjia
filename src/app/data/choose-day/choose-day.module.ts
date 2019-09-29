import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChooseDayPage } from './choose-day.page';
import { MatTabsModule } from '@angular/material';
import { NgxEchartsModule } from 'ngx-echarts';

const routes: Routes = [
  {
    path: '',
    component: ChooseDayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    NgxEchartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChooseDayPage]
})
export class ChooseDayPageModule {}
