<template>
  <div class="shopCart">
    <div class="cartItem" v-for="(s,index) in shopCartList"   :key="index">
      <div class="item-image" @click="toProductDetail(s)">
        <el-image
          style="width: 100px; height: 100px"
          :src="s.product_img"
          fit="fill">
        </el-image>
      </div>
      <div class="item-info">
        <i class="iconfont icon-shanchu delete" @click="deleteProItem(s)"></i>
        <h3 class="pro_name" @click="toProductDetail(s)" v-text="s.product_name"></h3>
        <span class="type">藏青色</span>
        <span class="size" v-text="s.size_name"></span>
        <span class="price" v-text="s.product_disc_price"></span>
        <div class="stockAndNum">
          <span class="stock" v-text="`库存剩余 ${s.product_stock}`"></span>
          <el-input-number @change="changeNumber(s)" :min="1" :max="10" size="mini" v-model="s.shopCart_pronum"></el-input-number>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteShopCart,updateShopCart } from '@/api';
import { mapState,mapActions } from 'vuex';
export default {
  data(){
    return{
      user_id:Number
    }
  },
  computed:{
    ...mapState('product',{
      shopCartList:state=>state.shopCartList
    })
  },
  methods:{
    ...mapActions('product',['setShopCartList']),
    //改变商品数量
    changeNumber(s){
      updateShopCart({user_id:this.user_id,product_id:s.product_id,shopCart_pronum:s.shopCart_pronum}).then(res=>{
        if(res.data.code === 200){
          // this.getShopCartList();
        }else{
          this.$message.error('修改失败');
        }
      });
    },
    //前往商品详细页面
    toProductDetail(proInfo){
      this.$router.replace({name:'equipmentDetail',query:{productInfo:JSON.stringify(proInfo)}}).catch(err=>{});
    },
    //删除购物车某一项
    async deleteProItem(proList){
      //确定要删除吗？
      await this.$confirm('确定要删除吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
         deleteShopCart({user_id:this.user_id,product_id:proList.product_id}).then(res=>{
          if(res.data.code === 200){
            this.getShopCartList();
          }else{
            this.$message.error('删除失败');
          }
        });
      }).catch(()=>{
      });
    },
    //获取购物车列表
    async getShopCartList(){
      const user_id = JSON.parse(localStorage.getItem('user')).user_id;
      await this.setShopCartList(user_id)
    }
  },
  created(){
    this.getShopCartList();
    this.user_id = JSON.parse(localStorage.getItem('user')).user_id;
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
        &:hover{
          cursor: pointer;
        }
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