<template>
  <div class="seciality">
    <el-row>
        <h3>我的爱好</h3>
        <el-input
            resize="none"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="hobby">
            </el-input>
    </el-row>
    <el-row>
        <h3>我的特长</h3>
        <el-input
            resize="none"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="speciality">
        </el-input>
    </el-row>
  </div>
</template>

<script>
export default {
    data(){
        return{
            hobby:'',
            speciality:''
        }
    }
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