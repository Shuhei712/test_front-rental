// 営業時間変更の場合はdataの中を書き換え
<template>
  <p v-if="sectionFlg==='footer'" class="rental__footer d-flex flex-column flex-md-row align-center align-md-start justify-center text-body-2 no-wrap text-white line-height-normal mt-5"><span>レンタル営業時間：</span>{{businessHours}}</p>
  <p v-else>{{businessHours}}</p>
</template>

<script>
export default {
  props: {
    sectionFlg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      businessHours: '平日10:00~18:00（土日祝除く）',
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.rental {
  &__footer {
    display: inline-block;
    white-space: nowrap;

    @include mq(sm) {
      font-size: 11px !important;
    }
  }
}
</style>
