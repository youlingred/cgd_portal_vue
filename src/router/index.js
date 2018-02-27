import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Vue.use(Router)

function importRoutes(r) {
  let routes=r.keys().map(key => r(key).default);
  return _.flatten(routes);
}

export default new Router({
  mode: 'history',
  base:'/dist/',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home/',

      component: require('@/pages/home').default,
      children: importRoutes(require.context('@/', true, /^\.\/pages\/((?!\/)[\s\S])+\/route\.js$/)),
    }
  ]
})
