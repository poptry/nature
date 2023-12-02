<template>
  <div class="menEquipment">
    <div class="products" v-for="product in EquipmentPros" @click="clickProduct(product)" :key="product.productId">
      <ShowCardVue :product="product"></ShowCardVue>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import ShowCardVue from '@/components/equipment/ShowCard'
export default {
  data(){
    return{

    }
  },
  components:{
    ShowCardVue
  },
  computed:{
    ...mapState('equipment',{
      EquipmentPros:state=>state.EquipmentPros
    })
  },
  methods:{
    ...mapActions('equipment',{
      getMenEquipmentPros:'getMenEquipmentPros'
    }),
    clickProduct(proInfo){
      this.$router.push({name:'equipmentDetail',query:{productInfo:JSON.stringify(proInfo)}})
    }
  },
  created(){
    this.getMenEquipmentPros()
  }
}
</script>

<style lang="less" scoped>
  .menEquipment{
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