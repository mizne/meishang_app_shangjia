import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ECharts from 'echarts';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
    selector: 'app-choose-day',
    templateUrl: './choose-day.page.html',
    styleUrls: ['./choose-day.page.scss'],
})
export class ChooseDayPage implements OnInit {
    @ViewChild('chart') chart: ElementRef;

    public params;
    public data;
    public total;
    public sum;
    public ying;
    public detail;
    options: any;
    options1: any;
    options2: any;
    options3: any;
    options4: any;
    options5: any;
    constructor(public storage: Storage, public http: HttpClient,
                public nav: NavController, public router: Router) {}

    ionViewWillEnter() {
        // this.initChart();
        // this.createCharts();
        this.courseNum();
        this.revenue();
        this.income();
        this.sellCourseNum();
    }

    back() {
        this.nav.back();
    }

    cashmoney() {
        this.router.navigateByUrl('/tabs/income-details');
    }

    // 获取教程数量
    courseNum() {
        Promise.all([
            this.storage.get('MSTenantId'),
            this.storage.get('UserId'),
            this.storage.get('ExhibitorId'),
            this.storage.get('MSRecordId')
        ]).then(([tenantId, userId, exhibitorId, recordId]) => {
            this.params = {
                'tenantId': tenantId,
                'userId': userId,
                'params': {
                    'condition': {
                        'ExhibitionId': recordId,
                        'ExhibitorId': exhibitorId,
                        'SourceType': '商城',
                        'ProductType': '课程'
                    }
                }
            };
            this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/Product', this.params).subscribe(res => {
            });
        });
    }

    // 获取销售教程数量
    sellCourseNum() {
        Promise.all([
            this.storage.get('MSTenantId'),
            this.storage.get('UserId'),
            this.storage.get('ExhibitorId'),
            this.storage.get('MSRecordId')
        ]).then(([tenantId, userId, exhibitorId, recordId]) => {
            this.data = {
                'tenantId': tenantId,
                'userId': userId,
                'params': {
                    'condition': {
                        'ExhibitionId': recordId,
                        'ExhibitorId': exhibitorId,
                        'SourceType': '课程'
                    }
                }
            };
            this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/Order', this.data).subscribe(res => {
            });
        });
    }

    // 获取商品发布数量
    releaseGoodsNum() {
        Promise.all([
            this.storage.get('MSTenantId'),
            this.storage.get('UserId'),
            this.storage.get('ExhibitorId'),
            this.storage.get('MSRecordId')
        ]).then(([tenantId, userId, exhibitorId, recordId]) => {
            this.total = {
                'tenantId': tenantId,
                'userId': userId,
                'params': {
                    'condition': {
                        'ExhibitionId': recordId,
                        'ExhibitorId': exhibitorId,
                        'SourceType': '商城',
                        'ProductType': '商品'
                    }
                }
            };
            this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/Order', this.total).subscribe(res => {
            });
        });
    }

    // 获取商品销售数量
    sellGoodsNum() {
        Promise.all([
            this.storage.get('MSTenantId'),
            this.storage.get('UserId'),
            this.storage.get('ExhibitorId'),
            this.storage.get('MSRecordId')
        ]).then(([tenantId, userId, exhibitorId, recordId]) => {
            this.sum = {
                'tenantId': tenantId,
                'userId': userId,
                'params': {
                    'condition': {
                        'ExhibitionId': recordId,
                        'ExhibitorId': exhibitorId,
                        'SourceType': '商品'
                    }
                }
            };
            this.http.post(AppComponent.apiUrl + '/v2/data/queryCount/Order', this.sum).subscribe(res => {
            });
        });
    }

    // 查询营收统计
    revenue() {
        Promise.all([
            this.storage.get('MSTenantId'),
            this.storage.get('UserId'),
            this.storage.get('ExhibitorId'),
            this.storage.get('MSRecordId')
        ]).then(([tenantId, userId, exhibitorId, recordId]) => {
            this.ying = {
                'tenantId': tenantId,
                'userId': userId,
                'params': {
                    'condition': {
                        'ExhibitionId': recordId,
                        'ExhibitorId': exhibitorId
                    }
                }
            };
            this.http.post(AppComponent.apiUrl + '/v2/data/queryList/CustomerAccount', this.ying).subscribe(res => {
            });
        });
    }

    // 查询收支明细
    income() {
        Promise.all([
            this.storage.get('MSTenantId'),
            this.storage.get('UserId'),
            this.storage.get('ExhibitorId'),
            this.storage.get('MSRecordId')
        ]).then(([tenantId, userId, exhibitorId, recordId]) => {
            this.ying = {
                'tenantId': tenantId,
                'userId': userId,
                'params': {
                    'condition': {
                        'ExhibitionId': recordId,
                        'ExhibitorId': exhibitorId,
                        'IsBalance': true
                    }

                }
            };
            this.http.post(AppComponent.apiUrl + '/v2/data/queryList/ReceiptsAndPaymentsDetail', this.detail).subscribe(res => {
            });
        });
    }


    cashDetail() {
    }

    ngOnInit() {
        // 课程发布
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        this.options1 = {
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['2019 发布量', '2018 发布量']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '发布量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '发布量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2018-1', '2014-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '2019 发布量',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]
                },
                {
                    name: '2018 发布量',
                    type: 'line',
                    smooth: true,
                    data: [3, 5, 11, 18, 48, 69, 231, 46, 55, 18, 10, 70]
                }
            ]
        };

        //   课程销售
        this.options2 = {
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['2019 课程销售量', '2018 课程销售量']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '课程销售量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '课程销售量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2018-1', '2014-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '2019 课程销售量',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]
                },
                {
                    name: '2018 课程销售量',
                    type: 'line',
                    smooth: true,
                    data: [3, 5, 11, 18, 48, 69, 231, 46, 55, 18, 10, 70]
                }
            ]
        };

        //   商品发布
        this.options3 = {
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['2019 商品发布量', '2018 商品发布量']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '商品发布量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '商品发布量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2018-1', '2014-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '2019 商品发布量',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]
                },
                {
                    name: '2018 商品发布量',
                    type: 'line',
                    smooth: true,
                    data: [3, 5, 11, 18, 48, 69, 231, 46, 55, 18, 10, 70]
                }
            ]
        };

        //   商品销售
        this.options4 = {
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['2019 商品销售量', '2018 商品销售量']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '商品销售量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '商品销售量  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2018-1', '2014-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '2019 商品销售量',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]
                },
                {
                    name: '2018 商品销售量',
                    type: 'line',
                    smooth: true,
                    data: [3, 5, 11, 18, 48, 69, 231, 46, 55, 18, 10, 70]
                }
            ]
        };

        //   营收统计
        this.options5 = {
            color: colors,
            tooltip: {
                trigger: 'none',
                axisPointer: {
                    type: 'cross'
                }
            },
            legend: {
                data: ['总销售额', '订单数', '商品数']
            },
            grid: {
                top: 70,
                bottom: 50
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '总销售额  ' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
                },
                {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: colors[0]
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return '总销售额' + params.value
                                    + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                            }
                        }
                    },
                    data: ['2018-1', '2014-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            zAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '总销售额',
                    type: 'line',
                    xAxisIndex: 1,
                    smooth: true,
                    data: [2, 5, 9, 26, 28, 70, 175, 182, 48, 18, 6, 2]
                },
                {
                    name: '订单数',
                    type: 'line',
                    smooth: true,
                    data: [3, 5, 11, 18, 48, 69, 231, 46, 55, 18, 10, 70]
                },
                {
                    name: '商品数',
                    type: 'line',
                    smooth: true,
                    data: [3, 5, 11, 18, 48, 69, 231, 46, 55, 18, 10, 70]
                },
            ]
        };
    }
}
