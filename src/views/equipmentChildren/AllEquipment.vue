<template>
  <div class="allEquipment">
    <div class="products" v-for="product in EquipmentPros" :key="product.productId">
      <ShowCardVue :product="product"></ShowCardVue>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions,mapMutations } from 'vuex'
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
      EquipmentPros:state=>state.EquipmentPros,
      classifyList:state=>state.classifyList
    })
  },
  methods:{
    ...mapMutations('equipment',{getProsByClassify:'getProsByClassify'}),
    ...mapActions('equipment',{
      getEquipmentPros:'getEquipmentPros'
    }),
  },
  async created(){
    await this.getEquipmentPros(),
    this.getProsByClassify(this.classifyList)
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