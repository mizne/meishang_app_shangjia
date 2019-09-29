import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreEditIntroducePage } from './store-edit-introduce.page';

const routes: Routes = [
  {
    path: '',
    component: StoreEditIntroducePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StoreEditIntroducePage]
})
export class StoreEditIntroducePageModule {}
