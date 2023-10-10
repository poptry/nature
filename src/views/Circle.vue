<template>
  <div class="circle animate__animated animate__fadeIn">
    <!-- 侧边 -->
    <div class="aside animate__animated animate__fadeInLeft">
      <MyAside></MyAside>
    </div>
    <!-- 右边上方搜索框 -->
    <div class="message">
      <div class="message-search shadow-box animate__animated animate__fadeInDown">
        <input v-model="search" placeholder="请输入内容" class="search-input"/>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <!-- 右边具体内容 -->
      <div class="message-content shadow-box animate__animated animate__fadeInUp">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MyAside from '@/components/common/MyAside.vue'
export default {
  components:{MyAside},
  data(){
    return{
      search:''
    }
  }
}
</script>

<style scoped lang="less">
    .circle{
      width: 90%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 0 20px 20px 20px;
      margin: 100px auto;
      .aside{
        width: calc(30% - 40px);
        margin-top: 40px;
        max-width: 300px;
      }
      .message{
        width: 70%;
        margin: 40px 20px 20px 40px;
        .message-search{
          display: flex;
          flex-direction: row;
          justify-content: center;
          padding: 25px;
          border-radius: 6px;
          .search-input{
            display: block;
            width: calc(70% - 60px);
            max-width: 600px;
            padding: 0px 8px;
            border-radius: 6px;
            outline: none;
            border: 1px solid rgb(153, 153, 153);
          }
          .el-button {
            margin-left: 20px;
            width: 40%;
            max-width: 200px;
            background-color:rgb(67, 67, 67);
            border: none;
            transition: background-color 0.5s;
            &:hover{
              background-color:  var(--background);
            }
          }
        }
        .message-content{
          border-radius: 5px;
          box-shadow: 0 1px 20px -6px rgb(26, 25, 25);
          padding: 20px 40px;
          margin-top: 20px;
        }
      }
    }
    @media screen and (max-width: 1100px) {
      .circle{
        .aside {
          width: 100%;
        }
        .message {
          width: 100%;
        }
      }
    }
    @media screen and (max-width: 1000px) {
      .circle{
        flex-direction: column;
        .aside {
          width: 100%;
          max-width: unset;
        }
        .message {
          width: 100%;
          margin: 40px auto 0;
        }
      }
    }
    // @media screen and (max-width: 768px) {
    //   .aside {
    //     width: 100%;
    //   }
    //   .message {
    //     width: 100%;
    //   }
    // }
</style>