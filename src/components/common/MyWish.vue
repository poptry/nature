<template>
  <div class="container">
    <el-row>
        <h3>最近在做的一件事...</h3>
        <el-input
        @change="submit"
        resize="none"
        type="textarea"
        :rows="3"
        :maxlength="200"
        :show-word-limit="true"
        placeholder="请输入内容"
        v-model="Doing">
        </el-input>
    </el-row>
    <el-row>
        <h1>目前最想做的事情...</h1>
        <el-input
        resize="none"
        @change="submit"
        type="textarea"
        :rows="3"
        :maxlength="200"
        :show-word-limit="true"
        placeholder="请输入内容"
        v-model="wantTODO">
        </el-input>
    </el-row>
    <el-row>
        <h1>今年想要去的地方...</h1>
        <el-input
        resize="none"
        @change="submit"
        type="textarea"
        :rows="3"
        :maxlength="200"
        :show-word-limit="true"
        placeholder="请输入内容"
        v-model="wantTOGO">
        </el-input>
    </el-row>

  </div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import {updateUserWantInfo} from '@/api'
export default {
    data(){
        return{
            user_id:'',
            Doing:'',
            wantTODO:'',
            wantTOGO:'',
        }
    },
    computed:{
        ...mapGetters('user',['user_theme'])
    },
    methods:{
        ...mapActions('user',['setUser']),
        submit(){
            const data ={
                user_id:JSON.parse(localStorage.getItem('user')).user_id,
                user_doing:this.Doing,
                user_wantto_do:this.wantTODO,
                user_wantto_go:this.wantTOGO
            }
            //更新用户信息
            updateUserWantInfo(data).then(res=>{
                if(res.data.code === 200){
                    //更新本地存储
                    this.setUser(this.user_id)
                    this.$message.success("保存成功")
                }
            })
        }
    },
    created(){
        // 从本地存储中获取用户信息
        const user = JSON.parse(localStorage.getItem('user'))
        this.user_id = user.user_id
        this.Doing = user.user_doing
        this.wantTODO = user.user_wantto_do
        this.wantTOGO = user.user_wantto_go
    }
}
</script>
<style lang="less" scoped>
    .container{
        color: rgba(0, 0, 0, 0.7);
        .el-row{
            ::v-deep .el-input__inner{
                outline: #e3e3e3;
                &:focus{
                    border: #e3e3e3;
                }
            }
        }
    }
</style>