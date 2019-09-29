import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdGuardGuard implements CanActivate {
  constructor(private nav: NavController, private router: Router,
    private http: HttpClient, public storage: Storage, public toast: ToastController) {}

  // tslint:disable-next-line:max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.queryAdPicture();
  }

  queryAdPicture(): Observable<boolean> {
    const courseData = {
      userId: null,
      tenantId: 'sys',
      params: {
        condition: {
          ExhibitionId: '5d134a9888df65ca9a700569',
          Type: '4'
        }
      }
    };
    return this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ExhibitionBanner', courseData)
      .pipe(
        map(res => (res as any).resCode === 0)
        );
  }
}
