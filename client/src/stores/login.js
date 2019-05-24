import { setToken, getToken } from '@/utils/auth';
import { api_login } from "@/api";
import { message } from '@/utils/message';

export default {
    state: {
        token: getToken(),
        routeDetail: {}
    },
    mutations: {
        SET_TOKEN(state, res) {
            state.token = res;
        },
        SET_ROUTE(state, res) {
            state.routeDetail = res;
        }
    },
    actions: {
        // 请求token后设置token然后跳转到login页
        requestToken({
            commit
        }, userInfo) {
            return new Promise((resolve, reject) => {
                api_login(userInfo).then(res => {
                    const { token, type, msg } = res.data;

                    if (res.data.code === 200) {
                        if (res.data.token) {
                            commit('SET_TOKEN', token);
                            setToken(token);
                        }

                        message(type, msg);

                        resolve();
                    }
                }).catch(err => reject(err));

            });
        },
        setRoute({
            commit
        }, routeInfo) {
            console.log('ROUTEINFO', routeInfo);
            commit('SET_ROUTE', routeInfo);
        }
    },
    getters: {
        token: state => state.token,
        routeDetail: state => state.routeDetail
    },
}