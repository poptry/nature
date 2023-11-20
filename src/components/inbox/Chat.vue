<template>
  <div class="chat-room">
    <div class="left">
      <div class="msg-box">
        <div class="msg-wrap" ref="msgWrap">
          <div v-for="(c,index) in chatList" :key="index">
            <div class="friend" v-if="c.id === '1'">
              <div class="friend-avatar">
                <el-avatar
                :src="c.avatar"
                >
                </el-avatar>
              </div>
              <div class="friend-msg">
                <div class="msg-text">
                  {{ c.msg }}
                </div>
              </div>
            </div>
            <div class="my" v-else>
              <div class="my-msg">
                <div class="msg-text">
                  {{ c.msg }}
                </div>
              </div>
              <div class="my-avatar">
                <el-avatar
                :src="c.avatar"
                >
                </el-avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="input-box">
        <textarea @keyup.enter="sendMsg" name="input" id="input" cols="30" rows="10" v-model="inputMsg"></textarea>
        <div class="send-btn">
          <button  @click="sendMsg">发送</button>
        </div>
      </div>
    </div>
    <div class="right">
      私信记录
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{
      chatList:[
        {
          id:'1',
          name:'好',
          avatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.pSYrBZuWAziwSL4d7H9-UAAAAA?w=206&h=206&c=7&r=0&o=5&dpr=2&pid=1.7',
          msg:'唱歌？'
        },
        {
          id:'2',
          name:'好',
          avatar:'https://tse4-mm.cn.bing.net/th/id/OIP-C.wYmjPaJV75lcGZaN2ptT5AAAAA?w=202&h=202&c=7&r=0&o=5&dpr=2&pid=1.7',
          msg:'我很好'
        },
        {
          id:'1',
          name:'好',
          avatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.pSYrBZuWAziwSL4d7H9-UAAAAA?w=206&h=206&c=7&r=0&o=5&dpr=2&pid=1.7',
          msg:'你在做什么？'
        },
        {
          id:'2',
          name:'好',
          avatar:'https://tse4-mm.cn.bing.net/th/id/OIP-C.wYmjPaJV75lcGZaN2ptT5AAAAA?w=202&h=202&c=7&r=0&o=5&dpr=2&pid=1.7',
          msg:'跳舞？'
        },
        {
          id:'1',
          name:'好',
          avatar:'https://tse2-mm.cn.bing.net/th/id/OIP-C.pSYrBZuWAziwSL4d7H9-UAAAAA?w=206&h=206&c=7&r=0&o=5&dpr=2&pid=1.7',
          msg:'你的童年'
        },
        {
          id:'2',
          name:'好',
          avatar:'https://tse4-mm.cn.bing.net/th/id/OIP-C.wYmjPaJV75lcGZaN2ptT5AAAAA?w=202&h=202&c=7&r=0&o=5&dpr=2&pid=1.7',
          msg:'我的童年'
        }
      ],
      inputMsg:''
    }
  },
  methods:{
    sendMsg(){
      if(this.inputMsg !== ''){
        let obj = {
          id:'2',
          name:'好',
          avatar:'https://tse4-mm.cn.bing.net/th/id/OIP-C.wYmjPaJV75lcGZaN2ptT5AAAAA?w=202&h=202&c=7&r=0&o=5&dpr=2&pid=1.7',
          msg:this.inputMsg
        }
        this.chatList.push(obj)
        this.inputMsg = ''
        this.$nextTick(()=>{
          const msgWrap = this.$refs.msgWrap;
          msgWrap.scrollTop = msgWrap.scrollHeight - msgWrap.clientHeight
          console.log(msgWrap.scrollTop,msgWrap.scrollHeight,msgWrap.clientHeight);
        })
      }

    }
  },
  watch:{
    friendId(newVal){
      console.log(newVal);
    }
  },
  computed:{
    ...mapState({friendId:state=>state.inbox.friendId})
  },
  created(){
    console.log(this.friendId);
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