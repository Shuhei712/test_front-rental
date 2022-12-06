
export default async({ store, route, redirect, $memberAxios,}) =>{
  const token = store.getters["auth/getAuthToken"]
  const loginID = store.getters["auth/getUser"]

  const checkToken = async()=>{
    const res = await $memberAxios.get(`/auth/tokenCheck/${loginID}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)
    return res
  }
  const getAccessToken = async()=>{
    const res = await $memberAxios.get(`/auth/getAccessToken/${loginID}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)
    return res
  }
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

  if (!token || !loginID) {
    console.log('not member')
    if (route.path.match(/myaccount/)) {
      redirect('/login');
    }
  } else {
    console.log('member')
    const resCheckToken = await checkToken()
    if(resCheckToken.data.Status === 'TRUE'){
      const resGetAccessToken = await getAccessToken()
      if(resGetAccessToken.data.Status === 'TRUE'){
        store.commit("auth/setAccessToken", resGetAccessToken.data.AccessToken)
        const resGetLoginInfo = await getLoginInfo()
        if( resGetLoginInfo.data.Status === 'TRUE' && route.path === '/login'){
          redirect('/');
        }else if(resGetLoginInfo.data.Status === 'FALSE'){
          store.commit("auth/setAuthToken", '')
          redirect('/login');
        }
      }
    }else{
      console.log('invalid token')
      store.commit("auth/setAuthToken", '')
      redirect('/login');
    }
  }
}