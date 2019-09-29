import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuardGuard } from '../guard/login-guard.guard';
import { AdBannerResolverService } from '../route-resolver/ad-banner-resolver.service';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'agreement',
        children: [
          {
            path: '',
            loadChildren: '../agreement/agreement.module#AgreementPageModule'
          }
        ]
      },
      {
        path: 'infor',
        children: [
          {
            path: '',
            loadChildren: '../infor/infor.module#InforPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'info-detail',
        children: [
          {
            path: '',
            loadChildren: '../info-detail/info-detail.module#InfoDetailPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'help-serve/:id',
        children: [
          {
            path: '',
            loadChildren: '../help-serve/help-serve.module#HelpServePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store',
        children: [
          {
            path: '',
            loadChildren: '../stores/store/store.module#StorePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      // {
      //   path: 'categories',
      //   children: [
      //     {
      //       path: '',
      //       // loadChildren: '../stores/categories/Categories.module#CategoriesPageModule',
      //       loadChildren: '.'
      //     }
      //   ]
      // },
      {
        path: 'store-change-password',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-change-password/store-change-password.module#StoreChangePasswordPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-pay',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-pay/store-pay.module#StorePayPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-login',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-login/store-login.module#StoreLoginPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-card',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-card/store-card.module#StoreCardPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },

      {
        path: 'store-certification',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-certification/store-certification.module#StoreCertificationPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-certification-success',
        children: [
          {
            path: '',
            loadChildren: '../store-certification-success/store-certification-success.module#StoreCertificationSuccessPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'examine-tip',
        children: [
          {
            path: '',
            loadChildren: '../examine-tip/examine-tip.module#ExamineTipPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'frozen-tip',
        children: [
          {
            path: '',
            loadChildren: '../frozen-tip/frozen-tip.module#FrozenTipPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-edit-name',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-edit-name/store-edit-name.module#StoreEditNamePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-edit-introduce',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-edit-introduce/store-edit-introduce.module#StoreEditIntroducePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-wx',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-wx/store-wx.module#StoreWxPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-info',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-info/store-info.module#StoreInfoPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'store-management',
        children: [
          {
            path: '',
            loadChildren: '../stores/store-management/store-management.module#StoreManagementPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'goods-manage',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods-manage/goods-manage.module#GoodsManagePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'type-second/:id',
        children: [
          {
            path: '',
            loadChildren: '../goods/type-second/type-second.module#TypeSecondPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'goods-search',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods-search/goods-search.module#GoodsSearchPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'goods-add-type',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods-add-type/goods-add-type.module#GoodsAddTypePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'goods-edit-type',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods-edit-type/goods-edit-type.module#GoodsEditTypePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'goods-add/:id',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods-add/goods-add.module#GoodsAddPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'every-cateory/:id',
        children: [
          {
            path: '',
            loadChildren: '../goods/every-cateory/every-cateory.module#EveryCateoryPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'goods-evaluate-edit/:id',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods-evaluate-edit/goods-evaluate-edit.module#GoodsEvaluateEditPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'goods-detail/:id',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods-detail/goods-detail.module#GoodsDetailPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'course-manage',
        children: [
          {
            path: '',
            loadChildren: '../course/course-manage/course-manage.module#CourseManagePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'course-details/:id',
        children: [
          {
            path: '',
            loadChildren: '../course/course-details/course-details.module#CourseDetailsPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'course-release',
        children: [
          {
            path: '',
            loadChildren: '../course/course-release/course-release.module#CourseReleasePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'course-edit/:id',
        children: [
          {
            path: '',
            loadChildren: '../course/course-edit/course-edit.module#CourseEditPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'appoint-live',
        children: [
          {
            path: '',
            loadChildren: '../course/appoint-live/appoint-live.module#AppointLivePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'order-manage',
        children: [
          {
            path: '',
            loadChildren: '../order/order-manage/order-manage.module#OrderManagePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'order-send',
        children: [
          {
            path: '',
            loadChildren: '../order/order-send/order-send.module#OrderSendPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'order-search',
        children: [
          {
            path: '',
            loadChildren: '../order/order-search/order-search.module#OrderSearchPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'send-goods/:type',
        children: [
          {
            path: '',
            loadChildren: '../order/send-goods/send-goods.module#SendGoodsPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'for-pay',
        children: [
          {
            path: '',
            loadChildren: '../order/for-pay/for-pay.module#ForPayPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'been-shipped',
        children: [
          {
            path: '',
            loadChildren: '../order/been-shipped/been-shipped.module#BeenShippedPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'been-closed',
        children: [
          {
            path: '',
            loadChildren: '../order/been-closed/been-closed.module#BeenClosedPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'been-completed',
        children: [
          {
            path: '',
            loadChildren: '../order/been-completed/been-completed.module#BeenCompletedPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'logistics-info/:id',
        children: [
          {
            path: '',
            loadChildren: '../order/logistics-info/logistics-info.module#LogisticsInfoPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'after-sell-detail/:id',
        children: [
          {
            path: '',
            loadChildren: '../order/after-sell-detail/after-sell-detail.module#AfterSellDetailPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'financial-manage',
        children: [
          {
            path: '',
            loadChildren: '../financial/financial-manage/financial-manage.module#FinancialManagePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'withdraw',
        children: [
          {
            path: '',
            loadChildren: '../financial/withdraw/withdraw.module#WithdrawPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'cash-account',
        children: [
          {
            path: '',
            loadChildren: '../financial/cash-account/cash-account.module#CashAccountPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'been-settled',
        children: [
          {
            path: '',
            loadChildren: '../financial/been-settled/been-settled.module#BeenSettledPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'income-details',
        children: [
          {
            path: '',
            loadChildren: '../financial/income-details/income-details.module#IncomeDetailsPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'withdraw-record',
        children: [
          {
            path: '',
            loadChildren: '../financial/withdraw-record/withdraw-record.module#WithdrawRecordPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'no-settle',
        children: [
          {
            path: '',
            loadChildren: '../financial/no-settle/no-settle.module#NoSettlePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'cash-introduce',
        children: [
          {
            path: '',
            loadChildren: '../financial/cash-introduce/cash-introduce.module#CashIntroducePageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'choose-day',
        children: [
          {
            path: '',
            loadChildren: '../data/choose-day/choose-day.module#ChooseDayPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'password',
        children: [
          {
            path: '',
            loadChildren: '../login/password/password.module#PasswordPageModule',
          }
        ]
      },
      {
        path: 'verification',
        children: [
          {
            path: '',
            loadChildren: '../login/verification/verification.module#VerificationPageModule',
          }
        ]
      },
      {
        path: 'marketing-activity',
        children: [
          {
            path: '',
            loadChildren: '../market/marketing-activity/marketing-activity.module#MarketingActivityPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'add-goods/:id',
        children: [
          {
            path: '',
            loadChildren: '../market/add-goods/add-goods.module#AddGoodsPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'lesson-list',
        children: [
          {
            path: '',
            loadChildren: '../my-lessons/lesson-list/lesson-list.module#LessonListPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'add-lesson',
        children: [
          {
            path: '',
            loadChildren: '../my-lessons/add-lesson/add-lesson.module#AddLessonPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'add-teaching-new',
        children: [
          {
            path: '',
            loadChildren: '../my-lessons/add-teaching-new/add-teaching-new.module#AddTeachingNewPageModule',
            canActivate: [LoginGuardGuard]
          }
        ]
      },
      {
        path: 'advertisement',
        children: [
          {
            path: '',
            loadChildren: '../advertisement/advertisement.module#AdvertisementPageModule',
            resolve: {
              adBanner: AdBannerResolverService
            }
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/advertisement',
        pathMatch: 'full',
        resolve: {
          adBanner: AdBannerResolverService
        }
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/advertisement',
    pathMatch: 'full',
    resolve: {
      adBanner: AdBannerResolverService
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
