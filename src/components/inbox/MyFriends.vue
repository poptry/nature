<template>
    <div class="container">
        <div class="title">
            <span v-text="title"></span>
            <el-badge is-dot :hidden="hidden" class="item">
                <i style="margin-left: 20px;" @click="dialogVisible=true" class="el-icon-s-promotion"></i>
            </el-badge>
        </div>
        <div class="friends-container">
            <div v-for="friend in getMyFriends" @click="clickFriend(friend)" class="friend" :class="{active:friend.user_id == nowFriend}"  :key="friend.friendId" >
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
        <el-dialog
        title="通知"
        :visible.sync="dialogVisible"
        :modal="false"
        width="40%"
        top="20vh"
        :before-close="handleClose">
            <div style="height: 400px !important;overflow-y: scroll;padding: 10px;overflow-x: hidden;">
                 <ApplyCardVue v-for="item in applyUser" :key="item.user_id" :applyUser="item"></ApplyCardVue>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getApply} from '@/api'
import { mapGetters,mapMutations,mapActions } from 'vuex'
import ApplyCardVue from '../common/ApplyCard.vue'
export default {
    data(){
        return{
            friendInfo:[],
            userId:'',
            hidden:true,
            dialogVisible:false,
            applyUser:[]
        }
    },
    components:{
        ApplyCardVue
    },
    methods:{
        ...mapActions('inbox',['setMyFriends']),
        ...mapMutations('nav',{
            changeFriendNav:'changeFriendNav'
        }),
        //关闭dialog
        handleClose(){
            this.dialogVisible = false
        },
        //点击私信朋友事件
        clickFriend(friend){
            console.log('getter',this.$store.getters['nav/getNowFriendNav']);
            this.changeFriendNav(friend.user_id)
        }
    },
    computed:{
        ...mapGetters("nav",{
            nowFriend:'getNowFriendNav',
        }),
        ...mapGetters('inbox',['getMyFriends'])
    },
    async created(){
        this.title = '私信'
        this.userId = JSON.parse(localStorage.getItem('user')).user_id
        //请求所有申请的用户
        await getApply({params:{user_id:this.userId}}).then((res)=>{
            this.applyUser = res.data
            if(this.applyUser.length > 0){
                this.hidden = false
            }
        })
        this.setMyFriends(this.userId)
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
                background-color: var(--navBackgroundColor);
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
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
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
            background-color: var(--navBackgroundColor);
        }
    }
}
</style>