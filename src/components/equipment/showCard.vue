<template>
  <div class="card-container animate__animated animate__fadeIn">
    <div class="product">
      <div @mouseenter="showImage=!showImage" @mouseleave="showImage=!showImage" class="image">
        <img v-show="showImage" :src="product.product_img" alt="">
        <img v-show="!showImage" :src="product.product_prev_img" alt="">
      </div>
      <div class="productInfo">
        <h5>{{product.product_name}}</h5>
        <div class="price">
          <span>£{{ product.product_disc_price }}</span>
          <span>£{{ product.product_orig_price }}</span>
        </div>
      </div>
    </div>
    <button @click="clickCollect" class="collect">
        <i class="iconfont" :class="collectClass"></i>
    </button>
  </div>
</template>

<script>
export default {
  props:['product'],
  data(){
    return{
      showImage:true,
      isCollect:this.product.collected,
    }
  },
  computed:{
    collectClass(){
      return this.isCollect === '0' ? 'icon-jushoucang' :'icon-jushoucanggift'
    }
  },
  methods:{
    clickCollect(){
      this.isCollect=this.isCollect === '0' ? '1' : '0'
    }
  },
  created(){

  }
}
</script>
<style lang="less" scoped>
    .card-container{
      height: auto;
      width: 300px;
      border-radius: 0px;
      position: relative;
      padding: 20px;
      transition: all 0.5s;
      &:hover{
        box-shadow: 0 0 3px 2px rgb(188, 188, 188);
      }
      .product{
        cursor: pointer;
        .image{
          height: auto;
          width: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .productInfo{
          line-height: 2;
          h5{
            text-align: center;
            font-size: 14px;
            font-weight: 400;
          }
          .price{
            text-align: center;
            span{
              display: inline-block;
              text-align: center;
              font-size: 16px;
              font-weight: 400;
              &:nth-child(2){
                font-size: 14px;
                margin-left: 5px;
                text-decoration: line-through;
                color: rgb(118, 118, 118);
              }
            }
          }
        }
      }
        .collect{
          position: absolute;
          right: 15px;
          bottom: 25px;
          border: 0;
          background: transparent;
          outline: none;
          cursor: pointer;
          i{
            font-size: 20px;
          }
        }

    }
</style>