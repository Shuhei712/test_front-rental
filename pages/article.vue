<template>
  <section class="article">
    <top-bar title="特設ページ 一覧"></top-bar>
    <div class="article__inner d-lg-flex py-16 px-3 px-lg-0">
      <category-lists :category-lists="categoryLists"></category-lists>
      <div class="content ml-lg-15">
        <div class="page-link mb-16">
          <div class="page-link__heading d-flex align-center justify-center text-caption text-md-body-2 text-gray pa-2 pa-lg-0">
            クリックでページ内項目にジャンプします
          </div>
          <div class="page-link__list pt-7 pb-2">
            <ul
              class="d-flex flex-wrap justify-space-between justify-sm-center pl-4 pl-sm-7 text-body-2 text-md-body-1">
              <li v-for="article in pageClassLists" :key="article.PageClassColor" class="mr-4 mr-sm-7 mb-5">
                <a v-scroll-to="{ el: '#' + article.PageClassColor, offset: -130 }" class="d-flex align-center text-gray">
                  <v-icon class="mr-2" :color="article.PageClassColor">{{ article.IconImageURL }}</v-icon>
                  {{ article.PageClassName }}
                  <v-icon color="#878787">mdi-chevron-down</v-icon>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div v-for="(article, num) in pageClassLists" :id="article.PageClassColor" :key="num" class="group mb-16">
          <h3
            class="group__ttl d-flex flex-column text-center text-body-1 text-sm-h6 text-md-h5 text-gray bold letter-space-015em mb-4 mb-md-9">
            <v-icon class="group__ttl-icon mb-2 mb-md-4" :color="article.PageClassColor"
              >{{ article.IconImageURL }} </v-icon
            >{{ article.PageClassName }}
          </h3>
          <v-container class="group__container">
            <v-row no-gutters class="group__row justify-center">
              <v-col
                v-for="(articleItem, index) in article.SpecialPageList"
                :key="index"
                cols="6"
                sm="4"
                md="3"
                class="group__col d-flex">
                <v-card
                  :color="article.PageClassColor"
                  class="article-card"
                  :href="articleItem.PageURL"
                  target="_blank">
                  <v-img max-height="108" :src="articleItem.SpecialPageImageURL" class="bg-white" />
                  <v-card-subtitle class="article-card__subtitle bg-white text-caption text-center pa-1">
                    {{ articleItem.SpecialPageCopy }}
                  </v-card-subtitle>
                  <v-card-title class="article-card__title text-white text-body-2 text-md-body-1 px-2 px-sm-3">
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <h4 class="article-card__title-text" v-html="articleItem.SpecialPageName">
                      <!-- {{ articleItem.SpecialPageName }} -->
                    </h4>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      // articleLists: [
      //   {
      //     // 機材特集
      //     category: '機材特集',
      //     anchor: 'feature',
      //     color: 'feature',
      //     icon: 'icon-feature',
      //     items: [
      //       {
      //         title: 'センダーボックス<br>特集',
      //         subTitle: 'LED制御用コントローラー',
      //         anchor: 'https://www.takenaka-co.co.jp/09special/sender_box/',
      //         path: '/img/article/feature-01.png',
      //       },
      //       {
      //         title: 'ホログラムLED<br>Holo-65',
      //         subTitle: '立体演出に浮遊感を',
      //         anchor: 'https://www.takenaka-co.co.jp/09special/holo-65/',
      //         path: '/img/article/feature-02.png',
      //       },
      //       {
      //         title: '体表面温度測定<br>サーモグラフィカメラ',
      //         subTitle: '安全なイベント運営のために',
      //         anchor: 'https://www.takenaka-co.co.jp/thermal-camera/',
      //         path: '/img/article/feature-03.png',
      //       },
      //       {
      //         title: 'ホワイトスペース/<br>1.2GHz帯<br>ワイヤレスマイク',
      //         subTitle: '多チャンネルプランに対応',
      //         anchor: 'https://www.takenaka-co.co.jp/09special/sound_system/wireless_mic.html',
      //         path: '/img/article/feature-04.png',
      //       },
      //       {
      //         title: 'LEDディスプレイ',
      //         subTitle: '高精細・立体など',
      //         anchor: 'https://www.takenaka-co.co.jp/09special/led/led.html',
      //         path: '/img/article/feature-05.png',
      //       },
      //       {
      //         title: 'Holo veil<br>(ホロベール)',
      //         subTitle: '透過スクリーンの空間演出',
      //         anchor: 'https://www.takenaka-co.co.jp/09special/holoveil/index.html',
      //         path: '/img/article/feature-06.png',
      //       },
      //       {
      //         title: '4K対応機器特集',
      //         subTitle: '超高画質の映像機器',
      //         anchor: 'https://www.takenaka-co.co.jp/01rental/4klineup/',
      //         path: '/img/article/feature-07.png',
      //       },
      //       {
      //         title: '照明型プロジェクター<br>Space Player',
      //         subTitle: 'プロジェクターの新しいカタチ',
      //         anchor: 'https://www.takenaka-co.co.jp/09special/spaceplayer/space_player.html',
      //         path: '/img/article/feature-08.png',
      //       },
      //     ],
      //   },
      //   {
      //     // 活用提案
      //     category: '活用提案',
      //     anchor: 'suggest',
      //     color: 'suggest',
      //     icon: 'icon-suggest',
      //     items: [
      //       {
      //         title: 'オンライントータル<br>ソリューション',
      //         subTitle: '企画から運営までサポート',
      //         anchor: 'https://www.symunity.co.jp/v-solution/',
      //         path: '/img/article/suggest-01.png',
      //       },
      //       {
      //         title: 'xR Studio',
      //         subTitle: 'リアル×バーチャル空間',
      //         anchor: 'https://www.symunity.co.jp/xr-studio/',
      //         path: '/img/article/suggest-02.png',
      //       },
      //       {
      //         title: '会議室の<br>配信スタジオ化',
      //         subTitle: '使用頻度が低い部屋の有効活用',
      //         anchor: 'https://www.symunity.co.jp/streaming_studio/',
      //         path: '/img/article/suggest-03.png',
      //       },
      //       {
      //         title: 'ライブ配信<br>ソリューション',
      //         subTitle: '配信の困りごとを解決',
      //         anchor: 'https://www.takenaka-co.co.jp/streaming/',
      //         path: '/img/article/suggest-04.png',
      //       },
      //       {
      //         title: 'TAKENAKA<br>AUDIO',
      //         subTitle: '音響システムをサポート',
      //         anchor: 'https://www.takenaka-co.co.jp/04planning/takenakaaudiotop.html',
      //         path: '/img/article/suggest-05.png',
      //       },
      //     ],
      //   },
      //   {
      //     // チラシ/カタログ
      //     category: 'チラシ/カタログ',
      //     anchor: 'catalog',
      //     color: 'catalog',
      //     icon: 'icon-catalog',
      //     items: [
      //       {
      //         title: '取扱機材チラシ<br>PDFダウンロード',
      //         subTitle: '様々なソリューション',
      //         anchor: 'https://www.takenaka-co.co.jp/01rental/paper.html',
      //         path: '/img/article/catalog-01.png',
      //       },
      //       {
      //         title: 'レンタルカタログ<br>冊子請求フォーム',
      //         subTitle: 'Vol.7 (2018年発行版)',
      //         anchor: 'https://www.takenaka-co.co.jp/06support/catarog_form.html',
      //         path: '/img/article/catalog-02.png',
      //       },
      //     ],
      //   },
      //   {
      //     // SNS/情報
      //     category: 'SNS/情報',
      //     anchor: 'sns',
      //     color: 'sns',
      //     icon: 'icon-sns',
      //     items: [
      //       {
      //         title: 'GoGo！<br>タケナカブログ',
      //         subTitle: 'レンタル情報をお届け',
      //         anchor: 'http://blog.livedoor.jp/takenakablog/',
      //         path: '/img/article/sns-01.png',
      //       },
      //       {
      //         title: '映像・音響機材<br>用語集',
      //         subTitle: '難しい用語をわかりやすく解説',
      //         anchor: 'https://www.takenaka-co.co.jp/01rental/rental_term/rental_term.html',
      //         path: '/img/article/sns-02.png',
      //       },
      //       {
      //         title: 'facebook',
      //         subTitle: 'タケナカの情報をお届け',
      //         anchor: 'https://www.facebook.com/TAKENAKACoLtd',
      //         path: '/img/article/sns-03.png',
      //       },
      //     ],
      //   },
      //   {
      //     // 販売
      //     category: '販売',
      //     anchor: 'sales',
      //     color: 'sales',
      //     icon: 'icon-sales',
      //     items: [
      //       {
      //         title: 'レンタル機材<br>中古販売',
      //         subTitle: 'お得なアウトレット',
      //         anchor: 'https://www.takenaka-co.co.jp/01rental/tyukohanbaikizai/tyukohanbai.html',
      //         path: '/img/article/sales-01.png',
      //       },
      //     ],
      //   },
      // ],
      categoryLists: [],
      pageClassLists: [],
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    await Promise.all([this.getCategoryList(), this.getSpecialPageList()])
    this.$store.commit('loading/changeStatus', false)
  },
  methods: {
    async getCategoryList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_category_list.php', param)
      // console.log(res)
      this.categoryLists = res.CategoryRootList
    },
    async getSpecialPageList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_spacial_page_list.php', param)
      // console.log(res)
      this.pageClassLists = res.PageClassList
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';
.word-keep {
  display: inline-block;
}
.article {
  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
  .content {
    width: 70%;
    flex-grow: 1;
    max-width: 860px;

    @include mq(lg) {
      width: 100%;
      margin: 0 auto;
    }
  }
  .page-link {
    border: 1px solid $cushion;
    &__heading {
      background-color: $cushion;
      height: 32px;

      @include mq(lg) {
        background-color: #fff;
        height: auto;
      }
    }

    &__list {
      ul {
        list-style: none;
      }

      @include mq(sm) {
        ul {
          max-width: 375px;
          margin: 0 auto;
        }
        li {
          min-width: 130px;
        }
      }
    }
  }
  .group {
    overflow-x: hidden;
    &__ttl {
      &-icon {
        display: inline-block;
        font-size: 3rem;
        overflow: hidden;
        width: 100% !important;

        @include mq(sm) {
          font-size: 2rem;
        }
      }
    }
    &__container {
      width: 100% !important;
      padding-right: 0 !important;
      padding-left: 0 !important;
    }
    &__row {
      margin: -10px -9px !important;

      @include mq(sm) {
        min-width: auto;
        margin: -8px -6px !important;
      }
    }
    &__col {
      max-width: 250px;
      min-width: 218px; // 200px + padding-x 18px = 218px
      padding: 10px 9px !important;

      @include mq(md) {
        max-width: 200px;
        min-width: 181px;
        padding: 8px 6px !important;
      }
    }
  }
  .article-card {
    &__title,
    &__subtitle {
      letter-spacing: 0.1em !important;
    }

    &__title {
      min-height: 80px;
    }

    @include mq(md) {
      &__title,
      &__subtitle {
        letter-spacing: 0.09em !important;
      }
      &__subtitle {
        font-size: 0.6875rem !important;
        letter-spacing: normal !important;
      }
    }
  }
  #feature {
    .article-card__subtitle {
      color: $feature;
    }
  }
  #suggest {
    .article-card__subtitle {
      color: $suggest;
    }
  }
  #catalog {
    .article-card__subtitle {
      color: $catalog;
    }
  }
  #sns {
    .article-card__subtitle {
      color: $sns;
    }
  }
  #sales {
    .article-card__subtitle {
      color: $sales;
    }
  }
}
</style>
