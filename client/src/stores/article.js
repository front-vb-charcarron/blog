import {
    api_addArticle,
    api_getArticle
} from "@/api";
import { Message } from 'element-ui';

export default {
    state: {
        articles: []
    },
    mutations: {
        SET_ARTICLES(state, res) {
            state.articles = res;
        }
    },
    actions: {
        getAllArticle({ commit }) {
            return new Promise((resolve, reject) => {
                api_getArticle().then(res => {
                    commit('SET_ARTICLES', res);
                    resolve();
                }).catch(err => reject(err));
            })
        },
        addArticle({ commit }, articleInfo) {
            return new Promise((resolve, reject) => {
                api_addArticle(articleInfo).then(res => {
                    console.log('data', res.data);
                    const { type, message, code } = res.data;
                    if (code = 200) {

                    }

                    Message({
                        type,
                        message
                    });

                    resolve();

                }).catch(err => reject(err));
            })
        }
    },
    getters: {
        articles: state => state.articles
    }
}