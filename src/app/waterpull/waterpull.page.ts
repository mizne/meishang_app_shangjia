import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as $ from 'jquery';
@Component({
  selector: 'app-waterpull',
  templateUrl: './waterpull.page.html',
  styleUrls: ['./waterpull.page.scss'],
})
export class WaterpullPage implements OnInit {

  //   public img_data = [{
  //     src: 'assets/img/appointment.png'
  //   },
  //   {
  //       src: 'assets/img/didi.jpg'
  //     },
  //     {
  //       src: 'assets/img/mingugu.jpg'
  //     },
  //    {
  //       src: 'assets/img/enheng.jpg'
  //   },
  //   {
  //       src: 'assets/img/bags.jpg'
  //   }, {
  //       src: 'assets/img/xxxx.jpg'
  //   }, {
  //       src: 'assets/img/sakura.jpg'
  //   }
  // ]

  img_data = [
    { src: '../../assets/water/1.jpg' },
    { src: '../../assets/water/2.jpg' },
    { src: '../../assets/water/3.jpg' },
    { src: '../../assets/water/4.jpg' },
    { src: '../../assets/water/5.jpg' },
    { src: '../../assets/water/6.jpg' },
    { src: '../../assets/water/7.jpg' },
    { src: '../../assets/water/8.jpg' },
    { src: '../../assets/water/9.jpg' },
    { src: '../../assets/water/10.jpg' },
  ];
  public leftList;
  public rightList;
  public divLeft;
  public divRight;
  constructor(public nav: NavController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.leftList = [];
    this.rightList = [];
    this.pushData();
  }

  pushData() {
    this.img_data.forEach(element => {
      this.divLeft = document.getElementsByName('leftBox')[0].offsetHeight;
      this.divRight = document.getElementsByName('leftBox')[0].offsetHeight;
      setTimeout(() => {
        if (this.divLeft < this.divRight) {
          this.leftList.push(element);
        } else if (this.divLeft = this.divRight) {
          this.leftList.push(element);
        } else {
          this.rightList.push(element);
        }
      }, 1000);
    });
    // new Promise((resolve, reject) => {
    //   this.leftList = this.img_data,
    //     this.rightList = this.img_data,
    //     this.divleft = document.getElementsByName('leftBox');
    //     resolve(this.divleft)
    // }).then((res)=>{
    //   console.log(res,'ss')
    // })


  }

  setImagePosition(num, childArray) {
    var imgHeightArray = []; // 定义数组用于存放所有图片的高度
    for (var i = 0; i < childArray.length; i++) { // 遍历所有图片
      if (i < num) {
        imgHeightArray[i] = childArray[i].offsetHeight; // 取得第一排图片的高度
      } else {
        var minHeight = Math.min.apply(null, imgHeightArray); // 获取第一排图片中高度最小的图片
        var minIndex = this.getMinHeight(imgHeightArray, minHeight); // 函数获得高度最小的图片的位置
        childArray[i].style.position = 'absolute'; // 绝对定位图片
        childArray[i].style.top = 2.3 * minHeight + 'px'; // 图片距顶部像素
        childArray[i].style.left = childArray[minIndex].offsetLeft + 'px'; // 图片距左的像素
        imgHeightArray[minIndex] = imgHeightArray[minIndex] + childArray[i].offsetHeight; // 将最低高度的box的高度加上它下方的box高度
      }
    }
  }

  getMinHeight(imgHeightArray, minHeight) {
    for (var i in imgHeightArray) {
      if (imgHeightArray[i] == minHeight) { // 循环所有数组的高度 让它等于最小图片的高度 返回i值
        return i;
      }
    }
  }
  // 这里是借助ionic的上拉加载代替网页的滚动监听实现加载更多
  doInfinite(infiniteScroll) {
    let parentNode = document.getElementById('container');
    for (var i = 0; i < this.img_data.length; i++) {
      let divNode = document.createElement('div'); // 创建div节点
      divNode.className = 'box'; // 为节点添加box类名
      parentNode.appendChild(divNode); // 添加根元素
      let subDivNode = document.createElement('div'); // 创建节点
      subDivNode.className = 'box_img'; // 为节点添加类名
      divNode.appendChild(subDivNode); // 添加根元素
      var img = document.createElement('img'); // 创建节点
      img.src = this.img_data[i].src; // 图片加载路径
      subDivNode.appendChild(img); // 添加根元素
    }

    setTimeout(() => { infiniteScroll.complete(); }, 1000);
  }

}
