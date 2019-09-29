import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StoreLoginPage } from './store-login.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatListModule,MatDividerModule} from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    MatStepperModule,MatButtonModule,MatIconModule,MatTreeModule,MatListModule,MatDividerModule,
    RouterModule.forChild([{ path: '', component: StoreLoginPage }])
  ],
  declarations: [StoreLoginPage]
})
export class StoreLoginPageModule {}
