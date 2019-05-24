import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './stores/store';
import 'element-ui/lib/theme-chalk/index.css';
import './iconfont/iconfont.css';
import '@/styles/index.scss';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import {
  Button,
  Input,
  Header,
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuItem,
  Row,
  Col,
  Submenu,
  Upload
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(Header);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Submenu);
Vue.use(Upload);

Vue.use(mavonEditor);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

