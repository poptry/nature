<template>
    <div class="contain-city">
        <div class="search">
            <input type="text" name="text" class="input" placeholder="Type here...">
        </div>
        <div class="cards">
            <common-card v-for="(item,index) in recommand" :key="index" :name="item.name"></common-card>
        </div>
    </div>
</template>

<script>
import CommonCard from '@/components/common/CommonCard.vue';
export default {
    data(){
        return{
            recommand:[
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                },
                {
                    name:'1'
                },
                {
                    name:'2'
                },
                {
                    name:'3'
                }
            ]
        }
    },
    components:{CommonCard}
}
</script>

<style lang="less" scoped>
    .contain-city{
        overflow: hidden;
        width: 100%;
        height: 100%;
        box-shadow: inset 1px 2px 3px black;
        padding: 20px;
        background: url('@/assets/images/background-image.jpg') no-repeat center center fixed;
        background-size: 100% 100%;
        .search{
            .input {
                width: 100%;
                margin-bottom: 20px;
                width: 30%;
                border: none;
                padding: 1rem;
                border-radius: 1rem;
                background: #e8e8e8;
                box-shadow: 10px 10px 60px #ff984e,
                        -10px -10px 30px #a5d1fc;
                transition: 0.3s;
                }
                .input:focus {
                outline-color: #e8e8e8;
                background: #e8e8e8;
                box-shadow: inset 20px 20px 60px #c5c5c5,
                        inset -20px -20px 60px #ffffff;
                transition: 0.3s;
                }
        }
        .cards{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-evenly;
        }
    }
</style>