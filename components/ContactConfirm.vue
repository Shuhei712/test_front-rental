<template>
  <div>

    <top-bar title="お問い合わせ 確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <v-container>
          <v-row class="my-1">
            <v-col cols="12" md="4" class="pb-0">お問い合わせの種類</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{ user.ContactType }}</v-card>
            </v-col>
          </v-row>

          <v-row class="my-1">
            <v-col cols="12" md="4" class="pb-0">お名前</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{ user.Name }}</v-card>
            </v-col>
          </v-row>

          <v-row class="my-1">
            <v-col cols="12" md="4" class="pb-0">お名前(カナ)</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{ user.NameKana }}</v-card>
            </v-col>
          </v-row>

          <v-row class="my-1">
            <v-col cols="12" md="4" class="pb-0">メールアドレス</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{ user.Email }}</v-card>
            </v-col>
          </v-row>

          <v-row class="my-1">
            <v-col cols="12" md="4" class="pb-0">注文番号</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border width-s">{{ user.OrderNo }}</v-card>
            </v-col>
          </v-row>

          <v-row class="my-1">
            <v-col cols="12" md="4" class="pb-0">お問い合わせ件名</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{ user.Subject }}</v-card>
            </v-col>
          </v-row>

          <v-row class="my-1">
            <v-col cols="12" md="4" class="pb-0">お問い合わせ内容</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border pre-wrap">{{ user.Inquiry }}</v-card>
            </v-col>
          </v-row>

          <div class="text-center mt-6">
            <v-btn
              class="my-4 mx-2 white--text"
              color="secondary"
              :disabled="loading"
              @click="$router.go(-2)"
            >戻る</v-btn>
            <v-btn
              class="my-4 mx-2"
              color="primary"
              :loading="loading"
              @click="register()"
            >送信</v-btn>
          </div>
        </v-container>
      </v-card>
    </div>

    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'フォームの送信'"
          :path="'/myaccount/other'"
          :dialog.sync="resultDialog">
        </result-card>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {

  props: {
    user:{
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      breadCrumbs: [],
      loading: false,
      result: null,
      resultDialog: false
    }
  },

  fetch() {
    this.$store.commit('loading/changeStatus', true)
    if(!this.user.Inquiry){
      this.$router.push('/myaccount/other/contact#input')
    }
    history.pushState(null, '', null)
    window.scrollTo({ top: 0 })
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  mounted(){
    window.addEventListener('popstate', this.popstateHook)
  },
  beforeDestroy(){
    window.removeEventListener('popstate', this.popstateHook)
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・お問い合わせ", path: "/myaccount/other" })
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ 確認', path: '/myaccount/other/contact#confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async register(){
      this.loading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      if(!this.user.NameKana) this.$set(this.user, 'NameKana', '')
      if(!this.user.OrderNo) this.$set(this.user, 'OrderNo', '')
      const userInfo = JSON.stringify(this.user);
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('JsonData', userInfo)
      const res = await this.$memberBaseAxios.post('contact/registInquiry', param,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員お問い合わせ', '申し込み', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.result = 'success'
        this.resultDialog = true
      }else if(res.data.ErrorNo===100002){
        const res = await this.$getAccessToken()
        if( res ) return this.register()
      }else{
        this.result = String(res.data.ErrorNo)
        this.resultDialog = true
      }
      this.loading = false
    },
    popstateHook(){
      history.pushState(null, '', null)
    }

  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/common.scss';
.register{
  &__inner{
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }
}
.row{
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.2rem;
}
.border{
  border: 1px solid $line;
}
.pre-wrap{
  white-space: pre-wrap;
}

.width-s{
  max-width: 225px;
}
</style>
