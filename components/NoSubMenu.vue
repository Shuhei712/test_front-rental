<template>
  <a
    v-if="menuType === 2"
    class="main-menu__text d-flex justify-space-between text-body-2 text-gray py-4 py-lg-2 px-2"
    :href="actionUrl"
    target="_brank">
    <span class="d-flex align-center">
      <v-icon class="mr-1" color="primary">{{ iconImageUrl }}</v-icon>
      {{ title }}
    </span>
    <span class="main-menu__trigger">
      <v-icon>mdi-chevron-right</v-icon>
    </span>
  </a>
  <a
    v-else
    class="main-menu__text d-flex justify-space-between text-body-2 text-gray py-4 py-lg-2 px-2"
    :href="actionUrl">
    <span class="d-flex align-center">
      <v-icon class="mr-1" color="primary">{{ iconImageUrl }}</v-icon>
      {{ title }}
    </span>
    <span class="main-menu__trigger">
      <v-icon>mdi-chevron-right</v-icon>
    </span>
  </a>
</template>

<script>
export default {
  props: {
    menuType: {
      type: Number,
      required: true,
    },
    actionUrl: {
      type: String,
      required: true,
    },
    iconImageUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.main-menu__text {
  font-weight: 700;
  cursor: pointer;
  transition: color 0.4s;

  @include mq(lg) {
    font-weight: 400;
  }

  &.active,
  &:hover {
    color: #dd6743 !important;

    .v-icon {
      color: #dd6743 !important;
    }
  }
}

.main-menu__trigger {
  display: none;

  @include mq(lg) {
    display: block;
  }
}
</style>
