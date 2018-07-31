import Vue from 'vue';
import Vuex from 'vuex';
import {
  SET_LANG
} from './mutationTypes.js';

Vue.use(Vuex);

const state = {
  lang: 'cn'
};

const mutations = {
  [SET_LANG](state, data) {
    state.lang = data;
  }
};

const actions = {};

export default new Vuex.Store({
  // strict: true, // 请确保在发布环境下关闭严格模式，以避免性能损失。
  state,
  mutations,
  actions
});
