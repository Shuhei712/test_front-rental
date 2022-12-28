<template>
  <div>

    <top-bar title="お問い合わせ 完了" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">

      <v-card
        outlined
        class="py-6">
        <v-container>
          <p>お問い合わせを受け付けました。<br>
          ご登録いただいたメールアドレスに受付完了メールを送信いたしました。<br>
          メールが届かない場合は、しばらくしてもう一度お試しいただくか、弊社までお問い合わせ下さい。</p>
          <div class="text-center mt-3">
            <v-btn
              color="outline"
              class="mx-3 white--text"
              to="/myaccount/other">
              戻る
            </v-btn>
          </div>
        </v-container>
      </v-card>
    </div>
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
    }
  },

  fetch() {
    if(!this.user.Name){
      this.$router.push('/myaccount/other/contact#input')
    }
    window.scrollTo({
      top: 0,
    })
    this.setBreadCrumbs()
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・その他", path: "/myaccount/other" })
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ 完了', path: '/myaccount/other/contact#complete' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
  }
}
</script>
<style lang="scss" scoped>
.register{
  &__inner{
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>