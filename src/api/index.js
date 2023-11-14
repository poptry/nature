import http from '@/util/request'
export const getUser = ()=>{
    return http.get('/user')
}