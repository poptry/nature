import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import 'animate.css'
import './assets/css/color.css'
import './assets/css/common.css'
import './assets/iconfont/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import { VueJsonp } from 'vue-jsonp';
import  ClientSocketIO from 'socket.io-client';
import SocketIO from "vue-socket.io"

import store from './store';
import router from './router'//引入router from './router
import tool from './util/tool.js'// import socket from './socket';

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(tool)
Vue.use(VueAwesomeSwiper)
Vue.use(
  new SocketIO({
    debug:false,
    connection:ClientSocketIO.connect("http://localhost:3000",{
      transports:["websocket"],
      autoConnect:false
    })
  })
)
Vue.use(VueJsonp)
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')
  if(to.path==='/login'){
    next()
  }else if(!user&&to.path!=='/login'){
      next({path:'/login'})
  }else{
      next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
