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
  async mounted() {
    const loginID = this.$store.getters['auth/getUser']
    if (!loginID) return true
    const ref = document.referrer
    const hereHost = window.location.hostname
    const sStr = '^https?://' + hereHost
    const rExp = new RegExp(sStr, 'i')
    console.log('ref==', ref)
    console.log('here==', hereHost)
    if (ref.length === 0 || !ref.match(rExp)) {
      const res = await this.$checkToken()
      // alert(ref + '外部domeinから来ました')
    }
  },
}
</script>

<style scoped>
main {
  min-height: 100vh;
}
</style>
