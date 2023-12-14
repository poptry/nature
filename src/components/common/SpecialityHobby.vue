<template>
  <div class="seciality">
    <el-row>
        <h3>我的爱好</h3>
        <el-input
            @change="updateUserHobby"
            resize="none"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            :maxlength="50"
            :show-word-limit="true"
            v-model="hobby">
            </el-input>
    </el-row>
    <el-row>
        <h3>我的特长</h3>
        <el-input
            @change="updateUserHobby"
            resize="none"
            type="textarea"
            :rows="2"
            :maxlength="50"
            :show-word-limit="true"
            placeholder="请输入内容"
            v-model="speciality">
        </el-input>
    </el-row>
  </div>
</template>

<script>
import {updateUserHobby} from '@/api'
import { mapActions,mapGetters } from 'vuex'

export default {
    data(){
        return{
            hobby:'',
            speciality:'',
            user_id:''
        }
    },
    computed:{
        ...mapGetters('user',['getUser'])
    },
    methods:{
        ...mapActions('user',['setUser']),
        updateUserHobby(){
            const data = {
                user_id: this.user_id,
                user_hobby: this.hobby,
                user_speciality: this.speciality
            }
            updateUserHobby(data).then(res=>{
                console.log(res);
                if(res.data.res.code === 200){
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    //更新本地
                    this.setUser(this.user_id)
                }
            })
        }
    },
    created(){
        const user = JSON.parse(localStorage.getItem('user'))
        this.user_id = user.user_id
        this.hobby = user.user_hobby
        this.speciality = user.user_speciality
    },
}
</script>

<style lang="less" scoped>
    .seciality{
        color: rgba(0, 0, 0, 0.7);
        .el-row{
            width: 100%;
        }
    }
</style>