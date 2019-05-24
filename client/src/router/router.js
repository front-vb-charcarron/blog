import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import argsCollector from '../utils/argsCollector';
// import {
//   getToken
// } from '@/utils/auth';
import store from '@/stores/store';

Vue.use(Router)  

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  // scrollBehavior(to, from, savedPosition) {
  // }
})

router.beforeEach((to, from, next) => {
  // 缓存取router.params参数
  argsCollector.deal(to, from);
  store.dispatch('setRoute', to);

  console.log('router change!!');

  if (to.meta.requireAuth) {
    console.log('token', store.getters.token);

    if (store.getters.token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }

});

router.afterEach((to, from) => {
  // 缓存存router.params参数
  argsCollector.set(to.params);
});

export default router;