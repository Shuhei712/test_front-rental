<template>
  <section class="main">
    <v-container class="">
      <v-row class="main-catch width-50">
        <v-col cols="12">
          <h1
            class="text-h5 letter-space-03em text-white mt-4 mt-xl-15 no-wrap"
          >
            映像/音響機材のレンタルサービス
          </h1>
          <h2
            class="text-h2 bold letter-space-015em zen-kaku-gothic text-white mt-4 mt-xl-15 no-wrap"
          >
            必要<span class="text-h3 bold letter-space-015em line-height-25em"
              >な</span
            >機材、<br />
            レンタル<span
              class="text-h3 bold letter-space-015em line-height-25em"
              >で</span
            >揃います!
          </h2>
          <p
            class="letter-space-02em line-height-25em text-white mt-4 mt-xl-15 no-wrap"
          >
            あなたが今実現したいことは何でしょう。<br />
            配信、イベント、会議…etc<br />
            大丈夫! タケナカのレンタルにおまかせください
          </p>
        </v-col>
      </v-row>
      <v-row class="main-search width-50">
        <v-col cols="8"
          ><v-text-field
            class="bg-white"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"
          ></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-btn class="text-white" color="primary" block
            ><v-icon class="mr-1" color="#fff">mdi-text-search</v-icon
            >詳細検索</v-btn
          >
        </v-col>
      </v-row>
      <v-row class="main-menu width-50">
        <v-col cols="6">
          <v-btn block
            ><img
              class="icon mr-1"
              src="@/assets/img/top/beginner-icon.png"
            />はじめての方へ<v-icon color="primary"
              >mdi-chevron-right</v-icon
            ></v-btn
          >
        </v-col>
        <v-col cols="6">
          <v-btn block
            ><v-icon class="mr-1" color="primary"
              >mdi-help-circle-outline</v-icon
            >よくある質問<v-icon color="primary"
              >mdi-chevron-right</v-icon
            ></v-btn
          >
        </v-col>
      </v-row>
    </v-container>
    <div class="notice d-flex text-body-2">
      <div class="notice__pickup text-center">
        <span class="text-white mr-3 px-6 py-1">CATEGORY</span>
        新型コロナウイルス対策のための土曜日休業、 時差出退勤のお知らせ
      </div>
      <div class="notice__lists text-white pl-10">
        お知らせ一覧へ<v-icon>mdi-chevron-right</v-icon>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.main {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('~@/assets/img/top/main.png');
  background-position: center;
  background-size: cover;
  padding-top: calc(100px + 32px);
}

.notice {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  background-color: #f2f2f2;

  &__pickup {
    width: 70%;
    line-height: 40px;
    color: #cc2929;

    span {
      background-color: #cc2929;
      border-radius: 30px;
      font-family: 'Montserrat';
    }
  }

  &__lists {
    width: 30%;
    background-color: #4b5654;
    line-height: 40px;
  }
}
</style>
