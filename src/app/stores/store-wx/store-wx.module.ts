import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreWxPage } from './store-wx.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,
    RouterModule.forChild([{ path: '', component: StoreWxPage }])
  ],
  declarations: [StoreWxPage]
})
export class StoreWxPageModule {}
