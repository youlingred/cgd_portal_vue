// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './assets/js/http'
import lodash from 'lodash'
import appConfig from './assets/js/config'
import router from './router'
import store from './vuex/'
import moment from 'moment'
import accounting from 'accounting'
import lockr from 'lockr'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './assets/css/purchaser.css'
import './mock/mock'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import util from './assets/js/util'

Vue.use(ElementUI)
Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.appConfig = appConfig
Vue.prototype.moment=moment;
Vue.prototype.accounting=accounting
Vue.prototype.lockr=lockr;
Vue.prototype.util=util;
window._=lodash
window.axios=axios;
window.$alert=Vue.prototype.$alert;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
}).$mount('#app')
