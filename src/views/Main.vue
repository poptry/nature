<template>
    <div class="_main">
      <el-container>
        <el-header :class="{comeout: iscomeout}">
            <!-- 公共顶部导航 -->
            <CommonNav></CommonNav>
        </el-header>
        <el-main>
            <!-- 主要内容区 -->
            <router-view></router-view>
        </el-main>
        <el-footer height="200px" width="100%">
            <!-- 放公共底部栏 -->
            <CommonFooter></CommonFooter>
        </el-footer>
      </el-container>
    </div>
  </template>
  <script>
      //引入导航部分
      import CommonNav from '@/components/CommonNav.vue' 
      // 引入底部公共栏
      import  CommonFooter from '@/components/CommonFooter'
      import {mapState} from 'vuex';
      export default {
          components: { CommonNav,CommonFooter},
          data() {
            return {
              // iscomeout: 0 //用来控制样式
            };
          },
          computed:{
            ...mapState({iscomeout:state=>state.nav.iscomeout})
          },
          methods:{
          },
          mounted(){
          } 
      };
  </script>
  <style scoped lang="less">
    .el-header{
      position: fixed;
      top: 0;
      left: 0;
      height: 100px !important;
      width: 100%;
      z-index: 99;
      padding: 0;
      background-color:rgba(34, 32, 32, 0);
      transition: background-color 1s ease;
    }
    .comeout{
        background-color:rgba(34, 32, 32, 1);
      }
    .el-main{
      padding: 0;
    }
    .el-footer {
      width: 100%;
      padding: 0;
    }
  </style>
  