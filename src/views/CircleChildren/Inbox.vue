<template>
    <div class="circle-inbox">
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
    components:{CommonAside}
}
</script>
<style lang="less" scoped>
    .circle-inbox{
        .aside{
            width: 100%;
            max-width: 200px;
            .el-aside{
                width: 100%;
                height: 100%;
            }
        }
        .el-main{
            min-height: calc(100vh - 80px);
            background-color: #f1f1f1;
        }
    }
</style>