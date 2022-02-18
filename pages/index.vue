<template>
  <div class="top">
    <top-main></top-main>
    <div class="top__inner d-flex py-16">
      <category-lists></category-lists>
      <div class="content">
        <top-new></top-new>
        <top-article></top-article>
        <top-pickup></top-pickup>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top {
  position: relative;
  height: auto;

  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
}

.content {
  width: 70%;
  flex-grow: 1;
}
</style>
