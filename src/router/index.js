import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/pages/home'
import dylyIndex from '@/pages/dyly/dylyIndex'
import test from '@/pages/test/test'
import testFormReset from '@/pages/test/formReset'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
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
          component: testFormReset
        }
      ]
    }
  ]
})
