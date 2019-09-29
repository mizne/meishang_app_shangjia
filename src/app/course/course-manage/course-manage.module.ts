import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseManagePage } from './course-manage.page';
import { MatIconModule, MatButtonModule, MatMenuModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: CourseManagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatIconModule,MatButtonModule,MatMenuModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CourseManagePage]
})
export class CourseManagePageModule {}
