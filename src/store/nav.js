export default {
    state:{
        iscomeout:false,
        isWhich:'0'//圈子共同侧边栏的控制 0是校园，1是私信
    },
    actions:{
    },
    mutations:{
        changeToolbar(state,toolbarState){
            state.iscomeout = toolbarState
        },
        changeCommonAside(state,id){
            state.isWhich = id
        }
    }
}