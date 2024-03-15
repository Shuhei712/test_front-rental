<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <cancel-card
      :id="cancelID"
      :dialog.sync="cancelDialog"
      @get-new-info="getOrderHx">
    </cancel-card>
    <top-bar title="注文履歴" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 order-hx">
      <v-data-table
        v-if="orderHxLists"
        dense
        :headers="headers"
        :items="orderHxLists"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items-per-page="30"
        :footer-props="{'items-per-page-options':[5, 15, 30, -1]}"
        mobile-breakpoint="890"
      >
        <template #[`item.RegistDate`]="{ item }">
          {{dateFormat(item.RegistDate)}}
        </template>
        <template #[`item.OrderTitle`]="{ item }">
          <span class="order-hx__table-title text-truncate">{{item.OrderTitle}}</span>
        </template>
        <template #[`item.RentalStartDate`]="{ item }">
          {{dateFormat(item.RentalStartDate)}}
        </template>
        <template #[`item.RentalTotal`]="{ item }">
          {{ item.RentalTotal ? item.RentalTotal.toLocaleString() : '' }}
        </template>
        <template #[`item.actions`]="{ item }">
          <td class="px-0 order-hx__table-actions py-1">
            <v-btn
              color="outline"
              small
              :to="`./order-history/${item.OrderNo}`"
              width="90"
              class="white--text my-1"> 詳細
            </v-btn>
            <v-btn
              v-if="item.CancelEnableFlg !== 1"
              small
              color="feature"
              width="90"
              class="white--text my-1"
              :disabled="item.CancelEnableFlg===9"
              @click="setCancelDialog(item.OrderNo)">キャンセル
            </v-btn>
          </td>
        </template>
      </v-data-table>
      <v-card v-else class="text-center pa-4" outlined>
        <v-icon color="lightGray">mdi-cart-outline</v-icon><br>
        <p class="mt-3">申し込みの履歴がございません。
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
      orderHxLists: null,
      headers: [
        { text: '注文番号', value: 'OrderNo', width: '70px', sortable: false},
        { text: '件名', value: 'OrderTitle', sortable: false },
        { text: '申込日', value: 'RegistDate', width: '120px' },
        { text: 'レンタル開始日', value: 'RentalStartDate', width: '124px'},
        { text: '合計金額(円)', value: 'RentalTotal', sortable: false },
        { text: '注文状況', value: 'OrderStatusDisp', sortable: false, width: '153px' },
        { text: '', value: 'actions', sortable: false },
      ],
      sortBy: 'OrderNo',
      sortDesc: true,
      cancelDialog: false,
      cancelID: null,
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    await this.getOrderHx()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "注文履歴",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  watch: {
    sortBy(newVal) {
      if (!newVal) {
        this.sortBy = 'OrderNo'
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
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "注文履歴", path: "/myaccount/" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async getOrderHx(){
      const loginID = this.$store.getters["auth/getUser"]
      const token = this.$store.getters["auth/getAccessToken"]
      const res = await this.$memberBaseAxios.get( `order/getOrderList/${loginID}` ,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.Status==='TRUE'){
        this.orderHxLists = res.data.OrderList
      }else if(res.data.ErrorNo===100002){
        const res = await this.$getAccessToken()
        if( res ) return await this.getOrderHx()
      }
    },
    setCancelDialog(orderNo){
      this.cancelDialog = true
      this.cancelID = orderNo
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
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/common.scss';

.sec__inner {
  max-width: 1150px;
  margin: 0 auto;
  width: 95%;
  @media (max-width: 888.9px) {
    max-width: 650px;
  }
}
.order-hx{
  &__table-actions{
    min-width: 204px;
    width: 204px;
    @media (min-width:889px)and(max-width:1263.9px) {
      width: 100px;
      min-width: unset;
    }
  }
  &__table-title{
    max-width: 360px;
    display: block;
    @include mq(lg) {
      width: 290px;
    }
    @include mq(md) {
      width: 180px;
    }
    @media (max-width:889px) {
      width: 270px;
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
    th,td{
      padding: 0 8px !important;
    }
    tr>td{
      border: 1px solid #f2f2f2;
    }
  }
}
</style>
