import Index from '@/views/Index.vue';
import Home from '@/views/Home.vue';
import game from '@/views/game/game.vue';
import Article from '@/views/Article.vue';
import WriteArticle from '@/views/WriteArticle.vue';
import ShowArticle from '@/views/ShowArticle.vue';
import Login from '@/views/Login.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [{
    path: '/',
    redirect: '/index',
    meta: {
      keepAlive: true
    },
  },
  {
    path: '/index',
    // component: () => import( /* webpackChunkName: "index" */ '@/views/Index.vue'),
    component: Index,
    redirect: '/index/home',
    meta: {
      keepAlive: true,
      requireAuth: true,
      name: 'index',
      icon: 'iconfont icon-home' // iconfont 类名
    },
    children: [{
        path: '/index/home',
        name: 'home',
        // component: () => import( /* webpackChunkName: "home" */ '@/views/Home.vue'),
        component: Home,
        meta: {
          keepAlive: true,
          requireAuth: true,
          name: 'home',
          icon: 'iconfont icon-home'
        }
      },
      // {
      //   path: 'note',
      //   name: 'note',
      //   component: () => import( /* webpackChunkName: "note" */ '@/views/Note.vue'),
      //   meta: {
      //     keepAlive: true,
      //     requireAuth: true,
      //     name: 'note',
      //     icon: 'iconfont icon-bi'
      //   }
      // },
      {
        path: '/index/game',
        name: 'game',
        // component: () => import( /* webpackChunkName: "game" */ '@/views/game/game.vue'),
        component: game,
        meta: {
          keepAlive: true,
          requireAuth: true,
          name: 'game',
          icon: 'iconfont icon-iconfontyouxihudong'
        }
      },
      {
        path: '/index/article',
        name: 'article',
        meta: {
          name: 'article',
          icon: 'iconfont icon-bi',
          keepAlive: true,
          requireAuth: true,
        },
        redirect: '/index/article/writeArticle',
        // component: () => import( /* webpackChunkName: "article" */ '@/views/Article.vue'),
        component: Article,
        children: [{
          path: '/index/article/writeArticle',
          name: 'writeArticle',
          meta: {
            name: 'writeArticle',
            icon: 'iconfont icon-bi',
            keepAlive: true,
            requireAuth: true,
          },
          // component: () => import( /* webpackChunkName: "writeArticle" */ '@/views/WriteArticle.vue')
          component: WriteArticle
        }]
      }
    ]
  },
  {
    path: '/index/article/showArticle',
    name: 'showArticle',
    meta: {
      name: 'showArticle',
      icon: 'iconfont icon-bi',
      keepAlive: true,
      requireAuth: true,
      notAllow: true
    },
    // component: () => import( /* webpackChunkName: "showArticle" */ '@/views/ShowArticle.vue')
  component: ShowArticle
  },
  {
    path: '/login',
    name: 'login',
    // component: () => import( /* webpackChunkName: "login" */ '@/views/Login.vue'),
    component: Login
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound
    // component: () => import( /* webpackChunkName: "notFound" */ '@/views/NotFound.vue')
  }
];

export default routes;