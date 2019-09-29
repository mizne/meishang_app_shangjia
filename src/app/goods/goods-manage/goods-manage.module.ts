import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsManagePage } from './goods-manage.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatDividerModule, MatMenuModule } from '@angular/material';


 const routes: Routes = [
  {
    path: '',
    component: GoodsManagePage,
    children:[
     
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatTabsModule,
    
    MatStepperModule,MatButtonModule,MatDividerModule,MatMenuModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[],
  declarations: [GoodsManagePage]
})
export class GoodsManagePageModule {}
