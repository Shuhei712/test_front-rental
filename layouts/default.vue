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
  </v-app>
</template>

<script>
export default {
  computed: {
    loading() {
      return this.$store.getters['loading/getStatus']
    },
  },
  async mounted(){
    const loginID = this.$store.getters["auth/getUser"]
    if(!loginID) return true
    console.log('member ref')
    const ref = document.referrer
    const hereHost = window.location.hostname
    const sStr = "^https?://" + hereHost
    const rExp = new RegExp( sStr, "i" )
    if( ref.length === 0 || !ref.match( rExp ) ) {
      const res = await this.$checkToken()
      console.log(ref + 'から来ました')
      if( res.data.Status === 'FALSE' ){
        console.log(ref + 'FALSE')
        this.$store.dispatch('auth/resetUser')
        if(this.$route.path.match(/myaccount/)){
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>
