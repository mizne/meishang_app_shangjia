import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { MatButtonModule, MatStepperModule,MatTabsModule, MatDividerModule } from '@angular/material';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MatButtonModule, MatStepperModule,MatTabsModule,MatDividerModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page, ],
  entryComponents: []
})
export class Tab1PageModule {
  
  toMsg(){
   
  }
}
