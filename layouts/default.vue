<template>
  <v-app>
      <header-parts></header-parts>
      <v-main>
        <div v-if="loading">
          <loading></loading>
        </div>
        <Nuxt />
      </v-main>
      <footer-parts></footer-parts>
    </div>
  </v-app>
</template>

<script>
// import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'

export default {
  // data() {
  //   return {
  //     loadingFlg: null,
  //     target: null,
  //   }
  // },
  computed: {
    loading() {
      // this.getLoadingStatus()
      return this.$store.getters['loading/getStatus']
    },
  },
  // mounted() {
  //   this.target = document.querySelector('.loading')
  //   disableBodyScroll(this.target)
  // },
  // beforeDestroy() {
  //   clearAllBodyScrollLocks()
  // },
  // methods: {
  //   getLoadingStatus() {
  //     this.loadingFlg = this.$store.getters['loading/getStatus']
  //     // if(this.loadingFlg) {
  //     //   this.target = document.querySelector('.loading')
  //     //   disableBodyScroll(this.target)
  //     // } else {
  //     //   clearAllBodyScrollLocks()
  //     // }
  //   },
  // },
}
</script>
