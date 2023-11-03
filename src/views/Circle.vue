<template>
    <el-container class="circle-container">
        <el-aside width="auto">
            <my-aside></my-aside>
        </el-aside>
        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import MyAside from '@/components/common/MyAside.vue';
export default {
    data(){
        return{

        }
    },
    components:{MyAside}
}
</script>

<style lang="less" scoped>
    .circle-container{
        margin-top: 80px;
        // height: 100%;
        .el-aside{
            height: calc(100vh - 80px);
        }
        .el-main{
            padding: 0;
        }
    }
</style>