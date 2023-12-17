<template>
    <div class="menu-container">
        <div class="menu-main">
            <ul class="equipment-nav">
                <li  v-for="n in proNav" :key="n.id" @click="selectNav(n)">{{n.name}}</li>
            </ul>
            <div class="search">
                <input @keyup.enter="searchEquipment" v-model="searchContent" type="text" placeholder="Search">
                <i @click="searchEquipment" class="iconfont icon-search searchIcon"></i>
            </div>
            <div class="icons">
                <i @click="drawer=true" class="iconfont icon-shangjiaduanicon-"></i>
                <!-- <i class="iconfont icon-jushoucang favorite"></i> -->
            </div>
        </div>
        <el-drawer
            :show-close="false"
            title="购物车"
            :visible.sync="drawer">
            <div class="show-content">
                <ShopCartItemsVue></ShopCartItemsVue>
            </div>
            <div class="someOptions">
                <button @click="toCheckout" class="to-checkout">去结算</button>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import ShopCartItemsVue from './ShopCartItems.vue';
export default {
    data(){
        return{
            searchContent:'',
            drawer:false,
            proNav:[
                {
                    id:'0',
                    name:'全部',
                    path:'allEquipment'
                },
                {
                    id:'1',
                    name:'男装',
                    path:'menEquipment'
                },
                {
                    id:'2',
                    name:'女装',
                    path:'womenEquipment'
                }
            ],
        }
    },
    components:{
        ShopCartItemsVue
    },
    computed:{
       
    },
    methods:{
        ...mapActions('equipment',{
            getEquipmentPros:'getEquipmentPros',
            getMenEquipmentPros:'getMenEquipmentPros',
            getWomenEquipmentPros:'getWomenEquipmentPros'
        }),
        //搜索按钮事件
        searchEquipment(){
            console.log('搜索内容：'+this.searchContent);
            const params = {
                'proName':this.searchContent
            }
            console.log(this.$route.name);
            if(this.$route.name=='allEquipment'){
                this.getEquipmentPros(params)
            }else if(this.$route.name=='menEquipment'){
                this.getMenEquipmentPros(params)
            }else{
                this.getWomenEquipmentPros(params)
            }
        },
        selectNav(n){
            this.$router.push({path:n.path}).catch(err=>err)
        },
        toCheckout(){
            this.$router.push({path:'checkout'}).catch(err=>err)
            this.drawer = false
        }
    }
}
</script>
<style lang="less" scoped>
    .menu-container{
        height: 100%;
        width: 100%;
        user-select: none;
        .menu-main{
            height: 100%;
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 20px;
            .equipment-nav{
                flex: 3;
                display: flex;
                flex-direction: row;
                list-style: none;
                color: var(--fontColor-m);
                user-select: none;
                font-weight: 700;
                font-family: 'Courier New', Courier, monospace;
                margin-left: 20px;
                li{
                    padding: 20px;
                    cursor: pointer;
                    transition: all .5s;
                    &:hover{
                        box-shadow: 0 5px 0 rgb(149, 149, 149);
                    }
                }
            }
            .search{
                flex: 2;
                display: flex;
                align-items: center;
                border: 1px solid rgb(184, 184, 184);
                padding: 5px;
                background-color: #e3e3e3;
                input{
                    width: 100%;
                    border: 0;
                    outline: none;
                    padding: 5px;
                    background-color: #e3e3e3;
                }
                .searchIcon{
                    padding: 5px;
                    &:hover{
                        background-color: #d4d4d4;
                        cursor: pointer;
                    }
                }
            }
            .icons{
                flex: 3;
                display: flex;
                justify-content: flex-end;
                i{
                    position: relative;
                    font-size: 24px;
                    margin-right: 40px;
                    cursor: pointer;
                    &:hover{
                        transform: scale(1.1);
                    }
                }
            }
        }
        .el-drawer{
            height: 100%;
            display: flex;
            flex-direction: column;
            &::-webkit-scrollbar {
                width: 0; /* Safari,Chrome 隐藏滚动条 */
                height: 0; /* Safari,Chrome 隐藏滚动条 */
                display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
            }
            .show-content{
                width: 100%;
                height: 80%;
                overflow-y: scroll;
                &::-webkit-scrollbar {
                    width: 0; /* Safari,Chrome 隐藏滚动条 */
                    height: 0; /* Safari,Chrome 隐藏滚动条 */
                    display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                }
            }
            .someOptions{
                width: 100%;
                height: 20%;
                min-height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 10px;
                .to-checkout{
                width: 100%;
                height: 50px;
                background-color: #ff6a07;
                border: 0;
                outline: none;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
                    &:hover{
                        background-color: #e65c00;
                    }
                }
                .money{
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    .shipping,
                    .total{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin-bottom: 5px;
                    }
                }
            }
        }
        /deep/.el-drawer__header{
            margin: 5px !important;
            font-size: 18px;
            color: #121212;
        }
    }
</style>