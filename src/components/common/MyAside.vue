<template>
    <div class="aside-container">
        <div class="content-one shadow-box">
            <el-avatar fit="cover" 
                :size="70" 
                shape="circle" 
                :src="userInfo.avatar"
                class="user-avatar">
            </el-avatar>
            <div class="user-name">{{ userInfo.userName }}</div>
            <div class="user-motto">{{ userInfo.userMotto }}</div>
            <div class="user-data">
                <div class="data-detail">
                    <span>发表</span>
                    <span>15</span>
                </div>
                <div class="data-detail">
                    <span>收藏</span>
                    <span>19</span>
                </div>
                <div class="data-detail">
                    <span>评论</span>
                    <span>255</span>
                </div>
            </div>
        </div>
        <div class="content-two">
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return{
            search:''
        }
    },
    computed:{
        ...mapState({userInfo:state=>state.admin.userInfo})
    },
    mounted(){
        console.log(this.userInfo);
    }
}
</script>

<style lang="less" scoped>
    .aside-container{
        display: block;
        user-select: none;
        .content-one{
            background: var(--gradualBackground);
            color: var(--fontColor);
            font-size: 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            border-radius: 8px;
            .user-avatar{
                cursor: pointer;
                transition: all 0.5s;
                &:hover{
                    transform: rotate(360deg);
                }
            }
            .user-motto{
                font-size: 10px;
                color: rgb(185, 194, 202);
            }
            .user-data{
                width: 80%;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                font-size: 18px;
                color: rgb(185, 194, 202);
                margin-top: 20px;
                .data-detail{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                    & :first-child:hover{
                        color: var(--fontColor);
                        cursor: pointer;
                    }
                }
            }    
        }
    }
</style>