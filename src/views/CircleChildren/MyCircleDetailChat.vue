<template>
  <div class="container">
    <!-- 消息盒子 -->
    <div class="msg-box">
        <!-- 聊天框开始 -->
        <div class="msg-wrap" ref="msgWrap">
            <div v-for="c in chatList" :key="c.circleMsg_id">
                <div class="msgTime" v-if="c.chatMsg_timestamp"><span v-text="c.chatMsg_timestamp"></span></div>
                <!-- 好友消息 -->
                <div class="others" v-if="c.user_id != myInfo.user_id ">
                    <div class="others-avatar">
                        <el-avatar :src="c.user_avatar"></el-avatar>
                    </div>
                    <div class="others-msg">
                        <div class="msg-text">{{ c.circleMsg_content }}</div>
                    </div>
                </div>
                <!-- 好友消息结束 -->
                <!-- 我的消息开始 -->
                <div class="my" v-else>
                    <div class="my-msg">
                        <div class="msg-text">{{ c.circleMsg_content }}</div>
                    </div>
                    <div class="my-avatar">
                        <el-avatar :src="myInfo.user_avatar"></el-avatar>
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
import { getCircleMsgs } from '@/api';
import { mapGetters } from 'vuex';
import {getTime,getNowTimeStamp} from '@/util/index.js'
export default {
    data(){
        return{
            circle_id:'',
            inputMsg:'',
            chatList:[],
            myInfo:{}
        }
    },
    computed:{
        ...mapGetters('circle',['getNowCircleNav'])
    },
    watch:{
        getNowCircleNav(){
            // console.log(this.getNowCircleNav);
            console.log(this.$socket.connected);
            if(this.$socket.connected){
                //如果打开了先关闭上一个
                this.$socket.close() //必须要注销掉
                console.log('已经打开');
            }
            //然后重新启动它
            this.$socket.open() //开启连接
            this.getCircleMsgs()
        }
    },
    methods:{
        sendMsg(){
            const nowTimeStamp = getNowTimeStamp()
            //会先获取目前最后的，再从后台返回，所以这里得到的不是‘最新的’的时间
            const data = {
                msg:this.inputMsg,
                timestamp:nowTimeStamp,
                send_id:this.myInfo.user_id,
                circle_id:Number(this.getNowCircleNav),
                user_avatar:this.myInfo.user_avatar
            }
            if(this.inputMsg !== ''){
                console.log(this.inputMsg);
                this.$socket.emit('chatCircleMsg',data)
                this.inputMsg = ''
            }
        },
        //获取聊天记录
        getCircleMsgs(){
            //请求消息记录
            getCircleMsgs({params:{circle_id:this.getNowCircleNav}}).then(res=>{
                if(res.status === 200){
                    this.chatList = res.data;
                    //时间转换
                    this.chatList.forEach(e=>{
                        e.chatMsg_timestamp = getTime(e.chatMsg_timestamp)
                    })
                    //滚动条置底
                    this.$nextTick(()=>{
                        const msgWrap = this.$refs.msgWrap;
                        msgWrap.scrollTop = msgWrap.scrollHeight - msgWrap.clientHeight
                    })
                }
            })
        }
    },
    mounted(){
        this.getCircleMsgs()
        //获取存储中得到用户信息
        const myInfo = JSON.parse(localStorage.getItem('user'))
        this.myInfo = myInfo
        this.$socket.open() //开启连接
    },
    beforeDestroy(){
        this.$socket.close() //必须要注销掉
        console.log('离开聊天室');
    },
    sockets:{
        connecting(){
            console.log("正连接");
        },
        disconnect(){
            // alert("Socket端口")
            console.log('断开连接');
        },
        connect_erro(){
            console.log('连接失败');
        },
        connect(){
            console.log('socket连接成功');
            const circleId = Number(this.getNowCircleNav)
            this.$socket.emit('join',circleId)
        },
        chatCircleMsg(data){
            // 如果data中的数据存在就渲染消息
            //否则不进行
            if(data.circle_id && data.circle_id!=this.getNowCircleNav){
                return
            }else if(data.circle_id){
                this.chatList.push({
                    user_id:data.send_id,
                    circleMsg_content:data.msg,
                    chatMsg_timestamp:getTime(data.timestamp),
                    user_avatar:data.user_avatar
                })
                console.log("chatlist",this.chatList);
                this.$nextTick(()=>{
                    const msgWrap = this.$refs.msgWrap;
                    msgWrap.scrollTop = msgWrap.scrollHeight - msgWrap.clientHeight
                })
            }
        }
  }
}
</script>
<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
        .msg-box{
        width: 100%;
        height: 70%;
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
                    color: #d5d5d5;
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
                    background-color:#e3e3e3;
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