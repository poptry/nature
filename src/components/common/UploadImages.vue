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
    ref="upload"
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
    <button class="submitImage" @click="confirmUpload">确认上传</button>
  </div>
</template>

<script>
import {uploadAlbum} from '@/api'
import { mapGetters,mapMutations } from 'vuex'
import { Loading } from 'element-ui';
export default {
    data(){
        return{
            dialogImageUrl: '',
            dialogImagePreview: false,
            fileList: [],
            photoDescribe:'',
            user_id:Number,
            isJPG:true,
            isLt2M:true
        }
    }, 
    computed:{
        ...mapGetters('circle',['getNowCircleNav','showIssueDialogState']),
    },
    methods:{
        ...mapMutations('circle',['changeIssueDialogState']),
        //确认上传
        confirmUpload(){
            let LoadingInstance = Loading.service();
            let obj = {
                user_id:this.user_id,
                circle_id:this.getNowCircleNav,
                album_describe:this.photoDescribe,
                album_url:[]
            }
            let formData = new FormData();
            formData.append('albumInfo',JSON.stringify(obj))
            this.fileList.forEach((item,index)=>{
                // console.log(item.raw.type);
                if(item.raw.type!='image/jpeg'){
                    this.isJPG = false
                }
                if(item.raw.size / 1024 / 1024 > 20){
                    this.isLt2M = false
                }
                formData.append('file',item.raw)
            })
            if(!this.isJPG){
                this.$message.error('上传图片只能是 JPG 格式!');
                LoadingInstance.close()
                this.isJPG = true
                return false
            }
            if(!this.isLt2M){
                this.$message.error('上传头像图片大小不能超过 20MB!');
                this.isLt2M = true
                LoadingInstance.close()
                return false
            }
            uploadAlbum(formData).then(res=>{
                if(res.data.code == 200){
                    LoadingInstance.close()
                    //成功提示
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    //重新获取相册
                    this.$emit('resetAlbum')
                    //关闭弹窗
                    this.changeIssueDialogState(false)
                    //清空数据
                    this.photoDescribe = ''
                    this.fileList = []
                    this.$refs.upload.clearFiles()
                }else{
                    LoadingInstance.close()
                }
            })
        },
        handleRemove(file, fileList) {
            this.fileList.pop()
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogImagePreview = true;
        },
        changeList(file){
            this.fileList.push(file)
        }
    },
    created(){
        this.user_id = JSON.parse(localStorage.getItem('user')).user_id
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