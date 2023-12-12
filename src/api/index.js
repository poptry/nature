import http from '@/util/request'
//---------用户相关接口
export const getUser = ()=>{
    return http.get('/user')
}
export const login = (params)=>{
    return http.get('/user/login',params)
}
export const updateAvatar = (data)=>{
    return http.post('/user/updateAvatar',data,{
        headers: {'Content-Type':'multipart/form-data'}
    })
}

//----------好友相关接口
export const getFriends = (params)=>{
    return http.get('/friend/getFriends',params)
}
//获取和该好友的消息
export const getMsgs = (params)=>{
    return http.get('/chat/getMsgs',params)
}

//------------圈子相关接口
export const getCircleInfo = ()=>{
    return http.get('/circle/getCircle')
}
//获取用户的圈子
export const getMyCircle = (params)=>{
    return http.get('/circle/getMyCircle',params)
}
//getCircleByName 查询接口
export const getCircleByName = (params)=>{
    return http.get('/circle/getCircleByName',params)
}
//获取圈子的成员
export const getCircleMembers = (params)=>{
    return http.get('/circle/getCircleMembers',params)
}
//获取圈主信息
export const getCircleOwner = (params)=>{
    return http.get('/circle/getCircleOwner',params)
}
//获取圈子的聊天记录
export const getCircleMsgs = (params)=>{
    return http.get('/circle/getCircleChat',params)
}
export const joinCircle = (data)=>{
    return http.post('/circle/joinCircle',data)
}

//----------商品相关
//获取商品
export const getPros = (params)=>{
    return http.get('/product/getPros',params)
}
export const getMenPros = (params)=>{
    return http.get('/product/getMenPros',params)
}
export const getWomenPros = (params)=>{
    return http.get('/product/getWomenPros',params)
}
// 获取商品评分
export const getScoreByPro = (params)=>{
    return http.get('/score/getScoreByPro',params)
}
//查看用户是否对该商品评分过
export const getScoreByUser = (params)=>{
    return http.get('/score/getScoreByUser',params)
}
//用户对商品评分
export const addScore = (data)=>{
    return http.post('/score/addScore',data)
}
//查询该商品是否被加入购物车了
export const findShopCart = (params)=>{
    return http.get('/product/findShopCart',params)
}
//用户的购物车
export const getShopCart = (params)=>{
    return http.get('/product/getShopCart',params)
}
//添加购物车
export const addShopCart = (data)=>{
    return http.post('/product/addShopCart',data)
}
//删除购物车
export const deleteShopCart = (data)=>{
    return http.post('/product/deleteShopCart',data)
}
//攻略
export const getStrategyCollection = (params)=>{
    return http.get('/strategy/getStrategyCollection',params)
}
//获取攻略目录详细内容
export const getCollectionDetail = (data)=>{
    //http://localhost:3000/strategy/getCollectionDetail
    return http.post('/strategy/getCollectionDetail',data)
}