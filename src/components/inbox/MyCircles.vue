<template>
    <div class="container">
        <div class="title">
            <span v-text="title"></span>
        </div>
        <div class="friends-container">
            <div v-for="friend in friendInfo" @click="clickFriend(friend)" class="friend" :class="{active:friend.friendId===numOne}"  :key="friend.friendId" >
                <div class="friendImg">
                    <el-avatar :size="40" :src="friend.friendAvatar"></el-avatar>
                </div>
                <div class="friendText">
                    <h4 v-text="friend.friendTitle"></h4>
                    <p v-text="friend.friendMessage"></p>
                    <span v-text="friend.friendTime"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            friendInfo:[
                {
                    friendId:'0',
                    friendTitle:'厦门',
                    friendAvatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.pSYrBZuWAziwSL4d7H9-UAAAAA?w=206&h=206&c=7&r=0&o=5&dpr=2&pid=1.7',
                    friendTime:'2023/11/7 9:12',
                    friendMessage:'hello1111314142423'
                },
                {
                    friendId:'1',
                    friendTitle:'厦门',
                    friendAvatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.pSYrBZuWAziwSL4d7H9-UAAAAA?w=206&h=206&c=7&r=0&o=5&dpr=2&pid=1.7',
                    friendTime:'2023/11/7 9:12',
                    friendMessage:'hello'
                }
            ],
            numOne:'',
            lastNumOne:localStorage.getItem('friendId')
        }
    },
    methods:{
        //点击私信朋友事件
        clickFriend(friend){
            //记录一下点击的私信朋友的id
            localStorage.setItem('friendId',friend.friendId)
            this.numOne = friend.friendId
            this.$store.commit('changeFriendId',friend.friendId)
        }
    },
    computed:{
    },
    created(){
        this.title = '私信'
        //记录之前点击过的朋友id，没有的话是0
        this.numOne = localStorage.getItem('friendId') || '0'
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
                background-color: #f0eeee;
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
            background-color: #f0eeee;
        }
    }
}
</style>