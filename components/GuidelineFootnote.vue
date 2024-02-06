<template>
  <div class="guide__footnote">
    <div class="font-weight-bold d-flex">
      <dt class="mr-2">※</dt>
      <dd>
        {{ footnoteText }}
      </dd>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    footnoteText: {
      type: String,
      default: '',
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.guide{
  &__footnote{
    & dt {
      color: $accent;
    }
  }
}

</style>
