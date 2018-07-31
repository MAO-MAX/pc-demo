import Vue from 'vue';
import App from './App';
import router from './router/index.js';
import store from './store/index.js';

// element-ui组件模块
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// i18n国际化语言插件
import i18n from './lang/index.js';

// mock数据模块
require('./mock/index.js');

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
