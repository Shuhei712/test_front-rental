<template>
  <div><top-bar title="お問い合わせ" :bread-crumbs="breadCrumbs"></top-bar></div>
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
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ', path: '/inquiry' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
  },
}
</script>
