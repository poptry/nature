<template>
  <div class="user-person-sys">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="150px">
        <el-menu @select="handleSelect" :default-active="'0'" :class="{'el-menu-background':!black}">
          <el-row style="margin-bottom: 20px; text-align: center;">
            <el-switch
              v-model="black"
              @change="changeTheme"
              active-color="#131313"
              inactive-color="#7b7b7b">
            </el-switch>
          </el-row>
          <el-menu-item v-for="item in navList" :index="`${item.id}`" :key="item.id">{{item.name}}</el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 主要内容区域 -->
      <el-main :class="black ? `black` : `white`">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      black:true,
      navList:[
        {
          id:0,
          name:'我的资料',
        },
        {
          id:1,
          name:'我的订单',
        },
        // {
        //   id:2,
        //   name:'我的帖子',
        // }
      ]
    }
  },
  methods: {
    ...mapMutations('user',['setTheme']),
    handleSelect(key, keyPath) {
      if(key == 1){
        this.$router.push('myOrder').catch(err=>err)
      }else if(key == 0){
        this.$router.push('myInformation').catch(err=>err)
      }
    },
    changeTheme(){
      //存储在本地
      localStorage.setItem('theme',this.black)
      //更改vuex
      this.setTheme(this.black)
    }
  },
  mounted(){
    this.changeTheme()
  },
  created(){
    this.black = localStorage.getItem('theme') == 'true' ? true : false
  }
}
</script>

<style lang="less" scoped>
  .user-person-sys{
    width: 100%;
    height: 100%;
    margin-top: 80px;
    .el-main{
      overflow-y: scroll;
      &::-webkit-scrollbar {
          width: 0; /* Safari,Chrome 隐藏滚动条 */
          height: 0; /* Safari,Chrome 隐藏滚动条 */
          display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
      }
    }
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
      .el-menu-background{
        border-radius: 6px;
        background: linear-gradient(145deg, #f0f0f0, #cacaca) !important;
        box-shadow:  24px 24px 49px #a4a4a4,
                    -24px -24px 49px #ffffff;
        .el-menu-item{
          color: #2a2a2a;
          &:hover{
            border-radius: 0px;
            background: #c3c3c3;
            box-shadow: inset 22px 22px 41px #bebebe,
                        inset -22px -22px 41px #ffffff;
          }
        }
        .is-active{
          border-radius: 0px;
          background: #e0e0e0;
          box-shadow: inset 22px 22px 41px #bebebe,
                      inset -22px -22px 41px #ffffff;
        }
      }
    }
    .black{
      height: 698px;
      padding: 0;
      background-color: #363636;
    }
    .white{
      height: 698px;
      padding: 0;
      background-color: #e0e0e0;
    }
  }
</style>