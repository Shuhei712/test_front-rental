export default ({ store, route, redirect }) => {
  const token = store.getters['auth/getAuthToken']
  const loginID = store.getters['auth/getUser']
  if (!token || !loginID) {
    console.log('not member')

    if (route.path.match(/myaccount/)||route.path.match(/setpassword/)) {
      store.commit('referrer/setPath', route.path)
      redirect('/login')
    } else if (route.path!=="/login"){
      // ログイン以外はリファラリセット
      const beforePath = store.getters["referrer/getPath"]
      if (beforePath) store.commit('referrer/setPath', null)
    }
  } else if (route.path==="/login"||route.path==="/register"||route.path.match(/activate/)||route.path.match(/forgetpassword/)) {
    redirect('/myaccount')
  }
  if (route.path === '/guide') {
    // /guide/rentalにリダイレクト
    return redirect('/guide/rental');
  }
}
