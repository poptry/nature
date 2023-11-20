<template>
    <div class="commonAside-contain">
      <div style="height: 100%;" v-if="isWhich === '0'">
        <CircleHomeNav></CircleHomeNav>
      </div>
      <div style="height: 100%;" v-if="isWhich === '1'">
        <div class="mycircles">
          <MyCircles></MyCircles>
        </div>
      </div>
    </div>
  </template>
  <script>
import { mapState } from 'vuex';
import MyCircles from '../inbox/MyCircles.vue';
import CircleHomeNav from '../circleHome/CircleHomeNav.vue';
  export default {
    components:{MyCircles,CircleHomeNav},
    data(){
      return{
      }
    },
    methods:{
      clickNavItem(nav){
        this.$router.push(nav.path).catch(erro=>{
        })
      }
    },
    computed:{
      ...mapState({
        isWhich:state=>state.nav.isWhich
      })
    },
    created(){
      if(this.$route.path.includes('inbox')){
        this.$store.commit('changeCommonAside','1')
      }else{
        this.$store.commit('changeCommonAside','0')
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .commonAside-contain{
    height: 100%;
    overflow: hidden;
  }
  </style>