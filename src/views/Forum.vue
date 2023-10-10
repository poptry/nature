<template>
  <div class="forum">
    <div class="shadow-box article">
      <span class="title">我的第一篇文章</span>
      <div class="article-image">
        <el-image
          src="https://ts1.cn.mm.bing.net/th?id=OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
          fit="cover">
        </el-image>
      </div>
    </div>
    <div class="shadow-box article">
      <span class="title">我的第一篇文章</span>
      <div class="article-image">
        <el-image
          src="https://ts1.cn.mm.bing.net/th?id=OIP-C.Zte3ljd4g6kqrWWyg-8fhAHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
          fit="cover">
        </el-image>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
  .forum{
    max-width: 780px;
    .article{
      height: 200px;
      display: flex;
      flex-direction: row;
      position: relative;
      margin-bottom: 40px;
      border-radius: 10px;
      overflow: hidden;
      .article-image{
        width: 50%;
        height: 100%;
        position: absolute;
        right: 0;
        .el-image{
          width: 100%;
          height: 100%;
        }
        ::v-deep .el-image__inner{
          transition: all 1s ;
          &:hover{
            transform: scale(1.2);
          }
        }
      }
    }
  }
  // @media screen and (max-width: 700px) {
  //   .article-image {
  //     width: 100%;
  //     height: 200px;
  //   }
  // }
</style>