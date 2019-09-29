import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CourseEditPage } from './course-edit.page';
import { MatDividerModule, MatButtonModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: CourseEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,MatDividerModule,MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CourseEditPage, ]
})
export class CourseEditPageModule {}
