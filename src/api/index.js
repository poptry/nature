import http from '@/util/request'
//---------用户相关接口
export const getUser = ()=>{
    return http.get('/user')
}
export const login = (params)=>{
    return http.get('/user/login',params)
}
export const updateAvatar = (data)=>{
    return http.post('/user/updateAvatar',data)
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

//----------商品相关
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