<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="申し込み履歴" :bread-crumbs="breadCrumbs"></top-bar>
      <div class="sec__inner py-16">

        <v-data-table
          v-if="orderHistoryLists"
          dense
          :headers="headers"
          :items="orderHistoryLists"
          item-key="name"
          class="elevation-1"
        ></v-data-table>
        <p v-else>申し込みの履歴がございません。</p>
      </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
      orderHistoryLists: null,
      headers: [
        { text: 'aaa', value: 'name', },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    const orderHistoryLists = await this.getOrderHistory()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "申し込み履歴",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "申し込み履歴", path: "/myaccount/" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async getOrderHistory(){
      const loginID = this.$store.getters["auth/getUser"]
      const token = this.$store.getters["auth/getAccessToken"]
      const res = await this.$memberBaseAxios.get( `order/getOrderList/${loginID}` ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        return res.data.OrderList
      }else if(res.data.ErrorNo===100002){
        // access認証tokenの有効期限が切れています
        const resAccess = await this.$getAccessToken()
        if(resAccess.data.Status==='TRUE'){
          this.getOrderHistory()
        }else if(resAccess.data.Status==='FALSE'){
          this.$store.dispatch('auth/resetUser')
          this.$router.push('/login');
        }
      }

    }
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