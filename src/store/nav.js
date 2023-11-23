export default {
    namespaced:true,
    state:{
        iscomeout:false,
        isWhich:'0',//圈子共同侧边栏的控制 0是校园，1是私信 2是我的圈子
        nowNav:'0',//当前的导航栏 =》 指的是圈子首页中的导航栏
        nowFriendNav:'0',//当前的好友 =》 指的是好友列表
    },
    actions:{
    },
    getters:{
        getIscomeout(state){
            return state.iscomeout
        },
        getIsWhich(state){
            return state.isWhich
        },
        getNowNav(state){
            return state.nowNav
        },
        getNowFriendNav(state){
            return state.nowFriendNav
        }
    },
    mutations:{
        changeToolbar(state,toolbarState){
            state.iscomeout = toolbarState
        },
        changeCommonAside(state,id){
            state.isWhich = id
        },
        changeNav(state,id){
            state.nowNav = id
        },
        changeFriendNav(state,id){
            state.nowFriendNav = id
        }
    }
}