// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueLodash from 'vue-lodash'
import axios from 'axios'
import VueAxios from 'vue-axios'
import APIUtil from './services/APIUtil'
import Util from './services/Util'
import PDFGenerator from './services/PDFGenerator'
import store from './store'

Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueLodash) // Vue._.
Vue.use(VueAxios, axios)
Vue.use(require('vue-moment'))
Vue.use(PDFGenerator)

APIUtil.init()

/*
 * register global filter
 */
Vue.filter('beijing', function (utcTimeStamp) {
  return Util.timeStampFormatter(utcTimeStamp * 1000)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
