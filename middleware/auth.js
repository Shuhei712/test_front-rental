export default ({ store, route, redirect }) => {
  const token = store.getters['auth/getAuthToken']
  const loginID = store.getters['auth/getUser']
  if (!token || !loginID) {
    console.log('not member')

    if (route.path.match(/myaccount/)) {
      redirect('/login')
    }
  } else if (route.path.match(/login/)||route.path.match(/register/)) {
    redirect('/myaccount')
  }
}
