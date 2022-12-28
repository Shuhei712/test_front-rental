<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="ヘルプ・その他" :bread-crumbs="breadCrumbs"></top-bar>

    <div class="sec__inner py-16">
      <!-- <h2 class="pt-12 pb-1 headingText--text">その他</h2> -->
      <!-- <v-divider class="mb-4"></v-divider> -->
      <v-row>
        <v-col
          cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              to="/faq">
              よくある質問
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              to="/myaccount/other/contact">
              お問い合わせ
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              to="/myaccount/other/contact-history">
              お問い合わせ履歴
            </v-btn>
          </div>
        </v-col>
      </v-row>
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
      title: "ヘルプ・その他",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・その他", path: "/other" })
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"]
    },
  },
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}
</style>