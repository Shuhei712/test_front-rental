<template>
  <v-app>
      <header-parts></header-parts>
      <v-main>
        <!-- <div v-if="loading">
          <loading></loading>
        </div> -->
        <Nuxt />
      </v-main>
      <footer-parts v-if="!loading"></footer-parts>
  </v-app>
</template>

<script>

export default {
  computed: {
    loading() {
      return this.$store.getters['loading/getStatus']
    },
  },
}
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>
