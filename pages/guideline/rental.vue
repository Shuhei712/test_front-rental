<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="レンタルガイドライン" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner d-lg-flex py-16">

      <!-- サイドメニューコンポーネント -->
      <Guideline-lists></Guideline-lists>
      <div class="content ml-lg-10">
        <!-- 各セクションのコンポーネント -->
        <guideline-section
          v-for="guideItem in guideSections"
          :key="guideItem.id"
          :section-title="guideItem.title"
          :section-id="guideItem.id">

          <guideline-content
            :content-list="guideItem.contents">

            <template #rental-1__item2>
              <p>
                カート画面からのレンタルのお申し込みについては、受付の段階です。<br>
                お申し込み後、正式なレンタルの見積書と商品の在庫情報をスタッフより回答いたします。<br>
                お客様には回答内容を確認の上、正式に注文いただく流れになります。
              </p>
            </template>

            <template #rental-1__item3>
              <v-list-item class="px-0">
                <v-list-item-content>
                  <v-list-item-title>ご希望のレンタル商品（機材または、型番名）・数量</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="white-border"></v-divider>
              <v-list-item class="px-0">
                <v-list-item-content>
                  <v-list-item-title>レンタル日数（商品の使用開始日時・期間）・使用場所</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="white-border"></v-divider>
              <v-list-item class="px-0">
                <v-list-item-content>
                  <v-list-item-title>機材引渡し/返却方法と日付の指定</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-simple-table class="guide-table guide-table--default transparent">
                <template #default>
                  <thead class="text-body-1">
                    <tr>
                      <th class="headingText--text text-center text-body-2 font-weight-bold">引き渡し/返却方法</th>
                      <th class="headingText--text text-center text-body-2 font-weight-bold">引渡し日</th>
                      <th class="headingText--text text-center text-body-2 font-weight-bold">返却日</th>
                    </tr>
                  </thead>
                  <tbody class="headingText--text text-center">
                    <tr>
                      <td class="guide-table__td text-body-1">直接来社</td>
                      <td class="guide-table__td text-body-1">来社引き渡し日</td>
                      <td class="guide-table__td text-body-1">来社返却日</td>
                    </tr>
                    <tr>
                      <td class="guide-table__td text-body-1">宅配便（郵送）<span class="accent--text">※</span></td>
                      <td class="guide-table__td text-body-1">お客様着日</td>
                      <td class="guide-table__td text-body-1">弊社戻り着日</td>
                    </tr>
                    <tr>
                      <td class="guide-table__td text-body-1">チャーター便</td>
                      <td class="guide-table__td text-body-1" colspan="2">搬入/搬出希望日時・指定場所（別途料金）</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <guideline-footnote
                :note-list="{
                  type: 'bold-note',
                  items: ['送料はお客様負担になります。']
                }"
                class="text-body-2 mt-3"
              ></guideline-footnote>
            </template>

            <template #rental-1__item4>
              <v-divider class="content-divider mb-13"></v-divider>
            </template>

            <template #rental-4__item3>
              <div>
                <v-img
                  src="/img/guideline/cancel/example-02.svg"
                  alt="例：レンタル日数の計算の仕方"
                  contain></v-img>
              </div>
            </template>

            <template #rental-5__item1>
              <div>
                <v-img
                  src="/img/guideline/cancel/example-02.svg"
                  alt="例：レンタル日数の計算の仕方"
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
export default {
  data() {
    return {
      breadCrumbs: [],
      guideList: items.rental,
      guideSections: items.rental.sections,
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

.white-border {
  border-color: #fff;
}

.content-divider {
  border-color: #afbab8;
}

::v-deep {
  .rental-line-table {
    td:first-child {
      width: 18%;
    }
  }
}
</style>
