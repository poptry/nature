<template>
    <el-container class="circle-container">
        <my-aside></my-aside>
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
        .el-main{
            padding: 0;
            height: 100%;
            &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
        }
    }
</style>