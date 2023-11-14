<template>
  <div class="_main">
      <router-view></router-view>
  </div>
</template>
<script>
import {getUser} from '@/api'
export default {
  data(){
    return{

    }
  },
  methods:{

  },
  created(){
    getUser().then((response)=>{
      console.log(response);
    })
  }
};
</script>
<style scoped lang="less">
  ._main{
    width: 100%;
    height: 100%;
  }
</style>
