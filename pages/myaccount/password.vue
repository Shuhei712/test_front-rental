<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="パスワード変更" :bread-crumbs="breadCrumbs"></top-bar>
      <div class="sec__inner py-16 text-center">
        <div v-if="doneFlg">
          <p class="mb-4 text-left text-md-center">
            パスワード変更を承りました。<br>
            登録されているメールアドレスに、通知メールを送信しましたので、
            <span class="d-inline-block">メールに記載されているURLにアクセスし、パスワードの変更をお願いいたします。</span>
          </p>
          <v-btn
            color="outline"
            class="mx-3 white--text"
            to="/myaccount">
            マイページに戻る
          </v-btn>
        </div>
        <div v-else>

          <div v-if="errFlg">
            <p class="mb-4 red--text text-left text-md-center">
              処理が正常に行われませんでした。<br>
              しばらくして、もう一度お試しいただくか、弊社までお問い合わせ下さい。
            </p>
          </div>
          <div v-else>
            <p class="mb-4 text-left text-md-center">
              パスワード変更を選択いただくと、通知メールを送信いたします。<br>
              通知メールでお知らせするURLにアクセスいただくことでパスワードの変更が可能となります。
            </p>
          </div>
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
      </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
      doneFlg: false,
      errFlg: false,
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
      if(res.data.Status==='TRUE'){
        this.doneFlg = true
      }else if(res.data.ErrorNo===100001){
        // 認証tokenの有効期限が切れています
        this.$store.dispatch('auth/resetUser')
        this.$router.push('/login');
      }else if(res.data.ErrorNo===100002){
        // access認証tokenの有効期限が切れています
        const res = await this.$getAccessToken()
        console.log(res)
        this.passChange()
      }else{
        this.errFlg = true
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