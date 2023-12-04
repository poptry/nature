<template>
    <div class="circle-myjoin">
        <el-container>
            <div class="aside">
                <el-aside width="200px">
                    <common-aside></common-aside>
                </el-aside>
            </div>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from '@/components/common/CommonAside'
export default {
    data(){
        return{

        }
    },
    components:{
        CommonAside,
    }
}
</script>
<style lang="less" scoped>
    .circle-myjoin{
        .aside{
            width: 100%;
            max-width: 200px;
            .el-aside{
                width: 100%;
                height: 100%;
            }
        }
        .el-main{
            height: 698px;
            min-height: calc(100vh - 80px);
            // background-color: #f1f1f1;
            background: url('@/assets/images/pexels-arthouse-studio-4338015.jpg') no-repeat center/cover;
            &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
        }
    }
</style>