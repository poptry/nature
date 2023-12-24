<template>
    <div class="detail">
        <div class="item">
            <div class="left-content">
                <div class="user">
                    <img style="width: 36px;height: 36px;border-radius: 18px;" src="@/assets/images/logo.png"/>
                    <div class="text">
                        <span>探险者君</span>
                        <span class="time">2023-3-10-10:00:30</span>
                    </div>
                    <!-- <div class="interaction">
                        <div class="like">
                            <el-button type="text" icon="el-icon-thumb" size="small">点赞</el-button>
                        </div>
                        <div class="comment">
                            <el-button type="text" icon="el-icon-chat-dot-round" size="small">评论</el-button>
                        </div>
                    </div> -->
                </div>
                <div class="strategy-content">
                    <p v-if="content.length!=0" style="white-space: pre-wrap;font-size: 18px;width: 100%;height: 100%;">
                        {{ content[0].strategy_txt_content }}
                    </p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            detailList: [
                {
                    title: '',
                }
            ],
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
        }
    },
    computed:{
        ...mapState('strategy',['content'])
    },
    methods: {
    },
    mounted(){

    }    
}
</script>
<style lang="less" scoped>
    .detail{
        width: 100%;
        height: 100%;
        background-color: rgba(9, 9, 9, 0.3);
        padding: 20px;
        color: aliceblue;
        .item{
            width: 100%;
            height: 100%;
            padding: 20px;
            display: flex;
            flex-direction: row;
            .left-content{
                height: 100%;
                .user{
                    position: relative;
                    width: 100%;
                    height: 50px;
                    display: flex;
                    align-items: center;
                    .interaction{
                        position: absolute;
                        right: 50px;
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-end;
                        .like{
                            margin-right: 10px;
                        }
                        .el-button{
                            color: white;
                        }
                    }
                    .text{
                        margin-left: 10px;
                        display: flex;
                        flex-direction: column;
                        .time{
                            font-size: 12px;
                        }
                    }
                
                }
                .strategy-content{
                    height: calc(100%-50px);
                    margin-top: 10px;
                    overflow-y: scroll;
                        &::-webkit-scrollbar {
                            width: 0; /* Safari,Chrome 隐藏滚动条 */
                            height: 0; /* Safari,Chrome 隐藏滚动条 */
                            display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                        }
                    pre{
                        overflow-y: scroll;
                        &::-webkit-scrollbar {
                            width: 0; /* Safari,Chrome 隐藏滚动条 */
                            height: 0; /* Safari,Chrome 隐藏滚动条 */
                            display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                        }
                    }
                }
            }
            // .album{
            //     width: 30%;
            //     height: 100%;
            //     display: flex;
            //     flex-direction: row;
            //     flex-wrap: wrap;
            //     justify-content: center;
            //     align-items: center;
            //     overflow-y: scroll;
            //     .image-item{
            //         width: 100;
            //         margin-bottom: 10px;
            //         padding-right: 10px;
            //         .image{
            //             border-radius: 10px;
            //         }
            //     }
            // }
        }
    }
</style>