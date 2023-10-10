<template>
    <div class="_main">
      <el-container>
        <div
         @mouseenter="isEnter = true"
         @mouseleave="isEnter = false"
         :class="{comeout: (isEnter || iscomeout || this.$route.name === 'forum')}"
         class="nav animate__animated animate__fadeIn">
            <span class="sign" @click="clickSpan">Natrue探险者</span>
            <ul>
                <li v-for="(item,index) in navList" :key="index" @click="clickMenu(item)">{{item.name}}</li>
            </ul>
            <button class="join-us">加入我们</button>
        </div>
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
      import CommonNav from '@/components/common/CommonNav.vue' 
      // 引入底部公共栏
      import  CommonFooter from '@/components/common/CommonFooter'
      import {mapState} from 'vuex';
      export default {
          components: { CommonNav,CommonFooter},
          data() {
            return {
              scrollTop:false,
              isEnter:false,
              navList:[
                {
                    name:'圈子',
                    path:'/circle'
                },
                {
                    name:'攻略',
                },
                {
                    name:'装备',
                }
            ]
            };
          },
          computed:{
            ...mapState({iscomeout:state=>state.nav.iscomeout})
          },
          methods:{
                //获取滚动高度
                handleScroll(){
                this.scrollTop = pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                },
                clickSpan(){
                if(this.$router.name !== 'home' ){
                        this.$router.push('/home').catch(err=>{
                        err
                        })
                    }
                },
                clickMenu(item){
                        if(this.$router.path !== item.path){
                            this.$router.push(item.path).catch(err=>{
                            err
                        })
                    }
                }
          },
          created(){
            let iscomeout = false
            this.$store.commit('changeToolbar',iscomeout)
          },
          watch:{
            //监视滚动高度
            scrollTop(scrollTop,oldScrollTop){
                let iscomeout = scrollTop > 0 //大于0，就背景为黑色，等于0就是透明色
              //提交滚动高度，更改状态
              this.$store.commit('changeToolbar',iscomeout)
            }
          },
          mounted(){
            this.$nextTick(()=>{
                    addEventListener('scroll',this.handleScroll)
                })
          },
          destroyed(){
            removeEventListener('scroll',this.handleScroll)//注销滚动事件
          }
      };
  </script>
  <style scoped lang="less">
  .nav {
      position: fixed;
      top: 0;
      left: 0;
      padding: 0;
      height: 100px;
      width: 100%;
      line-height: 100px;
      z-index: 99;
      background-color:var(--noBackground);
      transition: background-color 1s ease;
      user-select: none;
      .sign{
              display: block;
              width: 20%;
              float: left;
              color: var(--fontColor);
              font-size: 30px;
              font-family: 'STXingkai';
              margin-left: 40px;
              margin-right: 20px;
              cursor: pointer;
              transition: font-size 0.5s;
              &:hover{
                  font-size: 32px;
              }
          }
      ul {
          float: left;
          list-style: none;
          width: 40%;
          
          li{
              display: inline;
              padding: 14px;
              font:16px/22px "Microsoft Yahei";
              margin-left:30px ;
              transition: all 0.5s;
              color: var(--fontColor);
              cursor: pointer;
          }
          li:hover {
              font-size: 20px;
          }
      }
      .join-us{
          float: right;
          height: 40%;
          width: 10%;
          margin-top: 30px;
          margin-right: 120px;
          font-size: 14px;
          color: black;
          outline: none;
          border: 0;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.5s;
          &:hover {
              background-color:#222020;
              color: var(--fontColor);
              border: var(--borderColor);
              transform: scale(1.1);
          }
      }
    }
    .comeout{
        background-color:var(--background);
      }
    .el-main{
      padding: 0;
    }
    .el-footer {
      width: 100%;
      padding: 0;
    }
  @media screen and (max-width: 800px) {
    .article-image {
      width: 100%;
      height: 200px;
    }
  }
  </style>
  