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
                    <div class="poker-card">
                        <div class="card" id="c1"></div>
                        <div class="card" id="c2"></div>
                        <div class="card" id="c3"></div>
                        <div class="card" id="c4"></div>
                    </div>
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
        <div class="content-two">
            <div v-for="(i,index) in cardImage" :key="index" @click="$router.push(i.path)" class="card" :class="i.class">
                <img  class="card-image"  :src="i.url" alt="">
            </div>
        </div>
        <!-- 回到顶部 -->
        <el-backtop  :bottom="220" :right="10" :visibility-height="10">
            <div
            style="{
                height: 100%;
                width: 100%;
                background-color:#e3e3e3;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                border-radius:40px;
                color: #000000;
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
            cardImage:[
                {
                    class:'card-image0',
                    index:0,
                    url:require('@/assets/images/0-3.jpg'),
                    path:'circle'
                },
                {
                    index:1,
                    class:'card-image1',
                    url:require('@/assets/images/1-3.jpg'),
                    path:'circle/myjoincircle'
                },
                {
                    index:2,
                    class:'card-image2',
                    url:require('@/assets/images/0-2.jpg'),
                    path:'strategy'
                },
                {
                    index:3,
                    class:'card-image3',
                    url:require('@/assets/images/1-2.jpg'),
                    path:'equipment'
                }
            ]
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
            background: url('@/assets/images/1-6.jpg') no-repeat center/cover;
            .el-row {
                height: 100%;
                backdrop-filter:blur(2px);
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
                    .poker-card{
                        position: relative;
                        display: grid;
                        width: 300px;
                        height: 400px;
                        place-items: center;
                        border-radius: 5px;
                        &::before{
                            position: absolute;
                            background-color: #fff;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            content: '';
                            width: 110%;
                            height: 110%;
                            z-index: -1;
                            border-radius: 1em;
                            filter: blur(20px);
                            animation:flashing  3s linear infinite;
                        }
                        &:hover #c1 {
                            transform: translateX(-100px) rotate(-40deg);
                        }
                        &:hover #c2 {
                            transform: translateX(-50px) rotate(-30deg);
                        }

                        &:hover #c3 {
                            transform: translateX(0) rotate(-20deg);
                        }

                        &:hover #c4 {
                            transform: translateX(50px) rotate(-10deg);
                        }
                        .card {
                            width: 300px;
                            height: 400px;
                            background: rgba(211, 211, 211, 0.199);
                            position: absolute;
                            transition: .3s ease-in-out;
                            cursor: pointer;
                            box-shadow: 0px 0px 30px -10px rgba(0, 0, 0, 0.3);
                        }
                        #c1,
                        #c2,
                        #c3,
                        #c4 {
                            border-radius: 5px;
                            &::before{
                                position: absolute;
                                border-radius: 5px;
                                content: '';
                                width: 100%;
                                height: 100%;
                                background-color: rgba(0, 0, 0, 0.5);
                                transition: all 0.3s;
                            }
                        }
                        #c1 {
                            background: url('@/assets/images/1-8.jpg') no-repeat center/cover;
                            &:hover {
                                z-index: 100;
                                transform: translateX(-150px) rotate(0deg) !important;
                                &::before{
                                    background-color: rgba(0, 0, 0, 0);
                                }
                            }
                        }
                        #c2 {
                            background: url('@/assets/images/1-9.jpg') no-repeat center/cover;
                            &:hover{
                                z-index: 100;
                                transform: translateX(-100px) rotate(0deg) !important;
                                &::before{
                                background-color: rgba(0, 0, 0, 0);
                            }
                            }
                        }
                        #c3 {
                            background: url('@/assets/images/2-1.jpg') no-repeat center/cover;
                            &:hover {
                                z-index: 100;
                                transform: translateX(-50px) rotate(0deg) !important;
                                &::before{
                                    background-color: rgba(0, 0, 0, 0);
                                }
                            }
                        }
                        #c4 {
                            background: url('@/assets/images/2-2.jpg') no-repeat center/cover;
                            &:hover {
                                transform: translateX(50px) rotate(0deg) !important;
                                &::before{
                                    background-color: rgba(0, 0, 0, 0);
                                }
                            }
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
        .content-two{
            display: flex;
            gap: 10px;
            .card {
                position: relative;
                height: 500px;
                width: 100px;
                flex: 1;
                border-radius: 16px;
                transition: all 0.5s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                &::before{
                    position: absolute;
                    content: '';
                    width: 100%;
                    height: 100%;
                    border-radius: 16px;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                .card-image{
                    display: block;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 16px;
                }
                &:hover{
                    flex: 3;
                    cursor: pointer;
                    background-color: #b8b8b8;
                    &::before{
                        background-color: rgba(0, 0, 0, 0);
                    }
                }
            }
            .card-image0,
            .card-image1,
            .card-image2,
            .card-image3{
                &::after{
                    position: absolute;
                    z-index: 100;
                    content:'';
                    text-align: center;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    width: 100%;
                    height: 100px;
                    color: rgb(244, 243, 243);
                    font-size: 50px;
                    opacity: 0;
                    transition: all 0.5s;
                }
                &:hover::after{
                    content:'寻 找 你 的 旅 伴';
                    opacity: 1;
                }
            }
            .card-image1{
                &:hover::after{
                    content:'分 享 你 的 旅 途';
                }
            }
            .card-image2{
                &:hover::after{
                    content:'查 阅 好 攻 略';
                }
            }
            .card-image3{
                &:hover::after{
                    content:'购 买 好 装 备';
                }
            }
        }
    }
    @keyframes flashing {
        0% {
            opacity: 0.5;
        }
        80% {
            opacity: 1;
        }
        100%{
            opacity: 0.5;
        }
    }
</style>