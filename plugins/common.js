import axios from 'axios'

export default ({store, $config}, inject) => {

  const memberAxios = axios.create({
    baseURL: $config.MEMBER_API_URL
  })
  inject('memberAxios', memberAxios)
  const token = store.getters["auth/getAuthToken"]
  const loginID = store.getters["auth/getUser"]

  const checkToken = async()=>{
    const res = await memberAxios.get(`/auth/tokenCheck/${loginID}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)
    return res
  }
  inject('checkToken', checkToken)
  const getAccessToken = async()=>{
    const res = await memberAxios.get(`/auth/getAccessToken/${loginID}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    store.commit('auth/setAccessToken', res.data.AccessToken)
    console.log(res)
    return res
  }
  inject('getAccessToken', getAccessToken)
}
