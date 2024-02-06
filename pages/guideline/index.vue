<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="はじめての方へ -タケナカレンタルガイド-" sub-title="-タケナカレンタルガイド-" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner category__inner py-16">
      <div>
        <guideline-section section-title="タケナカでレンタルできる機材">
          <p>映像・音響・ネットワーク通信機器や、その関連機材が充実。
            イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
            な試みなどに必要な機材は一式揃えられます。
          </p>
          <v-row class="mt-10">
            <v-col cols="12">
              <guideline-btn link-text="レンタルのご利用についての詳細を見る" link-url=""></guideline-btn>
            </v-col>
            <v-col cols="6">
              <guideline-btn link-text="レンタルのご利用についての詳細を見る" link-url=""></guideline-btn>
            </v-col>
            <v-col cols="6">
              <guideline-btn link-text="レンタルのご利用についての詳細を見る" link-url=""></guideline-btn>
            </v-col>
          </v-row>
        </guideline-section>

        <guideline-section section-title="レンタルするには">
          <p>映像・音響・ネットワーク通信機器や、その関連機材が充実。
            イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
            な試みなどに必要な機材は一式揃えられます。
          </p>
        </guideline-section>

      </div>
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
      title: "はじめての方へ -タケナカレンタルガイド-",
      meta: [
        { hid: 'description', name: 'description', content: 'はじめての方へ -タケナカレンタルガイド- | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'はじめての方へ -タケナカレンタルガイド-', path: '/guideline' })
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
</style>
