<template>
  <div class="top-bar">
    <div class="bar__inner container">
      <bread-crumbs :bread-crumbs="breadCrumbs"></bread-crumbs>
      <h2 class="text-white letter-space-03em text-h6 text-sm-h5 bold my-4">
        {{ title }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    breadCrumbs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '/assets/css/common.scss';

.top-bar {
  width: 100%;
  height: auto;
  max-height: 280px;
  background-image: url('https://rental-resource.takenaka-co.co.jp/catalog-img/top_bar/main.png');
  background-position: center;
  background-size: cover;
  padding-top: calc(80px + 32px);

  @include mq(sm) {
    background-image: url('https://rental-resource.takenaka-co.co.jp/catalog-img/top_bar/sp/main.png');
    padding-top: calc(60px + 16px);
  }

  .bar__inner {
    width: 100%;
    max-width: 1200px !important;
    @include mq(sm) {
      width: 100% !important;
    }
  }
}
</style>
