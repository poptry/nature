<template>
    <div class="circle-inbox">
        <el-container>
            <div class="aside">
                <el-aside width="200px">
                    <common-aside></common-aside>
                </el-aside>
            </div>
            <el-container>
                <el-main>私信</el-main>
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
            overflow: hidden;
            .el-aside{
                width: 100%;
            }
        }
        .el-main{
            background-color: #f1f1f1;
        }
    }
</style>