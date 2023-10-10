import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'

import 'animate.css'
import './assets/css/color.css'
import './assets/css/common.css'

import store from './store';
//引入router from './router
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
// 创建路由守卫
// router.beforeEach((to,from,next)=>{
//   if(to.name === 'forum'){
//     store.commit('changeOne')
//   }else if(to.name === 'home'){
//     store.commit('changeZero')
//   }
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
