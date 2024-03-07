<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="お取引登録票フォーム 入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="input__inner py-16 px-3 px-lg-0">
      <ValidationObserver v-slot="ObserverProps" ref="observer">
        <v-form class="form">
          <!-- {{ userJson }} -->
          <NonMemForm :user.sync="userJson" :file.sync="fileArr" :valid.sync="isValid" :read="read"></NonMemForm>

          <div class="text-center mt-6">
            <v-btn large
              :disabled="ObserverProps.invalid||isValid"
              class="my-4 mx-2 white--text"
              color="primary"
              @click="confirm()"
            >確認</v-btn>
          </div>
        </v-form>
      </ValidationObserver>
    </div>
  </section>
</template>
<script>
export default {
  middleware({from,store}){
    if (from.path !== '/nonmember-register/corporate/confirm') {
      store.commit('register/deleteInfo')
    }
  },
  data() {
    return {
      breadCrumbs: [],
      userJson: {"BUSS_CONTENT":[],"invoiceFlg": 'あり','BILLING_ACCEPT':''},
      fileArr: [],
      read: false,
      isValid: false
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    const storeInfo = this.$store.getters['register/getFormInfo']
    const storeFile = this.$store.getters['register/getFormFile']
    this.$store.commit('register/deleteErr', true)
    if (storeInfo.NAME) this.userJson = JSON.parse(JSON.stringify(storeInfo))
    if (storeFile.length) this.fileArr = structuredClone(storeFile)
    // console.log('FILe=',storeInfo,storeFile,this.fileArr)
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "お取引登録票フォーム",
      meta: [
        { hid: 'description', name: 'description', content: 'お取引登録票フォーム | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'お取引登録票フォーム 入力', path: '/nonmember-register/corporate/input' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    confirm() {
      this.$store.commit('register/setFormInfo', this.userJson)
      this.$store.commit('register/setFormFile', this.fileArr)
      this.$router.push('/nonmember-register/corporate/confirm')
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
