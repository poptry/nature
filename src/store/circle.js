import {getCircleMembers,getCircleOwner,getMyCircle,quitCircle} from '@/api/index.js'
import Vue from 'vue'
export default {
    //设置命名空间
    namespaced:true,
    state:{
        circleId:'',//记录当前点击的圈子的id
        myCircle:[],//用户的圈子
        circleInfo:{},
        circleMembers:[],
        circleOwner:{},
        transparency:60,//透明度
        city:'',//城市
        showIssueDialog:false
    },
    actions:{
        //异步获取圈子的成员，并赋值给circleMembers
        async setCircleMembers(context,circle_id){
            await getCircleMembers({params:{circle_id:circle_id}}).then((res)=>{
                if(res.status==200)
                    context.commit('setCircleMembers',res.data)
            }).catch((err)=>{
                console.log(err)
            })
        },
        //异步获取圈主信息
        async setCircleOwner(context,circle_id){
            await getCircleOwner({params:{circle_id:circle_id}}).then((res)=>{
                if(res.status==200)
                    context.commit('setCircleOwner',res.data)
            }).catch((err)=>{
                console.log(err)
            })
        },
        //异步获取用户所在城市
        async setCity(context){
            //请求用户地址
            await Vue.prototype.$jsonp('https://apis.map.qq.com/ws/location/v1/ip', {
                key: 'X34BZ-IMPC3-IQL32-RMZJL-WPDLE-64F33',
                output: 'jsonp',
            }).then(res=>{
                //获取到城市
                const city = res.result.ad_info.city
                //提交mutations
                context.commit('setCity',city)
            }).catch(err=>{
                console.log(err);
            })
        },
        //异步获取用户加入的圈子的信息
        async setMyCircle(context,user_id){
            const res = await getMyCircle({params:{user_id}}).then(res=>{
                if(res.status === 200){
                    //提交mutations
                    context.commit('setMyCircle',res.data)
                }
            }).catch(erro=>{
                console.log(erro);
            })
        },
        //退出圈子
        async quitMyCircle(context,data){
            console.log("进入删除圈子");
            const res = await quitCircle(data).then(async res=>{
                if(res.status === 200){
                    await context.dispatch('setMyCircle',data.user_id)
                }
            }).catch(erro=>{
                console.log(erro);
            })
        }
    },
    getters:{
        //获取用户加入的圈子
        getMyCircle(state){
            return state.myCircle
        },
        //发布弹窗
        showIssueDialogState(state){
            return state.showIssueDialog
        },
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
        },
        //获取城市
        getCity(state){
            const city = sessionStorage.getItem('city')
            return city ? city : state.city
        }
    },
    mutations:{
        //获取用户加入的圈子
        setMyCircle(state,data){
            state.myCircle = data
        },
        //改变弹窗的状态
        changeIssueDialogState(state,status){
            state.showIssueDialog = status
        },
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
        },
        //城市
        setCity(state,data){
            if(data!==null){
                sessionStorage.setItem('city',data)
            }
            state.city = data
        }
    }
}