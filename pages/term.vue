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
      title: "用語集",
      meta: [
        { hid: 'description', name: 'description', content: '用語集 | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ],
      script: [
        { src: 'https://rental-resource.takenaka-co.co.jp/catalog-page/rental-menu/rental-term/index.js'}
      ]
    }
  },
  mounted() {
    const urlHash = window.location.hash
    if (urlHash) {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      setTimeout(function() {
        const target = document.querySelector(urlHash);
        const rect = target.getBoundingClientRect().top;
        const offset = window.pageYOffset;
        const position = rect + offset;
        window.scrollTo({
          top: position,
          behavior: 'auto'
        });
      }, 100);
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '用語集', path: '/term' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async loadHtml() {
      const res = await this.$axios.$get('https://rental-resource.takenaka-co.co.jp/catalog-page/rental-menu/rental-term/index.html')
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
