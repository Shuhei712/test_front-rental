<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="カート" :bread-crumbs="breadCrumbs"></top-bar>
      <div class="sec__inner py-16">
      </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "カート",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit("breadCrumbs/addList", { name: "会員情報", path: "/myaccount" });
      this.$store.commit("breadCrumbs/addList", { name: "カート", path: "/myaccount/" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
  },
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
}
</style>