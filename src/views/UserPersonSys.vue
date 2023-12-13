<template>
  <div class="user-person-sys">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="150px">
        <el-menu @select="handleSelect" :default-active="'0'">
          <el-menu-item v-for="item in navList" :index="`${item.id}`" :key="item.id">{{item.name}}</el-menu-item>
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
    handleSelect(key, keyPath) {
      if(key == 1){
        this.$router.push('myOrder').catch(err=>err)
      }else if(key == 0){
        this.$router.push('myInformation').catch(err=>err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .user-person-sys{
    width: 100%;
    height: 100%;
    margin-top: 80px;
    ::v-deep .el-aside{
      height: 698px;
      padding: 0 !important;
      .el-menu{
        height: 100%;
        width: 100%;
        padding: 0;
        background-color: #383838 !important;
        border-right: 0;
        box-shadow: 0 0 2px 2px #7b7b7b;
        padding-top: 10px;
        user-select: none;
        .el-menu-item{
          color: #cdcdcd;
          &:hover{
            background-color: #8a8a8a;
            border-radius: 0px;
            background: #777777;
            box-shadow: inset 13px 13px 26px #2b2b2b,
                        inset -13px -13px 26px #414141;
          }
        }
        .is-active{
          border-radius: 0px;
          background: #363636;
          box-shadow: inset 11px 11px 11px #2d2d2d,
                      inset -11px -11px 11px #3f3f3f;
        }
      }
    }
    .el-main{
      height: 698px;
      padding: 0;
      background-color: #363636;
    }
  }
</style>