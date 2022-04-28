<template>
  <v-card class="item-card" elevation="0" link :to="link">
    <div class="text-center">
      <img class="pa-3" :src="isNullCheckImageURL" />
    </div>
    <v-card-title class="text-body-2 mb-2">{{ maker }}</v-card-title>
    <v-card-subtitle class="text-body-2" color="text">{{ name }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    maker: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  computed: {
    isNullCheckImageURL() {
      return this.path === null ? '/img/new/no-image.png' : this.path
    },
  },
}
</script>

<style lang="scss" scoped>
.item-card {
  img {
    max-width: 100%;
    height: 115px;
    // max-height: 115px;
    display: inline-block;
    object-fit: contain;
  }
}
</style>
