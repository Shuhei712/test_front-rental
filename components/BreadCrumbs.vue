<template>
  <div class="bread-crumbs my-1">
    <ul class="bread-crumbs__items d-flex align-center">
      <li class="bread-crumbs__item">
        <a href="/"><v-icon color="#ffffff" dense>mdi-home</v-icon></a>
        <v-icon color="#FCB251">mdi-chevron-right</v-icon>
      </li>
      <li v-for="(breadCrumb, index) in breadCrumbs" :key="index" class="bread-crumbs__item text-body-2">
        <a v-if="breadCrumbs.length !== index + 1" :href="breadCrumb.path">
          {{ breadCrumb.name }}<v-icon color="#FCB251">mdi-chevron-right</v-icon>
        </a>
        <span v-else>{{ breadCrumb.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    breadCrumbs: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.bread-crumbs {
  &__items {
    padding-left: 0;

    .bread-crumbs__item {
      list-style: none;
      color: #ffffff;

      a {
        color: #ffffff !important;
      }
    }
  }
}
</style>
