<template>
  <v-card height="220" :color="color" elevation="0" link>
    <v-img height="110" :src="path" />
    <v-card-title class="text-body-2 mb-2 text-white">
      <span class="tag rounded-pill px-5 text-body-2 mb-3">{{ category }}</span>
      <p class="text-body-2">{{ title }}</p>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    category: {
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
.tag {
  display: inline-block;
  border: 1px solid #ffffff;
}
</style>
