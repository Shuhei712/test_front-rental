<template>
  <a
    v-if="menuType === 2"
    class="sub-menu__text d-flex align-center text-body-2 text-gray pa-2"
    :href="actionUrl"
    target="_blank">
    {{ title }}
    <v-icon class="d-lg-none ml-2" color="primary" small>mdi-chevron-right</v-icon>
  </a>
  <a v-else class="sub-menu__text d-flex align-center text-body-2 text-gray pa-2" :href="actionUrl">
    {{ title }}
    <v-icon class="d-lg-none ml-2" color="primary" small> mdi-chevron-right </v-icon>
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
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
