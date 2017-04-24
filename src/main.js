import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import { routes } from './config/router.config.js'
import configAxios from './config/http.js'
import configStore from './vuex/store'

Vue.use(VueRouter)
Vue.use(ElementUI)

// must call Vue.use(Vuex)before creating a store instance

// use axios
configAxios(Vue)
const store = configStore(Vue)

import './config/init-svg.js'

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
