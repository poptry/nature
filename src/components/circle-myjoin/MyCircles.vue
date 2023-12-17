<template>
  <div class="my-circles">
    <div class="title">
        <span v-text="title"></span>
    </div>
    <div class="circles">
        <div v-for="circle in getMyCircle" :class="{active:circle.circle_id==getNowCircleNav}" :key="circle.circle_id" class="circle" @click="clickCircle(circle)">
            <img width="40px" height="40px" style="border-radius: 5px;object-fit: cover;" :src="circle.circle_avatar" alt="">
            <!-- <el-avatar  fit="cover" class="circle-avatar" shape="square" size="medium" :src="circle.circle_avatar"></el-avatar> -->
            <span class="circle-name" v-text="circle.circle_name"></span>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            title:''
        }
    },
    computed:{
        ...mapGetters("circle",['getNowCircleNav','getMyCircle'])
    },
    methods:{
        ...mapActions("circle",['setMyCircle']),
        //得到store中的mutations,以此更改提交circle_id的值
        ...mapMutations("circle",['changeCircleId']),
        //点击圈子，跳转到圈子详情页，并且将圈子id状态更改
        clickCircle(c){
           this.$router.push({name:'myCircleDetailChat'}).catch(err=>{})
           this.changeCircleId(c.circle_id)
        },
    },
    created(){
        this.title = '我的圈子'
        const {user_id} = JSON.parse(localStorage.getItem('user'))
        this.setMyCircle(user_id)
        //根据用户id，获取用户加入的圈子
        // getMyCircle({params:{user_id}}).then(res=>{
        //     if(res.status === 200){
        //         this.myCircles = res.data
        //     }
        // }).catch(erro=>{
        //     console.log(erro);
        // })
    }
}
</script>
<style lang="less" scoped>
    .my-circles{
        height: 100%;
        user-select: none;
        .title{
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;
        }
        .circles{
            padding: 0 10px;
            .circle{
                display: flex;
                flex-direction: row;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 5px;
                img{
                    flex: 1.5;
                }
                .circle-name{
                    flex: 3;
                    margin-left: 10px;
                }
                &:hover{
                    background-color: var(--navBackgroundColor);
                    cursor: pointer;
                }
            }
        }
        .active{
            background-color: var(--navBackgroundColor);
        }
    }
</style>