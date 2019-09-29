import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddLessonPage} from './add-lesson.page';
import { MatTabsModule,MatStepperModule,MatButtonModule,MatDividerModule, MatMenuModule } from '@angular/material';


 const routes: Routes = [
  {
    path: '',
    component:AddLessonPage,
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
  declarations: [AddLessonPage]
})
export class AddLessonPageModule {}
