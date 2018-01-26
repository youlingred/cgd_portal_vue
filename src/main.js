// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './assets/js/http'
import lodash from 'lodash'
import appConfig from './assets/js/config'
import router from './router'
import store from './vuex/store'
import moment from 'moment'
import accounting from 'accounting'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './assets/css/purchaser.css'
import './mock/mock'

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.timeout = 1000 * 15
Vue.prototype.axios = axios
Vue.prototype.appConfig = appConfig
Vue.prototype.moment=moment;
Vue.prototype.accounting=accounting
window._=lodash

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app')
