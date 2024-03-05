import axios from 'axios'

export default ({ store, $config, redirect, route, app }, inject) => {
  app.router.afterEach((to, from) => {
    const loginID = store.getters['auth/getUser']
    if (loginID) getCartNum()
  })
  window.addEventListener('storage', function(e) {
    const newVal = JSON.parse(e.newValue)
    const oldVal = JSON.parse(e.oldValue)
    const keyFlg = e.key === 'takenaka-rental'
    if(keyFlg && oldVal.auth.authToken && !newVal.auth.authToken){
      // console.log(newVal, newVal.auth.authToken)
      store.dispatch('auth/resetUser')
      console.log('logout',route.path,)
      if (route.path.match(/myaccount/)) {
        redirect('/login')
      }
    }
  })

  const memberAxios = axios.create({
    baseURL: $config.MEMBER_API_URL,
  })
  inject('memberAxios', memberAxios)

  const memberBaseAxios = axios.create({
    baseURL: $config.MEMBER_API_BASE_URL,
  })
  inject('memberBaseAxios', memberBaseAxios)

  const checkToken = async () => {
    const token = store.getters['auth/getAuthToken']
    const loginID = store.getters['auth/getUser']
    const res = await memberAxios.get(`/auth/tokenCheck/${loginID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if ($config.DEBUG_MODE) {
      console.log(res.data)
    }
    if (res.data.Status === 'FALSE') {
      // alert('AuthKey Err:' + res.data.ErrorInfo)
      store.dispatch('auth/resetUser')
      location.reload()
    }
    return res
  }
  inject('checkToken', checkToken)

  const checkMailToken = async (token) => {
    const res = await memberAxios.get(`/auth/checkMailToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data.Status === 'FALSE' ? res.data.ErrorNo : ''
  }
  inject('checkMailToken', checkMailToken)

  const getAccessToken = async () => {
    const token = store.getters['auth/getAuthToken']
    const loginID = store.getters['auth/getUser']
    const res = await memberAxios.get(`/auth/getAccessToken/${loginID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    store.commit('auth/setAccessToken', res.data.AccessToken)
    if ($config.DEBUG_MODE) {
      console.log(res)
    }
    if (res.data.Status === 'FALSE') {
      store.dispatch('auth/resetUser')
      if (route.path.match(/myaccount/)) {
        redirect('/sessionErr')
      } else {
        location.reload()
      }
      return false
    }
    return res
  }
  inject('getAccessToken', getAccessToken)

  const getDisplayInfo = async (num) => {
    const token = store.getters['auth/getAccessToken']
    const loginID = store.getters['auth/getUser']
    const param = new URLSearchParams()
    param.append('LoginID', loginID)
    param.append('DisplayKey', num)
    const res = await memberBaseAxios.post(`comm/getDispSelectData`, param, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.data.Status === 'TRUE') {
      return res.data.DispSelectItemList
    } else if (res.data.ErrorNo === 100002) {
      // access認証token有効期限切れ
      const res = await getAccessToken()
      if (res) return getDisplayInfo(num)
    }
  }
  inject('getDisplayInfo', getDisplayInfo)

  const getLoginInfo = async () => {
    const token = store.getters['auth/getAccessToken']
    const loginID = store.getters['auth/getUser']
    const res = await memberAxios.get(`auth/loginInfo/${loginID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res)
    if (res.data.Status === 'TRUE') {
      return res.data.AccountInfo
    } else if (res.data.ErrorNo === 100002) {
      // access認証token有効期限切れ
      const res = await getAccessToken()
      if (res) return getLoginInfo()
    }
  }
  inject('getLoginInfo', getLoginInfo)

  const getUserInfo = async () => {
    const accessToken = store.getters['auth/getAccessToken']
    const loginID = store.getters['auth/getUser']
    const loginInfo = await getLoginInfo()
    const param = new URLSearchParams()
    param.append('LoginID', loginID)
    const res = await memberBaseAxios.post(`/member/getInfo/${loginInfo.MemberID}`, param, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if ($config.DEBUG_MODE) {
      console.log(res)
    }
    if (res.data.Status === 'TRUE') {
      return res.data.MemberInfo
    } else if (res.data.ErrorNo === 100002) {
      // access認証token有効期限切れ
      const res = await getAccessToken()
      if (res) return getUserInfo()
    }
  }
  inject('getUserInfo', getUserInfo)

  const getCartNum = async () => {
    const token = store.getters['auth/getAccessToken']
    const loginID = store.getters['auth/getUser']
    const res = await memberBaseAxios.get(`order/getCartProductCount/${loginID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if ($config.DEBUG_MODE) {
      console.log(res)
    }
    if (res.data.Status === 'TRUE') {
      store.commit('cart/changeCartNum', res.data.Count)
    } else if (res.data.ErrorNo === 100002) {
      const res = await getAccessToken()
      if (res) return getCartNum()
    }
  }
  inject('getCartNum', getCartNum)

  const sameFileNameCheck = (fileArr) => {
    const newFileArr = structuredClone(fileArr)
    const nameArr = []
    newFileArr.forEach((file,index)=>{
      if (!file) return
      const fileName = file.name
      if (!nameArr[fileName]) {
        nameArr[fileName] = []
      }
      nameArr[fileName].push(index)
    })
    Object.keys(nameArr).forEach(name => {
      const arr = nameArr[name]
      if (arr.length > 1) {
        arr.forEach((fileIndex,index)=>{
          if (index === 0) return
          const file = newFileArr[fileIndex]
          const name = file.name.split('.')[0]
          const extension = file.name.split('.').pop()
          const newName = `${name}(${index}).${extension}`
          const blob = file.slice(0, file.size, file.type)
          // ファイル名称変更後のファイルオブジェクト
          const renamedFile = new File([blob], newName, {type: file.type})
          newFileArr[fileIndex] = renamedFile
        })
      }
    })
    return newFileArr
  }
  inject('sameFileNameCheck', sameFileNameCheck)

  // ('会員お問い合わせ', '登録', res.data.Status)
  const setLog = async (display, action, info) => {
    const token = store.getters['auth/getAccessToken']
    const loginID = store.getters['auth/getUser']
    const param = new URLSearchParams()
    param.append('LoginID', loginID)
    param.append('DisplayName', display)
    param.append('ActionName', action)
    param.append('ActionParam', route.path)
    param.append('ActionInfo', info)
    param.append('ActionMemo', '')

    const res = await memberBaseAxios.post(`log/setOperateLog`, param, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res)
    if (res.data.Status === 'TRUE') {
      return true
      // }else if(res.data.ErrorNo===100002){
      //   // access認証token有効期限切れ
      //   const resToken = await getAccessToken()
      //   return setLog(display, action, info)
    }
  }
  inject('setLog', setLog)
}
