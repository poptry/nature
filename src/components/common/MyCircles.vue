<template>
    <div>
        <div class="title">
            <span v-text="title"></span>
        </div>
        <el-menu
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
export default {
    data(){
        return{
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
        }
    },
    methods:{
      clickNavItem(nav){
        this.$router.push(nav.path).catch(erro=>{
        })
      }
    },
    created(){
        this.title = '首页'
        this.navList = this.navList1
    }
}
</script>

<style lang="less" scoped>
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
</style>