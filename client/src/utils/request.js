import axios from 'axios';
import env from '@/api/env';
import { Message } from 'element-ui';
import store from '@/stores/store';
import router from '@/router/router';
import { removeToken } from '../utils/auth';
import { isMobile } from '@/utils/isMobile';

const ENV = process.env.NODE_ENV === 'production' ? env.PROD_ENV : env.TEST_ENV;
console.log('ENV: ', ENV);

const service = axios.create({
    baseURL: ENV,
    timeout: 5000,
    origin: ENV
});

service.interceptors.request.use(config => {
    // token绑在请求头上
    config.headers['token'] = store.getters.token;
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

service.interceptors.response.use(response => {
    console.log('response', response);
    if (response.data.code === 401) {
        removeToken();
        router.replace({ path: '/login', query: { redirect: router.currentRoute.fullPath } });
    }
    return response;
}, error => {
    console.log('err', error);

    Message({
        type: 'error',
        message: error.message,
        duration: 500 * 1000,
        customClass: isMobile() ? 'my-message' : '' // 根据不同的平台显示不同的 message 组件样式
    });
    
    return Promise.reject(error);
});

export default service;