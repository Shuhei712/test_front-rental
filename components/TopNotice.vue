<template>
  <div class="top__notice d-flex text-body-1 mt-n1">
    <div class="notice__pickup text-center">
      <span class="pickup__category text-caption text-white mr-3 px-6 py-1">CATEGORY</span>
      新型コロナウイルス対策のための土曜日休業、 時差出退勤のお知らせ
    </div>
    <div class="notice__lists pl-10">
      <a class="text-white text-body-2" href="/notice">
        お知らせ一覧へ<v-icon color="primary">mdi-chevron-right</v-icon>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__notice {
  position: relative;
  width: 100%;
  background-color: $cushion;

  .notice__pickup {
    width: 70%;
    line-height: 40px;
    color: $category;
    flex-grow: 1;

    .pickup__category {
      background-color: $category;
      border-radius: 30px;
    }
  }

  .notice__lists {
    width: 30%;
    background-color: $outline;
    line-height: 40px;
  }
}
</style>
