export const state = () => ({
  cart: [],
})

export const mutations = {
  addCart(state, {ProductID, Qty}) {
    const isList = state.cart.some((list) => list.ProductID === ProductID)
    if (isList){
      const cartItem = state.cart.find(item => item.ProductID === ProductID)
      cartItem.Qty+=Qty
    }else{
      state.cart.push({ ProductID, Qty})
    }
  },
  deleteItem(state, ProductID) {
    const index = state.cart.findIndex(item => item.ProductID === ProductID)
    state.cart.splice( index, 1 )
  },
  changeQuantity(state, {ProductID, qty}){
    const index = state.cart.findIndex(item => item.ProductID === ProductID)
    state.cart[index].Qty = qty
  },
  resetCart(state) {
    state.cart = []
  },
}

export const getters = {
  getCart(state) {
    return state.cart
  },
}
export const actions = {
  addCart({ commit }, lists) {
    commit('addCart', lists)
  },
  // removeCart({ commit }) {
  //   commit('removeCart')
  // },
}