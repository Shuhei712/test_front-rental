
export default ({ store, route, redirect, $memberAxios,$checkToken,$getAccessToken}) =>{
  const token = store.getters["auth/getAuthToken"]
  const loginID = store.getters["auth/getUser"]

  const getLoginInfo = async()=>{
    const accessToken = store.getters["auth/getAccessToken"]
    const res = await $memberAxios.get(`/auth/loginInfo/${loginID}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log(res.data)
    return res
  }
  if (process.server) {
    console.log('SSR')
    alert('SSR')
    // SSRでの認証
  } else {
    // CSRでの認証処理
    console.log(process.server)
  }

  if (!token || !loginID) {
    console.log('not member')

    if (route.path.match(/myaccount/)) {
      redirect('/login');
    }
  } else {
    console.log('member')
    if (route.path.match(/login/)) {
      redirect('/myaccount');
    }

    // const resCheckToken = await $checkToken()
    // if(resCheckToken.data.Status === 'TRUE'){
    //   const resGetAccessToken = await $getAccessToken()
    //   if(resGetAccessToken.data.Status === 'TRUE'){
    //     store.commit("auth/setAccessToken", resGetAccessToken.data.AccessToken)
    //     const resGetLoginInfo = await getLoginInfo()
    //     if( resGetLoginInfo.data.Status === 'TRUE' && route.path === '/login'){
    //       redirect('/');
    //     }else if(resGetLoginInfo.data.Status === 'FALSE'){
    //       store.dispatch('auth/resetUser')
    //       redirect('/login');
    //     }
    //   }
    // }else{
    //   console.log('invalid token')
    //   store.dispatch('auth/resetUser')
    //   if(route.path !== '/login'){
    //     redirect('/login');
    //   }
    // }
  }
}