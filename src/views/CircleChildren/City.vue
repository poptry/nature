<template>
    <div class="contain-city">
        <div class="search">
            <input type="text" name="text" class="input" placeholder="搜索">
            <el-button size="small" icon="el-icon-search"></el-button>
        </div>
        <div v-if="circleInfo" class="cards">
            <common-card  v-for="(c,index) in circleInfo" :circleInfo="c" :key="index"></common-card>
        </div>
    </div>
</template>

<script>
import {getCircleInfo} from '@/api'
import CommonCard from '@/components/circleHome/CommonCard.vue';
export default {
    data(){
        return{
            circleInfo:[]
        }
    },
    components:{CommonCard},
    created(){
        getCircleInfo().then((res) => {
            if(res.status === 200){
                this.circleInfo = res.data
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}
</script>

<style lang="less" scoped>
    .contain-city{
        overflow: hidden;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: inset 1px 2px 3px rgb(255, 255, 255);
        padding: 20px;
        background: url('@/assets/images/background-image.jpg') no-repeat center center fixed;
        background-size: 100% 100%;
        .search{
            display:flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 20px;
            .input {
                    width: 30%;
                    min-width: 280px;
                    border: none;
                    padding: 1rem;
                    border-radius: 1rem;
                    background: #e8e8e8;
                    box-shadow: 10px 10px 60px #ff984e,
                            -10px -10px 30px #a5d1fc;
                    transition: 0.3s;
                    opacity: 0.7;
                    animation: search 1s linear;
            }
            .input:focus {
                outline-color: #e8e8e8;
                background: #e8e8e8;
                box-shadow: inset 20px 20px 60px #c5c5c5,
                        inset -20px -20px 60px #ffffff;
                transition: 0.3s;
                opacity: 1;
            }
            .el-button{
                height: 100%;
                margin-left: 20px;
            }
        }
        .cards{
            width: 100%;
            min-width: 440px;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
        }
    }
    @keyframes search {
        0%{
            width: 0%;
        }
        100%{
            width: 30%;
        }
    }
</style>