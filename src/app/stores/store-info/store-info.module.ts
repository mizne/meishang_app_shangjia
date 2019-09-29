import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreInfoPage } from './store-info.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatListModule,MatDividerModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatListModule,MatDividerModule,
    RouterModule.forChild([{ path: '', component: StoreInfoPage}])
  ],
  declarations: [StoreInfoPage]
})
export class StoreInfoPageModule {}
