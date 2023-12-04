<template>
  <div class="container">
    <!-- 消息盒子 -->
    <div class="msg-box">
        <!-- 聊天框开始 -->
        <div class="msg-wrap" ref="msgWrap">
            <div v-for="c in chatList" :key="c.chat_id">
                <!-- 时间显示，每间隔五分钟记录一次，五分钟内的消息不记录-->
                <div class="msgTime" v-if="c.chat_timestamp"><span v-text="c.chat_timestamp"></span></div>
                <!-- 好友消息 -->
                <div class="others" v-if="c.chat_send_id != sendUserInfo.user_id ">
                    <div class="others-avatar">
                        <el-avatar :src="c.user_avatar"></el-avatar>
                    </div>
                    <div class="others-msg">
                        <div class="msg-text">{{ c.chat_msg }}</div>
                    </div>
                </div>
                <!-- 好友消息结束 -->
                <!-- 我的消息开始 -->
                <div class="my" v-else>
                    <div class="my-msg">
                        <div class="msg-text">{{ c.chat_msg }}</div>
                    </div>
                    <div class="my-avatar">
                        <el-avatar :src="sendUserInfo.user_avatar"></el-avatar>
                    </div>
                </div>
                <!-- 我的消息结束 -->
            </div>
        </div>
        <!-- 聊天框结束 -->
    </div>
    <!-- 消息盒子结束 -->
    <!-- 消息输入框开始 -->
    <div class="input-box">
        <textarea @keyup.enter="sendMsg" name="input" id="input" cols="30" rows="10" v-model="inputMsg"></textarea>
        <div class="send-btn">
        <button  @click="sendMsg">发送</button>
        </div>
    </div>
    <!-- 消息输入框结束 -->
  </div>
</template>

<script>
export default {
    data(){
        return{
            circle_id:'',
            inputMsg:'',
            chatList:[],
        }
    },
    methods:{
        sendMsg(){
            console.log(this.inputMsg);
        }
    },
}
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
        .msg-box{
        width: 100%;
        height: 62%;
        border-bottom: 1px solid #b8b8b8;
        padding: 0 15px;
        .msg-wrap{
            height: 100%;
            width: 100%;
            overflow-y:scroll;
            &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
            .msgTime{
                display: flex;
                justify-content: center;
                margin-top: 15px;
                margin-bottom: 15px;
                span{
                    padding: 5px;
                    border-radius: 5px;
                    color: #959595;
                }
            }
            .others,
            .my{
                display: flex;
                flex-direction: row;
                margin-top: 8px;
                margin-bottom: 8px;
                .others-msg,
                .my-msg{
                max-width: 200px;
                .msg-text{
                    position: relative;
                    padding: 10px;
                    word-break: break-all;
                    background-color:#adacac;
                    border-radius: 0 10px 10px;
                }
                }
            }
            .others{
                justify-content: flex-start;
                .others-avatar{
                margin-right: 10px;
                }
            }
            .my{
                justify-content: flex-end;
                .my-msg{
                .msg-text{
                    background-color: rgba(29, 144, 245, 1);
                    border-radius: 10px 0 10px 10px;
                    color: #fff;
                }
                }
                .my-avatar{
                    margin-left: 10px;
                }
            }
        }
    }
    .input-box{
        width: 100%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-right: 0;
        textarea{
            width: 100%;
            height: 70%;
            outline: none;
            border: none;
            resize: none;
            padding: 15px;
            font-size: 16px;
            background-color: rgba(0, 0, 0, 0);
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        .send-btn{
            display: flex;
            justify-content: flex-end;
            height: 30%;
            width: 100%;
            button{
                position: relative;
                width: 15%;
                height: 80%;
                margin-right: 10px;
                border: 0;
                border-radius: 5px;
                background-color: rgba(29, 144, 245, 0.6);
                box-shadow: 0 4px 0 rgba(29, 144, 245, 1);
                transition: all .5s;
                cursor: pointer;
                &:hover{
                    transform: translateY(-2x);
                    box-shadow: 0 6px 0 rgba(29, 144, 245, 1);
                }
                &:active{
                    transform: translateY(0);
                    box-shadow: none;
                }
            }
        }
    }
}

</style>