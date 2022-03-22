<template>
  <div>
    <top-bar title="お知らせ一覧"></top-bar>
    <section class="notice px-3 py-16">
      <div class="notice__inner">
        <iframe src="https://rental-resource.takenaka-co.co.jp/catalog-page/news/index.html" frameborder="0"></iframe>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.notice {
  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;

    iframe {
      width: 100%;
      height: 75vh;
      max-height: 1100px;
    }
  }
}
</style>
