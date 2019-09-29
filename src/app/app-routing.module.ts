import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuardGuard } from './guard/login-guard.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'categories',
    loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'product-type/:id', loadChildren: './product-type/product-type.module#ProductTypePageModule' },
  { path: 'waterpull', loadChildren: './waterpull/waterpull.module#WaterpullPageModule' },
  { path: 'teaching-comments', loadChildren: './teaching-comments/teaching-comments.module#TeachingCommentsPageModule' },
  { path: 'agreement', loadChildren: './agreement/agreement.module#AgreementPageModule' },
  { path: 'bind-phone', loadChildren: './bind-phone/bind-phone.module#BindPhonePageModule' },
  {
    path: 'order-send',
    children: [
      {
        path: '',
        loadChildren: './order/order-send/order-send.module#OrderSendPageModule',
        canActivate: [LoginGuardGuard]
      }
    ]
  },
  {
    path: 'store-change-password',
    children: [
      {
        path: '',
        loadChildren: './stores/store-change-password/store-change-password.module#StoreChangePasswordPageModule',
        canActivate: [LoginGuardGuard]
      }
    ]
  },
  {
    path: 'evaluate/:id',
    children: [
      {
        path: '',
        loadChildren: './evaluate/evaluate.module#EvaluatePageModule',
        canActivate: [LoginGuardGuard]
      }
    ]
  },
  {
    path: 'goods-comments/:id',
    children: [
      {
        path: '',
        loadChildren: './goods-comments/goods-comments.module#GoodsCommentsPageModule',
        canActivate: [LoginGuardGuard]
      }
    ]
  },
  {
    path: 'evaluate-list/:id',
    children: [
      {
        path: '',
        loadChildren: './evaluate-list/evaluate-list.module#EvaluateListPageModule',
        canActivate: [LoginGuardGuard]
      }
    ]
  },
  { path: 'select-dialog', loadChildren: './select-dialog/select-dialog.module#SelectDialogPageModule' },
  { path: 'progress-bar', loadChildren: './progress-bar/progress-bar.module#ProgressBarPageModule' },
  // { path: 'advertisement', loadChildren: './advertisement/advertisement.module#AdvertisementPageModule' },

  // { path: 'help-serve', loadChildren: './help-serve/help-serve.module#HelpServePageModule' },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
