<template>
  <div class="userinfoshow-container">
    <div class="user-show-info">
        <div class="user-head">
            <div class="user-head-left">
                <el-avatar :size="55" :src="member.user_avatar"></el-avatar>
                <div class="user-text">
                    <span class="user-name" v-text="member.user_name"></span>
                    <div class="sex-age">
                        <span class="sex" v-text="member.user_sex"></span>
                        <span class="age">{{ member.user_age+'岁' }}</span>
                    </div>
                </div>
            </div>
            <el-button v-if="showBtn" :disabled = 'member.disabled || member.user_id === user_id'  @click="addInbox(member)" class="private animate__animated animate__flipInX" icon="el-icon-plus" type="primary" round>好友</el-button>
        </div>
        <div class="motto">
            <span>个人签名:</span>
            <p class="motto-text" v-text="member.user_motto"></p>
        </div>
        <div class="hobby">
            <span class="title">爱好:</span>
            <el-tag class="tag" size="mini">{{member.user_hobby}}</el-tag>
        </div>
        <div style="margin-top: 10px;" v-show="member.user_id != user_id && user_id == ownerInfo.user_id">
            <el-button type="danger" @click="kickOutCircle"><i class="iconfont icon-yichu"></i> 移出圈子</el-button>
            <el-button type="warning"><i class="iconfont icon-talk-off"></i>禁言</el-button>
        </div>
        </div>
        <div class="user-activity animate__animated animate__fadeInUp">
            
        </div>
  </div>
</template>

<script>
import {addFriend} from '@/api'
import { mapMutations,mapGetters,mapActions } from 'vuex'
import {kickOutCircle} from '@/api'
export default {
    props:['member','showBtn'],
    data(){
        return{
            user_id:Number,
            ownerInfo:''
        }
    },
    computed:{
        ...mapGetters("circle",['getCircleMembers','getCircleOwner','getNowCircleNav']),
    },
    watch:{
        getCircleMembers(newVal){
            //获取到新的成员列表，赋值给members
            this.members = newVal
        },
        getCircleOwner(newVal){
            //获取到新的圈主，赋值给members
            this.ownerInfo = newVal
        }
    },
    methods:{
        ...mapMutations('inbox',['changeShowFriendInfo']),
        ...mapActions('circle',['setCircleMembers']),
        addInbox(member){
            const user_id = JSON.parse(localStorage.getItem('user')).user_id
            //添加好友
            addFriend({user_id,friend_id:member.user_id}).then(res=>{
                if(res.data.code == 200){
                    this.changeShowFriendInfo(false)
                    this.$message({
                        message: '申请成功',
                        type: 'success'
                    });
                }
            })
        },
        kickOutCircle(){
            console.log(this.member);
            kickOutCircle({user_id:this.member.user_id,circle_id:this.getNowCircleNav}).then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        message: '移出成功',
                        type: 'success'
                    });
                    //重新请求圈子成员
                    this.setCircleMembers(this.getNowCircleNav)
                    //关闭弹窗
                    this.changeShowFriendInfo(false)
                }
            })
        }
    },
    created(){
        this.user_id = JSON.parse(localStorage.getItem('user')).user_id
        this.ownerInfo = this.getCircleOwner
    },
    activated(){
        console.log(this.member);
    }
}
</script>
<style lang="less" scoped>
    .userinfoshow-container{
        width: 100%;
        height: 100%;
        .user-show-info{
            --user-fontColor:#fafafa;
            width: 100%;
            height: 35%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: linear-gradient(#bfbfbf 20%,#464646);
            padding: 20px;
            .user-head{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .user-head-left{
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .user-text{
                        display: flex;
                        flex-direction: column;
                        color: var(--user-fontColor);
                        .user-name{
                            font-size: 20px;
                            color: var(--user-fontColor);
                            margin-left: 20px;
                        }
                        .sex-age{
                            margin-top: 5px;
                            .sex,
                            .age{
                                font-size: 14px;
                                color: var(--user-fontColor);
                                margin-left: 20px;
                            }
                        }
                    }
                }
                .private{
                    float: right;
                }
            }
            .motto{
                width: 100%;
                display: inline;
                margin-top: 10px;
                padding: 10px;
                color: var(--user-fontColor);
                .motto-text{
                    display: inline;
                    word-break:break-all;
                    line-height: 1.5em;
                    margin-left: 1em;
                }
            }
            .hobby{
                padding: 0 10px 0;
                color: var(--user-fontColor);
                .title{
                    font-size: 14px;
                }
                .tag{
                    margin-left: 10px;
                }
            }
        }
        .user-activity{
            width: 100%;
            height: 65%;
            background-color: rgb(238, 238, 238);
            overflow-y: scroll;
            &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
        }
    }
</style>