<template>
    <div class="circle-detail-container" :style="`--bagckground-color: rgba(231, 231, 231,`+transparency/100+`);`">
        <el-row :gutter="0">
            <el-col :span="20">
                <div class="right-content">
                    <!-- 顶部导航 -->
                    <div class="top">
                        <i @click="$router.push('myCircleDetailChat').catch(err=>err)" class="iconfont icon-qunliao"></i>
                        <i @click="clickAlbum" class="iconfont icon-planetspacefl"></i>
                        <i v-show="showIssueBtn" @click="clickIssue" class="iconfont icon-fabu"></i>
                        <i @click="dialogVisible=!dialogVisible" class="iconfont icon-shezhi"></i>
                    </div>
                    <!-- 顶部导航 -->
                    <!-- <MyCircleDetailChat></MyCircleDetailChat> -->
                    <!-- 展示内容 -->
                    <div class="content">
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                    </div>
                    <!-- 展示内容结束 -->
                </div>
            </el-col>
            <el-col :span="4">
                <div class="left-member">
                    <CircleMembersVue></CircleMembersVue>
                </div>
            </el-col>
        </el-row>
        <el-dialog
        title="设置"
        :visible.sync="dialogVisible"
        top="30vh"
        :before-close="beforeCloseDialog"
        width="30%">
            <span>背景透明度</span>
            <el-row style="margin-top: 10px;">
                <el-col :span="18">
                    <el-progress :stroke-width="10" :percentage="transparency"></el-progress>
                </el-col>
                <el-col :span="6">
                    <el-button-group>
                        <el-button size="small" icon="el-icon-minus" @click="transparency > 0 ? transparency -= 10 : 0"></el-button>
                        <el-button size="small" icon="el-icon-plus" @click="transparency < 100 ? transparency += 10 : 100"></el-button>
                    </el-button-group>
                </el-col>
            </el-row>
            <el-row>
                <button @click="existCircle" style="border: 0;border-radius: 5px;color: white;background-color: #40afff;padding: 10px;">退出圈子</button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import CircleMembersVue from '@/components/circle-myjoin/CircleMembers.vue';
import MyCircleDetailChat from './MyCircleDetailChat.vue';
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex';
export default {
    data(){
        return{
            issue:true,
            circle_id:'',
            inputMsg:'',
            chatList:[],
            transparency:Number,
            dialogVisible:false,
            routerState:true
        }
    },
    components:{
        MyCircleDetailChat,
        CircleMembersVue
    },
    computed:{
        ...mapState("nav",['showIssueBtn']),
        ...mapGetters("circle",['getNowCircleNav','getTransparency']),
    },
    watch:{
        getNowCircleNav(newVal){
            //每点击一次别的圈子，就会触发这个watch
            this.circle_id = newVal
            //根据新的圈子id，获取圈子成员
            this.setCircleMembers(newVal)
            //根据新的圈子id，获取圈主信息
            this.setCircleOwner(newVal)
        }
    },
    methods:{
        ...mapMutations("circle",['setTransparency','changeIssueDialogState']),
        ...mapActions("circle",['setCircleMembers','setCircleOwner','quitMyCircle']),
        sendMsg(){
            console.log(this.inputMsg);
        },
        //existCircle
        existCircle(){
            this.$confirm('确认退出圈子?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    const user_id = JSON.parse(localStorage.getItem('user')).user_id
                    this.quitMyCircle({user_id,circle_id:this.circle_id})
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //关闭设置弹窗前
        beforeCloseDialog(){
            //提交透明度修改
            this.setTransparency(this.transparency)
            //关闭弹窗
            this.dialogVisible = false
        },
        //点击动态按钮，跳转
        clickAlbum(){
            this.$router.push('circleAlbum').catch(err=>err)
        },
        //点击图标，改变上传窗口的状态
        clickIssue(){
            this.changeIssueDialogState(true)
        }
    },
    created(){
        //第一次进入手动赋值
        this.circle_id = this.getNowCircleNav
        console.log("第一次进入",this.circle_id,this.getNowCircleNav);
        //因为第一次进入时，circle_id没有变化，所以第一次进入需要请求一次圈子成员和圈主
        this.setCircleMembers(this.getNowCircleNav)
        this.setCircleOwner(this.getNowCircleNav)
        //获取透明度赋值
        this.transparency = this.getTransparency
    }
}
</script>

<style lang="less" scoped>
    .circle-detail-container{
        width: 100%;
        height: 100%;
        .el-row{
            height: 100%;
            .el-col{
                height: 100%;
            }
        }
        .right-content{
            width: 100%;
            height: 100%;
            background-color: var(--bagckground-color);
            border:1px solid #b8b8b8;
            .top{
                position: relative;
                width: 100%;
                height: 8%;
                border-bottom: 1px solid #eaeaea;
                .iconfont{
                    position: absolute;
                    font-size: 24px;
                    color: #ffffff;
                    top: 50%;
                    transform: translate(0,-50%);
                    transition: all .5s;
                    &:hover{
                        cursor: pointer;
                        font-size: 30px;
                    }
                }
                .icon-planetspacefl{
                    left: 2%;
                }
                .icon-qunliao{
                    left: 8%;
                }
                .icon-fabu{
                    right: 11%;
                }
                .icon-shezhi{
                    right: 5%;
                }
            }
            .content{
                height: 92%;
            }
        }
        .left-member{
            width: 100%;
            height: 100%;
            background-color:var(--bagckground-color);
        }
    }
</style>