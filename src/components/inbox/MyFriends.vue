<template>
    <div class="container">
        <div class="title">
            <span v-text="title"></span>
        </div>
        <div class="friends-container">
            <div v-for="friend in friendInfo" @click="clickFriend(friend)" class="friend" :class="{active:friend.user_id == numOne}"  :key="friend.friendId" >
                <div class="friendImg">
                    <el-avatar :size="40" :src="friend.user_avatar"></el-avatar>
                </div>
                <div class="friendText">
                    <h4 v-text="friend.user_name"></h4>
                    <p v-text="friend.friendMessage"></p>
                    <span v-text="friend.friendTime"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getFriends} from '@/api'
export default {
    data(){
        return{
            friendInfo:[],
            numOne:'',
            lastNumOne:localStorage.getItem('friendId')
        }
    },
    methods:{
        //点击私信朋友事件
        clickFriend(friend){
            //记录一下点击的私信朋友的id
            localStorage.setItem('friendId',friend.user_id)
            this.numOne = friend.user_id
            this.$store.commit('changeFriendId',friend.user_id)
        }
    },
    computed:{
    },
    created(){
        this.title = '私信'
        //记录之前点击过的朋友id，没有的话是0
        this.numOne = localStorage.getItem('friendId') || '0'
        console.log(this.numOne);
        const user_id = JSON.parse(localStorage.getItem('user')).user_id
        getFriends({params:{user_id}}).then((res)=>{
            if(res.status === 200){
                this.friendInfo = res.data
            }
        })
    }
}
</script>

<style lang="less" scoped>
.container{
    height: 100%;
    .title{
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }
    .friends-container{
        padding: 0 10px;
        .friend{
            display: flex;
            flex-direction: row;
            margin-bottom: 5px;
            border-radius: 5px;
            padding: 10px;
            transition: all 0.2s;
            cursor: pointer;
            user-select: none;
            &:hover{
                background-color: #c4c4c4;
            }
            .friendImg{
                width: 50px;
            }
            .friendText{
                display: flex;
                width: 100px;
                flex-direction: column;
                margin-left: 5px;
                h4{
                    font-size: 16px;
                }
                p{
                    font-size: 14px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                span{
                    display: block;
                    font-size: 12px;
                    color: #595454;
                }
            }
        }
        .active{
            background-color: #bababa;
        }
    }
}
</style>