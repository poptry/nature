<template>
  <div class="userinfoshow-container">
    <div class="user-show-info">
        <div class="user-head">
            <div class="user-head-left">
                <img :src="member.user_avatar" class="my_avatar" style="width: 55px;height: 55px;object-fit: cover; border-radius: 50%;" alt="">
                <!-- <el-avatar :size="55" :src="member.user_avatar"></el-avatar> -->
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
            <div class="cards">
                <div class="card red">
                    <p class="tip">目前正在做的事</p>
                    <p class="second-text">{{ member.user_doing }}</p>
                </div>
                <div class="card blue">
                    <p class="tip">目前最想去的地方</p>
                    <p class="second-text">{{member.user_wantto_go}}</p>
                </div>
                <div class="card green">
                    <p class="tip">目前最想做的事情</p>
                    <p class="second-text">{{member.user_wantto_do}}</p>
                </div>
            </div>
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
            // console.log(this.members);
        },
        member(newVal){
            //获取到新的成员列表，赋值给members
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
        },
        //查询用户的信息
        getUserInfo(){
            const user_id = this.member.user_id
            getUserInfo({user_id}).then(res=>{
                if(res.data.code == 200){
                    this.userInfo = res.data.data
                }
            })
        }
    },
    created(){
        this.user_id = JSON.parse(localStorage.getItem('user')).user_id
        this.ownerInfo = this.getCircleOwner
        // console.log("圈主信息",this.member);
    },
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
            .cards {
                    display: flex;
                    padding: 20px;
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }

                .cards .red {
                    background-color: #f43f5e;
                    width: 100%;
                }

                .cards .blue {
                    background-color: #3b82f6;
                }

                .cards .green {
                    background-color: #22c55e;
                }

                .cards .card {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    text-align: center;
                    height: 100px;
                    width: 100%;
                    border-radius: 10px;
                    color: white;
                    cursor: pointer;
                    transition: 400ms;
                }

                .cards .card p.tip {
                    font-size: 1em;
                    font-weight: 700;
                }

                .cards .card p.second-text {
                    font-size: .9em;
                }

                .cards .card:hover {
                    transform: scale(1.1, 1.1);
                }

                .cards:hover > .card:not(:hover) {
                    filter: blur(10px);
                    transform: scale(0.9, 0.9);
                }
        }
    }
</style>