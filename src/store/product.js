import { getShopCart } from '@/api';
export default {
    //设置命名空间
    namespaced:true,
    state:{
        shopCartList:[],//购物车列表
    },
    actions:{
        //获取购物车列表
        async setShopCartList({commit},user_id){
            await getShopCart({params:{user_id:user_id}}).then(res=>{
                if(res.status === 200){
                //   this.shopCartList = res.data;
                //   console.log(this);
                  commit('setShopCartList',res.data);
                }
            });
        },
    },
    getters:{
        //获取购物车里所有物品的总价
        getSum(state){
            let sum = 0
            state.shopCartList.forEach(element => {
                sum += Number(element.product_disc_price) * Number(element.shopCart_pronum)
            });
            return sum.toFixed(2)
        }
    },
    mutations:{
        setShopCartList(state,data){
            state.shopCartList = data;
        },
    }
}