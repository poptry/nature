import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入路由组件
import Main from '@/views/Main'
import Home from '@/views/Home'//主页
import Circle from '@/views/Circle'//圈子
import Strategy from '@/views/Strategy'
import CircleHome from '@/views/CircleChildren/CircleHome'
import Inbox from '@/views/CircleChildren/Inbox'
import City from '@/views/CircleChildren/City'
import School from '@/views/CircleChildren/School'
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
                component:Circle,
                //三级路由
                children:[
                    {path:'/',name:'circlehome',redirect:'circlehome'},
                    {
                        path:'circlehome',
                        component:CircleHome,
                        children:[
                            {path:'/',name:'city',redirect:'city'},
                            {path:'city',name:'city',component:City},//同城
                            {path:'school',name:'school',component:School},//同城
                        ]
                    },//首页
                    {path:'inbox',name:'inbox',component:Inbox},//私信
                ]
            },
            {
                //$$$$$$$$$攻略
                path:'strategy',
                name:'strategy',
                component:Strategy,
                children:[
                    
                ]
            }
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