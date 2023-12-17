<template>
    <div class="equipmentDetail">
      <div class="left">
        <div class="showImage animate__animated animate__fadeInLeft">
          <div @mouseenter="enterImage" @mouseleave="hideZoom=true">
            <imgZoomVue  class="productImage"  :hideZoom="hideZoom" :url="productInfo.product_prev_img" :highUrl="productInfo.product_prev_img"></imgZoomVue>
          </div>
          <div @mouseenter="enterImage" @mouseleave="hideZoom=true">
            <imgZoomVue  class="productImage"  :hideZoom="hideZoom"  :url="productInfo.product_img" :highUrl="productInfo.product_img"></imgZoomVue>
          </div>
          <!-- <img :src="productInfo.product_img" alt="" class="productImage">
          <img :src="productInfo.product_prev_img" alt="" class="productImage"> -->
        </div>
        <div class="right animate__animated animate__fadeInRight">
          <h2 class="title">{{ productInfo.product_name }}</h2>
          <!-- 商品评分开始 -->
          <div class="score" v-if="rating">
            <i v-for="(item,index) in scoreClasses" :key="index" class="iconfont" :class="item"></i>
            <!-- <a href="">前往评分</a> -->
            <span>评分</span>
          </div>
          <!-- 商品评分结束 -->
          <!-- 我的评分呢 -->
          <div class="score" v-if="rating">
            <el-rate :disabled="disabled" v-model="userRating" @change="submmitScore"></el-rate>
            <span style="font-size: 12px;">我的评分</span>
          </div>
          <!-- 我的评分 -->
          <!-- 商品价格开始 -->
          <div class="price">
            <span>{{ productInfo.product_disc_price+"￥" }}</span>
            <span>{{ productInfo.product_orig_price+"￥" }}</span>
          </div>
          <!-- 商品价格结束 -->
          <!-- 商品描述 -->
          <p class="describe">{{ productInfo.product_describe }}</p>
          <!-- 描述结束 -->
          <!-- size -->
          <div class="sizeButton">
            <el-checkbox-group @change="changeSize" v-model="chooseSize">
              <el-checkbox-button v-for="(size,index) in sizes" :label="size" :key="index">{{size}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <!-- size -->
          <!-- 按钮组 -->
          <div class="button-group">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10"></el-input-number>
            <button :disabled="disabledShopCart" @click="addShopCart" class="addShopCart" :class="{disabled:disabledShopCart}">加入购物车</button>
          </div>
          <!-- 按钮组结束 -->
        </div>
      </div>
    </div>
</template>
<script>
import {getScoreByPro,addScore,getScoreByUser,addShopCart,findShopCart} from '@/api'
import imgZoomVue from '@/components/common/imgZoom.vue';
const LENGTH = 5;
// 星星对应的class,亮星
const CLS_ON = "icon-star-full";
// 半星
const CLS_HALF = "icon-star-half";
// 空星
const CLS_OFF = "icon-star";
export default {
  data(){
    return{
      chooseSize:[],
      //尺寸
      sizes:['S','M','L','XL','XXL'],
      //商品数量
      num:1,
      //显示放大镜
      hideZoom:true,
      //定义变量控制商品在购物车的状态
      disabledShopCart:false,
      //未初始化，有风险
      user_id:Number,
      //商品信息初始化
      productInfo:{},
      //商品的平均得分初始化
      rating:0,
      //用户评分初始化
      userRating:0,
      //是否禁用用户评分，因为评分过就不能再评分了
      disabled:false,
    }
  },
  // https://www.cnblogs.com/Monster-su/p/14889735.html
  watch:{
    //监听路由变化
    $route(to,from){
      //获取userid
      this.user_id = JSON.parse(localStorage.getItem('user')).user_id
      //从路由获取参数----------商品信息
      const proInfo = to.query.productInfo
      //赋值给data里面的productInfo
      this.productInfo = JSON.parse(proInfo)
      //赋值评分
      this.rating = this.productInfo.product_score
      //查看用户对该商品是否评分 评分过就不能再评分了
      this.isScored(this.user_id)
      //查询购物车中是否存在该商品
      this.findShopCart()
    }
  },
  components:{
    imgZoomVue
  },
  computed:{
    //计算属性，计算星星的class
    scoreClasses(){
      let result = [];
      //提高精度，可以使得分数都是0.5的倍数
      let score = Math.floor(this.rating * 2) / 2;
      //半星
      let hasDecimal = score % 1 !== 0;
      //全星
      let integer = Math.floor(score);
      //先把全星push进去
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      //如果有半星，就push进去
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      //如果星星不满5个，就push进去空星
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      //返回一个数组，数组里面是星星的class
      return result;
    }
  },
  methods:{
    //改变size
    changeSize(){
      console.log(this.chooseSize);
    },
    //数量加减
    handleChange(){

    },
    //
    enterImage(){
      this.hideZoom = false
      console.log(this.hideZoom);
    },
    //查询购物车中是否存在该商品
    findShopCart(){
      //获取userid
      const user_id = this.user_id
      //获取商品id
      const product_id = this.productInfo.product_id
      //查询购物车
      findShopCart({params:{user_id:user_id,product_id:product_id}}).then(res=>{
        console.log(res);
        if(res.data.code==500){
          this.disabledShopCart = false
          console.log("没加入");
        }else{
          this.disabledShopCart = true
          console.log("已加入");
        }
      })
    },
    //添加商品到购物车
    addShopCart(){
      //获取userid
      const user_id = JSON.parse(localStorage.getItem('user')).user_id
      //获取商品id
      const product_id = this.productInfo.product_id
      //添加到购物车
      addShopCart({user_id:user_id,product_id:product_id}).then(res=>{
        console.log(res)
      })
    },
    //获取评分事件
    getProScore(){
      getScoreByPro({params:{product_id:this.productInfo.product_id}}).then(res=>{
        this.rating = res.data[0].product_score
      })
    },
    //提交评分事件
    submmitScore(){
      //获取userid
      const ratingObj={
        score_number:this.userRating,
        user_id:this.user_id,
        product_id:this.productInfo.product_id
      }
      //提交用户评分
      addScore(ratingObj).then(res=>{
        if(res.status===200){
          this.$message({
            message: '评分成功',
            type: 'success'
          });
          //重新获取评分
          this.getProScore()
          //禁用评分
          this.disabled = true
        }
      })
    },
    //判断用户是否已经评分
    async isScored(user_id){
      await getScoreByUser({params:{user_id:user_id,product_id:this.productInfo.product_id}}).then(res=>{
        //如果有评分，就把评分赋值给userRating
        if(res.data.length > 0 && res.status===200){
          this.userRating = res.data[0].score_number
          this.disabled = true
        }else{
          //没有评分，就把userRating初始化为0，不禁用评分
          this.userRating = 0
          this.disabled = false
        }
      })
    }
  },
  mounted(){
    //获取userid
    const user_id = this.user_id
    //从路由获取参数----------商品信息
    const proInfo = this.$route.query.productInfo
    //赋值给data里面的productInfo
    this.productInfo = JSON.parse(proInfo)
    console.log(this.productInfo);
    //赋值评分
    this.rating = this.productInfo.product_score
    //查看用户对该商品是否评分 评分过就不能再评分了
    this.isScored(user_id)
    //查询购物车中是否存在该商品
    this.findShopCart()
  },
  created(){
    //获取userid
    this.user_id = JSON.parse(localStorage.getItem('user')).user_id
  },

}
</script>
  
<style lang="less" scoped>
  .equipmentDetail{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 20px;
    user-select: none;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    .left{
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      .showImage{
        display: flex;
        width: 70%;
        .productImage{
          display: block;
          width: 400px;
          height: auto;
          margin-right: 20px;
        }
      }
    }
    .right{
      position: relative;
      width: 100%;
      .score{
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .iconfont{
          font-size: 20px;
          color: #0e0e0e;
          margin-right: 6px;
        }
        a{
          color: #000000;
          font-size: 14px;
        }
      }
      .price{
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
        span{
          display: inline-block;
          margin-right: 10px;
          &:nth-child(2){
            font-size: 14px;
            font-weight: 400;
            text-decoration: line-through;
            color: rgb(118, 118, 118);
          }
        }
      }
      .title{
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      .describe{
        word-break: break-all;
      }
      .sizeButton{
        position: absolute;
        bottom: 100px;
      }
      .button-group{
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .el-input-number{
          width: 35%;
          height: 100%;
        }
        .addShopCart{
          width: 60%;
          padding: 15px;
          outline: none;
          border: none;
          border-radius: 5px;
          background-color: #ff5e01;
          color: rgba(255, 255, 255, 0.8);
        }
      }

      .disabled{
        background-color: #9e9e9e;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
</style>