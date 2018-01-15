// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import appConfig from './assets/js/config'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'

require('./mock/mock')

Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.timeout = 1000 * 15
Vue.prototype.axios = axios
Vue.prototype.appConfig = appConfig
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app')
