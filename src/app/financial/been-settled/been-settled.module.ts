import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BeenSettledPage } from './been-settled.page';

const routes: Routes = [
  {
    path: '',
    component: BeenSettledPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BeenSettledPage]
})
export class BeenSettledPageModule {}
