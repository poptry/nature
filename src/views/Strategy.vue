<template>
  <div class="strategy">
    <el-upload
      class="avatar-uploader"
      action="/api/user/updateAvatar"
      :data="userInfo"
      :show-file-list="false"
      name="file"
      :on-success="handleAvatarSuccess">
      <img v-if="image.imageUrl" :src="image.imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
      return {
        image:{
          imageUrl: '',
        },
        userInfo:JSON.parse(localStorage.getItem('user'))
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(res);
        if(res.code === 200){
          this.image.imageUrl = res.url
          let user = JSON.parse(localStorage.getItem('user'))
          user.user_avatar = res.url
          localStorage.setItem('user',JSON.stringify(user))
          console.log('写入了storage');
        }
      }
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