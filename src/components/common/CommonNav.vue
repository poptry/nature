<template>
    <div class="nav">
        <span class="sign" @click="clickSpan">Natrue探险者</span>
        <ul>
            <li v-for="(item,index) in navList" :key="index" @click="clickMenu(item)">{{item.name}}</li>
        </ul>
        <button class="join-us">加入我们</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navList:[
                {
                    name:'圈子',
                    path:'/circle'
                },
                {
                    name:'攻略',
                },
                {
                    name:'装备',
                }
            ]
        }
    },
    methods:{
        clickSpan(){
            if(this.$router.name !== 'home' ){
                    this.$router.push('/home').catch(err=>{
                    err
                })
            }
        },
        clickMenu(item){
                if(this.$router.path !== item.path){
                    this.$router.push(item.path).catch(err=>{
                    err
                })
                this.$store.commit('changeOne')//跳转到圈子时，导航变为黑色
            }
            
        }
    }
}
</script>

<style scoped lang="less">
// 引入font

.nav {
    width: 100%;
    height: 100px;
    font-weight: 400;
    line-height: 100px;
    user-select: none;
    .sign{
            display: block;
            width: 20%;
            float: left;
            color: #ffffff;
            font-size: 30px;
            font-family: 'STXingkai';
            margin-left: 40px;
            margin-right: 20px;
            cursor: pointer;
            transition: font-size 0.5s;
            &:hover{
                font-size: 32px;
            }
        }
    ul {
        float: left;
        list-style: none;
        width: 40%;
        
        li{
            display: inline;
            padding: 14px;
            font:16px/22px "Microsoft Yahei";
            margin-left:30px ;
            transition: all 0.5s;
            color: #ffffff;
            cursor: pointer;
        }
        li:hover {
            font-size: 20px;
        }
    }
    .join-us{
        float: right;
        height: 40%;
        width: 10%;
        margin-top: 30px;
        margin-right: 120px;
        font-size: 14px;
        color: black;
        outline: none;
        border: 0;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
            background-color:#222020;
            color: #ffffff;
            border: #ffffff 1px solid;
            transform: scale(1.1);
        }
    }
}
</style>