<template>
  <div v-if="!$fetchState.pending && !$fetchState.error" id="top" class="top">
    <div class="top__share top__share--fixed">
      <v-btn
        class="share__twitter text-white text-subtitle-2 mr-2"
        color="twitter"
        href="https://twitter.com/TakenakaCoLtd"
        target="_blank">
        <div class="btn-shadow"></div>
        <v-icon class="mr-2 rotate-90">mdi-twitter</v-icon>Tweet
      </v-btn>
      <v-btn
        class="share__twitter text-white text-subtitle-2 mr-2"
        color="facebook"
        href="https://www.facebook.com/TAKENAKACoLtd"
        target="_blank">
        <v-icon class="mr-2 rotate-90">mdi-facebook</v-icon>Share
      </v-btn>
    </div>
    <to-top-btn></to-top-btn>
    <div class="top__hexagon hidden-md-and-down">
      <div class="hexagon"></div>
      <div class="hexagon"></div>
      <div class="hexagon"></div>
    </div>
    <top-main :pickup-lists="pickupLists.NewsReleaseList" class="hidden-md-and-down"></top-main>
    <top-main-rp :pickup-lists="pickupLists.NewsReleaseList" class="hidden-lg-and-up"></top-main-rp>
    <top-notice :news-lists="newsLists.NewsReleaseList"></top-notice>
    <div class="top__inner d-flex pt-16">
      <category-lists></category-lists>
      <div class="content ml-lg-10">
        <top-new :new-product-lists="newProductLists.NewProductList"></top-new>
        <top-article
          :page-class-lists="specialPageLists.PageClassList"
          :special-page-lists="specialPageLists.SpecialPageList">
        </top-article>
        <top-pickup :pickup-lists="pickupTagLists.NewProductList"></top-pickup>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  loading: false,
  data() {
    return {
      newsLists: [],
      pickupLists: [],
      newProductLists: [],
      specialPageLists: [],
      pickupTagLists: [],
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.resetBreadCrumbs()

    const [newsLists, pickupLists, newProductLists, specialPageLists, pickupTagLists] = await Promise.all([
      this.$api.getNewsList(),
      this.$api.getPickupList(),
      this.$api.getNewProductList(4),
      this.$api.getSpecialPageList(),
      this.$api.getPickUpTagList(4),
    ])

    this.newsLists = newsLists
    this.pickupLists = pickupLists
    this.newProductLists = newProductLists
    this.specialPageLists = specialPageLists
    this.pickupTagLists = pickupTagLists

    this.$store.commit('loading/changeStatus', false)
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    resetBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top {
  overflow: hidden;
  position: relative;
  height: auto;

  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 140px !important;
  }
}

.top__share {
  z-index: 100;
  transform-origin: right top;
  transform: rotate(90deg) translate(0, 0);

  @include mq(lg) {
    display: none;
  }

  .share__twitter {
    box-shadow: 5px -5px 0px -2px #ffffff;
    border-radius: 5px;
  }
}

.top__share--fixed {
  position: fixed;
  bottom: 24px;
  right: calc(30 / 1920 * 100vw);
}

.top__share--absolute {
  position: absolute;
  bottom: 24px;
  right: calc(30 / 1920 * 100vw);
}

.content {
  width: 70%;
  flex-grow: 1;

  @include mq(lg) {
    width: 100%;
  }
}

.top__hexagon {
  width: calc(103px * 2);
  height: calc(103px * 1.732);
  bottom: -35px;
  right: calc(-50 / 1920 * 100vw);
  transform: rotate(-10deg);
  position: absolute;
  z-index: 1;

  .hexagon {
    border-top: 1px solid $primary; // 辺の長さを調整
    border-bottom: 1px solid $primary; // 辺の長さを調整
    box-sizing: border-box;
    width: 103px; // 辺の長さを調整
    height: calc(103px * 1.732); // 辺の長さを調整
    left: calc(103px * 0.5); // 位置を調整
    position: absolute;

    &:nth-of-type(1) {
      transform: rotate(0deg);
    }
    &:nth-of-type(2) {
      transform: rotate(60deg);
    }
    &:nth-of-type(3) {
      transform: rotate(120deg);
    }
  }
}
</style>
