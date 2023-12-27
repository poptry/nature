<template>
    <div style="width: 100%;height: 100%; position: relative;">
        <div style="position: absolute;min-height: 100vh;width: 100%;height: 100%;top: 0;left: 0;bottom: 0;right: 0;z-index: -100;overflow: hidden;min-height: 100vh;">
           <video style="position: absolute;top:0;left:0;bottom: 0;right: 0;width: 100%;height: auto;min-height: 100vh;object-fit: cover;" autoplay loop muted src="@/assets/video/loginVideo.mp4"></video>
        </div>
        <section class="main">
            <div class="logo text-center animate__animated animate__bounceIn">
                <h1> <a href="index.html">E X P L O R E R 探 险 者 </a></h1>
            </div>
            <div v-show="!registerState" class="content-w3ls text-center animate__animated animate__zoomIn">
                <img src="@/assets/images/admin.png" alt="" class="img-responsive">
                    <div class="wthree-field">
                        <input name="text1" id="text1" type="text" v-model="userInfo.userId" value="" placeholder="账号/手机号" required>
                    </div>
                    <div class="wthree-field">
                        <input name="password" id="myInput" v-model="userInfo.userPwd" type="Password" placeholder="密码">
                    </div>
                    <div class="wthree-field">
                        <button @click="login" class="btn"> 登 录 </button>
                    </div>
                    <div class="login-bottom">
                        <a href="#" class="" @click="toRegister">注 册 新 用 户</a>
                    </div>
            </div>

            <!-- 注册 -->
            <div v-show="registerState" class="content-w3ls text-center  animate__animated animate__zoomIn">
                <div class="wthree-field">
                    <el-upload
                    class="avatar-uploader"
                    action="''"
                    :data="registerInfo"
                    :auto-upload="false"
                    :show-file-list="false"
                    name="file"
                    :on-change="handleLicensePreview"
                    >
                        <img style="width: 100px;height: 100px; padding: 0; margin: 0;border: 0;" v-if="image.imageUrl" :src="image.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <div class="wthree-field">
                    <input name="text1" type="text" v-model="registerInfo.user_name" value="" placeholder="名称" required>
                </div>
                <div class="wthree-field">
                    <input @blur="findUserPhone" name="text1" type="text" v-model="registerInfo.user_phone" value="" placeholder="手机号" required>
                </div>
                <div class="wthree-field">
                    <input name="text1" type="text" v-model="registerInfo.user_pwd" value="" placeholder="密码(长度大于6)" required>
                </div>
                <div class="wthree-field">
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <input style="width: 100%;" name="text1" type="text" v-model="registerInfo.user_code" value="" placeholder="验证码" required>
                        </el-col>
                        <el-col :span="6">
                            <button class="btn" :disabled="btndisabled" :class="{disabled:btndisabled}" @click="getCode" style="width: 100%;border-radius: 5px;"><span>{{ time }}</span></button>
                        </el-col>
                    </el-row>
                </div>
                <div class="wthree-field">
                    <button @click="newRegister" class="btn"> 注 册 </button>
                </div>
                <div class="login-bottom">
                    <a href="#" class="" @click="toRegister">去 登 录</a>
                </div>
            </div>
            <div class="copyright">
                <p> 期 待 您 加 入 探 险 者 @explorer</p>
            </div>
        </section>
    </div>

</template>

