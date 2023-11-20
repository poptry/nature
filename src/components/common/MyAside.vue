<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      text-color="var(--fontColor-m)"
      background-color="#f1f1f1"
      :collapse="isCollapse">
      <el-menu-item >
        <div class="person">
          <el-avatar v-if="avatar"  slot="reference" :src="avatar"></el-avatar>
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
    </el-menu>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  data(){
    return{
      isCollapse:true,
      userInfo:'',
      avatar:'',
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
    ...mapMutations({
      changeCommonAside:'changeCommonAside'
    }),
    //导航点击事件
    clickNavItem(nav){
      this.changeCommonAside(nav.id)
      this.$router.push(nav.path).catch(erro=>{
      })
    }
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('user'))
    this.avatar = this.userInfo ? this.userInfo.user_avatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.pSYrBZuWAziwSL4d7H9-UAAAAA?w=206&h=206&c=7&r=0&o=5&dpr=2&pid=1.7'
  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo{
    // https://zhuanlan.zhihu.com/p/374142549
    &:not(.el-menu--collapse) {
      width: 200px;
      height: 100%;
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
    height: 100%;
  }
</style>