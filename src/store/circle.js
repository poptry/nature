import {getCircleMembers,getCircleOwner} from '@/api/index.js'
import { Loading } from 'element-ui'
export default {
    //设置命名空间
    namespaced:true,
    state:{
        circleId:'',//记录当前点击的圈子的id
        circleInfo:{},
        circleMembers:[],
        circleOwner:{},
        transparency:60,//透明度
    },
    actions:{
        //异步获取圈子的成员，并赋值给circleMembers
        setCircleMembers(context,circle_id){
            getCircleMembers({params:{circle_id:circle_id}}).then((res)=>{
                if(res.status==200)
                    context.commit('setCircleMembers',res.data)
            }).catch((err)=>{
                console.log(err)
            })
        },
        //异步获取圈主信息
        setCircleOwner(context,circle_id){
            getCircleOwner({params:{circle_id:circle_id}}).then((res)=>{
                if(res.status==200)
                    context.commit('setCircleOwner',res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    getters:{
        //获取当前的圈子id
        getNowCircleNav(state){
            //获取本地存储的圈子id，持久化数据
            const circleId = sessionStorage.getItem('circleId')
            state.circleId = circleId
            return state.circleId
        },
        //获取侧边栏的状态
        getcircleId(state){
            return state.circleId
        },
        //获取圈子的成员
        getCircleMembers(state){
            return state.circleMembers
        },
        //获取圈主
        getCircleOwner(state){
            return state.circleOwner
        },
        //获取本地存储的透明度
        getTransparency(state){
            if(localStorage.getItem('transparency')){
                const transparency = Number(localStorage.getItem('transparency'))
                state.transparency = transparency
            }
            return state.transparency
        }
    },
    mutations:{
        //控制侧边栏的显示与隐藏
        changeCircleId(state,circle_id){
            //存储在本地
            sessionStorage.setItem('circleId',circle_id)
            state.circleId = circle_id
        },
        //获取圈子成员
        setCircleMembers(state,data){
            state.circleMembers = data
        },
        //获取圈主信息
        setCircleOwner(state,data){
            //后台返回的是一个数组
            state.circleOwner = data[0]
        },
        //改变透明的
        setTransparency(state,data){
            //存储在本地
            if(data!==null){
                localStorage.setItem('transparency',data)
            }
            state.transparency = data
        }
    }
}