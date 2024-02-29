<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="レンタルガイドライン" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner d-lg-flex py-16">

      <guideline-lists></guideline-lists>

      <div class="content ml-lg-10">
        <guideline-section-title section-type="return"></guideline-section-title>
        <guideline-section
          v-for="(guideItem, key) in guideSections"
          :key="key"
          :section-title="guideItem.title"
          :section-id="guideItem.id">

          <guideline-content
            :content-list="guideItem.contents"></guideline-content>
        </guideline-section>

        <guideline-transition-btn></guideline-transition-btn>
      </div>

    </div>

  </section>
</template>
<script>
import items from '@/assets/json/guideline.json'
export default {
  data() {
    return {
      breadCrumbs: [],
      guideList: items.return,
      guideSections: items.return.sections,
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "レンタルガイドライン",
      meta: [
        { hid: 'description', name: 'description', content: 'レンタルガイドライン | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'レンタルガイドライン - レンタル全般 -', path: '/guideline' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
  }
}
</script>
<style lang="scss" scoped>
.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}
.top__inner {
  width: 100% !important;
  max-width: 800px !important;
  padding: 0 5%;
  position: relative;
}
</style>
