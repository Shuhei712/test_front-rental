<template>
  <nuxt-child></nuxt-child>
</template>
<script>
export default {
  head() {
    return {
      title: "お問い合わせ履歴",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    };
  },
}
</script>
