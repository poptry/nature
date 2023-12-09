<template>
  <div class="chat-room">
    <div class="left">
      <!-- <div class="msg_menu">菜单栏</div> -->
      <div class="msg-box">
        <!-- 聊天框开始 -->
        <div class="msg-wrap" ref="msgWrap">
          <div v-for="c in chatList" :key="c.chat_id">
            <!-- 时间显示，每间隔五分钟记录一次，五分钟内的消息不记录-->
            <div class="msgTime" v-if="c.chat_timestamp">
              <span v-text="c.chat_timestamp"></span>
            </div>
            <!-- 好友消息 -->
            <div class="friend" v-if="c.chat_send_id != sendUserInfo.user_id ">
              <div class="friend-avatar">
                <el-avatar
                :src="c.user_avatar"
                >
                </el-avatar>
              </div>
              <div class="friend-msg">
                <div class="msg-text">
                  {{ c.chat_msg }}
                </div>
              </div>
            </div>
            <!-- 好友消息结束 -->
            <!-- 我的消息开始 -->
            <div class="my" v-else>
              <div class="my-msg">
                <div class="msg-text">
                  {{ c.chat_msg }}
                </div>
              </div>
              <div class="my-avatar">
                <el-avatar
                :src="sendUserInfo.user_avatar"
                >
                </el-avatar>
              </div>
            </div>
            <!-- 我的消息结束 -->
          </div>
        </div>
        <!-- 聊天框结束 -->
      </div>
      <!-- 消息输入框开始 -->
      <div class="input-box">
        <textarea @keyup.enter="sendMsg" name="input" id="input" cols="30" rows="10" v-model="inputMsg"></textarea>
        <div class="send-btn">
          <button  @click="sendMsg">发送</button>
        </div>
      </div>
      <!-- 消息输入框结束 -->
    </div>
    <!-- 私信记录开始 -->
    <div class="right">
      私信记录
    </div>
    <!-- 私信记录结束 -->
  </div>
</template>

<script>
import {  mapGetters } from 'vuex';
import {getMsgs} from '@/api'
import {getTime,getNowTimeStamp} from '@/util/index.js'
export default {
  data(){
    return{
      chatList:[],
      inputMsg:'',
      sendUserInfo:'',
      showTime:false,
      nowTimeStamp:''
    }
  },
  methods:{
    //发送消息
    sendMsg(){
      this.nowTimeStamp = getNowTimeStamp()
      //会先获取目前最后的，再从后台返回，所以这里得到的不是‘最新的’的时间
      const data = {
        send_id:this.sendUserInfo.user_id,
        //需要用数字型，不然io.to to不到
        receive_id:Number(this.getNowFriendNav),
        msg:this.inputMsg,
        timestamp:this.nowTimeStamp,
        user_avatar:this.sendUserInfo.user_avatar
      }
      if(this.inputMsg !== ''){
        const targetUserId = this.getNowFriendNav
        this.$socket.emit('chatMsg',data)
        this.inputMsg = ''
      }
    },
    //发送消息结束
    //获取消息
    getFriendMsgs(id){
      //请求消息
      getMsgs({params:{sendId:this.sendUserInfo.user_id,recevieId:id}}).then(res=>{
        this.chatList = res.data
        this.chatList.forEach(e=>{
          e.chat_timestamp = getTime(e.chat_timestamp)
        })
        this.$nextTick(()=>{
          const msgWrap = this.$refs.msgWrap;
          msgWrap.scrollTop = msgWrap.scrollHeight - msgWrap.clientHeight
        })
      }).catch(erro=>{
        console.log(erro);
      })
    },
    //获取消息结束
  },
  watch:{
    //监听编号变化
    getNowFriendNav(newVal){
      this.getFriendMsgs(newVal)
    }
  },
  computed:{
    ...mapGetters('nav',{getNowFriendNav:"getNowFriendNav"})
  },
  created(){
    this.sendUserInfo = JSON.parse(localStorage.getItem('user'))
    this.getFriendMsgs(this.getNowFriendNav)
  },
  mounted(){
    this.$socket.open() //开启连接
  },
  beforeDestroy(){
    this.$socket.close() //必须要注销掉
    console.log('注销socket');
  },
  sockets:{
    connecting(){
      console.log("正连接");
    },
    disconnect(){
      alert("Socket端口")
    },
    connect_erro(){
      console.log('连接失败');
    },
    connect(){
      console.log('socket连接成功');
      //连接成功后发送加入房间的请求
      const userId = JSON.parse(localStorage.getItem('user')).user_id
      this.$socket.emit('join',userId)
    },
    chatMsg(data){
      console.log("接收到啦！！",data);
      this.chatList.push({
        chat_send_id:data.send_id,
        chat_msg:data.msg,
        chat_timestamp:getTime(data.timestamp),
        user_avatar:data.user_avatar
      })
      this.$nextTick(()=>{
        const msgWrap = this.$refs.msgWrap;
        msgWrap.scrollTop = msgWrap.scrollHeight - msgWrap.clientHeight
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .chat-room{
    display: flex;
    flex-direction: row;
    height: 100%;
    background-color: #dedede;
    border-radius: 5px;
    min-width: 880px;
    .left{
      height: 100%;
      width: 70%;
      .msg-box{
        width: 100%;
        height: 70%;
        border-right: 1px solid #b8b8b8;
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
          .friend,
          .my{
            display: flex;
            flex-direction: row;
            margin-top: 8px;
            margin-bottom: 8px;
            .friend-msg,
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
          .friend{
            justify-content: flex-start;
            .friend-avatar{
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
        border-right: 1px solid #b8b8b8;
        textarea{
          width: 100%;
          height: 70%;
          outline: none;
          border: none;
          resize: none;
          padding: 15px;
          background-color: #dedede;
          font-size: 16px;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        }
        .send-btn{
          display: flex;
          justify-content: flex-end;
          height: 30%;
          width: 100%;
          background-color: #dedede;
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

  }
</style>