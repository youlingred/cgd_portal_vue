import Mock from 'mockjs'
import config from './../assets/js/config.js';

Mock.mock(config.api('nouser/SelectUserInfoBusiService---close'), 'post', function () {
  return {
    "respDesc": null,
    "data": {
      "supplierName": null,
      "orgName": "国电驻马店热电有限公司",
      "supplierId": null,
      "orgPath": null,
      "isprofess": "1",
      "companyName": "国电驻马店热电有限公司",
      "purchaserAccountName": "国电驻马店热电有限公司(账套)",
      "reqNo": null,
      "login": true,
      "userName": "陈萌",
      "userId": 4101,
      "orgId": 198611010846,
      "companyId": 198611010846,
      "purchaserAccountUser": 1000005,
      "auditPassed": false,
      "cellphone": "13522611453"
    },
    "respCode": "0000"
  }
})
Mock.mock(config.api('nouser/SelectTypeByUserIdBusiService---close'), 'post', function () {
  return {"respDesc": "查询购物车商品种类成功", "data": {"count": 4, "login": true}, "respCode": "0000"}
})
Mock.mock(config.api('nouser/SelectUnReadCountBusiService---close'), 'post', function () {
  return {"respDesc": "查询站内信总未读数量成功", "data": 0, "respCode": "0000"}
})
Mock.mock(config.api('', 'menu111'), 'get', function () {
  return {
    "respDesc": "success",
    "data": [
      {
      "autoId": 1,
      "parentId": 1,
      "deep": 2,
      "orderId": 1,
      "menuName": "我的首页",
      "menuCode": "startPage",
      "menuIcon": "",
      "menuCss": "",
      "menuUrl": "/html/purchaser/memberCenter.html?pageTag=我的首页&root_menu_code=startPage",
      "updateUid": null,
      "updateTm": 1511159457000,
      "disFlag": null,
      "subMenus": []
      },
      {
      "autoId": 2,
      "parentId": 1,
      "deep": 2,
      "orderId": 5,
      "menuName": "订单管理",
      "menuCode": "ordermang",
      "menuIcon": "",
      "menuCss": "",
      "menuUrl": "/html/purchaser/memberCenter.html?pageTag=我的首页&root_menu_code=startPage",
      "updateUid": null,
      "updateTm": 1511159457000,
      "disFlag": null,
      "subMenus": []
    },
      {
        "autoId": 3,
        "parentId": 1,
        "deep": 2,
        "orderId": 1,
        "menuName": "结算管理",
        "menuCode": "startPage",
        "menuIcon": "",
        "menuCss": "",
        "menuUrl": "/html/purchaser/memberCenter.html?pageTag=我的首页&root_menu_code=startPage",
        "updateUid": null,
        "updateTm": 1511159457000,
        "disFlag": null,
        "subMenus": []
      },
      {
        "autoId": 4,
        "parentId": 1,
        "deep": 2,
        "orderId": 1,
        "menuName": "商品管理",
        "menuCode": "startPage",
        "menuIcon": "",
        "menuCss": "",
        "menuUrl": "https://router.vuejs.org/zh-cn/essentials/getting-started.html",
        "updateUid": null,
        "updateTm": 1511159457000,
        "disFlag": null,
        "subMenus": []
      },
      {
        "autoId": 5,
        "menuName": "询比价管理",
        "menuCode": "xubijia|vue",
        "menuUrl": "/dist#/spubliclist",
        "subMenus": [
          {
            "autoId": 100,
            "menuName": "单一来源公示异议",
            "menuCode": "",
            "subMenus": [
              {
                "autoId": 10001,
                "parentId": 100,
                "menuName": "查询首页",
                "menuCode": "spubliclist",
                "menuUrl": "spubliclist"
              }
            ]
          },
          {
            "autoId": 100,
            "menuName": "采购公告",
            "menuCode": "",
            "subMenus": [
              {
                "autoId": 10001,
                "orderId": 2,
                "menuName": "查询首页",
                "menuCode": "purchaserNoticeIndex",
                "menuUrl": "purchaserNoticeIndex",
              }
            ]
          },
          {
            "autoId": 100,
            "menuName": "报价管理",
            "menuCode": "",
            "menuUrl": "",
            "subMenus": [
              {
                "autoId": 10001,
                "menuName": "查询首页",
                "menuCode": "priceOfferIndex",
                "menuUrl": "priceOfferIndex",
              }
            ]
          },
          {
            "autoId": 100,
            "menuName": "我的销售澄清",
            "menuCode": "entinfmgr",
            "menuUrl": "",
            "subMenus": [
              {
                "autoId": 10001,
                "menuName": "回收报价前澄清管理",
                "menuCode": "saleClarifyOfferIndex",
                "menuUrl": "saleClarifyOfferIndex",
              },
              {
                "autoId": 10001,
                "menuName": "评审中澄清管理",
                "menuCode": "saleClarifyReviewIndex",
                "menuUrl": "saleClarifyReviewIndex",
              }
            ]
          },
          {
            "autoId": 100,
            "menuName": "采购成交管理",
            "menuCode": "",
            "menuUrl": "",
            "subMenus": [
              {
                "autoId": 10001,
                "menuName": "成交通知书",
                "menuCode": "dealnoticeprocurement",
                "menuUrl": "dealnoticeprocurement",
              }
            ]
          },
          {
            "autoId": 100,
            "menuName": "销售公告",
            "menuCode": "",
            "menuUrl": "",
            "subMenus": [
              {
                "autoId": 10001,
                "menuName": "查询首页",
                "menuCode": "saleNoticeIndex",
                "menuUrl": "saleNoticeIndex",
              }
            ]
          },
          {
            "autoId": 100,
            "menuName": "竞价管理",
            "menuCode": "entinfmgr",
            "menuUrl": "",
            "subMenus": [
              {
                "autoId": 10001,
                "menuName": "查询首页",
                "menuCode": "priceBindIndex",
                "menuUrl": "priceBindIndex",
              },
            ]
          },
          {
            "autoId": 100,
            "menuName": "我的采购澄清",
            "menuCode": "",
            "menuUrl": "",
            "subMenus": [
              {
                "autoId": 10001,
                "menuName": "回收报价前澄清管理",
                "menuCode": "clarifyOfferIndex",
                "menuUrl": "clarifyOfferIndex",
              },
              {
                "autoId": 10001,
                "menuName": "评审中澄清管理",
                "menuCode": "clarifyReviewIndex",
                "menuUrl": "clarifyReviewIndex",
              }
            ]
          },
          {
            "autoId": 100,
            "menuName": "销售成交管理",
            "menuCode": "entinfmgr",
            "menuUrl": "",
            "subMenus": [
              {
                "autoId": 10001,
                "menuName": "成交通知书",
                "menuCode": "saleDealnoticeprocurement",
                "menuUrl": "saleDealnoticeprocurement",
              }
            ]
          },
          {
            "autoId": 100,
            "parentId": 8,
            "deep": 3,
            "orderId": 1,
            "menuName": "闲置物资管理",
            "menuCode": "entinfmgr",
            "menuIcon": "",
            "menuCss": "",
            "menuUrl": "",
            "updateUid": null,
            "updateTm": 1511159457000,
            "disFlag": null,
            "subMenus": [
              {
                "autoId": 10001,
                "parentId": 100,
                "deep": 4,
                "orderId": 2,
                "menuName": "采购意向",
                "menuCode": "idleMaterialsIndex",
                "menuIcon": "",
                "menuCss": "",
                "menuUrl": "idleMaterialsIndex",
                "updateUid": null,
                "updateTm": 1511159457000,
                "disFlag": null,
                "subMenus": []
              }
            ]
          },

        ]
      },
    ],
    "respCode": "0000"
  }
})
/***********FIXME 单一来源公示异议管理*************/
//列表
Mock.mock(config.api('testDylyList'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    "data": [
      {
        planName: '计划1',
        planName: '团建',
        publishUser: '老铁',
        publishDate: 1514192693000,
        objectionDate: 1514192693000,
        status: 1
      },
      {
        planName: '计划1',
        planName: '团建',
        publishUser: '老铁',
        publishDate: 1514192693000,
        objectionDate: 1514192693000,
        status: 1
      },
      {
        planName: '计划1',
        planName: '团建',
        publishUser: '老铁',
        publishDate: 1514192693000,
        objectionDate: 1514192693000,
        status: 1
      },
      {
        planName: '计划1',
        planName: '团建',
        publishUser: '老铁',
        publishDate: 1514192693000,
        objectionDate: 1514192693000,
        status: 1
      },
      {
        planName: '计划1',
        planName: '团建',
        publishUser: '老铁',
        publishDate: 1514192693000,
        objectionDate: 1514192693000,
        status: 1
      }
    ]
  }
})
//分页列表
Mock.mock(config.api('testDylyListPage'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    data:{
      "rows": [
        {
          planName: '老团长',
          publishUser: '哥哥',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          status: 1
        },
        {
          planName: '老子',
          publishUser: '弟弟',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          status: 1
        },
        {
          planName: '孟子',
          publishUser: '姐姐',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          status: 1
        },
        {
          planName: '孙子',
          publishUser: '妹妹',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          status: 1
        },
        {
          planName: '孟子',
          publishUser: '侄子',
          publishDate: 1514192693000,
          objectionDate: 1514192693000,
          status: 1
        }
      ],
      "recordsTotal":50
    }
  }
})
//下拉列表数据
Mock.mock(config.api('testQuerySelect'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    data:[
      {
        inquiryName:'询价单0001',
        inquiryId:10001,
        iqrSeq:1,
        purchaseCategory:1,
      },
      {
        inquiryName:'询价单0001',
        inquiryId:10002,
        iqrSeq:1,
        purchaseCategory:1,
      },
      {
        inquiryName:'询价单0001',
        inquiryId:10003,
        iqrSeq:1,
        purchaseCategory:1,
      }
    ]
  }
})
//成交通知书管理-采购
Mock.mock(config.api('testDealnoticeprocurement'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    data:{
      "rows": [
        {
          status: '供应商确认中',
          name: '通知书名',
          supplier:'JD',
          cnumber: "SDJK7889",
          money: "605990.50",
          ctype: 1
        },
        {
          status: '供应商确认中',
          name: '通知书名',
          supplier:'JD',
          cnumber: "SDJK7889",
          money: "605990.50",
          ctype: 1
        },
        {
          status: '供应商确认中',
          name: '通知书名',
          supplier:'JD',
          cnumber: "SDJK7889",
          money: "605990.50",
          ctype: 1
        },
        {
          status: '供应商确认中',
          name: '通知书名',
          supplier:'JD',
          cnumber: "SDJK7889",
          money: "605990.50",
          ctype: 1
        },
        {
          status: '供应商确认中',
          name: '通知书名',
          supplier:'JD',
          cnumber: "SDJK7889",
          money: "605990.50",
          ctype: 1
        },
        {
          status: '供应商确认中',
          name: '通知书名',
          supplier:'JD',
          cnumber: "SDJK7889",
          money: "605990.50",
          ctype: 1
        }
      ],
      "recordsTotal":50
    }
  }
})
/***********公示信息*********/
Mock.mock(config.api('testcommenNotice'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    "data":{
      '1': '询价单名称001',
      '2': '国电中心',
      '3': 'XXX供应商',
      '4': 'XXXX',
      '5': 'XXXXX',
      '6': 1514192693000,
      '7': '国电中心',
      '8': '张三',
      '9': '13381217802',
      '10': '国电中心',
      '11': '张三',
      '12': '13381217802',
    }
  }
})
/***********基本信息*********/
Mock.mock(config.api('testcommen'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    "data": {
      "quotationCreateUserId": null,
      "inventoryClass": null,
      "serviceChargeRate": 11,
      "quoteEndDate": null,
      "quoteExplain": "1",
      "planClass": null,
      "pilPay": null,
      "prePay": null,
      "busiStatus": null,
      "proPay": null,
      "serviceChargeRateName": null,
      "matPay": null,
      "quotationId": "2123",
      "verPay": null,
      "purchaseCategory": 1,
      "nodeStatus": null,
      "purchaserName": null,
      "quotationCreateTime": null,
      "iqrSeq": null,
      "taxRate": null,
      "quoteSource": 1,
      "deliveryDatePromise": 1517386039000,
      "supplierId": "1133",
      "quoteMethod": null,
      "payTypeJson": "[1,2,3]",
      "inquiryName": null,
      "quoteType": null,
      "purchaserTele": null,
      "purchaseType": null,
      "docStatus": null,
      "logisticsDistrWayName": null,
      "currencyName": null,
      "professionalOrgName": null,
      "inquiryId": null,
      "quotationCreateUserName": null,
      "currency": 1,
      "quaPay": null,
      "supplierContactName": "1",
      "deliveryDate": 1527386039000,
      "quoteMethodName": null,
      "supplierName": "供应商",
      "amount": null,
      "purchaseTypeName": null,
      "inquiryCode": null,
      "payTypeName": "预付款,电汇或承兑汇票",
      "guaranteePeriodName": "0",
      "purchaseCategoryName": "物资类",
      "supplierContactTele": "1",
      "guaranteePeriod": 1,
      "logisticsDistrWay": null,
      "remarks": "1",
      "quoteTypeName": null
    }
  }
})
/***********物资类table**************/
Mock.mock(config.api('Materials'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    "data":{
      "rows": [
        {
          'brand':'品牌',
          'manufacturer':'生产厂家',
          'quotePrice':'1000',
          'deliveryDatePromise':1527386039000
        },
        {
          'brand':'品牌',
          'manufacturer':'生产厂家',
          'quotePrice':'1000',
          'deliveryDatePromise':1527386039000
        },
      ],
      "recordsTotal":2
    }
  }
})
/***********施工类table**************/
Mock.mock(config.api('construction'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    data:{
      "rows": [
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '0.6/1KV',
          '8': '2340012',
          '9': '132,000.00',
          '10': '132,000.00',
          '11': 1514192693000,
          '12': '张三',
          '13': '13125258311',
          '14': '北京市丰台区西三环中路22号',
          '15': '',
          '16': '',
        },
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '0.6/1KV',
          '8': '2340012',
          '9': '132,000.00',
          '10': '132,000.00',
          '11': 1514192693000,
          '12': '张三',
          '13': '13125258311',
          '14': '北京市丰台区西三环中路22号',
          '15': '',
          '16': '',
        },
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '0.6/1KV',
          '8': '2340012',
          '9': '132,000.00',
          '10': '132,000.00',
          '11': '1514192693000',
          '12': '张三',
          '13': '13125258311',
          '14': '北京市丰台区西三环中路22号',
          '15': '',
          '16': '',
        },
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '0.6/1KV',
          '8': '2340012',
          '9': '132,000.00',
          '10': '132,000.00',
          '11': '1514192693000',
          '12': '张三',
          '13': '13125258311',
          '14': '北京市丰台区西三环中路22号',
          '15': '',
          '16': '',
        }
      ],
      "recordsTotal":4
    }
  }
})
/***********服务类table**************/
Mock.mock(config.api('serviceclass'), 'post', function () {
  return {
    "respCode": "0000",
    "respDesc": "查询站内信总未读数量成功",
    data:{
      "rows": [
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '132,000.00',
          '8': '132,000.00',
          '9': 1514192693000,
          '10': '张三',
          '11': '13125258311',
          '12': '北京市丰台区西三环中路22号',
          '13': '',
          '14': ''
        },
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '132,000.00',
          '8': '132,000.00',
          '9': 1514192693000,
          '10': '张三',
          '11': '13125258311',
          '12': '北京市丰台区西三环中路22号',
          '13': '',
          '14': ''
        },
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '132,000.00',
          '8': '132,000.00',
          '9': '1514192693000',
          '10': '张三',
          '11': '13125258311',
          '12': '北京市丰台区西三环中路22号',
          '13': '',
          '14': ''
        },
        {
          '1': '国电大渡河枕头坝水电建设有限公司',
          '2': '某某某项目',
          '3': '-',
          '4': '米',
          '5': '14000',
          '6': '2,000.00',
          '7': '132,000.00',
          '8': '132,000.00',
          '9': '1514192693000',
          '10': '张三',
          '11': '13125258311',
          '12': '北京市丰台区西三环中路22号',
          '13': '',
          '14': ''
        }
      ],
      "recordsTotal":4
    }
  }
})
export default  Mock
