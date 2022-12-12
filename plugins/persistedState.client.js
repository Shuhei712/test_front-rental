import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'takenaka-rental',
    // storage: window.sessionStorage,
  })(store)
}
