<template>
  <div class="mt-10 d-flex justify-center" :style="imageStyles">
    <img v-if="nonmemberFlg" :src="guidelineImg" :alt="guidelineAlt" class="guide__img guide__img__nonmember">
    <img v-else-if="figureFlg" :src="guidelineImg" :alt="guidelineAlt" class="guide__img__figureFlg">
    <img v-else :src="guidelineImg" :alt="guidelineAlt" class="guide__img">
  </div>
</template>

<script>
export default {
  props: {
    guidelineImg: {
      type: String,
      default: '',
    },
    guidelineAlt: {
      type: String,
      default: '',
    },
    nonmemberFlg: {
      type: String,
      default: '',
    },
    figureFlg: {
      type: String,
      default: '',
    },

    attrWidth: {
      type: String,
      default: '',
    },
    attrHeight: {
      type: String,
      default: '',
    },
    
  },
  computed: {
    // 画像の横幅と縦幅をpropsから取得してsassへ設定
    imageStyles() {
      return {
        '--width': this.attrWidth + 'px', // CSS変数に値を割り当て
        '--height': this.attrHeight + 'px', // CSS変数に値を割り当て
      };
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.guide{
  &__img {
    width: 100%;
    max-width: 550px;
    height: auto;
    height: calc(100vw * (var(--width) / var(--height)));
    border: 2px solid $accent;
    border-radius: 10px;
    &__nonmember{
      border: 2px solid $primary;
    }
    @include mq(md){
      max-width: 550px;
    }
    @include mq(sm){
      max-width: 700px;
    }
    &__figureFlg {
      width: 100%;
      height: auto;
      height: calc(100vw * (var(--width) / var(--height)));
    }
  }
}
</style>
