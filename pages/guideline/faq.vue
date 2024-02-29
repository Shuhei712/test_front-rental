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
            class="d-flex flex-wrap justify-start justify-md-center pl-4 pl-sm-5 pl-lg-7 text-body-2 text-lg-subtitle-1">
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
          <h3 class="d-inline-flex align-center text-body-1 text-sm-h6 text-md-h5 text-lg-h4 font-weight-medium text-gray letter-space-01em">
            <v-icon color="accent" class="faq__title__icon mr-2">{{ root.IconImageURL }}</v-icon>
            {{ root.FaqName }}
          </h3>
        </div>

        <v-expansion-panels v-model="root.panel" multiple class="faq-group pl-3 pl-sm-6 pr-md-6 my-4">
          <v-expansion-panel
            v-for="(child, index) in root.SubFaqList"
            :id="'question_' + child.questionNo"
            :key="index"
            class="faq-item headingText--text my-4">
            <v-expansion-panel-header class="faq-item__header py-3 pr-2 pl-8 pl-sm-10 pl-md-14">
              <template #actions>
                <v-icon color="accent" class="header-icon">
                  {{ Array.isArray(root.panel) && root.panel.includes(index) ? 'mdi-minus' : 'mdi-plus' }}
                </v-icon>
              </template>
              <!-- eslint-disable vue/no-v-html -->
              <h4
                class="text-subtitle-2 text-sm-body-1 text-md-h6 text-lg-h5 font-weight-medium letter-space-005em"
                v-html="child.question"></h4>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-item__content">
              <p
                class="text-caption text-sm-body-2 text-md-body-1 mt-2 mt-lg-5 mb-3 mb-sm-4 mb-md-5"
                v-html="child.answer"></p>
              <v-row v-if="!Object.keys(child.detailList).length == 0" class="detail-group ma-n2">
                <v-col cols="12" md="3" lg="2" class="pa-2 pb-0 pb-sm-2">
                  <span class="detail-heading d-inline-block text-caption text-sm-body-2 font-weight-bold text-center py-sm-1 py-md-2">詳しくはこちら</span>
                </v-col>
                <v-col cols="12" md="9" lg="8" class="pa-2">
                  <v-row class="ma-n2">
                    <v-col
                      v-for="(detail, detailIndex) in child.detailList"
                      :key="detailIndex"
                      cols="12"
                      md="8"
                      lg="6"
                      class="pa-2">
                      <guideline-btn
                        :link-text="detail.detailTitle"
                        :link-url="detail.detailURL"></guideline-btn>
                    </v-col>
                  </v-row>
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
import guidelines from '@/assets/json/guideline.json'
import links from '@/assets/json/guidelineLink.json'
export default {
  data: () => ({
    breadCrumbs: [],
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
  computed: {
    faqLists() {
      const faqList = [
        {
          "FaqID": 1,
          "FaqName": "レンタル注文",
          "IconImageURL": "mdi-list-box-outline",
          "SubFaqList": [
            {
              "questionNo": 101,
              "question": "どうすればレンタル注文できますか？",
              "answer": "WEB会員はカート機能、非会員はメール/電話のお問い合わせから申し込めます。",
              "detailList": [
                this.getBtnInfo("link", 100),
              ]
            },
            {
              "questionNo": 102,
              "question": "WEB会員登録しなくてもレンタルはできますか？",
              "answer": "WEB会員に登録しなくてもレンタル可能です。ただし、お客様情報の登録は必要です。",
              "detailList": [
                this.getBtnInfo("link", 100),
              ]
            },
            {
              "questionNo": 103,
              "question": "申し込み時のレンタル日数はどのタイミングからカウントすればいいですか？",
              "answer": "機材を実際に使用する日数＝レンタル日数となります。<br>引き渡し日や返却日は含まれません。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 4),
              ]
            },
            {
              "questionNo": 104,
              "question": "設営・撤去・オペレートを合わせて依頼できますか？",
              "answer": "可能です。レンタル申し込み時にお申し付けください",
              "detailList": [
                this.getBtnInfo("guide", "rental", 10)
              ]
            },
            {
              "questionNo": 105,
              "question": "デモ機のレンタルはできますか？",
              "answer": "可能です。通常のレンタルと同じ費用計算になります。<br>本番での使用内容と合わせてご相談いただければ、別途レンタル費用を検討いたします。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 1)
              ]
            },
            {
              "questionNo": 106,
              "question": "機材に合わせてケーブルもレンタルできますか？",
              "answer": "映像・音響関係のケーブルはレンタル可能です。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 7)
              ]
            },
            {
              "questionNo": 107,
              "question": "在庫の有無は分かりますか？",
              "answer": "お申込みいただいた後、在庫を確認して回答させていただきます。",
              "detailList": [
                this.getBtnInfo("link", 100),
              ]
            },
            {
              "questionNo": 108,
              "question": "実施内容は決まっていますが、最適な機材が分かりません。",
              "answer": "こちらで選定させていただきますので、是非お気軽にご相談ください。",
              "detailList": [
                this.getBtnInfo("link", 1),
                this.getBtnInfo("link", 2),
              ]
            },
            {
              "questionNo": 109,
              "question": "見積書は発行してもらえますか？",
              "answer": "発行しております。WEB会員/非会員で取得方法が変わりますので、下記リンクを参照ください。",
              "detailList": [
                this.getBtnInfo("guide", "quotation", 2)
              ]
            },
            {
              "questionNo": 110,
              "question": "注文未確定の状態でいつまで在庫を確保してもらえますか？",
              "answer": "見積もり発行後一週間が在庫押さえ期間になります。期限までに注文確定がされなかった場合、在庫押さえは解除されます。",
              "detailList": [
                this.getBtnInfo("guide", "quotation", 3)
              ]
            },
            {
              "questionNo": 111,
              "question": "レンタル機材を使用中、レンタル期間の延長を申し込むことはできますか？",
              "answer": "延長が必要になった場合は必ずご連絡ください。延長の可否を返答させていただきます。<br>無断で期間を延長した場合は別途延滞料金が発生しますので、ご注意ください。",
              "detailList": [
                this.getBtnInfo("guide", "cancel", 1)
              ]
            }
          ],
        },
        {
          "FaqID": 2,
          "FaqName": "費用",
          "IconImageURL": "mdi-currency-jpy",
          "SubFaqList": [
            {
              "questionNo": 201,
              "question": "支払い方法が知りたいです。",
              "answer": "事前の銀行振込のみとなります。",
              "detailList": [
                this.getBtnInfo("guide", "payment", 1)
              ]
            },
            {
              "questionNo": 202,
              "question": "見積もりに料金は発生しますか？",
              "answer": "見積もりは無料です。",
              "detailList": [
                this.getBtnInfo("guide", "quotation", 1)
              ]
            },
            {
              "questionNo": 203,
              "question": "2日以上レンタルする場合、レンタル代金はどうなりますか？",
              "answer": "機材ごとに決まった掛け率を計算して決定します。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 4)
              ]
            },
            {
              "questionNo": 204,
              "question": "送料はどちらの負担になりますか？",
              "answer": "引き渡し・返却ともにお客様負担となります。<br>配送方法、商品のサイズ・重量・物量などによって異なります。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 5),
                this.getBtnInfo("guide", "rental", 6)
              ]
            },
            {
              "questionNo": 205,
              "question": "キャンセルした場合、キャンセル料金は発生しますか？",
              "answer": "引き渡し日より6営業日以上前であればキャンセル料金は発生しません。<br>5営業日以内の場合、キャンセル料金をいただきます。",
              "detailList": [
                this.getBtnInfo("guide", "cancel", 4)
              ]
            },
            {
              "questionNo": 206,
              "question": "請求書は発行してもらえますか？",
              "answer": "発行可能です。WEB会員/非会員で取得方法が変わりますので、下記リンクを参照ください。",
              "detailList": [
                this.getBtnInfo("guide", "invoice", 1)
              ]
            },
            {
              "questionNo": 207,
              "question": "領収書は発行してもらえますか？",
              "answer": "基本、発行していません。必要な場合はお問い合わせください。",
              "detailList": [
                this.getBtnInfo("guide", "invoice", 2)
              ]
            },
          ],
        },
        {
          "FaqID": 3,
          "FaqName": "配送・引き渡し・返却",
          "IconImageURL": "mdi-package-variant-closed",
          "SubFaqList": [
            {
              "questionNo": 301,
              "question": "レンタル商品の引き渡し・返却方法が知りたいです。",
              "answer": "弊社に直接来ていただく・宅配便・チャーター便の3種から選択できます。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 6)
              ]
            },
            {
              "questionNo": 302,
              "question": "引き渡し日・返却日とは商品を発送した日ですか？到着した日ですか？",
              "answer": "商品の到着日になります。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 4)
              ]
            },
            {
              "questionNo": 303,
              "question": "宅配便とチャーター便はどう違うのですか？",
              "answer": "宅配便：運送業者に委託し、混載便を利用する形です。<br>チャーター便：弊社手配の車での配送です。お時間指定／会場着／搬入出をご希望の場合はこちらになります。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 6)
              ]
            },
            {
              "questionNo": 304,
              "question": "登録住所とは別の場所に機材を送りたいです",
              "answer": "可能です。お申し込み時に場所等の必要事項を指定してください。",
              "detailList": []
            },
            {
              "questionNo": 305,
              "question": "返却できないまま返却日を越えてしまう（延滞）とどうなりますか？",
              "answer": "延滞料金が発生します。延長を希望する場合は、前もってご連絡ください。",
              "detailList": [
                this.getBtnInfo("guide", "cancel", 1)
              ]
            }
          ]
        },
        {
          "FaqID": 4,
          "FaqName": "機材",
          "IconImageURL": "mdi-audio-video",
          "SubFaqList": [
            {
              "questionNo": 401,
              "question": "モニターは自前で用意しているので、金具やスタンドのみレンタルしたいです。<br>可能ですか？",
              "answer": "可能です。条件を確認の上、お申し込みください。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 8)
              ]
            },
            {
              "questionNo": 402,
              "question": "プロジェクターのレンズをレンタルしたいです。",
              "answer": "レンタルを受け付けております。適合機種などを確認の上、お申込みください。",
              "detailList": [
                this.getBtnInfo("guide", "rental", 9)
              ]
            },
            {
              "questionNo": 403,
              "question": "機材の使い方を教えてもらえますか？",
              "answer": "基本的には取り扱いマニュアルを参照いただき、お客様側の理解で使用いただく前提になっています。<br>サポート・オペレートが必要な場合は、有償にて承っていますので、事前にお申し付けください。",
              "detailList": [
                this.getBtnInfo("guide", "support", 1),
                this.getBtnInfo("guide", "support", 2),
                this.getBtnInfo("guide", "support", 3)
              ]
            }
          ]
        },
        {
          "FaqID": 5,
          "FaqName": "WEB会員機能",
          "IconImageURL": "web",
          "SubFaqList": [
            {
              "questionNo": 501,
              "question": "登録情報はどこから変更できますか？",
              "answer": "マイページより変更可能です。",
              "detailList": [
                this.getBtnInfo("link", 204),
                this.getBtnInfo("link", 205),
              ]
            },
            {
              "questionNo": 502,
              "question": "WEB会員に会費はありますか？",
              "answer": "会費はありません。WEB会員の登録も無料です。",
              "detailList": []
            },
            {
              "questionNo": 503,
              "question": "以前注文したことがあり、その際にお客様登録済です。<br>WEB会員登録の際は改めて本人確認が必要なのですか？",
              "answer": "既にお客様登録済の方は本人確認不要です。会員お問い合わせよりご連絡ください。",
              "detailList": [
                this.getBtnInfo("guide", "identification", 5)
              ]
            },
            {
              "questionNo": 504,
              "question": "法人会員と一般会員に違いはありますか？",
              "answer": "個人（個人事業主を含む）として登録する場合は『一般WEB会員』、株式会社・法人団体として登録する場合は『法人WEB会員』をお選びください。",
              "detailList": [
                this.getBtnInfo("guide", "membership", 1)
              ]
            },
            {
              "questionNo": 505,
              "question": "個人で登録したアカウントを法人登録に切り替えることはできますか？",
              "answer": "会員お問い合わせよりご連絡ください。",
              "detailList": [
                this.getBtnInfo("link", 4)
              ]
            },
            {
              "questionNo": 506,
              "question": "WEB会員を退会したいです。",
              "answer": "マイページ下部より、退会処理をすることができます。",
              "detailList": [
                this.getBtnInfo("guide", "membership", 8)
              ]
            },
            {
              "questionNo": 507,
              "question": "退会後の個人情報はどうなりますか？",
              "answer": "個人情報は全て削除されます。",
              "detailList": [
                this.getBtnInfo("guide", "membership", 8)
              ]
            }
          ]
        },
        {
          "FaqID": 6,
          "FaqName": "その他",
          "IconImageURL": "mdi-help-box-outline",
          "SubFaqList": [
            {
              "questionNo": 601,
              "question": "メールが届きません/メールの返信がありません/サイトに不具合があります。",
              "answer": "システムトラブルが発生した場合は、問い合わせフォームまたは電話にてご連絡ください。",
              "detailList": [
                this.getBtnInfo("link", 208),
                this.getBtnInfo("link", 2),
              ]
            },
            {
              "questionNo": 602,
              "question": "問い合わせ先を教えてほしいです。",
              "answer": "以下を参照ください。",
              "detailList": [
                this.getBtnInfo("link", 208),
                this.getBtnInfo("link", 2),
                {
                  "detailNo": 1,
                  "detailTitle": "非会員向けお問い合わせフォーム",
                  "detailURL": "https://www.takenaka-co.co.jp/contact/product_form/",
                }
              ]
            }
          ]
        }
      ]
      return faqList
    },
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

    getBtnInfo(json, key, sectionId) {
      if (json === "guide") {
        const categoryItem = guidelines[key]
        if (!categoryItem) return null;

        const section = categoryItem.sections.find(sec => sec.id === `${key}-${sectionId}`);
        return section ? { detailTitle: section.title, detailURL: `/guideline/${key}#${section.id}` } : null;
      }
      if (json === "link") {
        const linkItem = links[key]
        if (!linkItem) return null;

        return linkItem ? { detailTitle: linkItem.text, detailURL: linkItem.url } : null;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';

.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
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

    // @include mq(lg) {
      // ul {
      //   margin: 0 auto;
      // }
      // li {
      //   min-width: calc((100% - 80px) / 4); // margin-right 20px*4
      // }
    // }

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

  &__title {
    border-bottom: 2px solid $accent;

    &__icon {
      font-size: 40px;

      @include mq(md) {
        font-size: 30px;
      }

      @include mq(sm) {
        font-size: 20px;
      }
    }
  }

  &-item {
    border: 1px solid #d8d8d8;
    --base-size: 62px;
    --shrink-rate: 0.54;
    --faq-content-padding: 56px; // px-14

    @include mq(md) {
      --base-size: 40px;
      --faq-content-padding: 40px; // px-10
    }

    @include mq(sm) {
      --base-size: 30px;
      --shrink-rate: 0.6;
      --faq-content-padding: 32px; // px-8
    }

    &::before {
      box-shadow: 0px 0px 0px 0px;
    }

    ::v-deep .v-expansion-panel-content__wrap {
      padding-left: var(--faq-content-padding);
      padding-right: var(--faq-content-padding);
    }

    &__header,
    &__content {
      position: relative;

      &::after {
        content: '';
        aspect-ratio: 9 / 8;
        display: inline-block;
        position: absolute;
      }
    }

    &__header {
      &::after {
        background-image: url('~static/img/guideline/faq/faq_q_icon.svg');
        top: calc(var(--base-size) * -0.25);
        left: -24px; // pl-7
        width: var(--base-size);
        z-index: 1;

        @include mq(sm) {
          left: -12px; // pl-3
        }

        @supports not (aspect-ratio: 9 / 8) {
          height: calc(var(--base-size) * calc(8 / 9));
        }
      }

      .header-icon {
        font-size: 48px;

        @include mq(md) {
          font-size: 32px;
        }

        @include mq(sm) {
          font-size: 24px;
        }
      }
    }

    &__content {
      &::after {
        content: '';
        background-image: url('~static/img/guideline/faq/faq_a_icon.svg');
        width: calc(var(--base-size) * var(--shrink-rate));
        top: 0;
        left: 1%;

        @supports not (aspect-ratio: 9 / 8) {
          height: calc(calc(var(--base-size) * var(--shrink-rate)) * calc(8 / 9));
        }
      }
    }
  }

  .detail-heading {
    --bubble-tail: 20px;
    background-color: #e8e8e8;
    color: #7b8482;
    width: calc(100% - var(--bubble-tail));
    vertical-align: top;
    padding-left: calc(var(--bubble-tail) / 2);
    position: relative;

    @include mq(md) {
      width: 100%;
      padding-left: 0;
    }

    &::before {
      content: '';
      background-color: #e8e8e8;
      clip-path: polygon(0 0, 100% 50%, 0 100%);
      width: var(--bubble-tail);
      height: 100%;
      top: 0;
      left: 100%;
      position: absolute;

      @include mq(md) {
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        width: 10px;
        height: calc(tan(60deg) * 10px / 2);
        margin: auto;
        top: 100%;
        right: 0;
        left: 0;
      }
    }
  }
}
</style>
