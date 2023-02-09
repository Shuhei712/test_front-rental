<template>
  <section>
    <div class="sec__inner py-16 activate__inner">
      <div class="text-center py-15">
        <div v-if="activateFlg" class="activate__success">
          <h1 class="py-6 mb-4">登録完了</h1>
          <p>本登録が完了いたしました。</p>
          <v-btn large
            class="my-4 text-white"
            color="primary"
            to="/login"
          >ログイン</v-btn>
        </div>
        <div v-else class="activate__err red--text">
          <h1 class="py-6">登録失敗</h1>
          <div v-if="errFlg===110601">
            <p>既に登録が完了しています。</p>
            <v-btn large
              class="my-6 text-white"
              color="primary"
              to="/login"
            >ログイン</v-btn>
          </div>
          <div v-else>
            <p>登録が正常に行われませんでした。<br>もう一度ご登録いただくか、弊社までお問い合わせください。</p>
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
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activateFlg: null,
      errFlg: null
    }
  },
  async fetch(){
    this.$store.commit('loading/changeStatus', true)
    await this.checkToken()
    this.$store.commit('loading/changeStatus', false)
  },
  methods:{
    async checkToken(){
      const token = this.$route.params.id
      const res = await this.$memberAxios.get('auth/activation',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        this.activateFlg = true
      }else{
        this.errFlg = res.data.ErrorNo
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