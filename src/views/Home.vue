<template>
    <div class="home">
        <!-- 走马灯 -->
        <el-carousel height="650px" 
        class="animate__animated animate__fadeIn">
            <el-carousel-item v-for="(item,index) in images" :key="index">
                <img :src="item.url" alt="">
            </el-carousel-item>
        </el-carousel>
        <!-- 题 1 -->
        <div class="slogan animate__animated animate__fadeIn">
            <span class="headtitle" animate__fadeIn animate__fadeOut>前进</span>
        </div>
        <!-- 左图右字 -->
        <div class="content-one">
            <el-row>
                <el-col :span="12" class="left-col">
                    <el-card :body-style="{padding:'0px',border:0}" 
                     shadow="hover">
                        <img src="@/assets/images/goAhead.jpg" alt="">
                    </el-card>
                </el-col>
                <el-col :span="12" class="right-col">
                        <span v-show="show" class="animate__animated animate__fadeInDown">让我们一同探索自然的奥秘</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">共享山川的美丽，留下足迹，收获回忆</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">这不仅是一场徒步旅行</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">更是一场心灵的洗礼</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">在这片净土，释放心中的压力</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">找回内心的宁静，感受生活的美好</span>
                </el-col>
            </el-row>
        </div>
        <!-- 题 2 -->
        <div class="slogan">
            <span class="headtitle" animate__fadeIn animate__fadeOut>前进</span>
        </div>
        <!-- 左图右字 -->
        <div class="content-one">
            <el-row>
                <el-col :span="12" class="left-col">
                    <el-card :body-style="{padding:'0px',border:0}" 
                     shadow="hover">
                        <img src="@/assets/images/goAhead.jpg" alt="">
                    </el-card>
                </el-col>
                <el-col :span="12" class="right-col">
                    <span v-show="show" class="animate__animated animate__fadeInDown">让我们一同探索自然的奥秘</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">共享山川的美丽，留下足迹，收获回忆</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">这不仅是一场徒步旅行</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">更是一场心灵的洗礼</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">在这片净土，释放心中的压力</span>
                        <span v-show="show" class="animate__animated animate__fadeInDown">找回内心的宁静，感受生活的美好</span>
                </el-col>
            </el-row>
        </div>
        <!-- 回到顶部 -->
        <el-backtop  :bottom="100" :right="20" :visibility-height="10">
            <div
            style="{
                height: 100%;
                width: 100%;
                background-color:rgba(34, 32, 32, 0.9);
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                border-radius:40px;
                color: #ffffff;
            }">
            UP
            </div>
        </el-backtop>
    </div>
</template>
<script>
export default {
    name: 'Carousel',
    data() {
        return {
            show:0,
            images:[
                {
                    url:require('@/assets/images/pexels-oleksandr-p-376368.jpg')
                },
                {
                    url:require('@/assets/images/0-5.jpg')
                },
                {
                    url:require('@/assets/images/0-8.jpg')
                }
            ],
        }
    },
    computed:{
            // ...mapState({iscomeout:state=>state.nav.iscomeout})//获取state，导航栏的状态
          },
    methods:{
        handleScroll(){
            let top = pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            let vh = document.documentElement.clientHeight;
            let dom = document.querySelectorAll('.right-col span');
            Array.prototype.slice.call(dom).forEach(element => {
                    if(top + vh>element.offsetTop+600){
                        setTimeout(() => {
                            this.show = 1 
                        }, 1000);
                    }else{
                    this.show = 0
                    }
            });
        },
    },
    mounted(){
                this.$nextTick(()=>{
                    addEventListener('scroll',this.handleScroll)
                })
    },
    beforeDestroy(){
        removeEventListener('scroll',this.handleScroll)
    }
}
</script>
<style scoped lang="less">
    .home{
        width: 100%;
        height: 100%;
        overflow: hidden;
        .el-carousel{
            img{
                width: 100%;
                height: auto;
                object-fit: fill;
            }
        }
    //slogan样式
    .slogan{
        position: relative;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        text-align: center;
        font-weight: 400;
        margin: 40px 0 40px 0;
        .headtitle{
            color: var(--themeColor);
            font-size:28px;
        }
        &::after{
            position: absolute;
            content: '';
            width: 64px;
            height: 4px;
            background-color:var(--themeColor);
            left: calc((100% - 64px)/2);
            bottom: -14px;
        }
    }
    //第二部分内容
    .content-one{
        height: 600px;
        margin-bottom: 20px;
        background: url('@/assets/images/goAhead.jpg') no-repeat center;
        .el-row {
            height: 100%;
            backdrop-filter:blur(20px);
            transition: all 0.5s;
            &:last-child {
            margin-bottom: 0;
            }
            .left-col{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                border-radius: 10px;
                overflow: hidden;
                .el-card{
                    width: 50%;
                    transition: all 0.5s;
                    border: 0;

                    &:hover{
                        transform: rotateZ(-2deg);
                        border: 1px solid #ffffff;
                        box-shadow: 4px 4px 10px #ffffff;
                    }
                      img{
                            display: block;
                            width: 100%;
                        }
                }
              
            }
            .right-col{
                display: flex;
                height: 100%;
                flex-direction: column;
                justify-content: center;

                    span{
                        display: block;
                        width: 100%;
                        color: #ffffff;
                        font-size: 16px;
                        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
                        text-align: center;
                        user-select: none;
                        margin-bottom: 20px;
                        &:nth-child(2n-1){
                            font-size: 24px;
                        }
                    }
            }
        }
    }
    }
  

</style>