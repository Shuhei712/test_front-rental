
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

  if (!token || !loginID) {
    console.log('not member')

    if (route.path.match(/myaccount/)) {
      redirect('/login');
    }
  } else if (route.path.match(/login/)) {
      redirect('/myaccount');
  }
}