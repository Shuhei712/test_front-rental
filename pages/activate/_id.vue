<template>
  <section>
    <div class="sec__inner py-16 activate__inner d-flex align-center justify-center">
      <div class="text-center py-15">
        <div v-if="activateFlg" class="activate__success">
          <h1 class="py-3">登録完了</h1>
          <p>登録が完了いたしました。</p>
          <v-btn large
            class="my-4 text-white"
            color="primary"
            href="/"
          >トップページ</v-btn>
        </div>
        <div v-else class="activate__err">
          <h1 class="py-3 red--text">登録失敗</h1>
          <p>登録が正常に行われませんでした。<br>もう一度ご登録いただくか、弊社にお問い合わせください。</p>
          <v-btn large
            class="my-4 mx-2 text-white"
            color="primary"
            href="/register"
          >新規登録</v-btn>
          <v-btn large
            class="my-4 mx-2 text-white"
            color="secondary"
            href="https://www.takenaka-co.co.jp/contact//"
          >お問い合わせ</v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activateFlg: null
    }
  },
  async fetch(){
    const token = this.$route.params.id
    const res = await this.$memberAxios.get('auth/activation',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res)
    if(res.data.Status){
      this.activateFlg = true
      this.$store.commit('auth/setAuthToken' ,res.AuthToken)
      this.$store.commit('auth/setAccessToken' ,res.AccessToken)
    }else{
      this.activateFlg = false
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