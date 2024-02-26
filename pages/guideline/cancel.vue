<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="レンタルガイドライン" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner d-lg-flex py-16">

      <guideline-lists></guideline-lists>

      <div class="content ml-lg-10">
        <guideline-section
          v-for="guideItem in guideSections"
          :key="guideItem.id"
          :section-title="guideItem.title"
          :section-id="guideItem.id">

          <guideline-content
            :content-list="guideItem.contents">

            <!-- 注文後のキャンセルについて -->
            <template #cancel-3__note>
              <p>
                利用開始日まで5営業日を切っている場合、キャンセル操作をすることができません。<br>
                その場合は、以下まで直接ご連絡ください。
              </p>
              <guideline-footnote
                :note-list="{
                  type: 'bold-note',
                  items: [
                    '5営業日を切っている場合、キャンセル料金が発生します。'
                  ]
                }"
                class="mt-6"
              ></guideline-footnote>
              <v-row class="mt-3" justify="center">
                <v-col cols="12" md="6">
                  <guideline-btn
                    :link-text="btnList[2].text"
                    :link-url="btnList[2].url"></guideline-btn>
                </v-col>
              </v-row>
              <div class="my-16">
                <v-img
                  src="/img/guideline/cancel/example-01.svg"
                  alt="図：利用開始日の5日前に営業外の日が含まれない場合の例"
                  contain></v-img>
              </div>
              <div>
                <v-img
                  src="/img/guideline/cancel/example-02.svg"
                  alt="図：営業外の日が含まれる場合の例"
                  contain></v-img>
              </div>
            </template>

          </guideline-content>

        </guideline-section>

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
      guideList: items.cancel,
      guideSections: items.cancel.sections,
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

::v-deep {
  .cancel-fee-table {
    th:first-child {
      width: 40%;
    }
  }
}
</style>
