<template>
  <section id="top" class="article">
    <to-top-btn></to-top-btn>
    <top-bar title="お取引登録票フォーム 完了" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="input__inner py-16 px-3 px-lg-0">
      <v-card max-width="690" class="mx-auto" elevation="0">
        <v-card-title class="justify-center">
          <template v-if="!err">お申し込みありがとうございます。</template>
          <span v-else class="red--text">登録エラー</span>
        </v-card-title>
        <v-card-text class="text--text text-body-1">
          <p v-if="err" class="red--text mb-4">
            登録に失敗いたしました。<br>
            大変申し訳ございませんが、再度お試しいただくか、<a href="https://www.takenaka-co.co.jp/contact/" class="link">お問い合わせ</a>ください。<br>
            <v-btn color="primary" class="mt-4" @click="$router.push('/non-mem-register/corporate/input')">フォームに戻る</v-btn>
          </p>
          <p v-else>
            内容を確認次第、担当者よりご返信させていただきますので、しばらくお待ち下さい。<br>
            なお、ご入力いただいたメールアドレス宛に受付完了メールを配信しております。<br>
            完了メールが届かない場合、迷惑メールフォルダに届いているか、処理が正常に行われていない可能性があります。<br>
            大変お手数ですが、再度お試しいただくか、<a href="https://www.takenaka-co.co.jp/contact/" target="_blank" class="link">お問い合わせ</a>ください。
          </p>
        </v-card-text>
      </v-card>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      breadCrumbs: [],
      err: null
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    const userJson = this.$store.getters['register/getFormInfo']
    const fileArr = this.$store.getters['register/getFormFile']
    this.err = this.$store.getters['register/getFormErr']
    if (userJson.NAME && fileArr.length > 0) {
      this.$store.commit('register/deleteInfo')
    }else this.$router.push('/non-mem-register/corporate/input')
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "お取引登録票フォーム 完了",
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
      this.$store.commit('breadCrumbs/addList', { name: 'お取引登録票フォーム', path: '/register-corporate/complete' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
  },
}
</script>
<style lang="scss" scoped>

.input {
  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
