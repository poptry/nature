import { getFriends} from "@/api"
export default {
    namespaced:true,
    state:{
        friendId:'',
        myFriends:[],//好友列表
        showFriendInfo:false
    },
    getters:{
        //获取当前处于哪个好友id的页面
        getFriendId(state){
            const friendId = localStorage.getItem('friendId')
            state.friendId = friendId
            return state.friendId
        },
        //获取好友列表
        getMyFriends(state){
            return state.myFriends
        }
    },
    actions:{
        //获取好友列表
        async setMyFriends(context,user_id){
            getFriends({params:{user_id:user_id}}).then((res)=>{
                if(res.status === 200){
                    context.commit('setMyFriends',res.data)
                }
            })
        }
    },
    mutations:{
        //更改用户资料页面的展示状态
        changeShowFriendInfo(state,status){
            state.showFriendInfo = status
        },
        //设置当前处于哪个好友id的页面
        changeFriendId(state,id){
            state.friendId = id
        },
        //设置好友列表
        setMyFriends(state,data){
            console.log(data);
            state.myFriends = data
        }
    }
}