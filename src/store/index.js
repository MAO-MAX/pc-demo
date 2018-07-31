import Vue from 'vue'
import Vuex from 'vuex'
import {
  SET_HEADER
} from './mutationTypes.js'

Vue.use(Vuex)

const state = {
    test: {
        a: 1
    },
    info: {}
}

const mutations = {
    [SET_HEADER](state, data) {
        state.info = data
    }
}

const actions = {
}

export default new Vuex.Store({
    strict: true, // 请确保在发布环境下关闭严格模式，以避免性能损失。
    state,
    mutations,
    actions
})
