import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cash-introduce',
  templateUrl: './cash-introduce.page.html',
  styleUrls: ['./cash-introduce.page.scss'],
})
export class CashIntroducePage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  back(){
    this.router.navigateByUrl('/tabs/withdraw')
  }
}
