export const state = () => ({
  menuLists: [],
})

export const mutations = {
  setLists(state, lists) {
    state.menuLists = lists
  },
}

export const getters = {
  getLists(state) {
    return state.menuLists
  },
}

export const actions = {
  async getLists({ commit }) {
    const param = new URLSearchParams()
    param.append('ProjectKey', this.$config.PROJECT_KEY)
    param.append('LangType', this.$config.LANG_JAPANESE)
    const res = await this.$axios.$post('get_menu_list.php', param)
    console.log(res)
    commit('setLists', res.MenuRootList)
  },
}
