import http from '@/util/request'
//用户相关接口
export const getUser = ()=>{
    return http.get('/user')
}
export const login = (params)=>{
    return http.get('/user/login',params)
}
export const upload = (data)=>{
    return http.post('/user/upload',data)
}
//圈子相关接口
export const getCircleInfo = ()=>{
    return http.get('/circle/getCircle')
}