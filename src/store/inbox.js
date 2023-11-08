export default {
    state:{
        friendId:localStorage.getItem('friendId')
    },
    actions:{

    },
    mutations:{
        changeFriendId(state,id){
            state.friendId = id
        }
    }
}