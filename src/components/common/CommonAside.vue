<template>
    <div class="commonAside-contain">
      <div class="title">
        <span v-text="title"></span>
      </div>
      <el-menu
        v-if="isWhich === '0'"
        class="el-menu-vertical-demo"
        text-color="var(--fontColor-m)"
        background-color="#fff">
        <el-menu-item
        v-for="nav in navList"
        :class="{activeItem:($route.path.includes(nav.path))}" 
        @click="clickNavItem(nav)" 
        :key="nav.id" 
        :index="nav.id">
          <i :class="nav.icon"></i>
          <span slot="title" v-text="nav.name"></span>
        </el-menu-item>
      </el-menu>
      <el-menu
        v-if="isWhich === '1'"
        class="el-menu-vertical-demo"
        text-color="var(--fontColor-m)"
        background-color="#fff">
        <el-menu-item
        v-for="nav in navList"
        :class="{activeItem:($route.path.includes(nav.path))}" 
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
  import { mapState } from 'vuex';
  export default {
    data(){
      return{
        title:'首页',
        navList:[
        ],
        navList1:[
          {
              id:'0',
              path:'/circle/circlehome/city',
              name:'同城推荐',
              icon:'iconfont icon-shop06'
          },
          {
              id:'1',
              path:'/circle/circlehome/school',
              name:'校园',
              icon:'iconfont icon-xiaoyuan'
          },
          {
              id:'2',
              path:'/circle/circlehome/hobby',
              name:'爱好',
              icon:'iconfont icon-ziyuan25'
          },
        ],
        navList2:[
          {
              id:'0',
              path:'/circle/circlehome/city',
              name:'平乒乓',
              icon:'iconfont icon-shop06'
          },
          {
              id:'1',
              path:'/circle/circlehome/school',
              name:'平乒乓',
              icon:'iconfont icon-xiaoyuan'
          },
          {
              id:'2',
              path:'/circle/circlehome/hobby',
              name:'平乒乓',
              icon:'iconfont icon-ziyuan25'
          },
        ],
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
      console.log(this.isWhich);
      if(this.isWhich === '0'){
        this.title = '首页'
        this.navList = this.navList1
      }else if(this.isWhich === '1'){
        this.title = '私信'
        this.navList = this.navList2
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .commonAside-contain{
    height: 100%;
    overflow: hidden;
    .title{
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .el-menu-vertical-demo{
        border: 0;
        height:calc(100% - 60px);
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