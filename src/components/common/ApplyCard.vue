<template>
  <div>
    <div v-show="!dispear" class="card animate__animated" :class="{animate__fadeOutRight:agreed}">
        <div @click="showInfo"><el-avatar   id="cookieSvg" size="large" :src="applyUser.user_avatar"></el-avatar></div>
        <p class="cookieHeading" >{{applyUser.user_name}}</p>
        <p class="cookieDescription">{{ applyUser.user_motto }}</p>
        <div class="buttonContainer">
            <button @click="agreeAddFriend" class="acceptButton">同意</button>
        <button @click="decline" class="declineButton">拒绝</button>
        </div>
    </div>
    <el-dialog
    :show-close="false"
    :visible.sync="dialogVisible"
    :modal="false"
    top="15vh"
    width="30%">
        <UserInfoShowVue :member="member" :showBtn='false'></UserInfoShowVue>
    </el-dialog>
  </div>
</template>

<script>
import {agreeApply,refuseApply} from '@/api'
import UserInfoShowVue from '../common/UserInfoShow.vue'
import { mapGetters,mapMutations,mapActions } from 'vuex'
export default {
    props: ['applyUser'],
    data() {
        return {
          user_id:Number,
          dialogVisible:false,
          member:{},
          agreed:false,
          dispear:false
        }
    },
    components:{
        UserInfoShowVue
    },
    methods:{
      ...mapActions('inbox',['setMyFriends']),
      //拒绝
      decline(){
        const friend_id = this.applyUser.user_id
        refuseApply({friend_id,user_id:this.user_id}).then(res=>{
          if(res.data.code == 200){
            this.agreed = true
            setTimeout(() => {
              this.dispear = true
            }, 600);
          }
        })
      },
      //同意
      agreeAddFriend(){
        const friend_id = this.applyUser.user_id
        agreeApply({friend_id,user_id:this.user_id}).then(res=>{
          if(res.data.code == 200){
            this.agreed = true
            setTimeout(() => {
              this.dispear = true
            }, 600);
            this.setMyFriends(this.user_id)
          }
        })
      },
      showInfo(){
          this.dialogVisible = true
          this.member = this.applyUser
      }
    },
    created(){
      this.user_id = JSON.parse(localStorage.getItem('user')).user_id
    }
}
</script>

<style scoped>
    ::v-deep .el-dialog__header{
        padding: 0 !important;
    }
    ::v-deep .el-dialog__body{
        padding: 0 !important;
        height: 600px;
        background-color: #464646;
        overflow: hidden;
    }
    .card {
      width: 100%;
      height: 220px;
      margin-bottom: 20px;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 30px;
      gap: 13px;
      position: relative;
      overflow: hidden;
      border-radius: 10px;
      background: #e3e3e3;
      box-shadow:  5px 5px 18px #d4d4d4,
                  -5px -5px 18px #ffffff;
    }

#cookieSvg:hover {
    cursor: pointer;
}

#cookieSvg g path {
  fill: rgb(97, 81, 81);
}

.cookieHeading {
  font-size: 1.2em;
  font-weight: 800;
  color: rgb(26, 26, 26);
}

.cookieDescription {
  text-align: center;
  font-size: 0.7em;
  font-weight: 600;
  color: rgb(99, 99, 99);
}

.buttonContainer {
  display: flex;
  gap: 20px;
  flex-direction: row;
}

.acceptButton {
  width: 80px;
  height: 30px;
  background-color: #7b57ff;
  transition-duration: .2s;
  border: none;
  color: rgb(241, 241, 241);
  cursor: pointer;
  font-weight: 600;
  border-radius: 20px;
}

.declineButton {
  width: 80px;
  height: 30px;
  background-color: rgb(218, 218, 218);
  transition-duration: .2s;
  color: rgb(46, 46, 46);
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 20px;
}

.declineButton:hover {
  background-color: #ebebeb;
  transition-duration: .2s;
}

.acceptButton:hover {
  background-color: #9173ff;
  transition-duration: .2s;
}
</style>