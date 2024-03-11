<template>
  <div :id="sectionId" class="guide__section">
    <div class="mt-5">
      <div class="guide__background py-10 px-5 pa-sm-8 pa-md-10 mb-16">
        <h4 class="guideTitle__background d-flex justify-center text-md-h5 font-weight-medium letter-space-01em py-2">{{ sectionTitle }}</h4>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sectionTitle: {
      type: String,
      default: '',
    },
    sectionId: {
      type: String,
      default: '',
    },

  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.guide{
  &__section {
    padding-top: 100px;
    margin-top: -100px;
    @include mq(lg){
      padding-top: 130px;
      margin-top: -130px;
    }
    width: 100%;
  }
  &__background {
    background-color: $cushion;
    color: $headingText;
    border-radius: 5px;
  }
  &Title__background {
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.15);
    position: relative;
    top: -45px;
    margin-top: -10px;
    @include mq(md){
      font-size: 1.3rem;
    }
    @include mq(sm){
      font-size: 0.9rem;
    }
  }
}

</style>
