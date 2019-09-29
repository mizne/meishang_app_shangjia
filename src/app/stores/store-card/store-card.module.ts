import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreCardPage } from './store-card.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,
    RouterModule.forChild([{ path: '', component: StoreCardPage }])
  ],
  declarations: [StoreCardPage]
})
export class StoreCardPageModule {}
