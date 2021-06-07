import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Head from './components/Head'
import Foot from './components/Foot'

import VueCookies from 'vue-cookies'

//全局注册组件
Vue.component('Head',Head);
Vue.component('Foot',Foot);


Vue.use(VueCookies)
Vue.$cookies.config('7d') //存储周期为7days

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
