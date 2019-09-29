import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
// import { AlertController } from "@ionic/angular";
// import { NavController } from "@ionic/angular";
import { NavController } from '@ionic/angular';
  // import { Camera } from '@ionic-native/camera';
  import { AppComponent } from '../app.component';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"]
})
export class CategoriesPage implements OnInit {
  public UserId;
  public TenantId;
  public ExhibitionId;
  public CategoriesFirstList;
  public CategoriesSecondList;
  public VisitorRecordId;
  public firstCategoryId;
  public toastCtrl;
  public isGoods1;
  public isGoods2;
  public searchValue;
  public moreclass;
  public leftStyle;
  public leftid;



  constructor(
   public nav: NavController,
    // public alertController: AlertController,
    public router: Router,
    private http: HttpClient,
    public storage: Storage
  ) {}

  ngOnInit() {
    this.getCategoriesFirst()
    this.isGoods1 = true;
    this.isGoods2 = false;
   this.searchValue=""
    this.moreclass="test"
    this.leftStyle ="perStyle"
  }
  // 返回上一页
  canGoBack() {
    this.nav.back()
  
  }


  

  gotoGet1(id) {
    console.log("======点击=====1======");
    this.firstCategoryId=id
    console.log("======点击=====1======" + this.firstCategoryId);
    this.getCategoriesSecond()
    // this.leftStyle ="perStyleActive"
    // this.isGoods1 = !this.isGoods1;
    // console.log(
    //   "======this.isGoods1========" + this.isGoods1 + "=====" + this.isGoods2
    // );
    this.leftid=id
    console.log("======= this.leftid=======" + this.leftid)
  }
  gotoGet2() {
    console.log("======点击====2=======");
    this.isGoods2 = !this.isGoods2;
    console.log(
      "======this.isGoods1========" + this.isGoods1 + "=====" + this.isGoods2
    );
  }
 


  // 查询一级分类
  getCategoriesFirst() {
    console.log("=====查询一级分类============");
    Promise.all([
      this.storage.get("TenantId"),
      this.storage.get("UserId"),
      this.storage.get("RecordId")
    ]).then(([tenantId, userId, recordId]) => {
      // debugger

      let queryCategoriesFirst = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            ExhibitionId: recordId
          },
           options: {
            pageIndex:1,
            pageSize: 9
          }

        }
      };

      this.http
        .post(
          AppComponent.apiUrl + "/v2/data/queryList/CategoryFirst",
          queryCategoriesFirst
        )
        .subscribe(res => {
          this.CategoriesFirstList = (res as any).result;
          console.log("=====查询一级分类成功============");
          console.log(
            "==firstCategoryId============" +
              this.CategoriesFirstList[0].RecordId
          );
          this.firstCategoryId = this.CategoriesFirstList[0].RecordId;
          this.leftid = this.CategoriesFirstList[0].RecordId;
          this.getCategoriesSecond()
          // console.log(JSON.stringify(this.coursesList))
        });
    });
  }


  

  // 查询二级分类
  getCategoriesSecond() {
    console.log("=====查询二级分类============");
    Promise.all([
      this.storage.get("TenantId"),
      this.storage.get("UserId"),
      this.storage.get("RecordId")
    
    ]).then(([tenantId, userId,recordId]) => {
      

      let queryCategoriesSecond = {
        UserId: userId,
        TenantId: tenantId,
        params: {
          condition: {
            ExhibitionId: recordId,
            CategoryFirstId: this.firstCategoryId
          }
        }
      };

      this.http
        .post(
          AppComponent.apiUrl + "/v2/data/queryList/CategorySecond",
          queryCategoriesSecond
        )
        .subscribe(res => {
          this.CategoriesSecondList = (res as any).result;
          console.log("=====查询二级分类成功============");
          // console.log(JSON.stringify(this.coursesList));
        });
    });
  }
}
