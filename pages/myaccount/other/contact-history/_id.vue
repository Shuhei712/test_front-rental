<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="詳細" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <v-row>
        <v-col cols="12" md="4" class="pb-0">お問い合わせ番号</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-text-field
            dense
            outlined
            readonly
            hide-details="auto"
            :value=contactLists.ContactNo>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">お問い合わせ日</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-text-field
            dense
            outlined
            readonly
            hide-details="auto"
            :value=dateFormat(contactLists.ContactDate)>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">メールアドレス</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-text-field
            dense
            outlined
            readonly
            hide-details="auto"
            :value=contactLists.Email>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">お問い合わせの種類</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-text-field
            dense
            outlined
            readonly
            hide-details="auto"
            :value=contactLists.ContactType>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">お問い合わせ件名</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-text-field
            dense
            outlined
            readonly
            hide-details="auto"
            :value=contactLists.Subject>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">お問い合わせ内容</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-textarea
            name="inquiry"
            dense
            outlined
            readonly
            hide-details="auto"
            :value=contactLists.Inquiry>
          </v-textarea>
        </v-col>
      </v-row>
      <v-row class="white--text primary mt-10 mb-5 rounded-sm">
        <v-col cols="12" class="justify-space-between align-center d-flex">
          状況：{{contactLists.ContactStatusDisp}}
          <v-btn color="cushion"
            :to="`/myaccount/other/contact?id=${contactLists.ContactNo}`">
            再問い合せ
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">回答日</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-text-field
            dense
            outlined
            readonly
            hide-details="auto"
            :value=dateFormat(contactLists.ContactResponseDate)>
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" class="pb-0">回答内容</v-col>
        <v-col cols="12" md="8" class="pt-0 pt-md-1">
          <v-textarea
            name="staffInquiry"
            dense
            outlined
            readonly
            hide-details="auto"
            :value=contactLists.ContactResponse>
          </v-textarea>
          <v-btn
            v-if="contactLists.AttachFileDownloadURL"
            class="mt-3"
            outlined
            :href="contactLists.AttachFileDownloadURL">
            資料ダウンロード
          </v-btn>
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
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・その他", path: "/myaccount/other" })
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
.sec__inner {
  max-width: 800px;
  margin: 0 auto;
  width: 95%;
}
::v-deep {
  input, textarea{
    cursor: default;
  }
}
</style>