export default {
    state:{
        friendId:''
    },
    getters:{
        //获取当前处于哪个好友id的页面
        getFriendId(state){
            const friendId = localStorage.getItem('friendId')
            state.friendId = friendId
            return state.friendId
        }
    },
    actions:{

    },
    mutations:{
        //设置当前处于哪个好友id的页面
        changeFriendId(state,id){
            state.friendId = id
        }
    }
}