<template>
  <section id="top" class="category">
    <to-top-btn></to-top-btn>
    <top-bar title="カテゴリから探す" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner category__inner py-16">
      <div class="category__search mb-16">
        <v-form class="d-flex align-center" @submit.prevent>
          <v-text-field
            v-model="keyword"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"
            @keyup.enter="searchKeyword"></v-text-field>
          <v-btn color="primary" class="ml-2 ml-md-5" :href="'/products?type=3&keyword=' + keyword">
            <v-icon class="mr-1">mdi-text-search</v-icon>詳細検索
          </v-btn>
        </v-form>
      </div>
      <div class="category__list mb-16">
        <div
          class="category__heading d-flex justify-center align-center text-body-1 text-md-h6 font-weight-regular letter-space-015em pa-1 pa-md-0">
          <v-icon class="mr-2" color="accent">mdi-shape-outline</v-icon>CATEGORY
        </div>
        <div class="py-4">
          <p class="text-center text-caption text-md-body-2 text-gray mb-7">クリックでページ内項目にジャンプします</p>
          <ul
            class="d-flex flex-wrap justify-start justify-lg-center pl-4 pl-sm-5 pl-lg-7 text-body-2 text-lg-subtitle-1">
            <li v-for="root in categoryLists" :key="root.CategoryName" class="mr-4 mr-sm-5 mr-lg-7 mb-5">
              <a
                v-scroll-to="{ el: '#category-id_' + root.CategoryID, offset: -130 }"
                class="d-flex align-center text-gray">
                <v-icon class="mr-2">{{ root.IconImageURL }}</v-icon>
                <span class="category__text">{{ root.CategoryName }}</span>
                <v-icon color="#878787">mdi-chevron-down</v-icon>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-for="root in categoryLists"
        :id="'category-id_' + root.CategoryID"
        :key="root.CategoryName"
        class="cat-group mb-16">
        <!-- 大カテゴリー -->
        <h3
          class="cat-group__ttl d-flex flex-column text-center text-body-1 text-sm-h6 text-md-h5 text-gray bold letter-space-015em mb-4 mb-md-9">
          <v-icon class="cat-group__ttl-icon mb-2 mb-md-4">{{ root.IconImageURL }}</v-icon>
          {{ root.CategoryName }}
        </h3>
        <div v-for="child in root.SubCategoryList" :key="child.CategoryName" class="cat-group__child mb-8">
          <!-- 中カテゴリー -->
          <h4 class="cat-group__child-ttl text-body-1 text-md-h6 font-heading bold pa-5">
            {{ child.CategoryName }}
            <v-icon class="cat-group__child-icon">{{ root.IconImageURL }}</v-icon>
          </h4>
          <!-- 小カテゴリー -->
          <v-container class="cat-group__container px-0">
            <v-row no-gutters class="cat-group__row">
              <v-col
                v-for="(grandChild, index) in child.SubCategoryList"
                :key="index"
                cols="6"
                lg="4"
                class="cat-group__col">
                <a
                  class="cat-group__btn text-caption text-sm-body-2 text-md-body-1 font-heading bold px-2 px-sm-3 py-2"
                  :href="
                    '/products?type=2&categoryID=' + grandChild.CategoryID + '&categoryName=' + grandChild.CategoryName
                  ">
                  <span class="cat-group__btn-name">{{ grandChild.CategoryName }}</span>
                </a>
              </v-col>
            </v-row>
          </v-container>
          <!-- <p v-if="categoryChild.note" class="cat-group__child-note text-body-2 text-md-body-1 bold pl-5">
            {{ categoryChild.note }}
          </p> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    keyword: undefined,
    breadCrumbs: [],
    categoryLists: [],
  }),
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.getCategoryList()
    this.$store.commit('loading/changeStatus', false)
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    async getCategoryList() {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      const res = await this.$axios.$post('get_category_list_page.php', param)
      this.categoryLists = res.CategoryRootList
      // console.log(res)
    },
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'カテゴリーから探す', path: '/category' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    searchKeyword() {
      window.location.href = '/products?type=3&keyword=' + this.keyword
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
@import 'assets/icomoon/style.css';
// カテゴリーカラー
$online: #7f7fcc;
$online-bg: #505072;
$led: #c986d1;
$led-bg: #5a2066;
$pj: #cc8071;
$pj-bg: #922617;
$display: #7b9456;
$display-bg: #3f600b;
$media: #bf9540;
$media-bg: #60410b;
$video: #bf9540;
$video-bg: #60410b;
$camera: #c56a84;
$camera-bg: #720e34;
$sensor: #62a3ca;
$sensor-bg: #115b7c;
$sound: #94847b;
$sound-bg: #564132;
$network: #867cc7;
$network-bg: #3e3875;
$other: #97745f;
$other-bg: #563a2e;

.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}

