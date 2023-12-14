import { getUserInfo} from "@/api"
export default {
    namespaced:true,
    state:{
        user:[],
        user_theme:true
    },
    getters:{
        getUser(state){
            return JSON.parse(localStorage.getItem('user'))
        },
        getTheme(state){
            console.log(state.user_theme);
            return state.user_theme;
        }
    },
    actions:{
        async setUser(context,user_id){
            await getUserInfo({params:{user_id:user_id}}).then((res)=>{
                console.log(res);
                if(res.data.code === 200){
                    localStorage.setItem('user',JSON.stringify(res.data.data[0]))
                    context.commit('setUser',res.data)
                }
            })
        }
    },
    mutations:{
        setUser(state,data){
            state.user = data
        },
        //更换主题
        setTheme(state,data){
            state.user_theme = data
        }
    }
}