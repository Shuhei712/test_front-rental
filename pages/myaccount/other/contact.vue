<template>
  <section>
    <to-top-btn></to-top-btn>
    <component :is="child" :user.sync="user"></component>
  </section>
</template>
<script>
export default {
  data() {
    return {
      user: {},
    }
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
  }
}
</script>