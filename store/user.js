export const state = () => ({
  user: {},
  userFlg: false,
  userErr: false
})

export const mutations = {
  setUser(state, lists) {
    state.user = lists
    state.userFlg = true
  },
  setUserErr(state, flg) {
    state.userErr = flg
  },
  removeUser(state) {
    state.user = {}
    state.userFlg = false
    state.userErr = false
  },
}

export const getters = {
  getUser(state) {
    return state.user
  },
  getUserErr(state) {
    return state.userErr
  },
}
export const actions = {
  addUser({ commit }, lists) {
    // commit('remove')
    commit('setUser', lists)
  },
  removeUser({ commit }) {
    commit('removeUser')
  },
}