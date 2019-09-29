import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CashIntroducePage } from './cash-introduce.page';

const routes: Routes = [
  {
    path: '',
    component: CashIntroducePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CashIntroducePage]
})
export class CashIntroducePageModule {}
