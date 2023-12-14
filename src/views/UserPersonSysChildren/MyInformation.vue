<template>
  <div class="information">
    <div class="left-container">
      <div class="myInfo-form animate__animated animate__fadeInLeft" :class="{'myInfo-form-white':!getTheme}">
        <ChangePhoto></ChangePhoto>
        <el-form  label-position="left" ref="form" :rules="rules" :model="myInfo" label-width="60px">
          <el-form-item label="名称" prop="user_name">
            <el-input @change="savePersonInfo = true" v-model="myInfo.user_name"></el-input>
          </el-form-item>
          <el-form-item label="标签" >
            <el-input type="textarea" resize="none" rows="5" maxlength="20" show-word-limit @change="savePersonInfo = true" v-model="myInfo.user_motto"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="user_sex">
            <el-select v-model="myInfo.user_sex">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄" prop="user_age">
            <el-input  @change="savePersonInfo = true" v-model="myInfo.user_age"></el-input>
          </el-form-item>
        </el-form>
        <el-row v-show="savePersonInfo" style=" display: flex;justify-content: center;">
          <button @click="saveInfoBtn" style="width: 50%;height: 40px;">保存信息</button>
        </el-row>
      </div>
    </div>
    <div class="right-container">
      <div class="wish animate__animated animate__fadeInRight" :class="{'wish-white':!getTheme}">
        <MyWish></MyWish>
      </div>
      <div class="speciality-hobby animate__animated animate__fadeInRight" :class="{'speciality-hobby-white':!getTheme}">
        <SepcialityHobby></SepcialityHobby>
      </div>
    </div>
  </div>
</template>

<script>
import ChangePhoto from '@/components/common/ChangePhoto.vue';
import MyWish from '@/components/common/MyWish.vue';
import SepcialityHobby from '@/components/common/SpecialityHobby.vue';
import {updateOther} from '@/api'
import { mapGetters,mapActions } from 'vuex';
export default {
  data(){
    return{
      myInfo:{},
      savePersonInfo:false,
      rules:{
        user_name:[
        { required: true, message: '必填', trigger: 'blur' },
        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }],
        user_sex:[
          { required: true, message: '必填', trigger: 'blur' },
        ],
        user_age:[
          { required: true, message: '必填', trigger: 'blur' },
        ],
      }
    }
  },
  components:{
    ChangePhoto,
    MyWish,
    SepcialityHobby
  },
  computed:{
    ...mapGetters('user',['getTheme'])
  },
  methods:{
    ...mapActions('user',['setUser']),
    async updateOthersInfo(obj){
      await updateOther(obj).then(res=>{
        if(res.data.res.code == 200){
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.savePersonInfo = false;
          this.setUser(obj.user_id)
        }
      })
    },
    saveInfoBtn(){
      //表单验证
      this.$refs.form.validate((valid) => {
        if (valid) {
          let {user_id,user_name,user_motto,user_sex,user_age,...others} = {...this.myInfo};
          const obj = {
            user_id,
            user_name,
            user_motto,
            user_age,
            user_sex
          }
          this.updateOthersInfo(obj)
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
  },
  created(){
    this.myInfo = JSON.parse(localStorage.getItem('user'))
    console.log(this.getTheme);
  },
}
</script>
<style lang="less" scoped>
    .information{
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        background: transparent;
        .left-container{
          width: 50%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          .myInfo-form{
            margin-top: 10px;
            width: 80%;
            height: 100%;
            border-radius: 20px;
            background: linear-gradient(145deg, #3a3a3a, #313131);
            box-shadow:  6px 6px 12px #222222,
                        -6px -6px 12px #4a4a4a;
            padding: 20px 60px 40px 60px;
            ::v-deep .el-form-item__label{
              color: aliceblue;
            }
          }
          .myInfo-form-white{
            background: #e0e0e0;
            box-shadow:  15px 15px 30px #a8a8a8,
                        -15px -15px 30px #ffffff;
            ::v-deep .el-form-item__label{
              color: rgb(46, 46, 46);
            }
          }
        }
        .right-container{
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          .wish{
            padding: 10px 20px;
            border-radius: 20px;
            box-shadow:  6px 6px 12px #222222,
                        -6px -6px 12px #4a4a4a;
            height: 50%;
            width: 100%;
            --color: #E1E1E1;
            background-color: #F3F3F3;
            background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent),
                linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent);
            background-size: 55px 55px;
          }
          .wish-white{
            background: #e0e0e0;
            box-shadow: inset 17px 17px 34px #c1c1c1,
                        inset -17px -17px 34px #ffffff;
          }
          .speciality-hobby{
            padding: 10px 20px;
            border-radius: 20px;
            box-shadow:  6px 6px 12px #222222,
                        -6px -6px 12px #4a4a4a;
            width: 100%;
            height: 30%;
            --color: #E1E1E1;
            background-color: #F3F3F3;
            background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent),
                linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%,transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%,transparent);
            background-size: 55px 55px;
          }
          .speciality-hobby-white{
            border-radius: 30px;
            background: #e0e0e0;
            box-shadow: inset 15px 15px 30px #c1c1c1,
                        inset -15px -15px 30px #ffffff;
          }
        }

    }
</style>