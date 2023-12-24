import { getStrategyContent } from '@/api';
export default {
    //设置命名空间
    namespaced:true,
    state:{
        strategy_id:'',//记录点击的id
        content:[],//记录点击的攻略内容
    },
    actions:{
        async getStrategyContent({commit},id){
            console.log(id);
            await getStrategyContent({params:{collection_id:id}}).then(res=>{
                console.log(res);
                commit('changeContent',res.data)
            })
        }
    },
    getters:{

    },
    mutations:{
        changeId(state,id){
            state.strategy_id = id
        },
        changeContent(state,content){
            state.content = JSON.parse(JSON.stringify(content))
        }
    }
}