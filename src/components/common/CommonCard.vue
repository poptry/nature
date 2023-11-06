<template>
  <div class="contain-card">
    <div class="card" @click="clickCard">
        <el-image  :src="url" lazy></el-image>
        <div class="related">
            <div class="owner-avatar">
                <el-avatar shape="square" :size="50" src="data:image/jpeg;base64,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"></el-avatar>
            </div>
            <div class="circle-profile">
                <h4 class="circle-title">动物园</h4>
                <p class="circle-people">已有30人加入</p>
            </div>
        </div>
        <div class="description">
            <p>这里有好多的动物a拉break11111</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:['url'],
    data(){
        return{
            
        }
    },
    methods:{
        clickCard(){
            console.log(1111111111);
        }
    }
}
</script>
<style lang="less" scoped>
    .contain-card{
        width: 20%;
        min-width: 215px;
        margin: 0 calc(20%/4/2) 20px calc(20%/4/2) ;
        //卡片的样式
        .card {
            position: relative;
            width: 100%;
            height: 280px;
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
                        margin-top: 5px;
                        font-size: 14px;
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