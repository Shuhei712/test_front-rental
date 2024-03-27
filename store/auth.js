export const state = () => ({
  authToken: null,
  accessToken: null,
  userID: null,
})

export const mutations = {
  setUser(state, value) {
    state.userID = value
  },
  resetUser(state) {
    state.userID = null
    state.authToken = null
    state.accessToken = null
  },
  setAuthToken(state, value){
    state.authToken = value
  },
  setAccessToken(state, value){
    state.accessToken = value
  }
}
export const getters = {
  getAuthToken(state) {
    return state.authToken
  },
  getAccessToken(state) {
    return state.accessToken
  },
  getUser(state) {
    return state.userID
  },
}
export const actions = {
  setUser({ commit }, value) {
    commit('setUser', value)
  },
  resetUser({ commit }) {
    commit('resetUser')
  },
}
