import {getPros,getMenPros,getWomenPros} from '@/api'
export default {
    //用来记录后台返回的商品信息，根据选择不同的条件，重新请求数据
    //设置命名空间
    namespaced:true,
    state:{
        EquipmentPros:[],
        EquipProsBackups:[] //用作备份，不做任何修改删除操作
    },
    actions:{
        getEquipmentPros({commit},params){
            if(params){
                getPros({params}).then(data=>{
                    if(data.status === 200){;
                        commit('getEquipment',data.data)
                    }
                })
            }else{
                getPros().then(data=>{
                    if(data.status === 200)
                    commit('getEquipment',data.data)
                })
            }
        },
        getMenEquipmentPros({commit},params){
            if(params){
                getMenPros({proName}).then(data=>{
                    if(data.status === 200){;
                        commit('getEquipment',data.data)
                    }
                })
            }else{
                getMenPros().then(data=>{
                    if(data.status === 200)
                    commit('getEquipment',data.data)
                })
            }
        },
        getWomenEquipmentPros({commit},params){
            if(params){
                getWomenPros({params}).then(data=>{
                    if(data.status === 200){;
                        commit('getEquipment',data.data)
                    }
                })
            }else{
                getWomenPros().then(data=>{
                    console.log('女装');
                    if(data.status === 200)
                    commit('getEquipment',data.data)
                })
            }
        },
    },
    getters:{

    },
    mutations:{
        getEquipment(state,data){
            state.EquipmentPros = data
            state.EquipProsBackups = data
        },
        getProsByClassify(state,params){
            state.EquipmentPros = [...state.EquipProsBackups]
            if(params.type&&params.type.length !== 0){
                state.EquipmentPros = state.EquipmentPros.filter(item=>{
                    return params.type.includes(item.product_classification)
                })
            }
            if(params.sort&&params.sort.length !== 0){
                console.log(params.sort.includes('priceAsc'));
                if(params.sort.includes('priceAsc')){
                    state.EquipmentPros.sort((a,b)=>{
                        if(a.product_disc_price > b.product_disc_price){
                          return  1;
                        }
                        if(a.product_disc_price < b.product_disc_price){
                          return -1;
                        }
                        return  0;
                    })
                }
            }
        }
    }
}