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
                    <chat></chat>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from '@/components/common/CommonAside'
import Chat from '@/components/inbox/Chat.vue';
export default {
    data(){
        return{

        }
    },
    components:{
        CommonAside,
        Chat
    }
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
            height: 698px;
            min-height: calc(100vh - 80px);
            background-color: #f1f1f1;
            &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
        }
    }
</style>