.category__search {
  .v-btn {
    color: #ffffff !important;
  }
}

.category {
  &__heading {
    background-color: $cushion;
  }
  &__list {
    border: 1px solid $cushion;

    ul {
      list-style: none;
    }

    @include mq(lg) {
      ul {
        margin: 0 auto;
      }
      li {
        min-width: calc((100% - 80px) / 4); // margin-right 20px*4
      }
    }

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
}
.cat-group {
  overflow-x: hidden;
  &__ttl {
    &-icon {
      display: inline-block;
      font-size: 3rem;
      width: 100% !important;

      @include mq(sm) {
        font-size: 2rem;
      }
    }
  }
  &__child {
    &-ttl {
      border-style: solid;
      border-width: 1px;
      overflow: hidden;
      position: relative;
      z-index: 1;
    }
    &-icon {
      opacity: 0.5;
      top: 50%;
      right: 7%;
      transform: translateY(-50%) rotate(20deg);
      position: absolute;
      z-index: -1;
      #category-id_1 & {
        font-size: 163px;

        @include mq(md) {
          font-size: 125px;
        }
      }
      #category-id_2 & {
        font-size: 156px;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_3 & {
        font-size: 159px;
        top: 60%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_4 & {
        font-size: 160px;
        top: 62%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_5 & {
        font-size: 169px;
        top: 40%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_6 & {
        font-size: 163px;
        top: 75%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_7 & {
        font-size: 165px;
        transform: translateY(-36%) rotate(14deg);

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_8 & {
        font-size: 174px;
        transform: translateY(-43%) rotate(0deg);

        @include mq(md) {
          font-size: 120px;
        }
      }
      #category-id_9 & {
        font-size: 162px;
        top: 63%;

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_10 & {
        font-size: 163px;
        transform: translateY(-48%) rotate(-16deg);

        @include mq(md) {
          font-size: 110px;
        }
      }
      #category-id_11 & {
        font-size: 128px;

        @include mq(md) {
          font-size: 90px;
        }
      }
    }
    &-note {
      color: #878787;
      position: relative;
      &::before {
        content: '※';
        display: inline-block;
        left: 0;
        position: absolute;
      }
    }
  }
  &__container {
    width: 100% !important;
  }
  &__row {
    margin: -7px -8px;

    @include mq(sm) {
      margin: -5px -6px;
    }
  }
  &__col {
    height: 82px; // 82px-padding:14px =中身68px
    padding: 7px 8px !important;

    @include mq(sm) {
      padding: 5px 6px !important;
    }
  }
  &__btn {
    background: {
      repeat: no-repeat;
      position: right -5% center;
    }
    border: {
      width: 1px;
      style: solid;
      radius: 0.5em;
    }
    display: inline-block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: relative;
    &-name {
      color: #fff;
      position: relative;
      z-index: 1;
    }
    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
    }
    &::before {
      background-position: center center;
      background-size: 100% auto;
      width: 60%;
      height: 100%;
      top: 0;
      right: -7%;
    }
    &::after {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      #category-id_1 & {
        background-color: rgba($online-bg, 0.6);
      }
      #category-id_2 & {
        background-color: rgba($led-bg, 0.5);
      }
      #category-id_3 & {
        background-color: rgba($pj-bg, 0.5);
      }
      #category-id_4 & {
        background-color: rgba($display-bg, 0.5);
      }
      #category-id_5 & {
        background-color: rgba($media-bg, 0.5);
      }
      #category-id_6 & {
        background-color: rgba($video-bg, 0.5);
      }
      #category-id_7 & {
        background-color: rgba($camera-bg, 0.5);
      }
      #category-id_8 & {
        background-color: rgba($sensor-bg, 0.5);
      }
      #category-id_9 & {
        background-color: rgba($sound-bg, 0.5);
      }
      #category-id_10 & {
        background-color: rgba($network-bg, 0.5);
      }
      #category-id_11 & {
        background-color: rgba($other-bg, 0.5);
      }
    }
  }
  &__child-ttl,
  &__btn {
    #category-id_1 & {
      border-color: $online;
    }
    #category-id_2 & {
      border-color: $led;
    }
    #category-id_3 & {
      border-color: $pj;
    }
    #category-id_4 & {
      border-color: $display;
    }
    #category-id_5 & {
      border-color: $media;
    }
    #category-id_6 & {
      border-color: $video;
    }
    #category-id_7 & {
      border-color: $camera;
    }
    #category-id_8 & {
      border-color: $sensor;
    }
    #category-id_9 & {
      border-color: $sound;
    }
    #category-id_10 & {
      border-color: $network;
    }
    #category-id_11 & {
      border-color: $other;
    }
  }
}
#category-id_1 {
  .cat-group__child {
    &:nth-of-type(1) {
      // オンラインイベント機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/online/1-01.png');
          background-position-y: 15%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/online/1-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/online/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/online/1-04.png');
          background-position-y: 60%;
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/online/1-05.png');
          background-position-y: 70%;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/online/1-06.png');
          background-position-y: bottom;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/online/1-07.png');
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/online/1-08.png');
          background-position-y: bottom;
        }
        &:nth-child(9) .cat-group__btn::before {
          background-image: url('/img/category/online/1-09.png');
          background-position-y: 80%;
        }
        &:nth-child(10) .cat-group__btn::before {
          background-image: url('/img/category/online/1-10.png');
        }
      }
    }
  }
}
#category-id_2 {
  .cat-group__child {
    &:nth-of-type(1) {
      // LEDディスプレイ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/led/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/led/1-02.png');
          background-position-y: top;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/led/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/led/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/led/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/led/1-06.png');
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/led/1-07.png');
          background-position-y: 80%;
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/led/1-08.png');
        }
      }
    }
  }
}
#category-id_3 {
  .cat-group__child {
    &:nth-of-type(1) {
      // プロジェクター本体 / レンズ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-06.png');
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/projector/1-07.png');
        }
      }
    }
    &:nth-of-type(2) {
      // プロジェクター関連機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-01.png');
          background-position-y: 15%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-03.png');
          background-position-y: 10%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/projector/2-06.png');
        }
      }
    }
    &:nth-of-type(3) {
      // スクリーン
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-03.png');
          background-position-y: bottom;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-04.png');
          background-position-y: 75%;
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-05.png');
          background-position-y: bottom;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-06.png');
          background-position-y: 40%;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/projector/3-07.png');
          background-position-y: 80%;
        }
      }
    }
  }
}
#category-id_4 {
  .cat-group__child {
    &:nth-of-type(1) {
      // フラットディスプレイ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/display/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/display/1-01.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/display/1-03.png');
          background-position-y: 80%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/display/1-04.png');
          background-position-y: bottom;
        }
      }
    }
    &:nth-of-type(2) {
      // その他ディスプレイ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/display/2-01.png');
          background-position-y: 27%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/display/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/display/2-03.png');
          background-position-y: 27%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/display/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/display/2-05.png');
          background-position-y: 80%;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/display/2-06.png');
          background-position-y: bottom;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/display/2-07.png');
          background-position-y: bottom;
        }
      }
    }
    &:nth-of-type(3) {
      // 自立スタンド / 壁掛・吊金具
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/display/3-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/display/3-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/display/3-03.png');
          background-position-y: 5%;
        }
      }
    }
  }
}
#category-id_5 {
  .cat-group__child {
    &:nth-of-type(1) {
      // メディアサーバー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/1-01.png');
        }
      }
    }
    &:nth-of-type(2) {
      // プレーヤー / レコーダー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/2-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/media-player/2-02.png');
        }
      }
    }
    &:nth-of-type(3) {
      // ハードディスク（メディア）レコーダー / プレーヤー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/3-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/media-player/3-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/media-player/3-03.png');
        }
      }
    }
    &:nth-of-type(4) {
      // ビデオカセットレコーダー(VCR)
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/media-player/4-01.png');
        }
      }
    }
  }
}
#category-id_6 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 映像周辺機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-02.png');
          background-position-y: 15%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-06.png');
          background-position-y: 70%;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-07.png');
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-08.png');
        }
        &:nth-child(9) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-09.png');
          background-position-y: 93%;
        }
        &:nth-child(10) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-10.png');
        }
        &:nth-child(11) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-11.png');
        }
        &:nth-child(12) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-12.png');
        }
        &:nth-child(13) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-13.png');
        }
        &:nth-child(14) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-14.png');
        }
        &:nth-child(15) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/1-15.png');
        }
      }
    }
    &:nth-of-type(2) {
      // ケーブル
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-01.png');
          background-position-y: top;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-05.png');
          background-position-y: top;
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/video-peripheral/2-06.png');
          background-position-y: top;
        }
      }
    }
  }
}
#category-id_7 {
  .cat-group__child {
    &:nth-of-type(1) {
      // カメラ
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-02.png');
          background-position-y: 35%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-03.png');
          background-position-y: 10%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-04.png');
          background-position-y: 10%;
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-06.png');
          background-position-y: top;
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/camera/1-07.png');
          background-position-y: 30%;
        }
      }
    }
  }
}
#category-id_8 {
  .cat-group__child {
    &:nth-of-type(1) {
      // メディアアプリケーション/ センサー/インタラクティブ関連
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/sensor/1-01.png');
          background-position-y: 70%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/sensor/1-02.png');
          background-position-y: 60%;
        }
      }
    }
  }
}
#category-id_9 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 音響機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-01.png');
          background-position-y: top;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-02.png');
          background-position-y: 80%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-03.png');
          background-position-y: 90%;
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-05.png');
        }
        &:nth-child(6) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-06.png');
        }
        &:nth-child(7) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-07.png');
        }
        &:nth-child(8) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-08.png');
        }
        &:nth-child(9) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-09.png');
          background-position-y: 20%;
        }
        &:nth-child(10) .cat-group__btn::before {
          background-image: url('/img/category/sound/1-10.png');
        }
      }
    }
    &:nth-of-type(2) {
      // インカム / トランシーバー
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/sound/2-01.png');
        }
      }
    }
  }
}
#category-id_10 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 会議用機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/network/1-01.png');
          background-position-y: 70%;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/network/1-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/network/1-03.png');
          background-position-y: 16%;
        }
      }
    }
    &:nth-of-type(2) {
      // PC / ICTネットワーク機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/network/2-01.png');
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/network/2-02.png');
          background-position-y: 80%;
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/network/2-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/network/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/network/2-05.png');
          background-position-y: 80%;
        }
      }
    }
  }
}
#category-id_11 {
  .cat-group__child {
    &:nth-of-type(1) {
      // 照明機器
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/other/1-01.png');
          background-position-y: top;
        }
      }
    }
    &:nth-of-type(2) {
      // 多目的用品
      .cat-group__col {
        &:nth-child(1) .cat-group__btn::before {
          background-image: url('/img/category/other/2-01.png');
          background-position-y: top;
        }
        &:nth-child(2) .cat-group__btn::before {
          background-image: url('/img/category/other/2-02.png');
        }
        &:nth-child(3) .cat-group__btn::before {
          background-image: url('/img/category/other/2-03.png');
        }
        &:nth-child(4) .cat-group__btn::before {
          background-image: url('/img/category/other/2-04.png');
        }
        &:nth-child(5) .cat-group__btn::before {
          background-image: url('/img/category/other/2-05.png');
        }
      }
    }
  }
}
</style>
