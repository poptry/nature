<template>
  <div class="container">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item in navList" :key="item.strategy_collection_id"><img class="images" :src="item.strategy_collection_background" alt=""></swiper-slide>
    </swiper>
    <div class="swiper-pagination">
      <span style="font-size: 18px;" class="paginations" v-for="(n,index) in navList" :class="{active:index == activeIndex}" @click="clickNav(index,n)" :key="index">{{ n.strategy_collection_content }}</span>
    </div>
    <div class="pagination-detail animate__animated animate__fadeIn" :key="keyNum">
      <span class="paginations" v-for="(d,index) in detailList" :key="index" @click="clickDetail(d)">{{ d.collection_detail }}</span>
    </div>
    <div v-show="showDetail" class="detail-content">
      <DetailContentVue></DetailContentVue>
    </div>
  </div>
</template>

<script>
//定义全局变量，记录this
var _this=null;
import { getStrategyCollection,getCollectionDetail } from '@/api'
import DetailContentVue from './StrategyChildren/DetailContent.vue';
import RichTextVue from '@/components/common/RichText.vue';
import { mapState,mapMutations,mapActions } from 'vuex';
export default {
  data () {
    return {
      dialogVisible: false,
      activeIndex: 0,
      showDetail:false,
      navList : ['首页', '关于我们', '产品中心', '新闻资讯', '联系我们','1','2'],
      detailList: [],
      //定义一个key ，用来重新执行animate动画
      keyNum:0,
      //备份
      detailListBackup:[],
      swiperOption: {
        initialSlide:0,
        direction: 'vertical',
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        autoHeight: true,
        height: window.innerHeight,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'custom',
        },
        speed: 1000,
        ease: 'ease-out',
        loop: true,
        on: {
          slideChangeTransitionStart: function () {
            // https://blog.csdn.net/StoneVivi/article/details/113762692
            _this.activeIndex = this.realIndex
            _this.showDetail = false
            console.log(_this.activeIndex,this.realIndex);
            _this.filterDetailList(this.realIndex+1)
          },
          slideChangeTransitionEnd: function () {
          }
        },
      }
    }
  },
  components:{
    DetailContentVue,
    RichTextVue
  },
  computed: {
    ...mapState('strategy',['strategy_id']),
    swiper () {
      //调试发现是$swiper
      return this.$refs.mySwiper.$swiper
    }
  },
  methods:{
    ...mapMutations('strategy',['changeId']),
    ...mapActions('strategy',['getStrategyContent']),
    //新增
    createStrategy(){
      this.dialogVisible = true
    },
    //点击
    clickDetail(item){
      this.showDetail = true
      this.changeId(item.collection_id)
      this.getStrategyContent(item.collection_id)
    },
    // 点击导航
    clickNav(index,item){
      this.activeIndex = index
      this.swiper.slideTo(index+1, 1000, false)
      this.filterDetailList(index+1)
    },
    //请求攻略目录详细帖子标题
    getCollectionDetail(strategyCollectionIds){
      getCollectionDetail({strategyCollectionIds}).then((res)=>{
        if(res.status==200){
          this.detailListBackup = res.data
          this.filterDetailList(1)
        }
      })
    },
    //请求同城攻略目录
    async getStrategyCollection(city){
      await getStrategyCollection({params:{city}}).then(res=>{
        if(res.status == 200){
          this.navList = res.data
          if(this.navList){
            const strategyCollectionIds =[]
            this.navList.forEach(item=>{
              strategyCollectionIds.push(item.strategy_collection_id)
            })
            this.getCollectionDetail(strategyCollectionIds)
          }
        }
      })
    },
    //筛选数组
    filterDetailList(index){
      //每筛选一次数组，更换一次key
      this.keyNum += 1 
      const arr = this.detailListBackup.filter(item=>{
        return item.strategy_collection_id === index
      })
      this.detailList = arr
    }
  },
  created(){
    _this = this
    const city = sessionStorage.getItem('city')
    if(city){
      console.log(city);
      this.getStrategyCollection(city)
    }
  },
  mounted() {

  },
}
</script>

