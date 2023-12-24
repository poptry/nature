<template>
    <div class="orders-container">
        <div class="card" v-for="(order,index) in ordersList" :key="index">
            <div class="orderInfo">
                <el-collapse accordion>
                    <el-collapse-item style="background: transparent;">
                        <template slot="title">
                            <div style="width: 100%;display: flex;flex-direction: row; justify-content:space-between;"><span>下单时间：{{ order.productInfo[0].order_timestamp }} </span> <span style="font-size: 12px;">详细</span> </div>
                        </template>
                        <div>
                            <el-descriptions title="订单信息" style="padding: 10px;">
                                <el-descriptions-item label="订单编号">{{ order.order_id }}</el-descriptions-item>
                                <el-descriptions-item label="手机号">{{ order.productInfo[0].order_phone }}</el-descriptions-item>
                                <el-descriptions-item label="地址">{{ order.productInfo[0].order_address }}</el-descriptions-item>
                                <el-descriptions-item label="备注">
                                    <el-tag size="small">{{ order.productInfo[0].order_remark }}</el-tag>
                                </el-descriptions-item>
                                <el-descriptions-item label="付款金额">{{ order.productInfo[0].order_account }}</el-descriptions-item>
                            </el-descriptions>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="orderInfo">
                <el-collapse accordion>
                    <el-collapse-item>
                        <template slot="title">
                            商品详细
                        </template>
                        <!-- 商品展示 -->
                        <div class="proList" v-for="item in order.productInfo" :key="item.shopCart_id">
                            <div class="proInfo">
                                <img class="proImg" :src="item.product_img" alt="">
                                <div class="pro_text">
                                    <h3 v-text="item.product_name"></h3>
                                    <span v-text="item.order_prosize"></span>
                                </div>
                            </div>
                            <div class="proNum">
                                <span>{{ item.order_pronum }}</span>
                            </div>
                            <div class="proPrice">
                                <span>{{ item.product_disc_price+'￥' }}</span>
                            </div>
                            <div class="proTotal">
                                <span> {{ (Number(item.order_pronum) * Number(item.product_disc_price)).toFixed(2) + '￥'}}</span>
                            </div>
                        </div>
                        <!-- 商品展示 -->
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>

    </div>
</template>

<script>
import { getTime } from '@/util/index.js'
import {getOrders} from '@/api'
export default {
    data(){
        return{
            ordersList:[],
            orderIdList:[]
        }
    },
    methods:{
        createOrderIdList(orderList){
            orderList.forEach(ele=>{
                ele.order_timestamp = getTime(ele.order_timestamp)
            })
            let newArr = []
            const {order_id,...other} = {...orderList[0]}
            if(order_id == undefined){
                return
            }
            let obj = {
                order_id:order_id,
                productInfo:[other]
            }
            newArr.push(obj)
            orderList.forEach(ele=>{
                const {order_id,...other} = {...ele}
                let flag = 0
                for(let i = 0 ;i < newArr.length;i++){
                    if(newArr[i].order_id == order_id){
                        newArr[i].productInfo.push(other)
                        flag = 1
                        break
                    }
                }
                if(flag === 0){
                    let obj = {
                        order_id:'',
                        productInfo:[]
                    }
                    obj.order_id = order_id
                    obj.productInfo.push(other)
                    newArr.push(obj)
                }
            })
            this.ordersList = newArr
        }
    },
    created(){
        const params = {
            user_id:JSON.parse(localStorage.getItem('user')).user_id
        }
        getOrders({params}).then(res=>{
            if(res.data.code==200){
                this.createOrderIdList(res.data.data)
            }
        })
    },
}
</script>
<style lang="less" scoped>
    .orders-container{
        padding: 15px;
        //隐藏滚动条

        .card {
            width: 100%;
            margin-bottom: 20px;
            border-radius: 0.5rem;
            background: #606c88;
            background: -webkit-linear-gradient(to right, #3f4c6b, #606c88);
            background: linear-gradient(to right top, #3f4c6b, #606c88);
            padding: 1rem;
            color: rgb(107, 114, 128);
            box-shadow: 0px 87px 78px -39px rgba(0,0,0,0.4);
            .el-collapse-item{
                ::v-deep .el-collapse-item__header{
                    background: transparent;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 400;
                }
            }
            .proList{
                width: 100%;
                padding: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #c9c9c9;
                .proInfo{
                    width: 100%;
                    height: 120px;
                    flex: 3;
                    display: flex;
                    flex-direction: row;
                    .proImg{
                        width: 116px;
                        height: 116px;
                    }
                    .pro_text{
                        position: relative;
                        height: 100%;
                        width: 400px;
                        margin-left: 20px;
                        h3{
                            font-size: 18px;
                            font-weight: 700;
                        }
                        span{
                            font-size: 14px;
                            color: #414141;
                        }
                        .stock{
                            position: absolute;
                            font-size: 12px;
                            bottom: 0;
                            display: block;
                        }
                    }
                }
                .proNum{
                    width: 100%;
                    flex: 1;
                    text-align: center;
                }
                .proPrice{
                    width: 100%;
                    flex: 1;
                    text-align: center;
                }
                .proTotal{
                    width: 100%;
                    flex: 1;
                    text-align: center;
                }
            }
        }
    }
</style>