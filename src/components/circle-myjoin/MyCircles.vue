<template>
  <div class="my-circles">
    <div class="title">
        <span v-text="title"></span>
    </div>
    <div class="circles">
        <div v-for="circle in myCircles" :key="circle.circle_id" class="circle">
            <el-avatar class="circle-avatar" shape="square" size="medium" :src="circle.circle_avatar"></el-avatar>
            <span class="circle-name" v-text="circle.circle_name"></span>
        </div>
    </div>
  </div>
</template>

<script>
import {getMyCircle} from '@/api'
export default {
    data(){
        return{
            myCircles:[]
        }
    },
    created(){
        this.title = '我的圈子'
        const {user_id} = JSON.parse(localStorage.getItem('user'))
        getMyCircle({params:{user_id}}).then(res=>{
            console.log(res);
            this.myCircles = res.data
        }).catch(erro=>{
            console.log(erro);
        })
    }
}
</script>
<style lang="less" scoped>
    .my-circles{
        height: 100%;
        .title{
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
        }
        .circles{
            padding: 0 10px;
            .circle{
                display: flex;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 5px;
                .circle-name{
                    margin-left: 10px;
                }
                &:hover{
                    background-color: var(--navBackgroundColor);
                    cursor: pointer;
                }
            }
        }
        .active{
            background-color: var(--navBackgroundColor);
        }
    }
</style>