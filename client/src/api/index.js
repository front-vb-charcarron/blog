
import request from '@/utils/request';

// 登录
export const api_login = params => request.post('login', params);

// 添加文章
export const api_addArticle = params => request.post('add/article', params);

// 获取文章
export const api_getArticle = params => request.post('get/article', params);

// 获取所有文章
export const api_getAllArticles = params => request.post('get/all/articles', params);



