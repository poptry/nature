<template>
    <div class="circle-home">
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
    .circle-home{
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