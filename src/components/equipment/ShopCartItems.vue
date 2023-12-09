<template>
  <div class="shopCart">
    <div class="cartItem" v-for="(s,index) in shopCartList" :key="index">
      <div class="item-image">
        <el-image
          style="width: 100px; height: 100px"
          :src="s.product_img"
          fit="fill">
        </el-image>
      </div>
      <div class="item-info">
        <i class="iconfont icon-shanchu delete" @click="deleteProItem(s)"></i>
        <h3 class="pro_name" v-text="s.product_name"></h3>
        <span class="type">藏青色</span>
        <span class="size">X</span>
        <span class="price"  v-text="s.product_orig_price"></span>
        <div class="stockAndNum">
          <span class="stock" v-text="`库存剩余 ${s.product_stock}`"></span>
          <el-input-number size="mini" v-model="proNum"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getShopCart } from '@/api';
export default {
  data(){
    return{
      shopCartList:[],
      proNum:1
    }
  },
  methods:{
    //删除购物车某一项
    deleteProItem(proList){
      this.shopCartList.forEach((item,index)=>{
        if(item.product_id === proList.product_id){
          this.shopCartList.splice(index,1);
        }
      })
    },
    //获取购物车列表
    async getShopCartList(){
      const user_id = JSON.parse(localStorage.getItem('user')).user_id;
      const res = await getShopCart({params:{user_id:user_id}}).then(res=>{
        console.log(res);
        if(res.status === 200){
          this.shopCartList = res.data;
          console.log(this.shopCartList);
        }
      });
    }
  },
  created(){
    this.getShopCartList();
  }
}
</script>

<style lang="less" scoped>
    .shopCart{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      .cartItem{
        padding: 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e3e3e3;
      }
      .item-info{
        width: 100%;
        margin-left: 20px;
        .delete{
          font-size: 20px;
          color: #d0d0d0;
          float: right;
          &:hover{
            color: #212121;
            cursor: pointer;
          }
        }
        span{
          display: block;
        }
        .type{
          font-size: 14px;
          color: #5e5a5a;
        }
        .size{
          font-size: 14px;
          color: #5e5a5a;
        }
        .price{
          font-size: 16px;
        }
        .stockAndNum{
          width: 100%;
          display: flex;
          flex-direction: row;
          margin-top: 8px;
          justify-content: space-between;
          .stock{
            font-size: 12px;
            color: #757575;
          }
        }
      }
    }
</style>