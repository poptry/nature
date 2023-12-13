<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      text-color="var(--fontColor-m)"
      background-color="#f1f1f1"
      :collapse="isCollapse">
      <el-menu-item >
        <div class="person">
          <el-avatar v-if="avatar"  slot="reference" :src="avatar"></el-avatar>
          <i  @click="isCollapse = !isCollapse" class="iconfont icon-caidan-dakai openAndClose"></i>
        </div>
      </el-menu-item>

      <el-menu-item 
      v-for="nav in navList" 
      @click="clickNavItem(nav)" 
      :key="nav.id"
      :class="{navActive:($route.path.includes(nav.path))}"
      :index="nav.id">
        <i :class="nav.icon" class="nav-icon"></i>
        <span slot="title" v-text="nav.name"></span>
      </el-menu-item>
    </el-menu>
    <!-- 新建圈子的弹窗 -->
    <el-dialog
      title="创建我的圈子"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :rules="rules" :model="createCircleInfo" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="名称" prop="circle_name">
              <el-input v-model="createCircleInfo.circle_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市">
              <el-input disabled v-model="createCircleInfo.circle_city"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="简介"  prop="circle_profile">
              <el-input maxlength="20" show-word-limit v-model="createCircleInfo.circle_profile" resize="none"  type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="circle_type">
              <el-select v-model="createCircleInfo.circle_type"  placeholder="类型">
                <el-option label="校园" value="2"></el-option>
                <el-option label="爱好" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="封面图">
              <el-upload
              class="avatar-uploader"
              action="''"
              :auto-upload="false"
              :show-file-list="false"
              name="file"
              :on-change="coverPreview"
            >
              <img v-if="image.coverUrl" :src="image.coverUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="圈子头像">
              <el-upload
              class="avatar-uploader"
              action="''"
              :auto-upload="false"
              :show-file-list="false"
              name="file2"
              :on-change="headPreview"
            >
              <img v-if="image.headUrl" :src="image.headUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="btnRow">
        <button @click="submitCreateCircle" class="submitCreate">
          确认
        </button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {createMyCircle} from  '@/api'
import { mapState,mapMutations } from 'vuex';
export default {
  data(){
    return{
      isCollapse:true,
      dialogVisible:false,
      image:{
        coverUrl: '',
        headUrl:''
      },
      userInfo:'',
      avatar:'',
      createCircleInfo:{
        circle_name:'',
        circle_city:'',
        circle_profile:'',
        circle_type:'',
        circle_owner:'',
      },
      rules: {
        circle_name: [{ required: true, message: '请输入圈子名称', trigger: 'blur' }],
        circle_type: [{ required: true, message: '请选择圈子类型', trigger: 'change' }],
      },
      file:{},
      file2:{},
      navList:[
        {
            id:'0',
            path:'/circle/circlehome',
            name:'首页',
            icon:'el-icon-house'
        },
        {
            id:'1',
            path:'/circle/inbox',
            name:'私信',
            icon:'el-icon-message'
        },
        {
            id:'2',
            path:'/circle/myjoincircle',
            name:'圈子',
            icon:'el-icon-s-custom'
        },
        {
          id:'3',
          name:"创建圈子",
          icon:'el-icon-plus'
        }
      ]
    }
  },
  methods:{
    ...mapMutations('nav',{
      changeCommonAside:'changeCommonAside',
    }),
    //确认创建圈子
    async submitCreateCircle(){
      //验证表单
      await this.$refs['form'].validate((valid) => {
        if(valid){
          //表单验证成功，进入加载状态
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          //定义一个变量用来存储请求参数
          const data =this.createCircleInfo
          //获取用户id，然后加入到参数对象中，作为圈主的id
          data.circle_owner = this.userInfo.user_id
          //没有图片的话，提示
          if(!this.image.coverUrl && !this.image.headUrl && this.file && this.file2){
            console.log(this.image,this.file);
            this.$message.error('请先选择图片');
            return false;
          }
        //表单格式传给服务器
          let formData=new FormData()
          formData.append('file',this.file.raw)
          formData.append('file2',this.file2.raw)
          formData.append('createCircleInfo',JSON.stringify(this.createCircleInfo))
          if(formData){
            createMyCircle(formData).then(res=>{
              if(res.data.res.code === 200){
                //关闭加载
                loading.close();
                //提示
                this.$message.success(`${res.data.res.msg}`)
                //关闭弹窗
                this.dialogVisible = false
                //重置表单
                this.$refs['form'].resetFields();
                this.image = {coverUrl: '',headUrl:''}
              }else{
                this.$message.error(`${res.data.res.msg}`)
              }
            })
          }
        }
      })
    },
    //预览
    coverPreview(file) {
      this.file2 = file
      this.image.coverUrl = URL.createObjectURL(file.raw);
    },
    headPreview(file){
      this.file = file
      this.image.headUrl = URL.createObjectURL(file.raw);
    },
    //关闭
    handleClose(){
      this.dialogVisible = false
    },
    //导航点击事件
    clickNavItem(nav){
      if(nav.id === '3'){
        this.dialogVisible = true
        return
      }
      this.changeCommonAside(nav.id)
      this.$router.push(nav.path).catch(erro=>{
      })
    }
  },
  created(){
    this.userInfo = JSON.parse(localStorage.getItem('user'))
    this.createCircleInfo.circle_city = sessionStorage.getItem('city')
    this.avatar = this.userInfo ? this.userInfo.user_avatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.pSYrBZuWAziwSL4d7H9-UAAAAA?w=206&h=206&c=7&r=0&o=5&dpr=2&pid=1.7'
  }
}
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo{
    // https://zhuanlan.zhihu.com/p/374142549
    &:not(.el-menu--collapse) {
      width: 200px;
      height: 100%;
    }
      .person{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
          .openAndClose{
            font-size: 24px;
          }
      }
      .el-menu-item {
        .nav-icon{
          font-size: 20px;
        }
      }
      .navActive{
        background-color: #ffffff !important;
        color: #000;
        i{
          color: #000;
        }
      }
 
  }
  .el-menu--collapse{
    width: 60px;
    height: 100%;
  }
  ::v-deep .el-dialog{
    background: linear-gradient(145deg, #e6e1e1, #ffffff);
    border-radius: 5px;
    .btnRow{
      margin: 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .submitCreate{
      width: 50%;
      margin: 0 auto;
      color: #090909;
      padding: 0.7em 1.7em;
      font-size: 18px;
      border-radius: 0.5em;
      background: #e8e8e8;
      border: 1px solid #e8e8e8;
      transition: all .3s;
      box-shadow: 6px 6px 12px #c5c5c5,
                -6px -6px 12px #ffffff;
      &:hover{
        border: 1px solid white;
      }
      &:active {
        box-shadow: 4px 4px 12px #c5c5c5,
                  -4px -4px 12px #ffffff;
      }
    }
  }
  .avatar-uploader{
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
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
</style>