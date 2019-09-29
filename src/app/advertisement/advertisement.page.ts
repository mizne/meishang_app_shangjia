import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.page.html',
  styleUrls: ['./advertisement.page.scss'],
})
export class AdvertisementPage implements OnInit {
  public timer;
  public backGroundPic;
  constructor(
    public router: Router,
    public storage: Storage,
    public http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(banner => {
      this.backGroundPic = banner.adBanner;
    });
   }

  ngOnInit() {
    this.timer = setTimeout(() => {
      this.router.navigateByUrl('/tabs/verification', { replaceUrl: true });
    }, 6000);
  }

  ionViewWillEnter() {
  }

  skipPic() {
    clearTimeout(this.timer);
    this.router.navigateByUrl('/tabs/verification', { replaceUrl: true });
  }
}
