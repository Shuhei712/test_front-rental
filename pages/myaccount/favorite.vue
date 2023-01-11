<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="お気にいり" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">

      <v-row class="product__main">
        <v-col v-for="(list, index) in favLists" :key="index" cols="12" sm="6" md="4">
          <product-card-simple
            :id="list.ProductID"
            :name="list.ProductName"
            :type-number="list.TypeNumber"
            :image="list.ProductImage"
            :maker="list.MakerName"
            :price-value="list.Price"
            :price-type="list.PriceType"
            :price-unit="list.PriceUnit">
          </product-card-simple>
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
      favLists: {}
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    const getInfo = await this.getFavInfo()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "お気にいり",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "お気にいり", path: "/myaccount/" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async getFavInfo(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const res = await this.$memberBaseAxios.get(`favorite/getFavoriteList/${loginID}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        this.favLists = res.data.FavoriteList
      }else if(res.data.ErrorNo===100002){
        // access認証token有効期限切れ
        const res = await this.$getAccessToken()
        this.getFavInfo()
        alert('again')
      }else {
        // 認証tokenの有効期限切れ
        this.$store.dispatch('auth/resetUser')
        this.$router.push('/login');
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