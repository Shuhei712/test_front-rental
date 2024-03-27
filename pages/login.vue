<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="ログイン" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="login__inner py-16 px-3 px-lg-0">
      <login></login>
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
      title: "ログイン",
      meta: [
        { hid: 'description', name: 'description', content: 'ログイン | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'ログイン', path: '/login' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
  }
}
</script>
<style lang="scss" scoped>
.login{
  &__inner{
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
