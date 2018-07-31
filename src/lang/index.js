/**
 * 国际化语言切换模块
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: localStorage.getItem('lang') || 'zh', // 语言标识
  messages: {
    'zh': require('./zh.js'), // 中文语言包
    'en': require('./en.js') // 英文语言包
  }
});

export default i18n;
