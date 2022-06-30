<template>
  <div>
    <top-bar title="用語集" :bread-crumbs="breadCrumbs"></top-bar>
    <section class="term">
      <div class="term__inner px-3 py-16">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="content" v-html="html">
        </div>
      </div>
    </section>
  </div>
</template>

<script>


export default {
  data() {
    return {
      breadCrumbs: [],
      html: ''
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.loadHtml()
    this.$store.commit('loading/changeStatus', false)
  },
  head() {
    return {
      script: [
        { src: 'https://rental-resource.takenaka-co.co.jp/catalog-page/rental-menu/rental-term/index.js'}
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '用語集', path: '/term' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async loadHtml() {
      const res = await this.$axios.$get('https://backet-rental-catalog.s3.ap-northeast-1.amazonaws.com/catalog-page/rental-menu/rental-term/index.html')
      this.html = res
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

ul {
  list-style: none;
}

.guide {
  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }
}

.v-application .blue {
    background-color: transparent !important;
    border-color: transparent !important;
}
</style>
