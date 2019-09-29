import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseDetailsPage } from './course-details.page';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: CourseDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule, MatCheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CourseDetailsPage]
})
export class CourseDetailsPageModule {}
