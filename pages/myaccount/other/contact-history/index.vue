<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="お問い合わせ履歴" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <v-data-table
        v-if="contactLists"
        dense
        :headers="headers"
        :items="contactLists"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items-per-page="30"
        :footer-props="{'items-per-page-options':[5, 15, 30, -1]}"
        mobile-breakpoint="900"
      >

        <template #[`item.ContactSubject`]="{ item }">
          <span class="contact-hx__table-title text-truncate">
            {{item.ContactSubject}}
          </span>
        </template>
        <template #[`item.ContactDate`]="{ item }">
          {{dateFormat(item.ContactDate)}}
        </template>
        <template #[`item.details`]="{ item }">
          <v-btn
            color="outline"
            small
            :to="`./contact-history/${item.ContactNo}`"
            class="white--text px-4 my-1"> 詳細
          </v-btn>
        </template>
      </v-data-table>
      <v-card v-else class="text-center pa-4" outlined>
        <v-icon color="lightGray">mdi-email-outline</v-icon><br>
        <p class="mt-3">お問い合わせの履歴がございません。
        </p>
      </v-card>
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
        { text: 'お問い合わせ番号', value: 'ContactNo', width: '135px',sortable: false },
        { text: '日付', value: 'ContactDate', width: '130px', },
        { text: '件名', value: 'ContactSubject',sortable: false },
        { text: '状況', value: 'ContactStatusDisp', width: '120px',sortable: false},
        { text: '', value: 'details' , width: '80px', sortable: false},
      ],
      sortBy: 'ContactNo',
      sortDesc: true,
    };
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.contactLists = await this.getContactHx()
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
  watch: {
    sortBy(newVal) {
      if (!newVal) {
        this.sortBy = 'ContactNo'
        this.$nextTick(() => {
          this.sortDesc = true
        })
      }
    },
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・お問い合わせ", path: "/myaccount/other" })
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ履歴', path: '/myaccount/other/contact-history' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async getContactHx(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const res = await this.$memberBaseAxios.get(`contact/inquiryList/${loginID}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.Status==='TRUE'){
        return res.data.ContactList
      }else if(res.data.ErrorNo===100002){
        // accessToken有効期限切れ
        const res = await this.$getAccessToken()
        if( res ) return this.getContactHx()
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
@import '~/assets/css/common.scss';

.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
  @media (max-width: 899.9px) {
    max-width: 700px;
  }
}
.contact-hx{
  &__table-title{
    max-width: 480px;
    display: block;
    @include mq(lg) {
      max-width: 380px;
    }
    @include mq(md) {
      max-width: 328px;
    }
    @include mq(sm) {
      max-width: 270px;
    }
  }
}
::v-deep {
    .v-data-table-header{
      background-color: #f2f2f2;
    }
    .v-data-table__mobile-row__header{
      white-space: nowrap;
    }
    .v-data-table__mobile-table-row{
      margin-bottom: 1rem;
    }
    // th,td{
    //   padding: 0 8px !important;
    // }
    tr>td{
      border: 1px solid #f2f2f2;
    }
  }
</style>
