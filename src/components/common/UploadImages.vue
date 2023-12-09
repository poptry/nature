<template>
  <div class="container">
    <span class="title">描述</span>
    <el-input 
        maxlength="100"
        v-model="photoDescribe"
        show-word-limit 
        resize="none" 
        class="photo-describe" 
        type="textarea" 
        :rows="4" 
        placeholder="请您讲讲照片背后的故事...">
    </el-input>
    <span class="title">选择相片({{fileList.length}}/9)</span>
    <el-upload
    action="''"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :auto-upload="false"
    :limit="9"
    multiple
    :onChange="changeList"
    :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog 
    :visible.sync="dialogImagePreview"
    top="10vh"
    :modal="false">
        <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <button class="submitImage">确认上传</button>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dialogImageUrl: '',
            dialogImagePreview: false,
            fileList: [],
            photoDescribe:''
        }
    },  
    methods:{
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogImagePreview = true;
        },
        changeList(file){
            this.fileList.push(file)
            console.log(this.fileList);
        }
    }
}
</script>
<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        .title{
            display: block;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .photo-describe{
            margin-bottom: 20px;
        }
        .submitImage{
            width: 100%;
            height: 40px;
            background-color: #69b2fc;
            border: none;
            color: #fff;
            font-size: 16px;
            margin-top: 20px;
            transition: all 0.3s ease-in-out;
            border-radius: 5px;
            &:hover{
                cursor: pointer;
                background-color: #2f97ff;
            }
        }
    }
</style>