<template>
  <section class="top__main">
    <a
      class="top__corporate-link d-flex align-center letter-space-03em text-body-2 hover-opacity mt-6 mt-xl-10 mr-2 mr-xl-10"
      href="https://www.takenaka-co.co.jp/"
      target="_blank"
      rel="noopener noreferrer">
      <v-icon class="mb-2" color="#1A264B">mdi-login-variant</v-icon>株式会社タケナカ
    </a>
    <top-slider></top-slider>
    <v-container class="top__inner">
      <v-row class="main__catch">
        <v-col cols="12">
          <h1 class="text-h5 letter-space-03em text-white no-wrap mt-4 mt-xl-15">映像/音響機材のレンタルサービス</h1>
          <h2 class="text-h2 bold letter-space-015em zen-kaku-gothic no-wrap text-white mt-4 mt-xl-15">
            必要<span class="text-h3 bold letter-space-015em line-height-25em">な</span>機材、
          </h2>
          <h2 class="text-h2 bold letter-space-015em zen-kaku-gothic no-wrap text-white">
            レンタル<span class="text-h3 bold letter-space-015em line-height-25em">で</span>揃います!
          </h2>
          <p class="letter-space-02em line-height-25em text-white no-wrap mt-4 mt-xl-15">
            あなたが今実現したいことは何でしょう。<br />
            配信、イベント、会議…etc<br />
            大丈夫! タケナカのレンタルにおまかせください
          </p>
        </v-col>
      </v-row>
      <v-row class="main__search width-50">
        <v-col cols="8">
          <v-text-field
            class="bg-white"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn class="text-white" color="primary" to="/products" block>
            <v-icon class="mr-1" color="#ffffff">mdi-text-search</v-icon>詳細検索
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="main__menu width-50 mb-1">
        <v-col cols="6">
          <v-btn block>
            <img class="icon mr-1" src="/img/top/beginner-icon.png" />はじめての方へ
            <v-icon color="primary">mdi-chevron-right </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block>
            <v-icon class="mr-1" color="primary">mdi-help-circle-outline</v-icon>よくある質問
            <v-icon color="primary">mdi-chevron-right </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__main {
  position: relative;
  width: 100%;
  height: calc(1035 / 1920 * 100vw);
  background-image: url('/img/top/main.png');
  background-position: right;
  background-size: cover;
  padding-top: calc(100px + 32px);
}

.main__catch {
  width: 50%;
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
