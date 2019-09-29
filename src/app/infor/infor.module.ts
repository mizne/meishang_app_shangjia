import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatIconModule } from '@angular/material';

import { IonicModule } from '@ionic/angular';

import { InforPage } from './infor.page';

const routes: Routes = [
  {
    path: '',
    component: InforPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatStepperModule,MatButtonModule,MatIconModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InforPage]
})
export class InforPageModule {}
