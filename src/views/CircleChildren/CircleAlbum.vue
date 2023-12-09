<template>
  <div class="container">
    <el-button class="uploadAlbum" @click="dialogVisible=true">上传相册</el-button>
    <div class="show-part">
        <!-- 圈子中的每一条相册 -->
        <div class="item">
            <div class="user">
                <el-avatar size="large" src="https://ts1.cn.mm.bing.net/th?id=OIP-C.ZtrvDWpDrJNiyRQj6DwPvwAAAA&w=116&h=130&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"></el-avatar>
                <div class="text">
                    <span>用户名</span>
                    <span class="time">2023-3-10-10:00:30</span>
                </div>
            </div>
            <div class="album">
                <div class="image-item" v-for="a,index in albumList" :key="index">
                    <el-image
                        :src="a.url" 
                        :preview-src-list="a.srcList"
                        class="image"
                        lazy>
                    </el-image>
                </div>
            </div>
            <div class="interaction">
                <div class="like">
                    <el-button type="text" icon="el-icon-thumb" size="small">点赞</el-button>
                </div>
                <div class="comment">
                    <el-button type="text" icon="el-icon-chat-dot-round" size="small">评论</el-button>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="user">
                <el-avatar size="large" src="https://ts1.cn.mm.bing.net/th?id=OIP-C.ZtrvDWpDrJNiyRQj6DwPvwAAAA&w=116&h=130&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"></el-avatar>
                <div class="text">
                    <span>用户名</span>
                    <span class="time">2023-3-10-10:00:30</span>
                </div>
            </div>
            <div class="album">
                <div class="image-item" v-for="a,index in albumList" :key="index">
                    <el-image
                        :src="a.url" 
                        :preview-src-list="a.srcList"
                        class="image"
                        lazy>
                    </el-image>
                </div>
            </div>
            <div class="interaction">
                <div class="like">
                    <el-button type="text" icon="el-icon-thumb" size="small">点赞</el-button>
                </div>
                <div class="comment">
                    <el-button type="text" icon="el-icon-chat-dot-round" size="small">评论</el-button>
                </div>
            </div>
        </div>
        <!-- 圈子中的每一条相册结束 --> 
    </div>
    <!-- 上传相册的弹窗 -->
    <el-dialog
    title="上传相册"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose">
        <UploadImagesVue></UploadImagesVue>
    </el-dialog>
    <!-- 上传相册的弹窗结束 -->
  </div>
</template>

<script>
import UploadImagesVue from '@/components/common/UploadImages.vue';
export default {
    data(){
        return{
            albumList:[
                {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    srcList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    ]
                },
                {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    srcList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    ]
                },
                {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    srcList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    ]
                },
                {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    srcList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    ]
                },
                {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    srcList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    ]
                },
                {
                    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    srcList: [
                        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                    ]
                }
            ],
            dialogVisible: false,
            dialogImagePreview: false,
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    components:{UploadImagesVue},
    methods:{
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
    }
}
</script>

<style lang="less" scoped>
    .container{
        width: 100%;
        height: 100%;
        .uploadAlbum{
            height: 8%;
        }
        .show-part{
            width: 100%;
            height:92%;
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
                    justify-content: center;
                    align-items: center;
                    .image-item{
                        width: 30%;
                        margin:5px calc(10%/3/2);
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