import Vue from 'vue'
import Vuex from 'vuex'
import sidebar from '@/stores/sidebar';
import login from '@/stores/login';
import article from '@/stores/article';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    sidebar,
    article
  }
});