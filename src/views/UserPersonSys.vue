<template>
  <div class="user-person-sys">
    <el-container>
    <!-- 侧边栏 -->
    <el-aside width="150px">
      <el-menu @select="handleSelect" :default-active="0">
        <el-menu-item v-for="item in navList" :index="item.id" :key="item.id">{{item.name}}</el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 主要内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </div>
</template>

<script>
export default {
  data(){
    return{
      navList:[
        {
          id:0,
          name:'我的资料',
        },
        {
          id:1,
          name:'我的订单',
        },
        {
          id:2,
          name:'我的帖子',
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
  .user-person-sys{
    width: 100%;
    height: 100%;
    margin-top: 100px;
   ::v-deep .el-aside{
      height: 698px;
      padding: 0 !important;
      .el-menu{
        height: 100%;
      }
    }
  }
</style>