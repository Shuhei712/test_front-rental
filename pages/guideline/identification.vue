<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="レンタルガイドライン" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner d-lg-flex py-16">

      <guideline-lists></guideline-lists>

      <div class="content ml-lg-10">
        <guideline-section-title section-type="identification"></guideline-section-title>
        <div class="identification-intro pa-10 mb-13 text-body-2 text-sm-body-1">
          <guideline-footnote
            :note-list="{
              type: 'note',
              items: [
                '本人登録確認後にレンタルが利用可能になります。',
                '登録できる添付ファイル形式はJPG・PNG・PDF/1枚につき3MBまで',
                '住所確認できる書類が無い場合は保証金をお預かりする場合があります。'
              ]}"></guideline-footnote>
          <p class="mt-5 headingText--text">書類の提出に関して対応できないことや不明な点がある場合、お問い合わせフォームよりご相談ください。</p>
          <v-row class="mt-3">
            <v-col cols="12" md="6">
              <guideline-btn
                :link-text="btnList[208].text"
                :link-url="btnList[208].url"></guideline-btn>
            </v-col>
          </v-row>
        </div>

        <guideline-section
          v-for="(guideItem, key) in guideSections"
          :key="key"
          :section-title="guideItem.title"
          :section-id="guideItem.id">

          <guideline-content
            :content-list="guideItem.contents">

            <template #identification-2__item2>
              <ol class="pl-8 pl-sm-9 guide__heading text-md-h5 font-weight-black letter-space-01em">
                <!-- eslint-disable vue/no-v-html -->
                <li
                  v-for="(item, index) in [
                    '名刺',
                    '社会保険被保険証<span class=\'text--sup text-caption\'>※1</span>',
                    '運転免許証orパスポートorマイナンバーカード<span class=\'text--sup text-caption\'>※2</span>'
                  ]"
                  :key="index"
                  :class="index !== 0 ? 'mt-3' : ''">
                  <span v-html="item"></span>
                  <v-chip color="accent" class="ml-3" small>必須</v-chip>
                </li>
              </ol>
            </template>

          </guideline-content>

        </guideline-section>

        <guideline-transition-btn></guideline-transition-btn>
      </div>

    </div>

  </section>
</template>
<script>
import items from '@/assets/json/guideline.json'
import links from '@/assets/json/guidelineLink.json'
export default {
  data() {
    return {
      breadCrumbs: [],
      guideList: items.identification,
      guideSections: items.identification.sections,
      btnList: links,
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
@import 'assets/css/common.scss';

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

::v-deep .text--sup {
  color: $accent;
  font-weight: 700 !important;
  margin-left: 8px;
  vertical-align: top;
}

.identification {
  &-intro {
    border: 1px solid $accent;
    border-radius: 10px;
  }
}

.guide {
  &__heading {
    @include mq(md){
      font-size: 1.3rem;
    }
    @include mq(sm){
      font-size: 1rem;
    }
  }
}
</style>
