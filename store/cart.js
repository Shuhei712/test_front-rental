export const state = () => ({
  cartNum: null,
})

export const mutations = {
  changeCartNum(state, num) {
    state.cartNum = num
  },
  resetCartNum(state) {
    state.cartNum = null
  },
}

export const getters = {
  getCartNum(state) {
    return state.cartNum
  },
}
