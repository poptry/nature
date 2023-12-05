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
import Equipment from '@/views/Equipment'
import AllEquipment from '@/views/equipmentChildren/AllEquipment'
import Login from '@/views/Login'
import MyJoinCircle from '@/views/CircleChildren/MyJoinCircle'
import MenEquipment from '@/views/equipmentChildren/MenEquipment'
import WomenEquipment from '@/views/equipmentChildren/WomenEquipment'
import EquipmentDetail from '@/views/equipmentChildren/EquipmentDetail'
import CircleDetail from '@/views/CircleChildren/CircleDetail'
import MyCircleDetailChat from '@/views/CircleChildren/MyCircleDetailChat'
import CircleAlbum from '@/views/CircleChildren/CircleAlbum'
//组件和路由映射
const routes = [
    {path:'/login',component:Login,name:'login'},
    {
        path:'/',component:Main,redirect:'./home',
        //二级路由
        children:[
            {path:'home',name:'home',component:Home},//首页
            //*********圈子
            {
                path:'circle',
                component:Circle,
                //三级路由
                children:[
                    {path:'/',redirect:'circlehome'},
                    {path:'circlehome',name:'circlehome',component:CircleHome},//首页
                    {path:'inbox',name:'inbox',component:Inbox},//私信
                    {
                        path:'myjoincircle',component:MyJoinCircle,
                        children:[
                            {path:'/',redirect:'circleDetail'},
                            {
                                path:'circleDetail',name:'CircleDetail',component:CircleDetail,
                                children:[
                                    {path:'/',redirect:'myCircleDetailChat'},
                                    {path:'myCircleDetailChat',name:'myCircleDetailChat',component:MyCircleDetailChat},//聊天
                                    {path:'circleAlbum',name:'circleAlbum',component:CircleAlbum},//相册
                                ]
                            },
                        ]
                    },//我的圈子
                ]
            },
          //$$$$$$$$$攻略
            {
                path:'strategy',
                name:'strategy',
                component:Strategy,
                children:[
                    
                ]
            },
          //$$$$$$$$$装备
            {
                path:'equipment',
                component:Equipment,
                children:[
                    {path:'/',redirect:'allEquipment'},
                    {path:'allEquipment',name:'allEquipment',component:AllEquipment}, //所有装备页面
                    {path:'menEquipment',name:'menEquipment',component:MenEquipment}, //男装备页面
                    {path:'womenEquipment',name:'womenEquipment',component:WomenEquipment}, //女装备页面
                    {path:'equipmentDetail',name:'equipmentDetail',component:EquipmentDetail} //装备详情页面
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