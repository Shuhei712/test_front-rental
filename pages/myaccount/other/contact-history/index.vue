<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="お問い合わせ履歴" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <v-data-table
        v-if="contactLists"
        dense
        :headers="headers"
        :items="contactLists"
        :sort-by="'ContactDate'"
        :sort-desc="true"
        :items-per-page="30"
        item-key="name"
        class="elevation-1"
        mobile-breakpoint="740"
      >
        <template #[`item.ContactDate`]="{ item }">
          {{dateFormat(item.ContactDate)}}
        </template>
        <template #[`item.details`]="{ item }">
          <td class="px-0">
            <v-btn
              color="outline"
              small
              :to="`/myaccount/other/contact-history/${item.ContactNo}`"
              class="white--text"> 詳細
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <p v-else>お問い合わせの履歴がございません。</p>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      breadCrumbs: [],
      contactLists:null,
      headers: [
        { text: '問い合わせ番号', value: 'ContactNo', width: '140px'},
        { text: '日付', value: 'ContactDate', width: '130px', },
        { text: '件名', value: 'ContactSubject' },
        { text: '状況', value: 'ContactStatusDisp', width: '120px',sortable: false},
        { text: '', value: 'details' , width: '80px', sortable: false},
      ],
    };
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.contactLists = await this.getContactHistory()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head() {
    return {
      title: "お問い合わせ履歴",
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
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async getContactHistory(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const res = await this.$memberBaseAxios.get(`contact/inquiryList/${loginID}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        return res.data.ContactList
      }else if(res.data.ErrorNo===100002){
        // accessToken有効期限切れ
        const resAccess = await this.$getAccessToken()
        this.getContactHistory()
      }else if(res.data.ErrorNo===100001) {
        // 認証token有効期限切れ
        this.$store.dispatch('auth/resetUser')
        this.$router.push('/login');
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
    },
  }
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
}
</style>