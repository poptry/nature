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
import MyCircles from '../inbox/MyFriends.vue';
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
    max-height: calc(100vh - 80px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
  }
  </style>