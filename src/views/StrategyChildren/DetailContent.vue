<template>
    <div class="detail">
        <div class="item">
            <div class="left-content">
                <div class="user">
                    <el-avatar size="large" src="https://ts1.cn.mm.bing.net/th?id=OIP-C.ZtrvDWpDrJNiyRQj6DwPvwAAAA&w=116&h=130&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"></el-avatar>
                    <div class="text">
                        <span>用户名</span>
                        <span class="time">2023-3-10-10:00:30</span>
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
                <div class="strategy-content">
                    <p>
                        先说说 S8 的由来，回顾自己的骑行，我整理成七次。第一次是骑行瑞丽。
                    第二次是骑行 317，也就是出国的那次。
                    第三次是骑行川渝环线。
                    第四次是骑行南疆。
                    第五次是冬季骑行西藏。
                    第六次是骑行长江到上海，然后骑行北部海岸线。
                    第七次是 2021 年骑行东北边境线然后到海南。
                    今年的骑行就是第八次，命名为 S8，骑行第 8 季来啦。
                    昨天从绵阳骑到江油，就算第 0 天，今天从江油骑行到青林口，是正式的骑行，定为第 1 天。
                    前天晚上睡不着，翻腾到凌晨 2 点多。早上八点起床，收拾好行囊。自行车加上行李，推起来晃晃悠悠。还担心能不能骑的起来，毕竟好久没骑车了。
                    自行车骑起来，沿着熟悉的道路慢慢跑起来，等撕弦弧Ｆ镄芯驼庋肌９赜诿嘌粽庾鞘校皇俏沂籽。欢吹秸饫镆恢毕胱爬肟〕侨ゴ蠖际校丛谡饫锷� 20 多年。一路看着熟悉又陌生的场景，该厉害还是得离开。再次回到绵阳真的不知道啥时候，我也不希望，尤其是不希望再一次跟落魄的回到这里。想起来，我 1999 年开到这里，也是很落魄的时候。
                    </p>
                </div>
            </div>
            <div class="album">
                <div class="image-item" v-for="(a,index) in albumList" :key="index">
                    <el-image
                        :src="a.url" 
                        :preview-src-list="a.srcList"
                        class="image"
                        lazy>
                    </el-image>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
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
    mounted(){
    }    
}
</script>
<style lang="less" scoped>
    .detail{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 20px;
        color: aliceblue;
        .item{
            width: 100%;
            height: 100%;
            padding: 20px;
            display: flex;
            flex-direction: row;
            .left-content{
                width: 70%;
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
                }
            }
            .album{
                width: 30%;
                height: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                overflow-y: scroll;
                .image-item{
                    width: 100;
                    margin-bottom: 10px;
                    padding-right: 10px;
                    .image{
                        border-radius: 10px;
                    }
                }
            }

        }
    }
</style>