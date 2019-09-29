import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FrozenTipPage } from './frozen-tip.page';

const routes: Routes = [
  {
    path: '',
    component: FrozenTipPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FrozenTipPage]
})
export class FrozenTipPageModule {}
