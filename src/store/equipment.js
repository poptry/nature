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
        //获取所有商品信息Action,根据传入的参数，判断是获取所有商品还是获取某一类商品,用作
        // 搜索功能
        getEquipmentPros({commit},params){
            if(params){
                //如果传入了参数，就根据参数获取商品信息
                getPros({params}).then(data=>{
                    if(data.status === 200){;
                        commit('getEquipment',data.data)
                    }
                })
            }else{
                //如果没有传入参数，就获取所有商品信息
                getPros().then(data=>{
                    if(data.status === 200)
                    commit('getEquipment',data.data)
                })
            }
        },
        //获取男装商品信息
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
        //获取女装商品信息
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
        //将获取到的商品信息保存到state中
        getEquipment(state,data){
            state.EquipmentPros = data
            //备份数据
            state.EquipProsBackups = data
        },
        //根据分类获取商品信息
        getProsByClassify(state,params){
            //先将备份数据赋值给state.EquipmentPros
            state.EquipmentPros = [...state.EquipProsBackups]
            //根据传入的参数，判断是获取所有商品还是获取某一类商品，不是请求
            //而是从数据中进行筛选
            if(params.type&&params.type.length !== 0){
                state.EquipmentPros = state.EquipmentPros.filter(item=>{
                    return params.type.includes(item.product_classification)
                })
            }
            //这个是根据条件进行排序，比如价格升序，价格降序，销量升序，销量降序
            if(params.sort&&params.sort.length !== 0){
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
                }else if(params.sort.includes('priceDesc')){
                    state.EquipmentPros.sort((a,b)=>{
                        if(a.product_disc_price > b.product_disc_price){
                          return  -1;
                        }
                        if(a.product_disc_price < b.product_disc_price){
                          return 1;
                        }
                        return  0;
                    })
                }else if(params.sort.includes('scoreDesc')){
                    state.EquipmentPros.sort((a,b)=>{
                        if(a.product_score > b.product_score){
                          return  -1;
                        }
                        if(a.product_score < b.product_score){
                          return 1;
                        }
                        return  0;
                    })
                }    
            }
        }
    }
}