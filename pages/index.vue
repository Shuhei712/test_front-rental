<template>
  <div class="top">
    <top-main></top-main>
    <div class="top__container d-flex py-16">
      <category-lists></category-lists>
      <div class="content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top {
  &__container {
    width: 100%;
    max-width: 1200px;
    height: 100vh;
    margin: 0 auto;
  }
}
</style>
