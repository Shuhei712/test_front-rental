<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="本人確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <div class="id__status pb-8">
        <span class="text-h6" :class="idStatusColor+'--text'">
          {{ idStatus }}
        </span>
        <span v-if="userInfo.NecDocFlg===1">
          <div class="mt-6 font-weight-bold">登録済みファイル</div>
          <v-divider class="mb-3"></v-divider>
          <ul class="pl-5">
            <template v-if="userInfo.MemberType">
              <li v-if="userInfo.DocFileName1">名刺</li>
              <li v-if="userInfo.DocFileName2">社会保険被保険証</li>
              <li v-if="userInfo.DocFileName3">運転免許証・パスポート又はマイナンバーカード</li>
            </template>
            <template v-else>
              <li v-if="userInfo.DocFileName1">身分証明書</li>
              <li v-if="userInfo.DocFileName2">現住所記載書類</li>
              <li v-if="userInfo.DocFileName3">学生証</li>
            </template>
          </ul>
          <v-divider class="mt-3"></v-divider>
        </span>
      </div>
      <ValidationObserver v-slot="ObserverProps" ref="observer">
        <id-card ref="id"
          :user.sync="user"
          :file.sync="file"
        ></id-card>
        <div class="text-center mt-10">
          <v-btn
            :disabled="ObserverProps.invalid"
            class="white--text"
            color="primary"
            :loading="loading"
            @click="setID"
          >登録</v-btn>
        </div>
      </ValidationObserver>
    </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
      userInfo: {},
      loading: false,
      user: {},
      file: [null,null,null]
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.getUserInfo()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "本人確認",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  computed:{
    idStatus(){
      switch(this.userInfo.RentalFlg){
        case 0:
          return '未登録'
        case 1:
          return '登録済み'
        case 5:
          return '申請中'
        case 9:
          return '不備あり（再登録が必要です）'
        default:
          return '未登録'
      }
    },
    idStatusColor(){
      switch(this.userInfo.RentalFlg){
        case 0:
          return 'red'
        case 1:
          return 'green'
        case 5:
          return 'blue'
        default:
          return 'red'
      }
    },
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "本人確認", path: "/myaccount/" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async getUserInfo(){
      const res = await this.$getUserInfo()
      if(res) {
        if (res.RentalFlg===1||res.RentalFlg===5) this.$router.push('/myaccount')
        this.userInfo = res
        const arr = ['MemberType','Representative','HOfficeTel','HOfficeFax','HOfficeZipCode','HOfficePrefect','HOfficeAddress','Incorporation','CorpNumber','CorpType','PaymentMethod','PayeeName','BillingEmail']
        arr.forEach((item) => {
          this.$set(this.user, item, this.userInfo[item])
        })
      }
    },
    async setID(){
      this.loading = true
      const id = await this.$refs.id.register()
      if( id ) await this.$refs.id.updateUser()
      this.loading = false
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
