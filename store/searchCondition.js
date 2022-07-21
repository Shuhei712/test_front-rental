export const state = () => ({
  conditionInfo: {},
  conditionFlg: false,
  keyword: '',
})

export const mutations = {
  addInfo(state, info) {
    state.conditionInfo = {}
    state.conditionInfo = info
    state.conditionFlg = true
  },
  addKeyword(state, keyword) {
    state.keyword = keyword
  },
  deleteInfo(state) {
    state.conditionInfo = {}
    state.conditionFlg = false
  },
}

export const getters = {
  getInfo(state) {
    return state.conditionInfo
  },
  getKeyword(state) {
    return state.keyword
  },
  getConditionFlg(state) {
    return state.conditionFlg
  },
}
