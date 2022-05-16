export const state = () => ({
  breadCrumbsLists: [],
})

export const mutations = {
  addList(state, { name, path }) {
    const isList = state.breadCrumbsLists.some((list) => list.name === name)
    if (!isList) state.breadCrumbsLists.push({ name, path })
  },
  deleteList(state) {
    state.breadCrumbsLists = []
  },
}

export const getters = {
  getLists(state) {
    return state.breadCrumbsLists
  },
}
