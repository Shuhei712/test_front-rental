export const state = () => ({
  loading: false,
})

export const mutations = {
  changeStatus(state, value) {
    state.loading = value
  },
}

export const getters = {
  getStatus(state) {
    return state.loading
  },
}
