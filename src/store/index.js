import Vue from 'vue'
import Vuex from 'vuex'
import nav from './nav'
import inbox from './inbox'
import circle from './circle'
import equipment from './equipment'
import product from './product'
import user from './user'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        nav,
        inbox,
        circle,
        equipment,
        product,
        user
    }
})