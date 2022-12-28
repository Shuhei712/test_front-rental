<template>
  <div>

    <top-bar title="仮登録完了" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">

      <v-card
        outlined
        class="py-6">
        <v-container>
          仮登録が完了しました。<br>
          確認メールを送信しましたので、メールに記載されているURLにアクセスすると会員登録が完了いたします。
        </v-container>
      </v-card>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    pass:{
      type: String,
      required: true
    },
  },
  data() {
    return {
      breadCrumbs: [],
    }
  },

  fetch() {
    if(!this.pass){
      this.$router.push('/register#input')
    }
    this.setBreadCrumbs()
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '新規登録', path: '/register' })
      this.$store.commit('breadCrumbs/addList', { name: '仮登録完了', path: '/register#complete' })
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