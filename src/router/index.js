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
import clarifyOfferDetail from '@/pages/clarify/offer/clarifyOfferDetail'
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
        {
          path: 'dylyIndex',
          name: 'dylyIndex',
          component: dylyIndex
        },
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
          path: 'clarifyOfferDetail',
          name: 'clarifyOfferDetail',
          component: clarifyOfferDetail
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
        {
          path: 'dealnoticeprocurement',
          name: 'dealnoticeprocurement',
          component: dealnoticeprocurement
        },
        {
          path: 'details/:id',
          name: 'details',
          component: details
        }
      ]
    }
  ]
})
