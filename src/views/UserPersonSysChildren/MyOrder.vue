<template>
    <div class="orders-container">

    </div>
</template>

<script>
import {getOrders} from '@/api'
export default {
    data(){
        return{
            ordersList:[],
        }
    },
    created(){
        const params = {
            user_id:JSON.parse(localStorage.getItem('user')).user_id
        }
        getOrders({params}).then(res=>{
            console.log(res);
            if(res.data.code==200){
                this.ordersList = res.data.data
            }
        })
    },
}
</script>
<style lang="less" scoped>
    .orders-container{
        
    }
</style>