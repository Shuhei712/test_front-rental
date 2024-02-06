<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top" class="faq">
    <to-top-btn></to-top-btn>
    <top-bar title="よくある質問" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner faq__inner py-16">

      <div class="faq__list mb-16">
        <div
          class="faq__heading d-flex justify-center align-center text-body-1 text-md-h6 font-weight-regular letter-space-015em pa-1 pa-md-0">
          <v-icon class="mr-2" color="accent">mdi-shape-outline</v-icon>CATEGORY
        </div>
        <div class="py-4">
          <p class="text-center text-caption text-md-body-2 text-gray mb-7">クリックでページ内項目にジャンプします</p>
          <ul
            class="d-flex flex-wrap justify-start justify-lg-center pl-4 pl-sm-5 pl-lg-7 text-body-2 text-lg-subtitle-1">
            <li v-for="root in faqLists" :key="root.FaqName" class="mr-4 mr-sm-5 mr-lg-7 mb-5">
              <a
                v-scroll-to="{ el: '#category-id_' + root.FaqID, offset: -130 }"
                class="d-flex align-center text-gray">
                <v-icon class="mr-2" color="accent">{{ root.IconImageURL }}</v-icon>
                <span class="category__text">{{ root.FaqName }}</span>
                <v-icon color="#878787">mdi-chevron-down</v-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        v-for="root in faqLists"
        :id="'category-id_' + root.FaqID"
        :key="root.FaqName"
        class="mb-16">
        <div class="faq__title">
          <h2 class="d-inline-flex align-center text-body-1 text-sm-h6 text-md-h5 font-weight-regular text-gray bold letter-space-015em">
            <v-icon color="accent" class="mr-2" large>{{ root.IconImageURL }}</v-icon>
            {{ root.FaqName }}
          </h2>
        </div>

        <v-expansion-panels v-model="root.panel" multiple class="my-4">
          <v-expansion-panel v-for="(child, index) in root.SubFaqList" :id="'question_' + child.questionNo" :key="index" class="my-4">
            <v-expansion-panel-header>
              <template #actions>
                <v-icon  color="accent">
                  {{ Array.isArray(root.panel) && root.panel.includes(index) ? 'mdi-minus' : 'mdi-plus' }}
                </v-icon>
              </template>
              <h3>{{ child.question }}</h3>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <p>{{ child.answer }}</p>
              <v-row v-if="!Object.keys(child.detailList).length==0">
                <v-col cols="2">
                  詳しくはこちら
                </v-col>
                <v-col cols="10">
                  <div class="mb-8">
                    <v-row class="mt-2">
                      <v-col v-for="detail in child.detailList" :key="detail.detailNo" cols="5">
                        <guideline-btn :link-text="detail.detailTitle" :link-url="detail.detailURL"></guideline-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    breadCrumbs: [],

    faqLists: [
      {
        // カテゴリー
        "FaqID": 1,
        "FaqName": "レンタル注文",
        "IconImageURL": "mdi-list-box-outline",
        "SubFaqList": [
          // カテゴリー内の質問・回答・リンク
          {
            "questionNo": 101,
            "question": "リンク無しテストテストテストテストテストテスト",
            "answer": "リンク無しテストテストテストテストテストテストテストテスト",
            "detailList": []
          },
          { 
            "questionNo": 102,
            "question": "どうすればレンタル注文できますか？",
            "answer": "WEB会員はカート機能、非会員はメール/電話のお問い合わせから申し込めます。",
            "detailList": [
              {
                "detailNo": 1,
                "detailTitle":"レンタル全般 / レンタルの流れ（詳細版）",
                "detailURL":"",
              },
              {
                "detailNo": 2,
                "detailTitle":"レンタル全般 / レンタルの流れ（詳細版）",
                "detailURL":"",
              },
              {
                "detailNo": 3,
                "detailTitle":"レンタル全般 / レンタルの流れ（詳細版）",
                "detailURL":"",
              },
            ]
          },
          {
            "questionNo": 103,
            "question": "WEB会員登録しなくてもレンタルはできますか？",
            "answer": "WEB会員に登録しなくてもレンタル可能です。ただし、お客様情報の登録は必要です。",
            "detailList": [
              {
                "detailNo": 1,
                "detailTitle":"レンタル全般 / レンタルの流れ（詳細版）",
                "detailURL":"",
              },
            ]
          },
          {
            "questionNo": 104,
            "question": "申し込み時のレンタル日数はどのタイミングからカウントすればいいですか？",
            "answer": "機材を実際に使用する日数＝レンタル日数となります。引き渡し日や返却日は含まれません。",
            "detailList": [
              {
                "detailNo": 1,
                "detailTitle":"レンタル日数・期間の考え方について",
                "detailURL":"",
              },
            ]
          }
        ],
      },
      {
        // カテゴリー
        "FaqID": 2,
        "FaqName": "費用",
        "IconImageURL": "mdi-currency-jpy",
        "SubFaqList": [
          // カテゴリー内の質問・回答・リンク
          {
            "questionNo": 201,
            "question": "支払い方法が知りたいです。",
            "answer": "事前の銀行振込のみとなります。",
            "detailList": [
              {
                "detailNo": 1,
                "detailTitle":"お支払い方法について",
                "detailURL":"",
              },
            ]
          },
          {
            "questionNo": 202,
            "question": "見積もりに料金は発生しますか？",
            "answer": "見積もりは無料です。",
            "detailList": [
              {
                "detailNo": 1,
                "detailTitle":"お見積もり料金について",
                "detailURL":"",
              },
            ]
          },
          {
            "questionNo": 203,
            "question": "2日以上レンタルする場合、レンタル代金はどうなりますか？",
            "answer": "機材ごとに決まった掛け率を計算して決定します。",
            "detailList": [
              {
                "detailNo": 1,
                "detailTitle":"レンタル日数・期間の考え方について",
                "detailURL":"",
              },
            ]
          }
        ],
      },
    ],
  }),
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "よくある質問",
      meta: [
        { hid: 'description', name: 'description', content: 'よくある質問 | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'よくある質問', path: '/guideline/faq' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';

.v-expansion-panel {
  border: 2px solid #D8D8D8;
  &::before {
    box-shadow: 0px 0px 0px 0px;
  }
}

.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}

.faq__title {
  border-bottom: 2px solid $accent;
}

.faq {
  &__heading {
    background-color: $cushion;
  }
  &__list {
    border: 1px solid $cushion;

    ul {
      list-style: none;
    }

    @include mq(lg) {
      ul {
        margin: 0 auto;
      }
      li {
        min-width: calc((100% - 80px) / 4); // margin-right 20px*4
      }
    }

    @include mq(md) {
      ul {
        max-width: 780px;
      }
      li {
        min-width: calc((100% - 60px) / 3); // margin-right 20px*3
      }
    }

    @include mq(sm) {
      ul {
        max-width: 470px;
      }
      li {
        min-width: calc((100% - 36px) / 2); // margin-right 16px*2
      }
    }

    .category__text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>
