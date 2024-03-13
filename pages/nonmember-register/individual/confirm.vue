<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="ご入会申込書フォーム 確認" :bread-crumbs="breadCrumbs"></top-bar>
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
            @click="$router.push('/nonmember-register/individual/input')"
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
      contentKey: 'Contact_MemberRegist',
      url: 'https://contact-form-test.takenaka-co.co.jp/',
      path: '/nonmember-register/individual',
      mailText: '',
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.userJson = this.$store.getters['register/getFormInfo']
    this.fileArr = this.$store.getters['register/getFormFile']
    if(!this.userJson.NAME) this.$router.push('/nonmember-register/individual/input')
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
      this.$store.commit('breadCrumbs/addList', { name: 'ご入会申込書フォーム', path: '/nonmember-register/individual/confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async submit() {
      await this.$refs.form.submit(this.contentKey, this.path)
    },
    async registerInfo({accessKey, uploadKey}){
      const param = new URLSearchParams()
      param.append('ContentsKey', this.contentKey)
      param.append('AccessKey', accessKey)
      param.append('UploadKey', uploadKey)
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
        timeout: 15000,
      })
      if (res.data.Status!=='TRUE') {
        this.$store.commit('register/setFormErr', res.data)
      }
      this.$router.push(`${this.path}/complete`)
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
