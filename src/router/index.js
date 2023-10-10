import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入路由组件
import Main from '@/views/Main'
import Home from '@/views/Home'//主页
import Circle from '@/views/Circle'//圈子
import Forum from '@/views/Forum'
//组件和路由映射
const routes = [
    {
        path:'/',
        component:Main,
        redirect:'./home',
        //二级路由
        children:[
            {path:'home',name:'home',component:Home},//首页
            {
                //*********圈子

                path:'circle',
                name:'circle',
                component:Circle,
                //三级路由
                children:[
                    {path:'',redirect:'./forum',},
                    {path:'forum',name:'forum',component:Forum}
                ]
            },
        ]
    },
]
//创建router实例，传routes配置
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})




export default router