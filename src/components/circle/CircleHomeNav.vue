<template>
    <div class="container">
        <div class="title">
            <span v-text="title"></span>
        </div>
        <el-menu
        class="el-menu-vertical-demo"
        text-color="var(--fontColor-m)"
        background-color="#fff">
            <el-menu-item
            v-for="nav in navList"
            :class="{activeItem:(nav.id == nowNav)}" 
            @click="clickNavItem(nav)" 
            :key="nav.id" 
            :index="nav.id">
                <i :class="nav.icon"></i>
                <span slot="title" v-text="nav.name"></span>
            </el-menu-item>
        </el-menu> 
    </div>

</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
  data(){
    return{
      navList:[
        {
          id:'0',
          name:'全部',
          icon:'iconfont icon-quanbu-copy'
        },
        {
          id:'1',
          name:'同城推荐',
          icon:'iconfont icon-shop06'
        },
        {
          id:'2',
          name:'校园',
          icon:'iconfont icon-xiaoyuan'
        },
        {
          id:'3',
          name:'爱好',
          icon:'iconfont icon-ziyuan25'
        },
      ],
    }
  },
  methods:{
    ...mapMutations('nav',{changeNav:'changeNav'}),
    clickNavItem(nav){
      //点击菜单栏，改变当前的nav的id
      this.changeNav(nav.id)
    }
  },
  computed:{
    ...mapState({
      nowNav:state => state.nav.nowNav
    })
  },
  created(){
      this.title = '首页'
  }
}
</script>

<style lang="less" scoped>
.container{
  height: 100%;
  user-select: none;
  .title{
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-menu-vertical-demo{
        border: 0;
        .el-menu-item {
          i{
            padding: 5px;
          }
        }
        .activeItem{
          background-color: #f0f0f0 !important;
          background: #e0e0e0;
          box-shadow: inset 15px 15px 30px #d7d7d7,
                      inset -15px -15px 30px #e9e9e9;
          color: #000000 !important;
          i{
            color: #000000 !important;
          }
        }
  }
}
</style>