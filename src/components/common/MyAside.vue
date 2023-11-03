<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      text-color="var(--fontColor-m)"
      background-color="#f1f1f1"
      :collapse="isCollapse">
      <el-menu-item >
        <div class="person">
          <el-avatar  slot="reference" src="https://picx.zhimg.com/50/v2-eb9434958f13193b4d082c367d2ac750_720w.jpg?source=1940ef5c"></el-avatar>
          <i  @click="isCollapse = !isCollapse" class="iconfont icon-caidan-dakai openAndClose"></i>
        </div>
      </el-menu-item>

      <el-menu-item 
      v-for="nav in navList" 
      @click="clickNavItem(nav)" 
      :key="nav.id"
      :class="{navActive:($route.path.includes(nav.path))}"
      :index="nav.id">
        <i :class="nav.icon"></i>
        <span slot="title" v-text="nav.name"></span>
      </el-menu-item>

      <div style="margin: 5px 0;">
        <span style="display: block; width: 80%;height: 2px;background-color: #e2e2e2; margin: 0 auto;"></span>
      </div>
      <el-menu-item>
          <el-avatar
          class="shadow-box"
          src="data:image/jpeg;base64,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"></el-avatar>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isCollapse:true,
      navList:[
                {
                    id:'0',
                    path:'/circle/circlehome',
                    name:'首页',
                    icon:'el-icon-house'
                },
                {
                    id:'1',
                    path:'/circle/inbox',
                    name:'私信',
                    icon:'el-icon-message'
                },
            ]
    }
  },
  methods:{
    clickNavItem(nav){
      this.$router.push(nav.path).catch(erro=>{
      })
    }
  },
  created(){
    
  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo{
    // https://zhuanlan.zhihu.com/p/374142549
    &:not(.el-menu--collapse) {
      width: 200px;
      height: calc(100vh - 80px);
    }
      .person{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
          .openAndClose{
            font-size: 24px;
          }
      }
      .navActive{
        background-color: #ffffff !important;
        color: #000;
        i{
          color: #000;
        }
      }
 
  }
  .el-menu--collapse{
    width: 60px;
    height: calc(100vh - 80px);
  }
</style>