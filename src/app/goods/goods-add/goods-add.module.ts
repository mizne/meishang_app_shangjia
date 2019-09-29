import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GoodsAddPage } from './goods-add.page';
import { MatDividerModule, MatButtonModule, MatMenuModule, MatIconModule, MatListModule, MatInputModule, MatDialogModule, MatDialogConfig, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { QuillModule } from 'ngx-quill';
import { QuillEditorWrapperComponent } from '../../quill-editor-wrapper/quill-editor-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: GoodsAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MatDividerModule, MatButtonModule, MatMenuModule, MatIconModule, MatListModule, MatInputModule, MatDialogModule,
    RouterModule.forChild(routes),
    QuillModule
  ],
  providers: [],
  declarations: [GoodsAddPage, QuillEditorWrapperComponent]
})
export class GoodsAddPageModule { }
