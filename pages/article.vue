<template>
  <section id="top" class="article">
    <to-top-btn></to-top-btn>
    <top-bar title="特設ページ 一覧" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="article__inner d-lg-flex py-16 px-3 px-lg-0">
      <category-lists></category-lists>
      <div class="content ml-lg-15">
        <div class="page-link mb-16">
          <div
            class="page-link__heading d-flex align-center justify-center text-caption text-md-body-2 text-gray pa-2 pa-lg-0">
            クリックでページ内項目にジャンプします
          </div>
          <div class="page-link__list pt-7 pb-2">
            <ul
              class="d-flex flex-wrap justify-space-between justify-sm-center pl-4 pl-sm-7 text-body-2 text-md-body-1">
              <li v-for="article in pageClassLists" :key="article.PageClassColor" class="mr-4 mr-sm-7 mb-5">
                <a
                  v-scroll-to="{ el: '#' + article.PageClassColor, offset: -130 }"
                  class="d-flex align-center text-gray">
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
      pageClassLists: [],
      breadCrumbs: [],
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.getSpecialPageList()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "特設ページ",
      meta: [
        { hid: 'description', name: 'description', content: '特設ページ | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    async getSpecialPageList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_spacial_page_list.php', param)
      this.pageClassLists = res.PageClassList
    },
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '特設ページ一覧', path: '/article' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
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
