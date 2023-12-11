<template>
    <div class="richText-container">
      <!-- 3、使用组件 -->
      <vue-editor v-model="content"></vue-editor>
    </div>
  </template>
  <script>
  // 1、引用包
  import { VueEditor } from "vue2-editor";
   
  export default {
    // 2、添加组件
    components: {
      VueEditor
    },
   
    data() {
      return {
        content: "编写你的攻略吧"
      };
    }
  };
  </script>
  <style lang="less" scoped>
    .richText-container{
        width: 100%;
        height: 100%;
        padding: 10px;
        overflow-y: scroll;
    }
  </style>