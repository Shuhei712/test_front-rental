<template>
  <v-card elevation="0" link to="/products/name">
    <v-img contain height="125" :src="path"></v-img>
    <v-card-title class="text-body-2 mb-2">{{ maker }}</v-card-title>
    <v-card-subtitle class="text-body-2" color="text">{{
      name
    }}</v-card-subtitle>
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
  },
}
</script>
