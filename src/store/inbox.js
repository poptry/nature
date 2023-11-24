export default {
    state:{
        friendId:''
    },
    getters:{
        getFriendId(state){
            const friendId = localStorage.getItem('friendId')
            state.friendId = friendId
            return state.friendId
        }
    },
    actions:{

    },
    mutations:{
        changeFriendId(state,id){
            state.friendId = id
        }
    }
}