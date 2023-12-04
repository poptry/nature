<template>
  <div class="container">
    <span class="title">圈主</span>
    <div class="members">
        <el-avatar size="medium" :src="ownerInfo.user_avatar"></el-avatar>
        <span class="user-name">{{ ownerInfo.user_name }}</span>
    </div>
    <span class="title">圈子成员</span>
    <div class="members" v-for="(m,index) in members" :key="index">
        <el-avatar size="medium" :src="m.user_avatar"></el-avatar>
        <span class="user-name">{{m.user_name}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
    data(){
        return{
            ownerInfo:{},
            members:[]
        }
    },
    computed:{
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
    created(){

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
}
</style>