<script>
import ChangePhoto from '@/components/common/ChangePhoto.vue';
import { Loading } from 'element-ui';
import { login,sendCode,register,isRegister } from '@/api';
export default {
    name: 'Login',
    data() {
        return {
            userInfo: {
                userId: '',
                userPwd: ''
            },
            image:{
                imageUrl: '',
            },
            registerInfo:{
                user_name: '',
                user_pwd: '',
                user_phone: '',
                user_code: '',
                user_avatar:''
            },
            btndisabled:false,
            file:{},
            time:'获取',
            registerState:false,
            hasRegister:false
        }
    },
    components:{
        ChangePhoto
    },
    methods: {
        //查看手机号是否被注册
        findUserPhone(){
            isRegister({params:{phone:this.registerInfo.user_phone}}).then(res=>{
                if(res.data.length>0){
                    this.hasRegister = true
                    this.$notify.error({
                        title: '错误',
                        message: '该手机号已被注册过'
                    });
                }else{
                    this.hasRegister = false
                }
            })
        },
        login() {
            console.log(1234);
            let LoadingInstance = Loading.service();
            login({params:this.userInfo}).then((response)=>{
                console.log(response);
                if(response.status === 200){
                    this.$message.success("登录成功")
                    localStorage.setItem('user',JSON.stringify(response.data[0]))
                    this.$router.push('/')
                }
                LoadingInstance.close()
            }).catch(err=>{
                    console.log(err);
                })
        },
        handleLicensePreview(file) {
          this.file = file
          this.image.imageUrl = URL.createObjectURL(file.raw);
        },
        toRegister(){
            this.registerState = this.registerState?false:true;
        },
        newRegister(){
            if(!this.image.imageUrl && this.file){
                console.log(this.image.imageUrl,this.file);
                this.$message.error('请先选择图片');
                return false;
            }else if(!this.registerInfo.user_name){
                this.$message.error('请输入用户名');
                return false;
            }else if(!this.registerInfo.user_phone){
                this.$message.error('请输入手机号');
                return false;
            }else if(this.hasRegister){
                this.$message.error('手机号已被注册请重新更换');
                return false;
            }else if(!this.registerInfo.user_pwd){
                this.$message.error('请输入密码');
                return false;
            }else if(this.registerInfo.user_pwd.length<6){
                this.$message.error('密码长度不能小于6位');
                return false;

            }else if(!this.registerInfo.user_code){
                this.$message.error('请输入验证码');
                return false;
            }
            let LoadingInstance = Loading.service();
            let formData=new FormData()
            formData.append('file',this.file.raw)
            formData.append('registerInfo',JSON.stringify(this.registerInfo))
            if(formData)
                register(formData).then(res=>{
                    console.log(res);
                    if(res.data.code==501){
                        this.$message.error(res.data.msg);
                    }else if(res.data.code == 400){
                        this.$message.error(res.data.msg);
                    }else if(res.data.code == 200){
                        this.$message.success(res.data.msg);
                        //清空表单
                        this.registerInfo ={
                            user_name: '',
                            user_pwd: '',
                            user_phone: '',
                            user_code: '',
                            user_avatar:''
                        }
                        this.file = {}
                        this.image = {
                            imageUrl: '',
                        }
                    }
                    LoadingInstance.close()
                }).catch(err=>{
                    console.log(err);
                    LoadingInstance.close()
                })
        },
        async getCode(){
            //验证手机号格式
            if(!(/^1[3456789]\d{9}$/.test(this.registerInfo.user_phone))){
                this.$message.error('请输入正确的手机号');
                return false;
            }
            this.btndisabled = true
            let time = 60
            this.$message.success('验证码已发送');
            const timer = setInterval(()=>{
                time--
                this.time = time
                if(time === 0){
                    clearInterval(timer)
                    this.time = '获取'
                    this.btndisabled = false
                }
            },1000)
            const toPhone = {phone:this.registerInfo.user_phone}
            await sendCode(toPhone).then(res=>{
                if(res.data.code==200){
                    this.$message.success(res.data.message);
                }else{
                    this.$message.error(res.data.message);
                }
            })
        }
    },
}
</script>

<style scoped>
html {
    scroll-behavior: smooth;
}

body,
html {
    margin: 0;
    padding: 0;
    color: #585858;
}

* {
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
}
.d-grid {
    display: grid;
}
button,
input,
select {
    -webkit-appearance: none;
    outline: none;
}

button,
.btn,
select {
    cursor: pointer;
}

a {
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
    margin: 0;
    padding: 0;
}

body {
    background: #f1f1f1;
    margin: 0;
    padding: 0;
}

form,
fieldset {
    border: 0;
    padding: 0;
    margin: 0;
}

body a:hover {
    text-decoration: none;
}

.clearfix {
    clear: both;
}
.avatar-uploader{
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 0 auto;
}
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
/* content */

/*
  Responsive form elements
  Flexbox layout
*/

/*/////////////// GLOBAL STYLES ////////////////////*/

