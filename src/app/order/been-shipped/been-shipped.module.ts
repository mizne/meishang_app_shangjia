import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BeenShippedPage } from './been-shipped.page';
import { MatDividerModule, MatListModule, MatButtonModule, MatDialogModule } from '@angular/material';


const routes: Routes = [
  {
    path: '',
    component: BeenShippedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,MatDividerModule,MatListModule,MatButtonModule,MatDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BeenShippedPage],
  entryComponents: []
})
export class BeenShippedPageModule {}
