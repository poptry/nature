<template>
    <div class="checkout-container">
        <div class="top">
            <img class="logo" src="@/assets/images/logo.png" alt="">
            结算区
        </div>
        <!-- 标题区 -->
        <div class="title">
            <span class="product">商品</span>
            <span class="quantity">数量</span>
            <span class="unit-price">单价</span>
            <span class="total">总价</span>
        </div>
        <!-- 标题区 -->
        <!-- 商品展示 -->
        <div class="proList" v-for="item in shopCartList" :key="item.shopCart_id">
            <i class="iconfont icon-shanchu delete" @click="deleteProItem(item)"></i>
            <div class="proInfo">
                <img class="proImg" :src="item.product_img" alt="">
                <div class="pro_text">
                    <h3 v-text="item.product_name"></h3>
                    <span v-text="item.size_name"></span>
                    <span class="stock">{{ '库存 '+item.product_stock }}</span>
                </div>
            </div>
            <div class="proNum">
                <el-input-number  @change="changeNumber(item)" v-model="item.shopCart_pronum" :min="1" :max="10"></el-input-number>
            </div>
            <div class="proPrice">
                <span>{{ item.product_disc_price+'￥' }}</span>
                <span style="text-decoration:line-through; font-size: 12px;">{{ item.product_orig_price+'￥' }}</span>
            </div>
            <div class="proTotal">
                <span> {{ (item.shopCart_pronum * item.product_disc_price).toFixed(2) + '￥'}}</span>
            </div>
        </div>
        <!-- 商品展示 -->
        <!-- 底部总计 -->
        <div class="bottom-box">
            <div class="bottomInfo">
                <el-row>
                    <el-col :span="12">合计</el-col>
                    <el-col :span="12"><span>{{ getSum+"￥" }}</span></el-col>
                </el-row>
            </div>
        </div>
        <!-- 底部总计 -->
        <!-- 用户信息 -->
        <div class="userInfo">
            <el-form label-position="top" :rules="rules" ref="userInfo" :model="userInfo" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="user_name">
                            <el-input v-model="userInfo.user_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="user_remark">
                            <el-input show-word-limit maxlength="20" v-model="userInfo.user_remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="手机" prop="user_phone">
                                <el-input v-model="userInfo.user_phone"></el-input>
                            </el-form-item>
                        </el-col>
                    <el-col :span="12">
                        <el-form-item label="详细地址" prop="user_address">
                            <el-input v-model="userInfo.user_address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12" >
                        <el-form-item label="省市区" :class="{region:isSelectRegion}">
                            <VDistpicker  @change="onChange"></VDistpicker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="continue-btn">
                <button class="continue" @click="continueCheckout">继续</button>
            </div>
        </div>
        <!-- 用户信息 -->
        <el-dialog
        id="pay"
        title="支付"
        :modal="false"
        :visible.sync="dialogVisible"
        width="20%"
        :before-close="handleClose">
            <img style="width: 100%;height: auto;" src="@/assets/images/scan.png" alt="">
        </el-dialog>
    </div>
</template>

