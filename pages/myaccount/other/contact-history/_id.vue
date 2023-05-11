<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="詳細" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <v-card outlined class="pa-5 mb-9">
        <div>お問い合わせ番号：{{contactLists.ContactNo}}</div>
        <div>お問い合わせ日：{{dateFormat(contactLists.ContactDate)}}</div>
      </v-card>

      <div class="mt-10 mb-5">
        <v-card outlined elevation="0">
          <v-card-title class="white--text primary justify-space-between align-center">
            状況：{{contactLists.ContactStatusDisp}}
            <v-btn color="cushion"
              :to="`/myaccount/other/contact?id=${contactLists.ContactNo}`">
              再問い合せ
            </v-btn>
          </v-card-title>
          <v-card-text v-if="contactLists.ContactStatus" class="text--text">
            <dl class="mx-4 my-6">
              <dt class="font-weight-bold">回答日</dt>
              <dd>
                <v-divider class="my-1"></v-divider>
                {{ dateFormat(contactLists.ContactResponseDate) }}
              </dd>
            </dl>
            <dl class="mx-4 my-6">
              <dt class="font-weight-bold">回答内容</dt>
              <dd>
                <v-divider class="my-1"></v-divider>
                <p class="pre-wrap">{{ contactLists.ContactResponse }}</p>
                <v-btn
                  v-if="contactLists.AttachFileDownloadURL"
                  class="mt-3"
                  color="primary"
                  outlined
                  :href="contactLists.AttachFileDownloadURL">
                  資料ダウンロード
                </v-btn>
              </dd>
            </dl>
          </v-card-text>
        </v-card>
      </div>
      <div class="contact__hx-detail pt-9">
        <h2 class="mb-4">お問い合わせ内容</h2>
        <v-card outlined elevation="0" class="pa-8">
          <v-row>
            <v-col cols="12" md="3" class="pb-0">お問い合わせの種類</v-col>
            <v-col cols="12" md="9" class="pt-0 pt-md-4">
              <v-card elevation="0" class="px-2 py-1 border">{{contactLists.ContactType}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" class="pb-0">氏名</v-col>
            <v-col cols="12" md="9" class="pt-0 pt-md-4">
              <v-card elevation="0" class="px-2 py-1 border">{{contactLists.Name }}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" class="pb-0">氏名(カナ)</v-col>
            <v-col cols="12" md="9" class="pt-0 pt-md-4">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{contactLists.NameKana}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" class="pb-0">メールアドレス</v-col>
            <v-col cols="12" md="9" class="pt-0 pt-md-4">
              <v-card elevation="0" class="px-2 py-1 border">{{contactLists.Email}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" class="pb-0">注文番号</v-col>
            <v-col cols="12" md="9" class="pt-0 pt-md-4">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{contactLists.OrderNo}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" class="pb-0">お問い合わせ件名</v-col>
            <v-col cols="12" md="9" class="pt-0 pt-md-4">
              <v-card elevation="0" class="px-2 py-1 border">{{contactLists.Subject}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3" class="pb-0">お問い合わせ内容</v-col>
            <v-col cols="12" md="9" class="pt-0 pt-md-4">
              <v-card elevation="0" class="pa-2 border pre-wrap">{{ contactLists.Inquiry }}</v-card>
            </v-col>
          </v-row>

        </v-card>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      breadCrumbs: [],
      contactLists: null
    };
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.contactLists = await this.getContactDetails()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head() {
    return {
      title: "お問い合わせ履歴 詳細",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    };
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・お問い合わせ", path: "/myaccount/other" })
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ履歴', path: '/myaccount/other/contact-history' })
      this.$store.commit('breadCrumbs/addList', { name: '詳細', path: '/myaccount/other/contact-history' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async getContactDetails(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]

      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      const res = await this.$memberBaseAxios.post(`contact/getInfo/${this.$route.params.id}`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }

      if(res.data.Status === 'TRUE'){
        return res.data
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.getContactDetails()
      }
    },
    dateFormat(num){
      if(num){
        const year = num.substring(0, 4);
        const month = num.substring(4, 6);
        const day = num.substring(6, 8);
        const entryDate = year+"-"+month+"-"+day;
        return entryDate
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/common.scss';
.sec__inner {
  max-width: 900px;
  margin: 0 auto;
  width: 95%;
}
.row{
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.2rem;
}
.border{
  border: 1px solid $line;
}
.pre-wrap{
  white-space: pre-wrap;
}
::v-deep {
  input, textarea{
    cursor: default;
  }
}
</style>
