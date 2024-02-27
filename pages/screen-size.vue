<template>
  <div id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="スクリーンサイズ" :bread-crumbs="breadCrumbs"></top-bar>
    <section class="screen">
      <div class="screen__inner px-3 py-16">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="content" v-html="html">
        </div>
      </div>
    </section>
  </div>
</template>

<script>


export default {

  data() {
    return {
      breadCrumbs: [],
      html: ''
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.loadHtml()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "スクリーンサイズ",
      meta: [
        { hid: 'description', name: 'description', content: 'スクリーンサイズ | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'スクリーンサイズ', path: '/screen' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async loadHtml() {
      const res = await this.$axios.$get('https://rental-resource.takenaka-co.co.jp/catalog-page/rental-menu/screen-size/index.html')
      this.html = res
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

ul {
  list-style: none;
}

.guide {
  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
