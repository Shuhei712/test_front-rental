export const state = () => ({
  path: null,
})

export const mutations = {
  setPath(state, path) {
    state.path = path
  },
}

export const getters = {
  getPath(state) {
    return state.path
  },
}
