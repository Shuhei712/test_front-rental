<template>
  <div class="top-bar">
    <div class="bar__inner container">
      <bread-crumbs></bread-crumbs>
      <h2 class="text-white letter-space-03em text-h5 bold my-5">
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
  },
}
</script>

<style lang="scss" scoped>
@import '/assets/css/common.scss';

.top-bar {
  width: 100%;
  height: auto;
  max-height: 280px;
  background-color: $accent;
  padding-top: calc(100px + 32px);

  .bar__inner {
  }
}
</style>
