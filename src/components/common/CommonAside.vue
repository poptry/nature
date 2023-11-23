<template>
    <div class="commonAside-contain">
      <div style="height: 100%;" v-if="isWhich === '0'">
        <CircleHomeNav></CircleHomeNav>
      </div>
      <div style="height: 100%;" v-if="isWhich === '1'">
        <div class="mycircles">
          <MyFriends></MyFriends>
        </div>
      </div>
      <div style="height: 100%;" v-if="isWhich === '2'">
        <MyCircles></MyCircles>
      </div>
    </div>
  </template>
  <script>
import { mapState } from 'vuex';
import MyFriends from '../inbox/MyFriends.vue';
import CircleHomeNav from '../circle/CircleHomeNav.vue';
import MyCircles from '@/components/circle-myjoin/MyCircles.vue'
  export default {
    components:{MyFriends,CircleHomeNav,MyCircles},
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
      }else if(this.$route.path.includes('myjoincircle')){
        this.$store.commit('changeCommonAside','2')
      }else{
        this.$store.commit('changeCommonAside','0')
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .commonAside-contain{
    height: 100%;
    // max-height: calc(100vh - 80px);
    max-height: 698px;

    overflow-y: scroll;
    &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
  }
  </style>