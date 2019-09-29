import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StorePage } from './store.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatDividerModule} from '@angular/material';
import {  MatExpansionModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatDividerModule, MatExpansionModule,
    RouterModule.forChild([{ path: '', component: StorePage }])
  ],
  declarations: [StorePage]
})
export class StorePageModule {}
