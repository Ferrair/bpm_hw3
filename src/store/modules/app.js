// initial state
const state = {
  isLogin: false,
  role: ''
}

// getters.js
const getters = {}

// actions
const actions = {
  changeLoginState ({commit}, isLogin) {
    commit('changeLoginState', isLogin)
  },
  changeRole ({commit}, role) {
    commit('changeRole', role)
  }
}

// mutations
const mutations = {
  changeLoginState (state, isLogin) {
    state.isLogin = isLogin
  },
  changeRole (state, role) {
    state.role = role
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
