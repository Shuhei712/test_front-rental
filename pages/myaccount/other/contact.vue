<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <component :is="child" :user.sync="user" :login-info="loginInfo"></component>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: {},
      loginInfo: {}
    }
  },
  async fetch() {
    this.loginInfo = await this.$getLoginInfo()
  },
  head() {
    return {
      title: "お問い合わせ",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    };
  },
  computed: {
    child(){
      switch(this.$route.hash){
        case '#input':
          return 'contact-input'
        case '#confirm':
          return 'contact-confirm'
        case '#complete':
          return 'contact-complete'
        default:
          return 'contact-input'
      }
    }
  },
  updated() {
    this.$scrollBackButton()
  },
}
</script>
