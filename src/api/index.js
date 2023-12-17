import http from '@/util/request'
//---------用户相关接口
export const getUser = ()=>{
    return http.get('/user')
}
//获取用户信息
export const getUserInfo = (params)=>{
    return http.get('/user/getUserInfo',params)
}
export const login = (params)=>{
    return http.get('/user/login',params)
}
export const updateAvatar = (data)=>{
    return http.post('/user/updateAvatar',data,{
        headers: {'Content-Type':'multipart/form-data'}
    })
}
//更新用户爱好特长
export const updateUserHobby = (data)=>{
    return http.post('/user/updateUserHobby',data)
}
//更新用户want信息
export const updateUserWantInfo = (data)=>{
    return http.post('/user/updateUserWantInfo',data)
}
//更新用户其它信息
export const updateOther = (data)=>{
    return http.post('/user/updateOther',data)
}

//----------好友相关接口
export const getFriends = (params)=>{
    return http.get('/friend/getFriends',params)
}
//获取和该好友的消息
export const getMsgs = (params)=>{
    return http.get('/chat/getMsgs',params)
}
//添加好友
export const addFriend = (data)=>{
    return http.post('/friend/addFriend',data)
}
//查看待同意的好友申请
export const getApply = (params)=>{
    return http.get('/friend/getApply',params)
}
//查看这个用户是否是我的好友，是否已经申请了
export const isApply = (params)=>{
    return http.get('/friend/isApply',params)
}
//同意好友申请
export const agreeApply = (data)=>{
    return http.post('/friend/agreeApply',data)
}
//拒绝好友申请
export const refuseApply = (data)=>{
    return http.post('/friend/refuseApply',data)
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
//加入圈子
export const joinCircle = (data)=>{
    return http.post('/circle/joinCircle',data)
}
//退出圈子
export const quitCircle = (data)=>{
    return http.post('/circle/quitCircle',data)
}    
//新建圈子
export const createMyCircle = (data)=>{
    return http.post('/circle/createMyCircle',data,{
        headers: {'Content-Type':'multipart/form-data'}
    })
}

//获取圈子相册
export const getAlbums = (params) =>{
    return http.get('/album/getAlbums',params)
}
//上传圈子相册
export const uploadAlbum = (data)=>{
    return http.post('/album/uploadAlbum',data,{
        headers: {'Content-Type':'multipart/form-data'}
    })
}
//踢出圈子
export const kickOutCircle = (data)=>{
    return http.post('/circle/kickOutCircle',data)
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
//更改用户商品数量
export const updateShopCart = (data)=>{
    return http.post('/product/updateShopCart',data)
}
//添加购物车
export const addShopCart = (data)=>{
    return http.post('/product/addShopCart',data)
}
//删除购物车
export const deleteShopCart = (data)=>{
    return http.post('/product/deleteShopCart',data)
}
//获取用户的订单
export const getOrders = (params)=>{
    return http.get('/product/getOrders',params)
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