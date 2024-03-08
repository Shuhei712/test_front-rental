import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    paths: ['auth','breadcrumb','cart','category','menu','searchCondition','referrer'],
    key: 'takenaka-rental',
  })(store)
}
