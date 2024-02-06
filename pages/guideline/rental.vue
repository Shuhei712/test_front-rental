<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="レンタルガイドライン" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner d-flex py-16">

      <!-- サイドメニューコンポーネント -->
      <Guideline-lists></Guideline-lists>
      <div class="content ml-lg-10">
        <!-- 各セクションのコンポーネント -->
        <guideline-section section-title="レンタルのご利用について" section-id="about-rental">
          <p>映像・音響・ネットワーク通信機器や、その関連機材が充実。
            イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
            な試みなどに必要な機材は一式揃えられます。
          </p>
          <!-- 注釈コンポーネント -->
          <guideline-footnote footnote-text="送料はお客様負担になります。"></guideline-footnote>

          <!-- 詳細ボタンのコンポーネント（サイズはv-colで調整） -->
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

        <guideline-section section-title="見積もり後の注文依頼について" section-id="">
          <p>映像・音響・ネットワーク通信機器や、その関連機材が充実。
            イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
            な試みなどに必要な機材は一式揃えられます。
          </p>
        </guideline-section>

        <guideline-section section-title="レンタル利用の手順" section-id="">
          <p>映像・音響・ネットワーク通信機器や、その関連機材が充実。
            イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
            な試みなどに必要な機材は一式揃えられます。
          </p>
        </guideline-section>

        <guideline-section section-title="レンタル利用の手順" section-id="">
          <p>映像・音響・ネットワーク通信機器や、その関連機材が充実。
            イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
            な試みなどに必要な機材は一式揃えられます。
          </p>
        </guideline-section>

        <guideline-section section-title="レンタル商品の引き渡し・返却について" section-id="">
          <p>映像・音響・ネットワーク通信機器や、その関連機材が充実。
            イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
            な試みなどに必要な機材は一式揃えられます。
          </p>
        </guideline-section>

        <guideline-section section-title="設営 / 撤去 / オペレートのご依頼について" section-id="test">
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
