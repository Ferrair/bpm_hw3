import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  getters,
  modules: {
    app
  }
})
export default store
