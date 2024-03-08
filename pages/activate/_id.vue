<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="会員本登録" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 activate__inner">
      <div v-if="!$fetchState.pending && !$fetchState.error" class="text-center">
        <div v-if="activateFlg" class="activate__success">
          <h1 class="py-3 mb-4">登録が完了いたしました</h1>
          <p>ご登録いただき、ありがとうございます。<br>
            ご登録いただいたメールアドレスに、完了メールを送信いたしましたのでご確認ください。<br>
            <span class="mt-4 text-caption text-left d-inline-block">
              通知メールが届かない場合、迷惑メールフォルダに届いているか、処理が正常に行われていない可能性があります。<br>
              大変お手数ですが、再度お試しいただくか、<a href="https://www.takenaka-co.co.jp/contact/" target="_blank" class="link">お問い合わせ</a>ください。<br>
              ※「takenaka-co.co.jp」からのメールを受信出来るように設定をお願いします。
            </span>
          </p>
          <v-btn
            class="my-4 text-white"
            color="primary"
            to="/login"
          >ログイン</v-btn>
        </div>

        <div v-else-if="tokenErrNo" class="text-center">
          <template v-if="tokenErrNo===111201">
            <p class="red--text">認証URLが正しくないか、有効期限が切れています。<br>お手数ですが、下記ボタンからもう一度お試しください。</p>
            <v-btn
              class="my-4 white--text"
              color="primary"
              to="/register"
            >新規登録</v-btn>
          </template>
          <template v-else-if="tokenErrNo===111202">
            <p>既に会員登録が完了しています。</p>
            <v-btn
              color="outline"
              class="my-4 white--text"
              to="/login"
              >ログイン
            </v-btn>
          </template>
        </div>
        <div v-else class="red--text">
          <h1 class="py-3 mb-4">登録に失敗いたしました</h1>
          <p>
            登録が正常に行われませんでした。<br>
            認証URLが正しくないか、有効期限が切れている可能性があります。<br>
            もう一度ご登録いただくか、弊社までお問い合わせください。
          </p>
          <v-btn large
            class="my-6 mx-2 text-white"
            color="primary"
            to="/register"
          >新規登録</v-btn>
          <v-btn large
            class="my-4 mx-2 text-white"
            color="secondary"
            href="https://www.takenaka-co.co.jp/contact/"
          >お問い合わせ</v-btn>
        </div>
      </div>
      <div v-else class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activateFlg: null,
      tokenErrNo: null
    }
  },
  async fetch(){
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.tokenErrNo = await this.$checkMailToken(this.$route.params.id)
    if (!this.tokenErrNo) await this.checkToken()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "会員本登録",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods:{
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList")
      this.$store.commit('breadCrumbs/addList', { name: "会員本登録", path: "/activate" })
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"]
    },
    async checkToken(){
      const token = this.$route.params.id
      const res = await this.$memberAxios.get('auth/activation',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.Status==='TRUE'){
        this.activateFlg = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.activate{
  &__inner{
    min-height:600px;
  }
}
</style>
