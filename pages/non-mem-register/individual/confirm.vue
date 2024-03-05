<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="ご入会申込書フォーム 確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="input__inner py-16 px-3 px-lg-0">
      <loading v-if="isLoading"></loading>
        <v-form class="form">

          <NonMemForm :user.sync="userJson" :file.sync="fileArr" :read="read" @mailText="mailText=$event"></NonMemForm>
          <div class="text-center mt-6">
            <v-btn large
              class="my-4 mx-2 white--text"
              color="secondary"
              @click="$router.push('/non-mem-register/individual/input')"
            >戻る</v-btn>
            <v-btn large
              class="my-4 mx-2 white--text"
              color="primary"
              @click="submit()"
            >送信</v-btn>
          </div>
          {{mailText}}
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
      contentKey: 'Contact_MemberRegist',
      url: 'https://contact-form-test.takenaka-co.co.jp/',
      isLoading: false,
      mailText: ''
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.userJson = this.$store.getters['register/getFormInfo']
    this.fileArr = this.$store.getters['register/getFormFile']
    if(!this.userJson.NAME) this.$router.push('/non-mem-register/individual/input')
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "ご入会申込書フォーム 確認",
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
      this.$store.commit('breadCrumbs/addList', { name: 'ご入会申込書フォーム', path: '/non-mem-register/individual/confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async submit() {
      this.isLoading = true
      const accessKey = await this.getAccessKey()
      const uploadKey = await this.registerFile(accessKey)
      if (uploadKey) await this.registerInfo(accessKey, uploadKey)
      this.$router.push('/non-mem-register/individual/complete')
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
      const postFileArr = this.$sameFileNameCheck(this.fileArr)
      postFileArr.forEach((file)=>{
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
      param.append('AccessKey', accessKey)
      param.append('UploadKey', uploadKey)
      console.log(this.mailText)
      param.append('MailText', this.mailText)
      for (const key in this.userJson) {
        param.append(key, this.userJson[key])
      }
      let fileCnt = 0
      const postFileArr = this.$sameFileNameCheck(this.fileArr)
      postFileArr.forEach((file)=>{
        if(!file) return
        fileCnt++
        param.append(`UPLOAD_FILE_NAME_${fileCnt}`, file.name)
      })
      const res = await this.$axios.post(`${this.url}access_contact_attach_on_mailtext.php`, param, {
      // const res = await this.$axios.post(`${this.url}access_contact_attach.php`, param, {
        timeout: 15000,
      })
      if (res.data.Status!=='TRUE') {
        this.setErr(res)
      }
    },
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
