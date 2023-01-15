<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <cancel-card
      :id="cancelID"
      :dialog="cancelDialog"
      @change-cancel-dialog="cancelDialog = $event"
      @get-new-info="getOrderHistory">
    </cancel-card>
    <top-bar title="申し込み履歴" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">

      <v-data-table
        v-if="orderHistoryLists"
        dense
        :headers="headers"
        :items="orderHistoryLists"
        :sort-by="['OrderNo']"
        :sort-desc="true"
        :items-per-page="30"
        item-key="name"
        class="elevation-1"
        mobile-breakpoint="740"
      >
        <template #[`item.RegistDate`]="{ item }">
          {{dateFormat(item.RegistDate)}}
        </template>
        <template #[`item.RentalStartDate`]="{ item }">
          {{dateFormat(item.RentalStartDate)}}
        </template>
        <template #[`item.actions`]="{ item }">
          <td class="px-0 order-hx__table-actions py-1">
            <v-btn
              color="outline"
              small
              :to="`/myaccount/order-history/${item.OrderNo}`"
              width="90"
              class="white--text"> 詳細
            </v-btn>
            <v-btn
              v-if="item.OrderStatus===0||item.OrderStatus===1"
              small
              dark
              elevation="0"
              color="feature"
              width="90"
              class="mt-1 mt-md-0"
              @click="setCancelDialog(item.OrderNo)">キャンセル
            </v-btn>
          </td>
        </template>
      </v-data-table>
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
        { text: '注文番号', value: 'OrderNo', width: '86px', sortable: false},
        { text: '申込日', value: 'RegistDate' },
        { text: 'レンタル開始日', value: 'RentalStartDate' },
        { text: '合計金額(円)', value: 'RentalTotal' },
        { text: '注文状況', value: 'OrderStatusDisp', sortable: false },
        { text: '', value: 'actions', sortable: false },
      ],
      cancelDialog: false,
      cancelID: null,
      result: false
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    // this.orderHistoryLists = await this.getOrderHistory()
    await this.getOrderHistory()
    console.log(this.orderHistoryLists)
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
        console.log(this.orderHistoryLists)
        this.orderHistoryLists = res.data.OrderList
      }else if(res.data.ErrorNo===100002){
        // access認証tokenの有効期限が切れています
        const resAccess = await this.$getAccessToken()
        await this.getOrderHistory()
        console.log(this.orderHistoryLists)

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
.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
}
.order-hx__table-actions{
  max-width: 75px;
  @media (min-width:960px) {
    max-width: 150px;
  }
}
</style>