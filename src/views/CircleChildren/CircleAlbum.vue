<template>
  <div class="container">
    <div class="show-part">
        <!-- 圈子中的每一条相册 -->
        <div class="item" v-for="(item,index) in albumList" :key="index">
            <div class="user">
                <el-image lazy fit="cover" :src="item.user_avatar" style="width: 40px;height: 40px;border-radius: 50%;" alt=""></el-image>

                <!-- <el-avatar size="large" :src="item.user_avatar"></el-avatar> -->
                <div class="text">
                    <span>{{item.user_name}}</span>
                    <span class="time">{{item.album_timestamp}}</span>
                </div>
            </div>
            <div style="margin: 5px;">
                <p>{{ item.album_describe }}</p>
            </div>
            <div class="album">
                <div class="image-item" v-for="a,index in item.album_url" :key="index">
                    <el-image
                        :src="a"
                        fit="cover"
                        :preview-src-list="[a]"
                        class="image"
                        lazy>
                    </el-image>
                </div>
            </div>
            <div class="interaction">
                <!-- <div class="like">
                    <el-button type="text" icon="el-icon-thumb" size="small">点赞</el-button>
                </div>
                <div class="comment">
                    <el-button type="text" icon="el-icon-chat-dot-round" size="small">评论</el-button>
                </div> -->
            </div>
        </div>
        <!-- 圈子中的每一条相册结束 --> 
    </div>
    <!-- 上传相册的弹窗 -->
    <el-dialog
    title="上传相册"
    :visible.sync="showIssueDialogState"
    width="60%"
    :before-close="handleClose">
        <UploadImagesVue @resetAlbum="getAlbums"></UploadImagesVue>
    </el-dialog>
    <!-- 上传相册的弹窗结束 -->
  </div>
</template>

<script>
import { mapMutations,mapGetters } from 'vuex';
import { getTime } from '@/util/index';
import {getAlbums} from '@/api'
import UploadImagesVue from '@/components/common/UploadImages.vue';

export default {
    data(){
        return{
            albumList:[],
            dialogVisible: false,
            dialogImagePreview: false,
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    components:{UploadImagesVue},
    computed:{
        ...mapGetters('circle',['showIssueDialogState','getNowCircleNav'])
    },
    methods:{
        ...mapMutations("nav",['changeIssue']),
        //改变上传窗口的mutation函数
        ...mapMutations("circle",['changeIssueDialogState']),

        handleClose(done) {
            //关闭前，将上传窗口的状态改变
            this.changeIssueDialogState(false)
        },
        //获取相册
        async getAlbums(){
            const user_id = JSON.parse(localStorage.getItem("user")).user_id
            await getAlbums({params:{circle_id:this.getNowCircleNav,user_id:user_id}}).then(res=>{
                let arr = res.data
                arr.forEach(item=>{
                    //转换时间
                    item.album_timestamp = getTime(item.album_timestamp)
                })
                this.albumList = arr
            })
        }
    },
    activated(){
        //组件活跃时显示上传按钮
        this.changeIssue(true)
        this.getAlbums()
    },
    deactivated(){
        //组件不活跃时，隐藏上传按钮
        this.changeIssue(false)
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        .show-part{
            width: 100%;
            height:100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding: 20px;
            overflow-y:scroll;
            user-select: none;
            &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
            .item{
                width: 100%;
                background-color: #f7f7f7;
                padding: 20px;
                border-bottom: 1px solid #b8b8b8;
                .user{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    .text{
                        margin-left: 10px;
                        display: flex;
                        flex-direction: column;
                        .time{
                            font-size: 12px;
                            color: #1b1b1b;
                        }
                    }
                
                }
                .album{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    align-items: center;
                    .image-item{
                        width: 30%;
                        height: 100%;
                        margin:5px calc(10%/3/2);
                        .el-image{
                            width: 100%;
                            height: 200px;
                        }
                    }
                }
                .interaction{
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    .like{
                        margin-right: 10px;
                    }
                }
            }
        }

    }
</style>