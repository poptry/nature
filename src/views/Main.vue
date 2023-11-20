<template>
    <div class="_main">
      <el-container>
        <div
         @mouseenter="isEnter = true"
         @mouseleave="isEnter = false"
         :class="{comeout: (isEnter || iscomeout || this.$route.path.includes('circle') || this.$route.path.includes('equipment'))}"
         class="nav animate__animated animate__fadeIn">
            <span class="sign" @click="clickSpan">Natrue探险者</span>
            <ul>
                <li v-for="(item,index) in navList" :key="index" @click="clickMenu(item)">
                  <i :class="item.icon"></i>
                  {{item.name}}
                </li>
            </ul>
          <el-dropdown>
            <el-avatar class="my_avatar" shape="circle" :size="size" src="https://cdn.pixabay.com/photo/2013/03/03/15/49/mount-everest-89590_1280.jpg"></el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
            <!-- <button class="join-us">加入我们</button> -->
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
      // 引入底部公共栏
      import  CommonFooter from '@/components/common/CommonFooter'
      import {mapState} from 'vuex';
      export default {
          components: {CommonFooter},
          data() {
            return {
              scrollTop:false,
              isEnter:false,
              navList:[
                {
                    name:'圈子',
                    icon:'iconfont icon-quanzi',
                    path:'/circle'
                },
                {
                    name:'攻略',
                    icon:'iconfont icon-dkw_gonglve',
                    path:'/strategy'
                },
                {
                    name:'装备',
                    icon:'iconfont icon-gouwuchekong',
                    path:'/equipment'
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
            console.log("已注销");
          }
      };
  </script>
  <style scoped lang="less">
  ._main{
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        height: 10%;
        width: 100%;
        max-height: 100px;
        min-height: 80px;
        min-width: 1000px;
        z-index: 99;
        background-color:var(--noBackground);
        transition: background-color 1s ease;
        user-select: none;
        .sign{
                display: block;
                width: 20%;
                color: var(--fontColor);
                font-size: 30px;
                font-family: 'STXingkai';
                margin-left: 40px;
                cursor: pointer;
                transition: font-size 0.5s;
                &:hover{
                    font-size: 32px;
                }
            }
        ul {
            list-style: none;
            width: 60%;
            li{
                display: inline;
                padding: 14px;
                font:16px/22px "Microsoft Yahei";
                margin-left:40px ;
                transition: all 0.5s;
                color: var(--fontColor);
                cursor: pointer;
                i{
                  transition: all 0.5s;
                }
            }
            li:hover {
                font-size: 20px;
                i{
                  font-size: 20px;
                }
            }
        }
        .my_avatar {
          float: right;
          margin-right: 40px;
          &:hover{
            cursor: pointer;
          }
        }
        .join-us{
            float: right;
            height: 40%;
            width: 10%;
            margin-right: 20px;
            font-size: 14px;
            color: black;
            outline: none;
            border: 0;
            border-radius: 4px;
            box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.8);
            cursor: pointer;
            transition: all 0.5s;
            &:hover {
                background:var(--gradualBackgroundR);
                color: var(--fontColor);
                border:1px solid white;
                transform: scale(1.1);
            }
        }
      }
      .comeout{
          background-color:var(--background);
        }
      .el-main{
        width: 100%;
        height: 100%;
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
  }
  </style>
  