<script>
// https://github.com/jcc/v-distpicker/blob/master/README.zh_CN.md
import VDistpicker from 'v-distpicker'
import { Loading } from 'element-ui';
import { getShopCart,deleteShopCart,updateShopCart,payShopCart } from '@/api';
import { mapState,mapActions,mapGetters } from 'vuex';
export default {
    data(){
        let checkaddr =(rule, value, callback) => {
            if(!value){
                return callback(new Error('详细地址不能为空'));
            }else{
                return callback()
            }
        };
        return{
            dialogVisible:false,
            region:{
                province:'',
                city:'',
                area:''
            },
            //设置旗帜
            flag:0,
            isSelectRegion:false,
            proNum:1,
            user_id:Number,
            detailadd:'',
            userInfo:{
                user_name:'黄海波',
                user_address:'闽南师范',
                user_phone:'13333333333',
                user_remark:'无',
            },
            rules:{
                user_name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                user_address:[{ validator:checkaddr, trigger: 'blur' }],
                user_phone:[{ required: true, message: '请输入手机号', trigger: 'blur' },{ pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
            }
        }
    },
    components:{
        VDistpicker
    },
    computed:{
        ...mapState('product',{
            shopCartList:state=>state.shopCartList
        }),
        ...mapGetters('product',['getSum'])
    },
    methods:{
        ...mapActions('product',['setShopCartList']),
        //删除购物车项目
        async deleteProItem(proList){
            console.log(proList);
            await this.$confirm('确定要删除吗？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                deleteShopCart({user_id:this.user_id,product_id:proList.product_id}).then(res=>{
                if(res.data.code === 200){
                    this.getShopCartList();
                }else{
                    this.$message.error('删除失败');
                }
                });
            }).catch(()=>{
            });
        },
        //控制弹窗关闭
        handleClose(){
            this.dialogVisible = false
        },
        //存储订单
        saveOrder(){
            
        },
        //支付
        continueCheckout(){
            for(let item in this.region){
                if(!this.region[item]){
                    this.isSelectRegion = true
                }
            }
            this.$refs['userInfo'].validate((valid) => {
                if(valid && !this.isSelectRegion){
                    let reg = ''
                    for(let item in this.region){
                        reg += this.region[item]
                    }
                    this.userInfo.user_address = reg + this.userInfo.user_address
                    //伪造支付
                    this.dialogVisible = true
                    let loadingInstance = Loading.service({
                        target:document.querySelector('#pay')
                    });
                    this.userInfo.order_account = this.getSum
                    this.userInfo.user_id = this.user_id
                    //存储订单
                    let order = {
                        userInfo:this.userInfo,
                        product_list:this.shopCartList,
                    }
                    payShopCart(order).then(res=>{
                        if(res.data.code === 200){
                            this.$message.success('支付成功');
                        }else{
                            this.$message.error('支付失败');
                        }
                    })
                    let timer = setTimeout(()=>{
                        this.dialogVisible = false
                        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            loadingInstance.close();
                        });
                        clearTimeout(timer)
                        // this.$message.success("支付成功")
                        this.$router.push('/userPersonSys/myOrder')
                    },2000)
                
                }
            })
        },
        //地址选择
        onChange(data){
            if(data.province.value!="省"&&data.city.value!="市"&&data.area.value!="区"){
                this.region.province = data.province.value
                this.region.city = data.city.value
                this.region.area = data.area.value;
                this.isSelectRegion = false
            }else{
                this.flag++;
                if(this.flag>1)
                    this.isSelectRegion = true
            }
        },
        //改变商品数量
        changeNumber(s){
            updateShopCart({user_id:this.user_id,product_id:s.product_id,shopCart_pronum:s.shopCart_pronum}).then(res=>{
                if(res.data.code === 200){
                    // this.$message.success('修改成功');
                }else{
                this.$message.error('修改失败');
                }
            });
        },
        //获取购物车列表
        async getShopCartList(){
            const user_id = JSON.parse(localStorage.getItem('user')).user_id;
            await this.setShopCartList(user_id);
        }
    },
    created(){
        this.user_id = JSON.parse(localStorage.getItem('user')).user_id;
        this.getShopCartList();
    }

}
</script>
<style lang="less" scoped>
    .checkout-container{
        margin-top: 10px;
        width: 100%;
        user-select: none;
        .top{
            position: relative;
            height: 100px;
            width: 100%;
            font-size: 30px;
            text-align: center;
            line-height: 100px;
            margin-bottom: 30px;
            color: #1d1d1d;
            border-bottom:1px solid #d0d0d0;
            .logo{
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate(0,-50%);
                width: 80px;
                height: 80px;
            }
        }
        .title{
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 10px ;
            border-bottom: 1px solid #c9c9c9;
            font-weight: 700;
            span{
                display: block;
                text-align: center;
            }
            .product{
                flex: 3;
                width: 100%;
                text-align: left;
            }
            .quantity{
                flex: 1;
                width: 100%;
            }
            .unit-price{
                flex: 1;
            }
            .total{
                flex: 1;
            }
        }
        .proList{
            position: relative;
            width: 100%;
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px solid #c9c9c9;
            .delete{
                position: absolute;
                right: 40px;
                top: 20px;
                font-size: 20px;
                color: #c9c9c9;
                &:hover{
                    cursor: pointer;
                }
            }
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
        .bottom-box{
            display: flex;
            justify-content: flex-end;
            .bottomInfo{
                right: 0;
                width: 30%;
                height: 100px;
                .el-row{
                    width: 100%;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    .el-col{
                        font-size: 16px;
                        font-weight: 400;
                        text-align: center;
                    }
                }
            }
        }
        .userInfo{
            .region{
                &::after{
                    content: "请选择完整的省市区";
                    font-size: 12px;
                    color:rgb(252, 102, 102);
                }
            }
        }
        .continue-btn{
            width: 100%;
            margin-top: 10px;
            .continue{
                display: block;
                width: 20%;
                margin: 0 auto;
                padding: 10px;
                border: 0;
                color:rgba(255, 255, 255, 0.9);
                font-size: 18px;
                transition: all 0.3s;
                background-color: rgba(00, 00, 00, 0.87);
                &:hover{
                    cursor: pointer;
                    background-color: rgba(00, 00, 00, 0.67);
                }
            }
        }
    }
</style>