<style scoped>
  .container{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #424242;
    font-family: 'Times New Roman', Times, serif;
    display: flex;
    flex-direction: row;
  }
  .create{
    position: absolute;
    top: 100px;
    left: 20px;
    z-index: 100;
  }
  .createbtn{
    width: auto;
    padding: 10px;
    height: 40px;
    border-radius: 5px;
    color: rgba(239, 230, 230, 0.8);
    outline: none;
    border: none;
    background: transparent;
    animation: moveAround 10s ease-out infinite;
  }
  .createbtn:hover{
    background-color: rgba(239, 230, 230, 0.2);
    cursor: pointer;
    animation-play-state: paused;
  }
  .swiper-container {
    /* position: relative; */
      width: 100%;
      height: 100%;
  }
  .images{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    opacity: 1;
  }
  .swiper-pagination{
    position: absolute;
    height:auto;
    padding: 20px;
    overflow-y: scroll;
    left: 20px;
    bottom: 20px;
    width: auto;
    display: flex;
    flex-direction: column;
    transition: all 2s;
    border-radius: 5px;
    transition: all 0.5s;
  }
  .swiper-pagination span{
    display: block;
    margin-bottom: 10px;
    transition: all 0.5s;
  }
  .swiper-pagination span:hover{
    transform: scale(1.2);
    cursor: pointer;
  }
  .swiper-pagination:hover{
    animation: flash 3s ease-out infinite;
    background-color: rgba(252, 252, 252, 0);
  }
  .swiper-pagination::-webkit-scrollbar {
      width: 0; /* Safari,Chrome 隐藏滚动条 */
      height: 0; /* Safari,Chrome 隐藏滚动条 */
      display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
  }
  .nav{
    position: absolute;
    top: 100px;
  }
  .paginations{
    color: rgba(239, 230, 230, 0.8);
    font-size: 14px;
    margin-bottom: 5px;
    transition: all 1s;
    user-select: none;
  }
  .active{
    /* font-size: 20px; */
    transform: scale(1.2);
    color: rgba(239, 230, 230, 1);
  }
  .pagination-detail{
    position: absolute;
    padding-right: 10px;
    height: 400px;
    width: auto;
    top: 200px;
    left: 250px;
    z-index: 100;
    overflow-y: scroll;
    overflow-x: hidden;
    transition: all 0.5s;
  }
   /* 滚动槽 */
  .pagination-detail::-webkit-scrollbar {
    width: 8px; /* Safari,Chrome 隐藏滚动条 */
    height: 0; /* Safari,Chrome 隐藏滚动条 */
    display: block; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
  }

  /* 滚动条滑块 */
  .pagination-detail::-webkit-scrollbar-thumb {
    background-color: transparent; /* 透明背景 */
    border-radius: 5px; /* 滑块圆角 */
  }
   /* 滚动槽 */
  .pagination-detail::-webkit-scrollbar-track {
    background-color: transparent; /* 透明背景 */
  }
  .pagination-detail:hover::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, .4); /* 透明背景 */
  }
  .pagination-detail span{
    display: block;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    transition: all 0.5s;
  }
  .pagination-detail span:hover{
    text-decoration: underline;
    cursor: pointer;
    transform: scale(1.2);
  }
  .detail-content{
    position: absolute;
    top: 100px;
    right: 20px;
    width: 1000px;
    height: 600px;
    border-radius: 5px;
    z-index: 100;
    overflow-y: scroll;
  }
.detail-content::-webkit-scrollbar {
  width: 0; /* Safari,Chrome 隐藏滚动条 */
  height: 0; /* Safari,Chrome 隐藏滚动条 */
  display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
}
  ::v-deep .el-dialog__header{
      padding: 10px !important;
    }
  ::v-deep .el-dialog__body{
    padding: 0 !important;
    height: 600px;
  }
  @keyframes moveAround {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(50px, 100px);
    }
    50% {
      transform: translate(100px, 0);
    }
    75% {
      transform: translate(100px, -10px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  @keyframes flash {
    0% {
      background-color: rgba(252, 252, 252, 0);
    }
    50% {
      background-color: rgba(252, 252, 252, 0.2);
    }
    100% {
      background-color: rgba(252, 252, 252, 0);
    }
  }
  @media screen and (max-width: 1400px) {
    .detail-content{
      width: 600px;
    }
  }
  @media screen and (max-width: 1000px) {
    .detail-content{
      width: 0;
      height: 0;
    }
  }
</style>