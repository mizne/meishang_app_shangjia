import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreManagementPage } from './store-management.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatListModule,MatDividerModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatListModule,MatDividerModule,
    RouterModule.forChild([{ path: '', component: StoreManagementPage }])
  ],
  declarations: [StoreManagementPage]
})
export class StoreManagementPageModule {}
