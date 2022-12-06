<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="パスワード変更" :bread-crumbs="breadCrumbs"></top-bar>
      <div class="sec__inner py-16 text-center">
        <p class="mb-4">パスワード変更を選択いただくと、通知メールを送信いたします。<br>
          通知メールでお知らせするURLからアクセスいただくことでパスワードの変更が可能となります。</p>
        <v-btn
          color="primary"
          class="mx-3"
          @click="passChange">
          パスワード変更
        </v-btn>
        <v-btn
          color="outline"
          class="mx-3 white--text"
          href="/myaccount">
          戻る
        </v-btn>
      </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
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
        { hid: 'description', name: 'description', content: 'パスワード変更 | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/addList", { name: "パスワード変更", path: "/myaccount/password" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async passChange(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const res = await this.$memberAxios.get(`/auth/changeReqPasswd/${loginID}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.Status==='FALSE'){
        if(res.data.ErrorNo===100001){
          // ERROR-100001: 認証tokenの有効期限が切れています
        }else if(res.data.ErrorNo===100002){
          // ERROR-100001: access認証tokenの有効期限が切れています
        }
      }

    }
  },
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}
</style>