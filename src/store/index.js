import Vue from 'vue'
import Vuex from 'vuex'
import nav from './nav'
import admin from './admin'
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        nav,
        admin
    }
})