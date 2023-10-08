export default {
    state:{
        iscomeout:0,
    },
    actions:{
    },
    mutations:{
        changeZero(state){
            state.iscomeout = 0 //透明
        },
        changeOne(state){
            state.iscomeout = 1  //黑色
        }
    }
}