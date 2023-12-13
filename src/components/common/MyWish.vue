<template>
  <div class="container">
    <el-row>
        <h3>最近在做的一件事...</h3>
        <el-input
        @change="submit"
        resize="none"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="Doing">
        </el-input>
    </el-row>
    <el-row>
        <h1>目前最想做的事情...</h1>
        <el-input
        resize="none"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="wantTODO">
        </el-input>
    </el-row>
    <el-row>
        <h1>今年想要去的地方...</h1>
        <el-input
        resize="none"
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="wantTOGO">
        </el-input>
    </el-row>

  </div>
</template>

<script>
export default {
    data(){
        return{
            Doing:'',
            wantTODO:'',
            wantTOGO:'',
        }
    },
    methods:{
        submit(){
            this.$message.success("保存成功")
        }
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