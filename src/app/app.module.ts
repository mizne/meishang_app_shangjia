// import { BindTelComponent } from './login/bind-tel/bind-tel.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatButtonModule } from '@angular/material';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxEchartsModule } from 'ngx-echarts';
import { environment } from '../environments/environment';

import { FormsModule } from '@angular/forms';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
// import { SecondTypeComponent} from './goods/second-type/second-type.component';
// import { SecondTypeComponentModule } from './goods/second-type/second-type.module';
import { Wechat } from '@ionic-native/wechat/ngx';
import { BindPhonePage } from '../app/bind-phone/bind-phone.page';
import { WithdrawFailedComponent } from '../app/financial/modals/withdraw-failed/withdraw-failed.component';
import { WithdrawSuccessComponent } from '../app/financial/modals/withdraw-success/withdraw-success.component';
import { LoginGuardGuard } from './guard/login-guard.guard';
import { AdGuardGuard } from './guard/ad-guard.guard';
import { SelectDialogPage } from '../app/select-dialog/select-dialog.page';
import { ProgressBarPage } from '../app/progress-bar/progress-bar.page';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@NgModule({
  declarations: [AppComponent, BindPhonePage, WithdrawFailedComponent, WithdrawSuccessComponent, SelectDialogPage, ProgressBarPage],
  entryComponents: [BindPhonePage, WithdrawFailedComponent, WithdrawSuccessComponent, SelectDialogPage, ProgressBarPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxEchartsModule,
    FormsModule,
    //  SecondTypeComponentModule

  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Camera,
    AppMinimize,
    Wechat,
    LoginGuardGuard,
    AdGuardGuard,
    InAppBrowser,
    AppUpdate,
    AppVersion,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
