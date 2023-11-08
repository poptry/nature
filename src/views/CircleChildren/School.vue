<template>
  <div class="contain-city">
      <div class="search">
          <input type="text" name="text" class="input" placeholder="搜索">
      </div>
      <div class="cards">
          <common-card v-for="(url,index) in urls" :url="url" :key="index"></common-card>
      </div>
  </div>
</template>

<script>
import CommonCard from '@/components/circleHome/CommonCard.vue';
export default {
  data(){
      return{
          recommand:[
              {
                  name:'1'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              },
              {
                  name:'1'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              }
              ,{
                  name:'1'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              },
              {
                  name:'2'
              },
              {
                  name:'3'
              }
          ],
          urls: [
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
              'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
              'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
              'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
              'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
              'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
              'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
              'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
              'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
              'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
              'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
              'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          ]
      }
  },
  components:{CommonCard}
}
</script>

<style lang="less" scoped>
  .contain-city{
      overflow: hidden;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow: inset 1px 2px 3px rgb(255, 255, 255);
      padding: 20px;
      background: url('@/assets/images/background-image.jpg') no-repeat center center fixed;
      background-size: 100% 100%;
      .search{
          display:flex;
          justify-content: flex-end;
          .input {
                  width: 100%;
                  margin-bottom: 20px;
                  width: 30%;
                  min-width: 280px;
                  border: none;
                  padding: 1rem;
                  border-radius: 1rem;
                  background: #e8e8e8;
                  box-shadow: 10px 10px 60px #ff984e,
                          -10px -10px 30px #a5d1fc;
                  transition: 0.3s;
                  opacity: 0.7;
              }
              .input:focus {
                  outline-color: #e8e8e8;
                  background: #e8e8e8;
                  box-shadow: inset 20px 20px 60px #c5c5c5,
                          inset -20px -20px 60px #ffffff;
                  transition: 0.3s;
                  opacity: 1;
              }
      }
      .cards{
          width: 100%;
          min-width: 440px;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
      }
  }
</style>