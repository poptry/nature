<template>
  <div class="information">
    <div class="left-container">
      <div class="myInfo-form animate__animated animate__fadeInLeft">
        <ChangePhoto></ChangePhoto>
        <el-form  label-position="left" ref="form" :model="myInfo" label-width="40px">
          <el-form-item label="名称">
            <el-input @change="savePersonInfo = true" v-model="myInfo.user_name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input  @change="savePersonInfo = true" v-model="myInfo.user_address"></el-input>
          </el-form-item>
          <el-form-item label="城市">
            <el-input v-model="myInfo.user_city"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input  @change="savePersonInfo = true" v-model="myInfo.user_sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input  @change="savePersonInfo = true" v-model="myInfo.user_age"></el-input>
          </el-form-item>
        </el-form>
        <el-row v-show="savePersonInfo" style=" display: flex;justify-content: center;">
          <button style="width: 50%;height: 40px;">保存信息</button>
        </el-row>
      </div>
    </div>
    <div class="right-container">
      <div class="wish animate__animated animate__fadeInRight">
        <MyWish></MyWish>
      </div>
      <div class="speciality-hobby animate__animated animate__fadeInRight">
        <SepcialityHobby></SepcialityHobby>
      </div>
    </div>
  </div>
</template>

<script>
import ChangePhoto from '@/components/common/ChangePhoto.vue';
import MyWish from '@/components/common/MyWish.vue';
import SepcialityHobby from '@/components/common/SpecialityHobby.vue';
export default {
  data(){
    return{
      myInfo:{},
      savePersonInfo:false
    }
  },
  components:{
    ChangePhoto,
    MyWish,
    SepcialityHobby
  },
  created(){
    this.myInfo = JSON.parse(localStorage.getItem('user'))
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
            padding: 20px 80px 40px 80px;
            ::v-deep .el-form-item__label{
              color: aliceblue;
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
        }

    }
</style>