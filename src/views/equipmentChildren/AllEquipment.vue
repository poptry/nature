<template>
  <div class="allEquipment">
    <div class="products" v-for="product in productsInfo" :key="product.productId">
      <ShowCardVue :product="product"></ShowCardVue>
    </div>
  </div>
</template>

<script>
import ShowCardVue from '@/components/equipment/ShowCard'
export default {
  data(){
    return{
      productsInfo:[
        {
          productId:'1',
          productTitle:'Roc Down Hood Women',
          originalImgUrl:'https://marmot.scene7.com/is/image/marmot/M13173-2975-F22-S02?wid=700&fmt=webp',
          hoverImgUrl:'https://marmot.scene7.com/is/image/marmot/M13173-2975-F22-S01?wid=700&fmt=webp',
          originalPrice:'250',
          currentPrice:'250',
          collected:'0'
        },
        {
          productId:'2',
          productTitle:"Men's GORE-TEX® Minimalist Jacket",
          originalImgUrl:'https://marmot.scene7.com/is/image/marmot/M12681-9434-S01-F23?wid=700&fmt=webp',
          hoverImgUrl:'https://marmot.scene7.com/is/image/marmot/M12681-9434-S02-F23?wid=700&fmt=webp',
          originalPrice:'250',
          currentPrice:'220',
          collected:'0'
        },
        {
          productId:'3',
          productTitle:"Men's Shadow Jacket",
          originalImgUrl:'https://marmot.scene7.com/is/image/marmot/74830-20734-F22-S01?wid=700&fmt=webp',
          hoverImgUrl:'https://marmot.scene7.com/is/image/marmot/74830-20734-F22-S02?wid=700&fmt=webp',
          originalPrice:'250',
          currentPrice:'104.99',
          collected:'0'
        },
        {
          productId:'4',
          productTitle:"Women's '96 Active Anorak",
          originalImgUrl:'https://marmot.scene7.com/is/image/marmot/M14194-21723-S01-S23?wid=700&fmt=webp',
          hoverImgUrl:'https://marmot.scene7.com/is/image/marmot/M14194-21723-S02-S23?wid=700&fmt=webp',
          originalPrice:'199',
          currentPrice:'59.99',
          collected:'0'
        },
        {
          productId:'5',
          productTitle:"Women's Montreal Coat",
          originalImgUrl:'https://marmot.scene7.com/is/image/marmot/78570-4764-P100-S21?wid=700&fmt=webp',
          hoverImgUrl:'https://marmot.scene7.com/is/image/marmot/78570-4764-P102-S21?wid=700&fmt=webp',
          originalPrice:'250',
          currentPrice:'134.99',
          collected:'0'
        },
        {
          productId:'6',
          productTitle:"Women's Golden Mantle Jacket",
          originalImgUrl:'https://marmot.scene7.com/is/image/marmot/M13214-001-F22-S02?wid=700&fmt=webp',
          hoverImgUrl:'https://marmot.scene7.com/is/image/marmot/M13214-001-F22-S03?wid=700&fmt=webp',
          originalPrice:'250',
          currentPrice:'194.23',
          collected:'0'
        },
      ]
    }
  },
  components:{
    ShowCardVue
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