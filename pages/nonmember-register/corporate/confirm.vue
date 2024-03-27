<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="お取引登録票フォーム 確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="input__inner py-16 px-3 px-lg-0">
      <v-form class="form">

        <NonMemForm
          ref="form"
          :user.sync="userJson"
          :file.sync="fileArr" :read="read"
          @mailText="mailText=$event"
          @registerInfo="registerInfo($event)"
        ></NonMemForm>
        <div class="text-center mt-6">
          <v-btn large
            class="my-4 mx-2 white--text"
            color="secondary"
            @click="$router.push('/nonmember-register/corporate/input')"
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
      path: '/nonmember-register/corporate',
      mailText: '',
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.userJson = this.$store.getters['register/getFormInfo']
    this.fileArr = this.$store.getters['register/getFormFile']
    if(!this.userJson.NAME) this.$router.push('/nonmember-register/corporate/input')
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
      this.$store.commit('breadCrumbs/addList', { name: 'お取引登録票フォーム', path: '/nonmember-register/corporate/confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async submit() {
      await this.$refs.form.submit(this.contentKey, this.path)
    },
    async registerInfo({accessKey, uploadKey, url}){
      const param = new URLSearchParams()
      param.append('ContentsKey', this.contentKey)
      param.append('AccessKey', accessKey )
      param.append('UploadKey', uploadKey )
      param.append('MailText', this.mailText)
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
      const postFileArr = this.$sameFileNameCheck(this.fileArr)
      postFileArr.forEach((file)=>{
        if(!file) return
        fileCnt++
        param.append(`UPLOAD_FILE_NAME_${fileCnt}`, file.name)
      })
      const res = await this.$axios.post(`${url}access_contact_attach_on_mailtext.php`, param, {
        timeout: 15000,
      })
      if (res.data.Status!=='TRUE') {
        this.$store.commit('register/setFormErr', res.data)
      }
      this.$router.push(`${this.path}/complete`)
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
