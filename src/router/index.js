import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import dylyIndex from '@/pages/dyly/dylyIndex'
import test from '@/pages/test/test'
import reset from '@/pages/test/reset'
import tabs from '@/pages/test/tabs'
import detail from '@/pages/test/detail'
import list from '@/pages/test/list'
import edit from '@/pages/test/edit'
import spublicdetails from '@/pages/sourcepubliclist/spublicdetails'
import spubliclist from '@/pages/sourcepubliclist/spubliclist'
import dealnoticeprocurement from '@/pages/dealnotice/dealnoticeprocurement'
import clarifyOfferIndex from '@/pages/clarify/offer/clarifyOfferIndex'
import clarifyOfferEdit from '@/pages/clarify/offer/clarifyOfferEdit'
import clarifyOfferDetailSend from '@/pages/clarify/offer/clarifyOfferDetailSend'
import clarifyOfferDetailReceive from '@/pages/clarify/offer/clarifyOfferDetailReceive'
import clarifyReviewIndex from '@/pages/clarify/review/clarifyReviewIndex'
import clarifyReviewEdit from '@/pages/clarify/review/clarifyReviewEdit'
import clarifyReviewDetailReply from '@/pages/clarify/review/clarifyReviewDetailReply'
import clarifyReviewDetailReceive from '@/pages/clarify/review/clarifyReviewDetailReceive'
import priceOfferIndex from '@/pages/priceManage/bid/pBidIndex'
import details from '@/pages/dealnotice/details'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home/',
      component: home,
      children: [
        //测试
        {
          path: 'dylyIndex',
          name: 'dylyIndex',
          component: dylyIndex
        },
        {
          path: 'test',
          name: 'test',
          component: test
        },
        {
          path: 'reset',
          name: 'reset',
          component: reset
        },
        {
          path: 'tabs',
          name: 'tabs',
          component: tabs
        },
        {
          path: 'detail',
          name: 'detail',
          component: detail
        },
        {
          path: 'list',
          name: 'list',
          component: list
        },
        //FIXME 澄清管理
        {
          path: 'clarifyOfferIndex',
          name: 'clarifyOfferIndex',
          component: clarifyOfferIndex
        },
        {
          path: 'clarifyOfferEdit',
          name: 'clarifyOfferEdit',
          component: clarifyOfferEdit
        },
        {
          path: 'clarifyOfferDetailSend',
          name: 'clarifyOfferDetailSend',
          component: clarifyOfferDetailSend
        },
        {
          path: 'clarifyOfferDetailReceive',
          name: 'clarifyOfferDetailReceive',
          component: clarifyOfferDetailReceive
        },
        {
          path: 'clarifyReviewIndex',
          name: 'clarifyReviewIndex',
          component: clarifyReviewIndex
        },
        {
          path: 'clarifyReviewEdit',
          name: 'clarifyReviewEdit',
          component: clarifyReviewEdit
        },
        {
          path: 'clarifyReviewDetailReply',
          name: 'clarifyReviewDetailReply',
          component: clarifyReviewDetailReply
        },
        {
          path: 'clarifyReviewDetailReceive',
          name: 'clarifyReviewDetailReceive',
          component: clarifyReviewDetailReceive
        },
        //FIXME 单一来源公示采购公告
        {
          path: 'spublicdetails',
          name: 'spublicdetails',
          component: spublicdetails
        },
        {
          path: 'spubliclist',
          name: 'spubliclist',
          component: spubliclist
        },
        {
          path: 'edit',
          name: 'edit',
          component: edit
        },
        //FIXME 成交通知书管理
        {
          path: 'dealnoticeprocurement',
          name: 'dealnoticeprocurement',
          component: dealnoticeprocurement
        },
        {
          path: 'details/:id',
          name: 'details',
          component: details
        },
        //FIXME 报价管理
        {
          path:'priceOfferIndex',
          name: 'priceOfferIndex',
          component: priceOfferIndex
        }
      ]
    }
  ]
})
