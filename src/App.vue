<template>
  <div class="_main">
      <router-view></router-view>
  </div>
</template>
<script>
import {login} from '@/api'
export default {
  data(){
    return{

    }
  },
  methods:{

  },
  created(){
    let user = {
      userId:'1',
      userPwd:'TnuhV7vcII'
    }
    login({params:user}).then((response)=>{
      console.log(response);
      if(response.status === 200){
        localStorage.setItem('user',JSON.stringify(response.data[0]))
      }
    }).catch(err=>{
      console.log(err);
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
