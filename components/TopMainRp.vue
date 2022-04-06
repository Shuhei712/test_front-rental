<template>
  <section class="top__main">
    <v-container class="top__inner">
      <v-row class="main__catch">
        <v-col cols="12">
          <h2 class="text-h3 text-sm-h2 bold letter-space-015em zen-kaku-gothic no-wrap text-white mt-3 mt-sm-10">
            <span class="bg-accent px-2 px-sm-5">必要な機材が</span>
          </h2>
          <h2 class="text-h3 text-sm-h2 bold letter-space-015em zen-kaku-gothic no-wrap text-white mt-5 mt-sm-10">
            <span class="bg-accent px-2 px-sm-5">レンタルで</span>
          </h2>
          <h2 class="text-h3 text-sm-h2 bold letter-space-015em zen-kaku-gothic no-wrap text-white mt-5 mt-sm-10">
            <span class="bg-accent px-2 px-sm-5">揃います!</span>
          </h2>
          <p class="letter-space-02em line-height-25em mt-10 mt-sm-15 text-body-2 text-sm-h6">
            あなたが今実現したいことは何でしょう。<br />
            配信、イベント、会議…etc<br />
            大丈夫! タケナカのレンタルに<br />おまかせください
          </p>
        </v-col>
      </v-row>
      <v-row class="main__menu mt-5 mt-sm-15">
        <v-col cols="12">
          <v-btn block>
            <img class="icon mr-1" src="/img/top/beginner-icon.png" />はじめての方へ
            <v-icon color="primary"> mdi-chevron-right </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12">
          <v-btn block>
            <v-icon class="mr-1" color="primary">mdi-help-circle-outline</v-icon>よくある質問
            <v-icon color="primary">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="main__search">
        <v-col cols="12"
          ><v-text-field
            class="bg-white"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn class="text-white" color="primary" to="/products" block>
            <v-icon class="mr-1" color="#ffffff">mdi-text-search</v-icon>詳細検索
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <div class="top__notice d-flex flex-column text-body-2 mt-10 mt-md-15">
      <div class="notice__lists text-center">
        <a class="text-white" href="/notice">お知らせ一覧へ<v-icon color="primary">mdi-chevron-right</v-icon></a>
      </div>
      <div class="notice__pickup px-3 px-sm-10 no-wrap">
        <p class="mb-0">新型コロナウイルス対策のための土曜日休業、 時差出退勤のお知らせ</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__main {
  position: relative;
  width: 100%;
  height: auto;
  background-image: url('/img/sp/top/main.png');
  background-position: right;
  background-size: cover;
  padding-top: calc(100px + 32px);
}

.main__menu,
.main__search {
  width: 50%;

  @include mq(sm) {
    width: 65%;
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

.top__notice {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: $cushion;

  .notice__lists {
    width: 100%;
    background-color: $outline;
    line-height: 40px;
  }

  .notice__pickup {
    width: 100%;
    line-height: 40px;
    background-color: $cushion;
    color: $category;
    flex-grow: 1;

    p {
      overflow: scroll;
    }

    .pickup__category {
      background-color: $category;
      border-radius: 30px;
    }
  }
}
</style>
