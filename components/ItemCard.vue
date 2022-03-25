<template>
  <v-card class="item-card" elevation="0" link to="/products/name">
    <div class="text-center">
      <img class="pa-3" :src="path" />
    </div>
    <v-card-title class="text-body-2 mb-2">{{ maker }}</v-card-title>
    <v-card-subtitle class="text-body-2" color="text">{{ name }}</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    path: {
      // type: String,
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
  },
}
</script>

<style lang="scss" scoped>
.item-card {
  img {
    max-width: 100%;
    max-height: 115px;
    display: inline-block;
    object-fit: cover;
  }
}
</style>
