<template>
  <div class="container">
    <span class="title">圈主</span>
    <div class="members"  @click="clickMember(ownerInfo)">
        <el-avatar size="medium" :src="ownerInfo.user_avatar"></el-avatar>
        <span class="user-name">{{ ownerInfo.user_name }}</span>
    </div>
    <span class="title">圈子成员</span>
    <div class="members" v-for="(m,index) in members" :key="index"  @click="clickMember(m)">
        <el-avatar size="medium" :src="m.user_avatar"></el-avatar>
        <span class="user-name">{{m.user_name}}</span>
    </div>
    <el-dialog
    :show-close="false"
    :visible.sync="showFriendInfo"
    :before-close="handlerClose"
    top="15vh"
    width="30%">
        <UserInfoShowVue :member="member" :showBtn="true"></UserInfoShowVue>
    </el-dialog>
  </div>
</template>

<script>
import {isApply} from '@/api'
import { mapGetters,mapState,mapMutations} from 'vuex'
import UserInfoShowVue from '../common/UserInfoShow.vue'
export default {
    data(){
        return{
            ownerInfo:{},
            members:[],
            member:{},
            user_id:Number,
            disabled:false,
        }
    },
    components:{
        UserInfoShowVue
    },
    computed:{
        ...mapState('inbox',['showFriendInfo']),
        ...mapGetters("circle",['getCircleMembers','getCircleOwner'])
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
        handlerDbClick(){
            console.log('122');
        },
        handlerClose(){
            this.changeShowFriendInfo(false)
        },
        //查询用户信息
        async getOtherInfo(m){
            await isApply({params:{user_id:this.user_id,friend_id:m.user_id}}).then(res=>{
                console.log(res);
                if(res.data.code == 200 && res.data.res.length > 0){
                    this.disabled = true
                }else{
                    this.disabled = false
                }
            })
        },
        //成员点击事件
        async clickMember(m){
            // 更改dialog状态
            this.changeShowFriendInfo(true)
            this.getOtherInfo(m)
            //如果申请过了或者是好友了，就禁止添加好友的按钮可以按下 
            m.disabled = this.disabled
            console.log(m.disabled);
            this.member = m
        },

    },
    created(){
        const user_id = JSON.parse(localStorage.getItem('user')).user_id
        this.user_id = user_id
    }
}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    overflow-y: scroll;
    border: 1px solid #d9d9d9;
    border-left: 0;
    user-select: none;
    &::-webkit-scrollbar {
        width: 0; /* Safari,Chrome 隐藏滚动条 */
        height: 0; /* Safari,Chrome 隐藏滚动条 */
        display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
    }
    .title{
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 10px;
        color: #f1f1f1;
    }
    .members{
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 5px 10px;
        border-radius: 5px;
        .user-name{
            font-size: 14px;
            color: #d9d9d9;
            margin-left: 10px;
        }
        &:hover{
            cursor: pointer;
            background-color: rgba(00, 00, 00, 0.3);
        }
    }
    ::v-deep .el-dialog__header{
        padding: 0 !important;
    }
    ::v-deep .el-dialog__body{
        padding: 0 !important;
        height: 600px;
        background-color: #464646;
        overflow: hidden;
    }
}
</style>