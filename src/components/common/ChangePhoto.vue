<template>
    <div class="strategy">
      <div class="change-photo-zoom">
        <el-upload
          class="avatar-uploader"
          :class="{'avatar-uploader-white':!getTheme}"
          action="''"
          :data="userInfo"
          :auto-upload="false"
          :show-file-list="false"
          name="file"
          :on-change="handleLicensePreview"
        >
          <img v-if="image.imageUrl" :src="image.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <button class="btn" @click="uploadAvatar">保存头像</button>
      </div>

    </div>
  </template>
  
  <script>
  import {updateAvatar} from '@/api'
  import { mapGetters } from 'vuex';
  export default {
    data() {
        return {
          image:{
            imageUrl: '',
          },
          file:{},
          userInfo:JSON.parse(localStorage.getItem('user')),
        };
      },
      computed:{
        ...mapGetters('user',['getTheme'])
      },
      methods: {
        handleLicensePreview(file) {
          this.file = file
          this.image.imageUrl = URL.createObjectURL(file.raw);
        },
        uploadAvatar(){
          if(!this.image.imageUrl && this.file){
            console.log(this.image.imageUrl,this.file);
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
                this.$message.success('更换头像成功');
                this.image.imageUrl = ''
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
        width: 100%;
        padding: 20px;
        .change-photo-zoom{
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .avatar-uploader{
            width: 100px;
            height: 100px;
            border: 1px dashed #d9d9d9;
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            .avatar {
              width: 100px;
              height: 100px;
              display: block;
            }

            .avatar-uploader-icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 28px;
              color: #8c939d;
              width: 80px;
              height: 80px;
              line-height: 80px;
              text-align: center;
            }
          }
          .avatar-uploader-white{
            border: 1px dashed #3b3b3b;
          }
          .btn {
              width: 100px;
              height: 40px;
              border: 3px solid #121212;
              border-radius: 5px;
              transition: all 0.3s;
              cursor: pointer;
              font-size: 1em;
              font-weight: 400;
              font-family: 'Montserrat', sans-serif;
              &:hover {
                background: #4e4c4c;
                color: white;
                font-size: 1.1em;
              }
            }
        }
      }
  </style>