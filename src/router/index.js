import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'
import home from '@/pages/home'

Vue.use(Router)

function importRoutes(r) {
  return _.flatten(r.keys().map(key => r(key).default));
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home/',
      component: home,
      children: importRoutes(require.context('@/', true, /^\.\/pages\/((?!\/)[\s\S])+\/route\.js$/)),
    }
  ]
})
