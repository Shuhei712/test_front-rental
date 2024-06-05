<template>
  <section class="top__main pb-15">
    <top-hexagon-rp :pickup-lists="pickupLists"></top-hexagon-rp>
    <v-container class="top__inner pa-0">
      <v-row class="main__catch" no-gutters>
        <v-col cols="12" class="mt-sm-5">
          <h2
            class="catch__font text-sm-h3 zen-kaku-gothic bold letter-space-015em line-height-normal text-white no-wrap">
            <span class="d-block">
              <span class="catch__bg px-2 px-sm-5"
                >必要<span class="catch__font--small">な</span>機材<span class="catch__font--small">が</span></span
              >
            </span>
            <span class="d-block mt-1">
              <span class="catch__bg px-2 px-sm-5">レンタル<span class="catch__font--small">で</span></span>
            </span>
            <span class="d-block mt-1">
              <span class="catch__bg px-2 px-sm-5">揃います!</span>
            </span>
          </h2>
          <div class="catch__intro my-5 my-md-8">
            <p class="text-body-2 text-sm-body-1 letter-space-02em lh-crop-25 px-2 px-sm-5 py-4">
              あなたが今実現したいことは<span class="word-keep">何でしょう。</span><br />
              配信、イベント、会議…etc<br />
              大丈夫! タケナカのレンタルに<br />おまかせください
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row class="main__menu" no-gutters>
        <v-col cols="12">
          <div class="btn-wrap">
            <v-btn color="#fff" to="/guide#enrty" block small>
              <img class="icon mr-1" src="/img/top/beginner-icon.png" /><span class="btn-text lh-crop-12"
                >はじめての方へ</span
              >
              <v-icon color="primary" class="mr-n2"> mdi-chevron-right </v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" class="mt-3">
          <div class="btn-wrap">
            <v-btn color="#fff" to="/faq" block small>
              <v-icon class="mr-1" color="primary" small>mdi-help-circle-outline</v-icon
              ><span class="btn-text lh-crop-12">よくある質問</span>
              <v-icon color="primary" class="mr-n2">mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row class="main__search mt-5" no-gutters>
        <v-col cols="12">
          <div class="btn-wrap keyword-search">
            <v-text-field
              class="bg-white text-caption"
              color="primary"
              placeholder="キーワード検索"
              outlined
              dense
              prepend-inner-icon="mdi-magnify"
              hide-details="auto"></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" class="mt-3">
          <div class="btn-wrap">
            <v-btn class="text-white" color="primary" :href="'/products?type=3&keyword=' + keyword" block small>
              <v-icon class="mr-1" color="#ffffff" small>mdi-text-search</v-icon
              ><span class="lh-crop-12">詳細検索</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    pickupLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      keyword: '',
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__main {
  position: relative;
  width: 100%;
  height: auto;
  background-image: url('https://rental-resource-sw.symunity.co.jp/catalog-img/top/sp/first-view.jpg');
  background-position: 25% center;
  background-size: cover;
  padding-top: calc(5px + 60px + 32px);
  overflow: hidden;
  &::before {
    content: '';
    display: block;
    background-color: rgba(#fff, 0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
  }
}

.top__inner {
  width: 100% !important;
}

.main__catch {
  .catch__font {
    width: 90%;
    margin: auto;
    position: relative;
    z-index: 10;
    @include mq(sm) {
      font-size: 42px !important;
    }
    &--small {
      font-size: 85% !important;
    }
  }
  .catch__bg {
    background: linear-gradient(transparent 10%, $accent 10%);
  }
  .catch__intro {
    background-color: rgba(#fff, 0.86);
    color: $headingText;
    position: relative;
    z-index: 1;
    &::before,
    &::after {
      content: '';
      display: block;
      left: 0;
      position: absolute;
    }
    &::before {
      border-bottom: 7vw solid rgba(#fff, 0.86);
      border-right: 100vw solid transparent;
      bottom: 100%;
    }
    &::after {
      border-top: 7vw solid rgba(#fff, 0.86);
      border-right: 100vw solid transparent;
      top: 100%;
    }
    p {
      width: 90%;
      margin: auto;
      position: relative;
    }
  }
}

.main {
  &__menu,
  &__search {
    width: 90%;
    margin: auto;
    position: relative;
    z-index: 10;

    .btn-wrap {
      width: 48%;
      max-width: 400px;
      min-width: 165px;
    }
  }
  &__menu {
    .icon {
      width: 16px !important;
    }
    .btn-text {
      color: $headingText;
    }
  }
}
.top__corporate-link {
  position: absolute;
  top: 0;
  right: 0rem;
  writing-mode: vertical-rl;
  text-orientation: sideways;
  color: #1a264b !important;
}
</style>
