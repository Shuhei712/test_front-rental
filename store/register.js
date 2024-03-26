export const state = () => ({
  formInfo: {},
  formErr: null,
  formFile: [],
})
export const mutations = {
  setFormInfo(state, val) {
    state.formInfo = val
  },
  setFormFile(state, val) {
    state.formFile = val
  },
  setFormErr(state, val) {
    state.formErr = val
  },
  deleteInfo(state) {
    state.formInfo = {}
    state.formErr = null
    state.formFile = []
  },
  deleteErr(state) {
    state.formErr = null
  },
}
export const getters = {
  getFormInfo(state) {
    return state.formInfo
  },
  getFormFile(state) {
    return state.formFile
  },
  getFormErr(state) {
    return state.formErr
  },
}
