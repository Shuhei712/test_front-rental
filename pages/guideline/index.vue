<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="はじめての方へ -タケナカレンタルガイド-" sub-title="-タケナカレンタルガイド-" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner category__inner pt-10 pb-16 letter-space-01em font-weight-medium">
      <div>
        <div class="guide_introduce mb-10 d-flex justify-center align-center">
          <img class="guide_introduce_img" src="/img/guideline/introduce/introduce_top.svg" alt="はじめての方へ">
          <div class="guide_introduce_text text-center text-white pt-10 pb-5 pb-sm-0">
            <h3 class="text-h4 text-sm-h3 text-md-h2 zen-kaku-gothic bold pt-md-7">はじめての方へ</h3>
            <p class="mt-md-5 text-sm-h6 font-weight-medium">- タケナカレンタルガイド -</p>
          </div>
        </div>

        <guideline-section section-title="タケナカでレンタルできる機材">
          <v-row>
            <v-col cols="12" md="7">
              <p class="guide_introduce_content_text">
                映像・音響・ネットワーク通信機器や、その関連機材が充実。
                イベント（リアル/オンライン）や会議・発表会、体感できるインタラクティブ
                な試みなどに必要な機材は一式揃えられます。
              </p>
            </v-col>
            <v-col cols="12" md="5">
              <div class="d-flex justify-center justify-md-end">
                <img class="guide_introduce_content_img__equipment pt-5 pt-md-0" src="/img/guideline/introduce/introduce_equipment_icon.svg" alt="タケナカでレンタルできる機材イメージ">
              </div>
            </v-col>
          </v-row>
        </guideline-section>

        <guideline-section section-title="レンタルするには">
          <v-row>
            <v-col cols="12" md="8">
              <p>レンタルWEB会員、または非会員での利用ができます。</p>
              <div class="mt-5">
                <h5 class="accent--text text-h6 text-sm-h5 font-weight-black">レンタルWEB会員</h5>
                <p class="pl-1">
                  サイト上でのカート機能を利用したお申込みが可能です。<br>
                  その他、機材のお気に入り機能が使えたり、注文履歴が閲覧できるなど、レンタ
                  ル利用が簡単になります。
                </p>
              </div>
              <div class="mt-5">
                <h5 class="primary--text text-h6 text-sm-h5 font-weight-black">WEB非会員</h5>
                <p class="pl-1">
                  お申込みフォーム記述でのお問い合わせでレンタル申し込みをしていただきます。<br>
                  （お見積り確定段階でお客様登録をお願いしています。）
                </p>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="d-flex justify-center justify-md-end">
                <img class="guide_introduce_content_img pt-5 pt-md-0" src="/img/guideline/introduce/introduce_rental_icon.svg" alt="レンタルするにはイメージ">
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-10">
            <v-col cols="12">
              <v-btn to="/guideline/rental" class="bg-white text-caption text-sm-body-2 guide__btn d-flex" color="headingText" elevation="2" outlined x-large>
                <span class="lh-crop-12 text-md-h6 font-weight-medium">レンタルのご利用についての詳細を見る</span>
                <v-icon class="guide__btn__icon" color="primary">mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </guideline-section>

        <guideline-section section-title="レンタル日数・期間について">
          <v-row>
            <v-col cols="12" md="7">
              <p class="guide_introduce_content_text pt-md-10">
                お申込みいただく際に入力するレンタル日数は、『<span class="color__accent">実際に機材を利用する日数</span>』です。機材のお渡し・設営・撤去は利用日数に含みません。<br>
                （リハーサル・本番など、機材を実際に使う期間が該当します）
              </p>
              <p class="pt-5 pt-md-10">具体例は図を参照ください。</p>
            </v-col>
            <v-col cols="12" md="5">
              <div class="d-flex justify-center justify-md-end">
                <img class="guide_introduce_content_figure pt-5 pt-md-0" src="/img/guideline/introduce/introduce_days.svg" alt="レンタル日数・期間についてイメージ">
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-10">
            <v-col cols="12">
              <v-btn to="/guideline/rental#rental-4" class="bg-white text-caption text-sm-body-2 guide__btn d-flex" color="headingText" elevation="2" outlined x-large>
                <span class="lh-crop-12 text-md-h6 font-weight-medium">レンタル日数・期間についての詳細を見る</span>
                <v-icon class="guide__btn__icon" color="primary">mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </guideline-section>

        <guideline-section section-title="レンタル費用について">
          <v-row>
            <v-col cols="12" md="7">
              <p class="guide_introduce_content_text pt-md-10">
                レンタルカタログには1日あたりの価格を記載しております。
              </p>
              <p class="pt-5 pt-md-10">
                <span class="color__accent">2日間以降のレンタル料金は、1日分の価格に掛け率を計算する形</span>で決まります。<br>
                （掛け率は機材によって異なります。2日間以降は各商品ページの料金表をご確
                認ください。）
              </p>
              <div class="d-flex pt-5 pt-md-10">
                <dt class="mr-2">例）</dt>
                <dd>
                  1日料金 ¥10,000･掛け率Aパターンの機材の2日間レンタル料金<br>
                  → ¥10,000×1.3＝¥13,000
                </dd>
              </div>
            </v-col>
            <v-col cols="12" md="5">
              <div class="d-flex justify-center justify-md-end">
                <img class="guide_introduce_content_figure pt-5 pt-md-0" src="/img/guideline/introduce/introduce_price.svg" alt="レンタル費用についてイメージ">
              </div>
            </v-col>
          </v-row>

          <v-row class="mt-10">
            <v-col cols="12">
              <v-btn to="/guideline/rental#rental-5" class="bg-white text-caption text-sm-body-2 guide__btn d-flex" color="headingText" elevation="2" outlined x-large>
                <span class="lh-crop-12 text-md-h6 font-weight-medium">レンタル費用についての詳細を見る</span>
                <v-icon class="guide__btn__icon" color="primary">mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </guideline-section>

        <guideline-section section-title="レンタルの流れ（簡易版）">
          <div class="d-flex justify-center">
            <p class="font-weight-bold">簡易的なレンタルの流れです。詳細な流れは<a class="color__primary" href="/guideline/rental-flow">ガイドラインのページ</a>をご参照ください。</p>
          </div>

          <div class="mt-10 guide-flow text-md-center">
            <v-row>
              <v-col cols="6" class="px-0 pr-1 px-sm-3">
                <div class="guide-flow__member py-3">WEB会員の場合</div>
                <div class="guide-flow__section py-4 px-2 px-sm-1 my-5 ma-lg-5">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">WEB会員登録</h5>
                  <p class="guide-flow__section__text">身分証明書などによる本人確認手続きが必要です。</p>
                </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow-down"></div>
                  </div>
                <div class="guide-flow__section py-4 px-2 px-sm-1 my-5 ma-lg-5">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">カート機能で<br class="br">レンタル仮申し込み</h5>
                  <p class="guide-flow__section__text">WEB上でレンタル機材をカートに追加</p>
                </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow-down"></div>
                  </div>
                <div class="guide-flow__section py-4 px-2 px-sm-1 my-5 ma-lg-5">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">お見積り提示</h5>
                  <p class="guide-flow__section__text">お申込み内容で在庫を確認・回答いたします。</p>
                </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow_bottom_left"></div>
                  </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow_bottom_left__down"></div>
                  </div>
              </v-col>

              <v-col cols="6" class="px-0 pl-1 px-sm-3">
                <div class="guide-flow__nonmember py-3">WEB非会員の場合</div>
                <div class="guide-flow__section py-4 px-2 px-sm-1 my-5 ma-lg-5">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">レンタル仮申し込み</h5>
                  <p class="guide-flow__section__text">問い合わせフォーム、または電話でご連絡ください。</p>
                </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow-down"></div>
                  </div>
                <div class="guide-flow__section py-4 px-2 px-sm-1 my-5 ma-lg-5">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">お見積り提示</h5>
                  <p class="guide-flow__section__text">お申込み内容で在庫を確認・回答いたします。</p>
                </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow-down"></div>
                  </div>
                <div class="guide-flow__section py-4 px-2 px-sm-1 my-5 ma-lg-5">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">お客様登録</h5>
                  <p class="guide-flow__section__text">初めてご利用のお客様は登録をお願いします。</p>
                </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow_bottom_right"></div>
                  </div>
                  <div class="d-flex justify-center mt-4 mb-4">
                    <div class="arrow_bottom_right__down"></div>
                  </div>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center pt-5 my-5 guide-flow__section__row__cols12">
              <v-col cols="12" class="px-0 px-sm-3">
                <div class="guide-flow__section guide-flow__section__cols12 py-4 px-3 px-sm-4 my-1 mx-lg-5 mb-3">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">お見積り承認・注文確定</h5>
                  <p class="guide-flow__section__text__cols12">お客様からお見積りの回答をいただきましたら、注文が確定いたします。</p>
                </div>

                <div class="d-flex justify-center">
                  <div class="arrow-down"></div>
                </div>

                <div class="guide-flow__section guide-flow__section__cols12 py-4 px-3 px-sm-4 my-1 mx-lg-5 my-3">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">お支払い</h5>
                  <p class="guide-flow__section__text__cols12">指定の銀行口座にレンタル費用をお振込みください。</p>
                </div>

                <div class="d-flex justify-center">
                  <div class="arrow-down"></div>
                </div>

                <div class="guide-flow__section guide-flow__section__cols12 py-4 px-3 px-sm-4 my-1 mx-lg-5 my-3">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">レンタル商品の準備</h5>
                  <p class="guide-flow__section__text__cols12">お支払い確認後、機材の準備・事前チェックを行います。</p>
                </div>

                <div class="d-flex justify-center">
                  <div class="arrow-down"></div>
                </div>

                <div class="guide-flow__section guide-flow__section__cols12 py-4 px-3 px-sm-4 my-1 mx-lg-5 my-3">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">レンタル商品のお引渡し</h5>
                  <p class="guide-flow__section__text__cols12">店舗での直接引き取り/宅配便/チャーター便のいずれかで商品をお引渡しします。</p>
                </div>

                <div class="d-flex justify-center">
                  <div class="arrow-down"></div>
                </div>

                <div class="guide-flow__section guide-flow__section__cols12 py-4 px-3 my-1 mx-lg-5 my-3 d-flex align-center justify-center">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">レンタル商品のご利用</h5>
                </div>

                <div class="d-flex justify-center">
                  <div class="arrow-down"></div>
                </div>

                <div class="guide-flow__section guide-flow__section__cols12 py-4 px-3 my-1 px-sm-4 mx-lg-5 my-3">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">返却</h5>
                  <p class="guide-flow__section__text__cols12">店舗での直接返却/宅配便/チャーター便のいずれかで商品の返却をお願いします。</p>
                </div>

                <div class="d-flex justify-center">
                  <div class="arrow-down"></div>
                </div>

                <div class="guide-flow__section guide-flow__section__cols12 py-4 px-3 my-1 px-sm-4 mx-lg-5 my-3">
                  <h5 class="guide-flow__section__title text-md-h6 font-weight-bold mb-2">返却商品のチェック</h5>
                  <p class="guide-flow__section__text__cols12">弊社にて、返却品のチェックをおこない、問題なければお取引終了です。</p>
                </div>
              </v-col>

            </v-row>
          </div>

          <v-row class="mt-10">
            <v-col cols="12">
              <v-btn to="/guideline/rental-flow" class="bg-white text-caption text-sm-body-2 guide__btn d-flex" color="headingText" elevation="2" outlined x-large>
                <span class="lh-crop-12 text-md-h6 font-weight-medium">レンタル利用の手順についての詳細を見る</span>
                <v-icon class="guide__btn__icon" color="primary">mdi-chevron-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </guideline-section>

        <div class="guide__border border-top"></div>
        <div class="text-md-center color__4B5654 text-md-h6 text-sm-h5 font-weight-medium letter-space-01em mt-10">
          <p>実際にご利用を検討される場合は詳しいガイドラインを参照ください。</p>
          <p>不明点などがあればお気軽にお問い合わせくださいませ。</p>
        </div>
        <v-row class="mt-10">
          <v-col cols="12">
            <v-btn to="/guideline/rental" class="bg-white text-caption text-sm-body-2 guide__btn d-flex" color="headingText" elevation="2" outlined x-large>
              <span class="lh-crop-12 text-md-h6 font-weight-bold">レンタルガイドライン</span>
              <v-icon class="guide__btn__icon" color="primary">mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn href="https://www.takenaka-co.co.jp/contact/product_form/" target="_blank" class="bg-white text-caption text-sm-body-2 guide__btn d-flex" color="headingText" elevation="2" outlined x-large>
              <span class="lh-crop-12 text-md-h6 font-weight-bold">お問い合わせフォーム</span>
              <v-icon class="guide__btn__icon" color="primary">mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn href="https://www.takenaka-co.co.jp/contact/#information" target="_blank" class="bg-white text-caption text-sm-body-2 guide__btn d-flex" color="headingText" elevation="2" outlined x-large>
              <span class="lh-crop-12 text-md-h6 font-weight-bold">各拠点連絡先</span>
              <v-icon class="guide__btn__icon" color="primary">mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </div>
    </div>

  </section>
