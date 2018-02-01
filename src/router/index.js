import Vue from 'vue'
import Router from 'vue-router'
import _ from 'lodash'

Vue.use(Router)

function importRoutes(r) {
  console.log('r-------',r.keys());
  let routes=r.keys().map(key => r(key).default);
  return _.flatten(routes);
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

      component: require('@/pages/home').default,
      children: importRoutes(require.context('@/', true, /^\.\/pages\/((?!\/)[\s\S])+\/route\.js$/)),
    }
  ]
})
