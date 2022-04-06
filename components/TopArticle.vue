<template>
  <section class="article">
    <div class="article__heading d-flex align-center px-3 px-md-10">
      <v-icon class="mr-5" color="accent">mdi-creation</v-icon>
      <h3 class="zen-kaku-gothic text-h6 text-md-h5 letter-space-02em">
        特設ページ<span class="zen-kaku-gothic text-body-2 text-md-h6 letter-space-02em">ほか</span>
      </h3>
      <v-divider color="line"></v-divider>
      <v-btn class="ml-5" to="/article" outlined>一覧へ<v-icon color="primary">mdi-chevron-right</v-icon></v-btn>
    </div>
    <v-container class="article__content d-flex flex-column px-1 px-lg-8">
      <div class="article__list order-1 order-lg-0">
        <hooper class="hooper" :settings="hooperSettings">
          <slide v-for="(list, index) in specialPageLists" :key="index">
            <article-card
              :color="toPageClassColorFrom(list.PageClassID)"
              :path="list.SpecialPageImageURL"
              :class-name="toPageClassNameFrom(list.PageClassID)"
              :title="list.SpecialPageName"
              :link="list.PageURL">
            </article-card>
          </slide>
        </hooper>
      </div>
      <div class="artcle__search mt-3 pa-md-2">
        <v-row align="center" no-gutters>
          <v-col cols="2"><div class="text-body-2 text-no-wrap">絞り込み</div></v-col>
          <v-col cols="1"><v-divider></v-divider></v-col>
          <v-col cols="9">
            <div class="search__input d-flex flex-wrap ml-2">
              <div v-for="(list, index) in categoryLists" :key="index">
                <input :id="list.style" type="radio" name="tag" />
                <label :for="list.style" :class="list.class" class="rounded-pill px-3 py-1 text-body-2">
                  {{ list.name }}
                </label>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  components: {
    Hooper,
    Slide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: false,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      },
      tag: 'ALL',
      articleLists: [
        {
          color: 'feature',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: '機材特集',
          title: 'センダーボックス特集',
        },
        {
          color: 'suggest',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: '活用提案',
          title: 'ライブ配信ソリューション',
        },
        {
          color: 'feature',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: '機材特集',
          title: '体表面温度測定 サーモグラフィカメラ',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
        {
          color: 'catalog',
          path: 'https://cdn.vuetifyjs.com/images/cards/cooking.png',
          category: 'チラシ/カタログ',
          title: '取扱機材チラシ/PDFダウンロード',
        },
      ],
      categoryLists: [
        {
          name: 'ALL',
          value: 0,
          style: 'all',
          class: 'tag--all',
        },
        {
          name: '機材特集',
          value: 1,
          style: 'feature',
          class: 'tag--feature',
        },
        {
          name: '活用提案',
          value: 2,
          style: 'suggest',
          class: 'tag--suggest',
        },
        {
          name: 'チラシ/カタログ',
          value: 3,
          style: 'catalog',
          class: 'tag--catalog',
        },
        {
          name: 'sns',
          value: 4,
          style: 'sns',
          class: 'tag--sns',
        },
        {
          name: '販売',
          value: 5,
          style: 'sales',
          class: 'tag--sales',
        },
      ],
      hooperSettings: {
        itemsToShow: 4,
        vertical: true,
        autoPlay: true,
        playSpeed: 3000,
        breakpoints: {
          960: {
            vertical: false,
          },
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.article {
  &__content {
    width: 100%;
  }

  .search__input {
    input {
      display: none;
    }

    input:checked + label {
      color: #ffffff;
    }

    label {
      display: inline-block;
      margin: 5px;
      cursor: pointer;
    }

    .tag--all {
      border: 1px solid $outline;
      color: $outline;
    }

    input:checked + .tag--all {
      background-color: $outline;
    }

    .tag--feature {
      border: 1px solid $feature;
      color: $feature;
    }

    input:checked + .tag--feature {
      background-color: $feature;
    }

    .tag--suggest {
      border: 1px solid $suggest;
      color: $suggest;
    }

    input:checked + .tag--suggest {
      background-color: $suggest;
    }

    .tag--catalog {
      border: 1px solid $catalog;
      color: $catalog;
    }

    input:checked + .tag--catalog {
      background-color: $catalog;
    }

    .tag--sns {
      border: 1px solid $sns;
      color: $sns;
    }

    input:checked + .tag--sns {
      background-color: $sns;
    }

    .tag--sales {
      border: 1px solid $sales;
      color: $sales;
    }

    input:checked + .tag--sales {
      background-color: $sales;
    }
  }
}

.hooper {
  height: 220px;
  @include mq(md) {
    height: calc(70px * 4 + 10px * 4);
  }
}

.hooper-slide {
  // margin: 0 5px;
  padding: 0 5px;
  @include mq(md) {
    max-height: 70px !important;
    margin: 5px 0;
  }
}
</style>
