<template>
  <div class="contain-card animate__animated animate__fadeIn">
    <div class="card" @click="clickCard">
        <el-image style="width: 193px;height: 140px;" fit="cover" :src="circleInfo.circle_preview" lazy></el-image>
        <div class="related">
            <div class="owner-avatar">
                <img width="60px" height="60px" style="border-radius: 5px;" :src="circleInfo.circle_avatar" alt="">
                <!-- <el-avatar fit="contain" shape="square" :size="50" :src="circleInfo.circle_avatar"></el-avatar> -->
            </div>
            <div class="circle-profile">
                <h4 class="circle-title">{{circleInfo.circle_name}}</h4>
                <p class="circle-people">已有{{circleInfo.circle_people}}人加入</p>
            </div>
        </div>
        <div class="description">
            <p>{{ circleInfo.circle_profile }}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { joinCircle } from '@/api';
import { mapMutations } from 'vuex';
export default {
    props:['circleInfo'],
    data(){
        return{
        }
    },
    methods:{
        ...mapMutations("circle",['changeCircleId']),
        clickCard(){
            const data = {
                user_id: JSON.parse(localStorage.getItem('user')).user_id,
                circle_id: this.circleInfo.circle_id
            }
            console.log(data);
            joinCircle(data).then(res=>{
                console.log(res);
                if(res.data.code === 200){
                    this.$message({
                        message:res.data.msg,
                        type: 'success'
                    });
                    this.changeCircleId(this.circleInfo.circle_id)
                    this.$router.push({name:'myCircleDetailChat'}).catch(err=>{})
                }else{
                    this.$message({
                        message:res.data.msg,
                        type: 'error'
                    });
                    this.changeCircleId(this.circleInfo.circle_id)
                    this.$router.push({name:'myCircleDetailChat'}).catch(err=>{})
                }
            })
        }
    },
    created(){
    }
}
</script>
<style lang="less" scoped>
    .contain-card{
        width: 20%;
        min-width: 215px;
        margin: 0 calc(20%/4/2) 20px calc(20%/4/2) ;
        user-select: none;
        //卡片的样式
        .card {
            position: relative;
            width: 100%;
            height: 300px;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.074);
            border: 1px solid rgba(255, 255, 255, 0.222);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            flex-direction: column;
            font-size: 25px;
            font-weight: bold;
            border-radius: 15px;
            cursor: pointer;
            &::before,
            &::after {
                position: absolute;
                content: "";
                width: 0;
                height: 0;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: 25px;
                font-weight: bold;
                background-color: rgba(255, 255, 255, 0.5);
                transition: all 0.5s;
            }
            &::before {
                top: 0;
                right: 0;
                border-radius: 0 15px 0 100%;
            }
            &::after {
                bottom: 0;
                left: 0;
                border-radius: 0 100%  0 15px;
            }
            &:hover::before,
            &:hover:after {
                width: 100%;
                height: 100%;
                border-radius: 15px;
                backdrop-filter: blur(15px);
                transition: all 0.5s;
            }
            &:hover:after {
                content: "加入";
            }
            .el-image{
                border-radius: 5px;
                width: 100%;
                height: 60%;
            }
            //圈子相关样式，圈头像，标题，总人数
            .related{
                width: 100%;
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                font-size: 16px;
                font-weight: 400;
                color: aliceblue;
                .owner-avatar{
                    margin-right: 10px;
                }
                .circle-profile{
                    .circle-people{
                        width: 100%;
                        margin-top: 5px;
                        font-size: 14px;
                        word-break: break-all;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                    }
                }
            }
            //圈子的描述
            .description{
                font-size: 16px;
                font-weight: 400;
                color: aliceblue;
                p{
                    word-break: normal;
                }
            }
        }
    }

</style>