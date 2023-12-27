<template>
    <div class="home">
        <!-- 走马灯 -->
        <el-carousel height="650px" 
        class="animate__animated animate__fadeIn">
            <el-carousel-item v-for="(item,index) in images" :key="index">
                <img :src="item.url" alt="">
            </el-carousel-item>
        </el-carousel>
        <div class="slogan">
            <span class="headtitle" animate__fadeIn animate__fadeOut>伙伴</span>
        </div>
        <div class="video-friend">
            <video autoplay loop muted src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-cottonbro-9943276%20%28Original%29.mp4"></video>
        </div>
        <div class="slogan">
            <span class="headtitle" animate__fadeIn animate__fadeOut>探险者</span>
        </div>
        <div class="content-two">
            <div v-for="(i,index) in cardImage" :key="index" @click="$router.push(i.path)" class="card" :class="i.class">
                <!-- <img  class="card-image"  :src="i.url" alt=""> -->
                <el-image fit="cover" class="card-image" :src="i.url" lazy></el-image>
                
            </div>
        </div>
        <div class="slogan">
            <span class="headtitle" animate__fadeIn animate__fadeOut>户外</span>
        </div>
        <div class="outside-grid">
            <div class="more">
                <span @click="toStrategy">更多 >></span>
            </div>
            <div class="card-gird diving">
                <el-image fit="cover" src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-bagus-tri-kuncoro-j-2744596.jpg" lazy></el-image>
                <!-- <img src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-bagus-tri-kuncoro-j-2744596.jpg" alt=""> -->
            </div>
            <div class="card-gird fishing">
                <el-image fit="cover" src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-brett-sayles-1143926.jpg" lazy></el-image>
                <!-- <img src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-brett-sayles-1143926.jpg" alt=""> -->
            </div>
            <div class="card-gird cycling">
                <el-image fit="cover" src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-d%C3%B3-castle-2270328.jpg" lazy></el-image>
                <!-- <img src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-d%C3%B3-castle-2270328.jpg" alt=""> -->
            </div>
            <div class="card-gird hiking">
                <el-image fit="cover" src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-kamaji-ogino-5064664.jpg" lazy></el-image>
                <!-- <img src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-kamaji-ogino-5064664.jpg" alt=""> -->
            </div>
            <div class="card-gird camping">
                <el-image fit="cover" src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-teemu-r-1840421.jpg" lazy></el-image>
                <!-- <img src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-teemu-r-1840421.jpg" alt=""> -->
            </div>
            <div class="card-gird skiing">
                <el-image fit="cover" src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-dids-1740098.jpg" lazy></el-image>
                <!-- <img src="https://natural-image.oss-cn-hangzhou.aliyuncs.com/home/pexels-dids-1740098.jpg" alt=""> -->
            </div>
        </div>
        <div class="slogan">
            <span class="headtitle" animate__fadeIn animate__fadeOut>自然</span>
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
        toStrategy(){
            this.$router.push('/strategy')
        }
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
        .slogan{
            position: relative;
            font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
            text-align: center;
            font-weight: 400;
            margin: 20px 0 20px 0;
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
        .video-friend{
            width: 100%;
            height: auto;
            video{
                width: 100%;
                object-fit: fill;
            }
        }
        .outside-grid{
            display: grid;
            position: relative;
            background-color: #2b2b2b;
            user-select: none;
            padding: 100px;
            grid-template-columns: repeat(3,33.33%);
            grid-template-rows: repeat(2,340px);
            width: 100%;
            height: 100%;
            background: #121212;
            background: linear-gradient(
                135deg,
                #121212 25%,
                #1a1a1a 25%,
                #1a1a1a 50%,
                #121212 50%,
                #121212 75%,
                #1a1a1a 75%,
                #1a1a1a
            );
            background-size: 40px 40px;

            /* Animation */
            animation: move 4s linear infinite;
            .card-gird{
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                &::before,
                &::after{
                    content: "";
                    position: absolute;
                    display: block;
                    width: auto;
                    height: auto;
                    padding: 20px;
                    font-size: 30px;
                    color: #ffffff;
                    transition: all .5s;
                    z-index: 100;
                }
                &::after{
                    font-size: 16px;
                }
                .el-image,
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: all .5s;
                    filter:  grayscale(50%)  contrast(120%);
                }
            }
            .diving{
                &:hover{
                    &::after{
                        content: "泛指所有的水面下活动。包含使用压缩机由水面供气的潜水；由潜水员自行携带呼吸系统的水肺潜水；以及不携带呼吸系统，仅使用轻装备的自由潜水。";
                        bottom: 0;
                        right: 0;
                    }
                    &::before{
                        top: 0;
                        left: 0;
                        content: "潜水";
                    }
                    .el-image,
                    img{
                        filter:  grayscale(200%) contrast(200%) blur(10px);
                    }
                }
            }
            .fishing{
                &:hover{
                    &::after{
                        content: "是一种用鱼线牵扯挂有鱼饵的鱼钩诱捕鱼类的捕鱼方法。最常见的钓鱼法是使用鱼竿伸展到水面上方操控鱼线的垂钓（rod fishing），是很受民间欢迎的休闲户外运动。";
                        bottom: 0;
                        right: 0;
                    }
                    &::before{
                        top: 0;
                        left: 0;
                        content: "钓鱼";
                    }
                    .el-image,
                    img{
                        filter:  grayscale(100%) contrast(150%) blur(10px);
                    }
                }
            }
            .cycling{
                &:hover{
                    &::after{
                        content: "登山车由重型cruiser bicycle改进而来，以用于从山路自由滑行下落。登山车在1970年代的美国加州成为一项流行的运动，当时美国年轻人骑小轮车从陡峭的山腰下落。自行车架设计者Joe Breeze运用了他的构想并发展了登山车运动。";
                        bottom: 0;
                        right: 0;
                    }
                    &::before{
                        top: 0;
                        left: 0;
                        content: "山地自行车";
                    }
                    .el-image,
                    img{
                        filter:  grayscale(100%) contrast(150%) blur(10px);
                    }
                }
            }
            .hiking{
                &:hover{
                    &::after{
                        content: "徒步亦称远足、行山或是健行（英语：Hiking），并不是通常意义上的散步，也不是体育竞赛中的竞走项目，而是指有目的地在郊区、农村的小径或者山野间的山径进行中长距离的走路锻炼，徒步也是户外运动中最为典型和最为普遍的一种";
                        bottom: 0;
                        right: 0;
                    }
                    &::before{
                        top: 0;
                        left: 0;
                        content: "徒步";
                    }
                    .el-image,
                    img{
                        filter:  grayscale(100%) contrast(150%) blur(10px);
                    }
                }
            }
            .camping{
                &:hover{
                    &::after{
                        content: "露营是一种休闲活动，通常露营者携带帐篷，离开城市在野外扎营，度过一个或者多个夜晚。露营通常和其他活动联系，如徒步、钓鱼或者游泳等，或是自认为在露营都算是露营。";
                        bottom: 0;
                        right: 0;
                    }
                    &::before{
                        top: 0;
                        left: 0;
                        content: "露营";
                    }
                    .el-image,
                    img{
                        filter:  grayscale(100%) contrast(150%) blur(10px);
                    }
                }
            }
            .skiing{
                &:hover{
                    &::after{
                        content: "滑雪是指利用滑雪板在雪地滑行的一种活动，最初是为了便于在冬季的雪地中出行，后来逐渐演变成一种冬季运动项目。滑雪和滑冰、滑水有相似之处，但是滑的表面不同。滑雪的英文名词“ski”本是一个挪威语词汇，源于古挪威语“skid”，意为小段木头。";
                        bottom: 0;
                        right: 0;
                    }
                    &::before{
                        top: 0;
                        left: 0;
                        content: "滑雪";
                    }
                    .el-image,
                    img{
                        filter:  grayscale(100%) contrast(150%) blur(10px);
                    }
                }
            }
            .more{
                position: absolute;
                color: rgb(141, 141, 141);
                bottom: 20px;
                right: 50px;
                &:hover{
                    color: #ffffff;
                    cursor: pointer;
                }
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
    @keyframes move {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 40px 40px;
        }
    }

</style>