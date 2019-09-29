import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForPayPage } from './for-pay.page';
import { MatDividerModule, MatListModule, MatButtonModule, MatDialogModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: ForPayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,MatDividerModule,MatListModule,MatButtonModule,MatDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForPayPage],
  entryComponents: []
})
export class ForPayPageModule {}