</template>
<script>
import links from '@/assets/json/guidelineLink.json'
export default {
  data() {
    return {
      breadCrumbs: [],
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
@import 'assets/css/common.scss';
.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}

.w-100 {
  width: 100%;
}

.color {
  &__primary {
    color: $primary !important;
  }
  &__accent {
    color: $accent !important;
  }
  &__4B5654 {
    color: #4B5654;
  }
}

.border{
  max-width: 1200px;
  &-top {
    border-top: 2px solid #dddddd;
    
  }
}
.guide{
  &__border {
    max-width: 1200px;
    &-top {
      border-top: 2px solid #dddddd;
    }
  }
  &__img {
    width: 100%;
    max-width: 550px;
    border: 2px solid $accent;
    border-radius: 15px;
  }
  &_introduce {
    position: relative;
    &_img {
      width: 100%;
    }
    &_text {
      position: absolute;
    }
    &_content {
      &_text {
        width: 100%;
      }
      &_img {
        width: 100%;
        max-width: 300px;
        @include mq(sm){
          width: 70%;
        }
        &__equipment {
          width: 100%;
          max-width: 400px;
          @include mq(sm){
            width: 80%;
          }
        }
      }
      &_figure {
        width: 100%;
        max-width: 350px;
      }
      &_flow {
        width: 100%;
      }
    }
  }
  &__background {
    background-color: $cushion;
    color: $headingText;
    border-radius: 5px;
  }
  &Title__background {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.15);
    position: relative;
    top: -45px;
    margin-top: -10px;
  }
  &__btn {
    width: 100%;
    position: relative;
    min-height: 45px;
    &__icon {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
}

.guide-flow {
  &__member {
    background-color: $accent;
    color: #fff;
    border-radius: 10px;
    text-align: center;
  }
  &__nonmember {
    background-color: $primary;
    color: #fff;
    border-radius: 10px;
    text-align: center;
  }
  &__section {
    background-color: #DDDDDD;
    border-radius: 10px;
    @include mq(md){
      min-height: 160px;
    }
    @include mq(sm){
      min-height: 160px;
    }
    &__title{
      text-align: center;
      @include mq(md){
        font-size: 1.2rem;
      }
      @include mq(sm){
        font-size: 0.9rem;
      }
    }
    &__cols12 {
      @include mq(md){
        min-height: 100px;
      }
    }
    &__text{
      @include mq(lg){
        font-size: 0.9rem;
      }
      @include mq(md){
        font-size: 1rem;
      }
      @include mq(sm){
        font-size: 0.8rem;
      }
      &__cols12 {
        @include mq(md){
          text-align: left;
        }
        @include mq(sm){
          text-align: left;
          font-size: 0.8rem;
        }
      }
    }
  }
}
.br {
  display: none;
  @include mq(md){
    display: block;
  }
}

.arrow-down {
  position: relative;
  width: 0;
  height: 45px; /* 線の長さを調整 */
  border-left: 2px dashed #4b5654; /* 左側の境界 */
  &::after {
    content: "";
    position: absolute;
    top: 38px; /* 矢印の位置を線の末端に合わせる */
    left: -7px;
    border: solid #4b5654;
    border-width: 0 2px 2px 0; /* 矢印のサイズを調整 */
    padding: 4.9px;
    transform: rotate(45deg); /* 矢印を下向きに */
    -webkit-transform: rotate(45deg); /* Safari用 */
  }
}

.arrow_bottom_right {
  display: block;
  position: relative;
  padding-left: 110px;
  &__down {
    display: none;
  }
  &::before { /* くの字の表示設定 */
    content: "";
    position: absolute;
    top: 45px;
    right: 120px;
    width: 14px;
    height: 14px;
    border-left: 2.5px solid #4b5654;
    border-bottom: 2.5px solid #4b5654;
  }
  &::after { /* 棒の表示設定 */
    content: "";
    position: absolute;
    top: -25px;
    right: 95px;
    width: 15px;
    height: 88px;
    border-left: 2px dashed #4b5654;
    transform: rotate(-135deg);
  }
}

.arrow_bottom_left {
  display: block;
  position: relative;
  padding-left: 110px;
  &__down {
    display: none;
  }
  &::before { /* くの字の表示設定 */
    content: "";
    position: absolute;
    top: 45px;
    left: 120px;
    width: 14px;
    height: 14px;
    border-right: 2.5px solid #4b5654;
    border-bottom: 2.5px solid #4b5654;
  }
  &::after { /* 棒の表示設定 */
    content: "";
    position: absolute;
    top: -17px;
    left: 85px;
    width: 15px;
    height: 88px;
    border-left: 2px dashed #4b5654;
    transform: rotate(135deg);
  }
}

@media screen and (max-width:370px){
  .guide-flow__section__row__cols12 {
    padding-top: 0!important;
    margin-top: 0!important;
  }
  .arrow_bottom_right {
    display: none;
    &__down {
      display: block;
      position: relative;
      width: 0;
      height: 45px; /* 線の長さを調整 */
      border-left: 2px dashed #4b5654; /* 左側の境界 */
      &::after {
        content: "";
        position: absolute;
        top: 38px; /* 矢印の位置を線の末端に合わせる */
        left: -7px;
        border: solid #4b5654;
        border-width: 0 2px 2px 0; /* 矢印のサイズを調整 */
        padding: 4.9px;
        transform: rotate(45deg); /* 矢印を下向きに */
        -webkit-transform: rotate(45deg); /* Safari用 */
      }
    }
  }
  .arrow_bottom_left {
    display: none;
    &__down {
      display: block;
      position: relative;
      width: 0;
      height: 45px; /* 線の長さを調整 */
      border-left: 2px dashed #4b5654; /* 左側の境界 */
      &::after {
        content: "";
        position: absolute;
        top: 38px; /* 矢印の位置を線の末端に合わせる */
        left: -7px;
        border: solid #4b5654;
        border-width: 0 2px 2px 0; /* 矢印のサイズを調整 */
        padding: 4.9px;
        transform: rotate(45deg); /* 矢印を下向きに */
        -webkit-transform: rotate(45deg); /* Safari用 */
      }
    }
  }
}
</style>
