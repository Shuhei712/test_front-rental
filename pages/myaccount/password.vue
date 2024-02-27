<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="パスワード変更" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 text-center">
      <p class="mb-4 text-left text-md-center">
        パスワード変更を選択いただくと、登録されているメールアドレスに、通知メールを送信いたします。<br>
        通知メールでお知らせするURLにアクセスいただくことで、パスワードの変更が可能となります。
      </p>
      <v-btn
        color="primary"
        class="mx-3"
        @click="passChange">
        パスワード変更
      </v-btn>
      <v-btn
        color="outline"
        class="mx-3 white--text"
        to="/myaccount">
        マイページに戻る
      </v-btn>
    </div>

    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'パスワード変更依頼'"
          :path="'/myaccount'"
          :dialog.sync="resultDialog">
        </result-card>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
      resultDialog: false,
      result: null,
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "パスワード変更",
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
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "パスワード変更", path: "/myaccount/password" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async passChange(){
      this.$store.commit('loading/changeStatus', true)
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const res = await this.$memberAxios.get(`/auth/changeReqPasswd/${loginID}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(res)
      this.$setLog('会員パス', '変更依頼', res.data.Status)
      if(res.data.Status==='TRUE'){
        this.result = 'success'
        this.resultDialog = true
      }else if(res.data.ErrorNo===100002){
        const res = await this.$getAccessToken()
        if( res ) return this.passChange()
      }else{
        this.result = String( res.data.ErrorNo )
        this.resultDialog = true
      }

      this.$store.commit('loading/changeStatus', false)

    }
  },
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
}
</style>
