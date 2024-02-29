<template>
  <section :id="sectionId" class="guide__section">
    <div class="mt-5">
      <div class="guide__background pa-2 pa-md-10 mb-16">
        <h4 v-if="sectionId === 'member'" class="guideTitle__background member d-flex justify-center text-h6 text-sm-h5 font-weight-medium py-2">{{ sectionTitle }}</h4>
        <h4 v-if="sectionId === 'nonmember'" class="guideTitle__background nonmember d-flex justify-center text-h6 text-sm-h5 font-weight-medium py-2">{{ sectionTitle }}</h4>
        <slot></slot>
      </div>
    </div>
  </section>
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
    width: 100%;
  }
  &__background {
    background-color: $cushion;
    color: $headingText;
    border-radius: 5px;
  }
  &Title__background {
    width: 90%;
    margin: 0 auto;
    color: #fff;
    border-radius: 10px;
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.15);
    letter-spacing: 0.1em !important;
    position: relative;
    top: -45px;
    margin-top: -10px;
    &.member {
      background-color: $accent;
    }
    &.nonmember {
      background-color: $primary;
    }
    @include mq(md){
      top: -20px;
    }
  }
}

</style>
