export const state = () => ({
  categoryLists: [],
})

export const mutations = {
  setLists(state, lists) {
    state.categoryLists = lists
  },
}

export const getters = {
  getLists(state) {
    return state.categoryLists
  },
}

export const actions = {
  async getLists({ commit }) {
    const param = new URLSearchParams()
    param.append('ProjectKey', this.$config.PROJECT_KEY)
    param.append('LangType', this.$config.LANG_JAPANESE)
    const res = await this.$axios.$post('get_category_list.php', param)
    commit('setLists', res.CategoryRootList)
  },
}
