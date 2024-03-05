<template>
  <section>
    <div class="sec__inner py-16 activate__inner">
      <div v-if="!$fetchState.pending && !$fetchState.error" class="text-center py-15">
        <div v-if="activateFlg" class="activate__success">
          <h1 class="py-6 mb-4">登録が完了いたしました</h1>
          <p>ご登録いただき、ありがとうございます。<br>
            ご登録いただいたメールアドレスに、完了メールを送信いたしましたのでご確認ください。<br>
            <span class="mt-4 text-caption text-left d-inline-block">
              通知メールが届かない場合、迷惑メールフォルダに届いているか、処理が正常に行われていない可能性があります。<br>
              大変お手数ですが、再度お試しいただくか、<a href="https://www.takenaka-co.co.jp/contact/" target="_blank" class="link">お問い合わせ</a>ください。<br>
              ※「takenaka-co.co.jp」からのメールを受信出来るように設定をお願いします。
            </span>
          </p>
          <v-btn large
            class="my-4 text-white"
            color="primary"
            to="/login"
          >ログイン</v-btn>
        </div>
        <div v-else class="activate__err">
          <div v-if="errFlg===110601">
            <p>既に会員登録が完了しています。</p>
            <v-btn large
              class="my-6 text-white"
              color="primary"
              to="/login"
            >ログイン</v-btn>
          </div>
          <div v-else class="red--text">
            <h1 class="py-6">登録に失敗いたしました</h1>
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
      </div>
      <div v-else class="text-center py-15">
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
