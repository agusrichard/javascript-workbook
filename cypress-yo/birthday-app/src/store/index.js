import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    levels: [true, false, false, false, false, false],
    hope: ''
  },
  mutations: {
    setLevels(state, index) {
      console.log('mutations index', index)
      const newLevels = [...state.levels]
      newLevels[index] = true
      state.levels = newLevels
    },
    setHope(state, hope) {
      state.hope = hope
    },
    reset(state) {
      state.levels = [true, false, false, false, false, false]
      state.hope = ''
    }
  },
  actions: {
    setLevels({ commit }, payload) {
      commit('setLevels', payload.index)
    },
    setHope({ commit }, payload) {
      commit('setHope', payload.hope)
    },
    reset({ commit }) {
      commit('reset')
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