body {
    font-family: 'Noto Sans JP', sans-serif;
}
    /*background: url('@/assets/images/bg.jpg') no-repeat bottom;*/
.main {
    /* background-size: cover;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    -ms-background-size: cover; */
    min-height: 100vh;
    height: 100%;
    width: 100%;
    /* padding: 2em 0; */
    position: relative;
    z-index: 1;
    justify-content: center;
    display: grid;
    align-items: center;
}
.main:before {
    position: absolute;
    content:'';
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: -1;
}
.text-center {
    text-align: center;
}

/*/////////////// FONT STYLES ////////////////////*/

.content-w3ls {
    margin: 2em auto;
    padding: 2em 2em;
}
.content-w3ls img{
    margin-bottom: 2em;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border: 4px solid rgb(255 255 255 / 9%);
    display: inline-block;
    width: 64px;
    height: 64px;
    background: #fff;
    border-radius: 50%;
    padding: 14px;
}
.logo h1 a {
    font-size: 42px;
    color: #fff;
    text-transform: capitalize;
    font-weight: 700;
}
/*/////////////// FORM STYLES ////////////////////*/
.wthree-field {
    margin-bottom:14px;
    width: 300px;
}
.wthree-field input {
    padding: 14px 30px;
    font-size: 16px;
    color: #999;
    letter-spacing: 0.5px;
    border: 1px solid #e1e1e1;
    background: #fff;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
    width: 100%;
    border-radius: 35px;
    -webkit-border-radius: 35px;
    -moz-border-radius: 35px;
    -ms-border-radius: 35px;
    -o-border-radius: 35px;
}

::-webkit-input-placeholder { /* Edge */
    color: #999;
  }
  
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color:  #999;
  }
  
  ::placeholder {
    color: #999;
  }

.wthree-field button.btn {
    background: #EA4C89;
    border: none;
    color: #fff;
    padding: 14px 14px;
    text-transform: uppercase;
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 16px;
	width:100%;
    letter-spacing:1px;
    outline: none;
    cursor: pointer;
    transition: 0.5s all;
    -webkit-transition: 0.5s all;
    -moz-transition: 0.5s all;
    -o-transition: 0.5s all;
    -ms-transition: 0.5s all;
    border-radius: 35px;
	-webkit-border-radius: 35px;
	-moz-border-radius: 35px;
	-ms-border-radius: 35px;
    -o-border-radius: 35px;

}
.wthree-field button.btn:hover {
    background:#de3d7b;
}
.login-bottom {
    margin-top:3em;
}
.login-bottom a {
    font-size: 16px;
    color: #fff;
    font-weight: normal;
    letter-spacing: 1px;
    padding: 0 5px;
    text-transform: capitalize;
}

.copyright {
    padding: 0 20px;
}
.copyright p {

    color: #fff;
    font-size: 16px;
    line-height: 26px;
    text-align: center;
    letter-spacing: 1px;

}
.copyright p a {
    color: #fff;
}
.copyright p a:hover,.login-bottom a:hover {
    color:#EA4C89;
}
.wthree-field button.disabled{
    cursor: not-allowed;
}
/* -- Responsive code -- */
@media screen and (max-width: 1280px) {
}
@media screen and (max-width: 1080px) {
}
@media screen and (max-width: 900px) {
}
@media screen and (max-width: 800px) {
}
@media screen and (max-width: 768px) {
	.logo h1 a {
		font-size: 30px;
	}
}
@media screen and (max-width: 668px) {

}
@media screen and (max-width: 600px) {
}
@media screen and (max-width: 568px) {
}

@media screen and (max-width: 480px) {
    
}

@media screen and (max-width: 415px) {
	.logo {
		margin-bottom: 10px;
    }
    .content-w3ls {
        padding: 2em 2em;
    }
}

@media screen and (max-width: 384px) {
    .content-w3ls {
        padding: 1em 1em;
        margin: 1em auto;
    }
    .copyright p {
        letter-spacing: .5px;
    }
}

@media screen and (max-width: 375px) {
    
}
@media screen and (max-width: 320px) {
    
}

/* -- //Responsive code -- */
</style>