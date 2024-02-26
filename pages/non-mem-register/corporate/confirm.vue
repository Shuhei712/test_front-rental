<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="お取引登録票フォーム 確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="input__inner py-16 px-3 px-lg-0">
      <loading v-if="isLoading"></loading>
        <v-form class="form">

          <NonMemForm :user.sync="userJson" :file.sync="fileArr" :read="read"></NonMemForm>
          <div class="text-center mt-6">
            <v-btn large
              class="my-4 mx-2 white--text"
              color="secondary"
              @click="$router.push('/non-mem-register/corporate/input')"
            >戻る</v-btn>
            <v-btn large
              class="my-4 mx-2 white--text"
              color="primary"
              @click="submit()"
            >送信</v-btn>
          </div>
        </v-form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      breadCrumbs: [],
      userJson: {},
      fileArr: [],
      read: true,
      contentKey: 'Contact_TranRegist',
      url: 'https://contact-form-test.takenaka-co.co.jp/',
      isLoading: false
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.userJson = this.$store.getters['register/getFormInfo']
    this.fileArr = this.$store.getters['register/getFormFile']
    if(!this.userJson.NAME) this.$router.push('/non-mem-register/corporate/input')
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "お取引登録票フォーム 確認",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'お取引登録票フォーム', path: '/non-mem-register/corporate/confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async submit() {
      this.isLoading = true
      const accessKey = await this.getAccessKey()
      const uploadKey = await this.registerFile(accessKey)
      if (uploadKey) await this.registerInfo(accessKey, uploadKey)
      this.$router.push('/non-mem-register/corporate/complete')
      this.isLoading = false
    },
    async getAccessKey(){
      const param = new URLSearchParams()
      param.append('ContentsKey', this.contentKey)
      param.append('UserAgent', navigator.userAgent)
      const res = await this.$axios.$post(`${this.url}get_access_key.php`, param)
      return res.AccessKey
    },
    setErr(errInfo){
      this.$store.commit('register/setFormErr', errInfo.data)
      return false
    },
    async registerFile(accessKey){
      const formData = new FormData()
      let fileCnt = 0
      this.fileArr.forEach((file)=>{
        if(!file) return
        fileCnt++
        formData.append(`File0${fileCnt}`, file)
      })
      formData.append('ContentsKey', this.contentKey)
      formData.append('AccessKey', accessKey )
      formData.append('FileCnt', fileCnt )
      const res = await this.$axios.post(`${this.url}upload_attachment.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data;charset=UTF-8",
        },
        timeout: 15000,
      })
      if(res.data.Status==='TRUE'){
        return res.data.UploadKey
      }else{
        return this.setErr(res)
      }
    },
    async registerInfo(accessKey, uploadKey){
      const param = new URLSearchParams()
      param.append('ContentsKey', this.contentKey)
      param.append('AccessKey', accessKey )
      param.append('UploadKey', uploadKey )
      const excludedKeys = ['invoiceFlg', 'billingOther']
      const skipCondition = key =>
        excludedKeys.includes(key) ||
        (this.userJson.CORPORATE_CLASS !== '非上場' && ['CAPITAL', 'ANNUAL_SALES_1', 'ANNUAL_SALES_2', 'NUM_EMP'].includes(key)) ||
        (this.userJson.invoiceFlg === 'なし' && ['BILLING_EMAIL_1', 'BILLING_EMAIL_2', 'BILLING_EMAIL_3', 'BILLING_EMAIL_4'].includes(key))
      for (const key in this.userJson) {
        if (skipCondition(key)) continue
        param.append(key, this.paramVal(key))
      }
      let fileCnt = 0
      this.fileArr.forEach((file)=>{
        if(!file) return
        fileCnt++
        param.append(`UPLOAD_FILE_NAME_${fileCnt}`, file.name)
      })
      const res = await this.$axios.post(`${this.url}access_contact_attach.php`, param, {
        timeout: 15000,
      })
      if (res.data.Status!=='TRUE') {
        this.setErr(res)
      }
    },
    paramVal(key){
      if (key === 'BUSS_CONTENT') return this.userJson[key].join('、')
      else if (key === 'BILLING_ACCEPT' && this.userJson.invoiceFlg === 'あり'){
        return '電子請求書受信メールアドレスに送信'
      } else if (key === 'BILLING_ACCEPT' && this.userJson[key] === 'その他') {
        return 'その他:' + this.userJson.billingOther
      }
      return this.userJson[key]
    }
  },
}
</script>
<style lang="scss" scoped>
@import 'assets/css/common.scss';
.form{
  max-width: 746px;
  margin: auto;
}
</style>
