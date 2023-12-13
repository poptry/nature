export default {
    //设置命名空间
    namespaced:true,
    state:{
        iscomeout:false,//控制侧边栏的显示与隐藏
        isWhich:'0',//圈子共同侧边栏的控制 0是校园，1是私信 2是我的圈子
        nowNav:'0',//当前的导航栏 =》 指的是圈子首页中的导航栏
        nowFriendNav:'0',//当前的好友 =》 指的是好友列表
        showIssueBtn:false
    },
    actions:{
    },
    getters:{
        //
        // getShowIssueBtn(state){
        //   if(this.$router.name=='circleAlbum'){
        //     state.showIssueBtn = true
        //   }else{
        //     state.showIssueBtn = false
        //   }
        // },
        //获取侧边栏的状态
        getIscomeout(state){
            return state.iscomeout
        },
        //获取圈子共同侧边栏，目前是处于哪个导航下
        getIsWhich(state){
            return state.isWhich
        },
        //圈子首页中的导航栏
        getNowNav(state){
            return state.nowNav
        },
        //获取当前的好友
        getNowFriendNav(state){
            //获取记录下的好友id
            const friendId = localStorage.getItem('friendId')
            state.nowFriendNav = friendId
            return state.nowFriendNav
        },
    },
    mutations:{
        changeIssue(state,status){
            state.showIssueBtn = status
        },
        //控制侧边栏的显示与隐藏
        changeToolbar(state,toolbarState){
            state.iscomeout = toolbarState
        },
        //圈子共同侧边栏的控制 0是首页，1是私信 2是我的圈子
        changeCommonAside(state,id){
            state.isWhich = id
        },
        //圈子首页中的导航栏，状态更改
        changeNav(state,id){
            state.nowNav = id
        },
        //设置当前处于哪个好友id的页面
        changeFriendNav(state,id){
            //记录下当前的好友id
            localStorage.setItem('friendId',id)
            state.nowFriendNav = id
        },
    }
}