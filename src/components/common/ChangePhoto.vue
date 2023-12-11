<template>
    <div class="strategy">
      <!-- action="/api/user/updateAvatar" -->
      <div id="container" class="allmap" style="z-index: 100;width: 100%;height: 1000px;"></div>
      <el-upload
        class="avatar-uploader"
        action="''"
        :data="userInfo"
        :show-file-list="false"
        name="file"
        :on-change="handleLicensePreview"
        >
        <img v-if="image.imageUrl" :src="image.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <button @click="uploadAvatar">上传</button>
    </div>
  </template>
  
  <script>
  import {updateAvatar} from '@/api'
  export default {
    data() {
        return {
          image:{
            imageUrl: '',
          },
          file:{},
          userInfo:JSON.parse(localStorage.getItem('user')),
          ak: "zK6RQcckjHGY3jQ9nOp6PBHvI9ZHdjoO", // 百度的地图密钥
        };
      },
      methods: {
        handleLicensePreview(file) {
          console.log(file);
          this.file = file
          this.image.imageUrl = URL.createObjectURL(file.raw);
        },
        uploadAvatar(){
          console.log('11111111111111111');
          if(!this.image.imageUrl && !this.file){
            this.$message.error('请先选择图片');
            return false;
          }
          let formData=new FormData()
          formData.append('file',this.file.raw)
          formData.append('userInfo',JSON.stringify(this.userInfo))
          if(formData)
            updateAvatar(formData).then(res=>{
              if(res.data.code === 200){
                let user = JSON.parse(localStorage.getItem('user'))
                user.user_avatar = res.data.url
                localStorage.setItem('user',JSON.stringify(user))
              }
            })
        },
  
      },
      mounted() {
      }
  }
  </script>
  
  <style lang="less" scoped>
      .strategy{
        margin-top: 180px;
      .avatar-uploader{
          width: 180px;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border-color: #409EFF;
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
        }
      }
  </style>