<template>
  <section class="top__main">
    <a
      class="top__corporate-link d-flex align-center letter-space-03em text-caption hover-opacity mt-6 mt-xl-10 mr-2 mr-xl-5"
      href="https://www.takenaka-co.co.jp/"
      target="_blank"
      rel="noopener noreferrer">
      <v-icon class="mb-2" color="#1A264B" small>mdi-login-variant</v-icon>株式会社タケナカ
    </a>
    <top-hexagon></top-hexagon>
    <!-- <top-slider></top-slider> -->
    <v-container class="top__inner py-16">
      <v-row class="main__catch" no-gutters>
        <v-col cols="12">
          <h1 class="text-h5 letter-space-03em text-white no-wrap">映像/音響機材のレンタルサービス</h1>
          <h2 class="catch__font text-h2 zen-kaku-gothic bold letter-space-015em text-white lh-crop-15 py-14">
            <span class="d-block"> 必要<span class="catch__font--small">な</span>機材、 </span>
            <span class="d-block">
              レンタル<span class="catch__font--small">で</span><span class="word-keep">揃います!</span>
            </span>
          </h2>
          <p class="letter-space-02em lh-crop-25 text-white no-wrap pb-13 mb-0">
            あなたが今実現したいことは何でしょう。<br />
            配信、イベント、会議…etc<br />
            大丈夫! タケナカのレンタルにおまかせください
          </p>
        </v-col>
      </v-row>
      <v-row class="main__search width-50 align-center mt-0">
        <v-col cols="8">
          <v-text-field
            v-model="keyword"
            class="bg-white"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"
            @keyup.enter="searchKeyword">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn class="text-white" color="primary" :href="'/products?type=3&keyword=' + keyword" block>
            <v-icon class="mr-1" color="#ffffff">mdi-text-search</v-icon>詳細検索
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="main__menu width-50">
        <v-col cols="6">
          <v-btn color="#fff" block>
            <img class="icon mr-1" src="/img/top/beginner-icon.png" /><span class="btn-text lh-crop-12"
              >はじめての方へ</span
            >
            <v-icon color="primary">mdi-chevron-right </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn color="#fff" block>
            <v-icon class="mr-1" color="primary">mdi-help-circle-outline</v-icon
            ><span class="btn-text lh-crop-12">よくある質問</span>
            <v-icon color="primary">mdi-chevron-right </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      keyword: undefined,
    }
  },
  methods: {
    searchKeyword() {
      window.location.href = '/products?type=3&keyword=' + this.keyword
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__main {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: calc(920 / 1920 * 100vw);
  background-image: url('/img/top/top.png');
  background-position: right;
  background-size: cover;
  padding-top: calc(100px + 32px);
}

.main__catch {
  width: 50%;
}

.catch__font {
  padding: 7% 0;
  &--small {
    font-size: 85% !important;
  }
}
.main__menu {
  .btn-text {
    color: $headingText;
  }
}

.top__corporate-link {
  position: absolute;
  top: 0;
  right: 0rem;
  writing-mode: vertical-rl;
  text-orientation: sideways;
  color: #1a264b !important;
  .v-icon {
    writing-mode: horizontal-tb;
  }
}
</style>
