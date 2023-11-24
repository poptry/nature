<template>
  <div class="allEquipment">
    <div class="products" v-for="product in productsInfo" :key="product.productId">
      <ShowCardVue :product="product"></ShowCardVue>
    </div>
  </div>
</template>

<script>
import {getPros} from '@/api'
import ShowCardVue from '@/components/equipment/ShowCard'
export default {
  data(){
    return{
      productsInfo:[]
    }
  },
  components:{
    ShowCardVue
  },
  methods:{
    getPros(){
      getPros().then(res=>{
        console.log(res);
        this.productsInfo = res.data
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.getPros()
  }
}
</script>

<style lang="less" scoped>
  .allEquipment{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .products{
      width: auto;
      margin-bottom: 10px;
    }
  }
</style>