<template>
  <v-app dark>
    <div v-if="error.statusCode === 404">
      <error404></error404>
    </div>
    <div v-else-if="error.statusCode === 999">
      <error-unavailable></error-unavailable>
    </div>
    <div v-else>
      <error-other :error="error"></error-other>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      unavailableError: 'Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
            this.error.statusCode === 404 ? this.pageNotFound
            : this.error.statusCode === 999 ? this.unavailableError
            : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
