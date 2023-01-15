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

    <!-- <v-dialog v-model="cancelDialog"
      width="580">
      <v-card class="pa-5 text-center">
        <template v-if="!result">
          <p>以下の申し込みをキャンセルいたしますか？</p>
          注文番号：{{ cancelID }}
          <v-card-actions class="justify-center">
            <v-btn
              class="mt-4 mx-2"
              dark
              color="secondary"
              @click="cancelDialog=false">戻る
            </v-btn>
            <v-btn
              class="mt-4 mx-2"
              dark
              color="feature"
              :loading="deleteLoading"
              @click="deleteItem">申し込みキャンセル
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <p v-if="result==='success'" class="text-left text-md-center">
            申し込みをキャンセルいたしました。
          </p>
          <p v-else class="text-left text-md-center">
            処理が正常に行われませんでした。<br>
            しばらくしてもう一度お試しいただくか、お問い合わせ下さい。
          </p>
          <v-card-actions class="justify-center">
            <v-btn
              class="mt-4 mx-2"
              dark
              color="secondary"
              @click="cancelDialog=false">戻る
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog> -->
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
      // deleteIndex: null,
      // deleteLoading: false,
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
        this.getOrderHistory()
        console.log(this.orderHistoryLists)

      }

    },
    setCancelDialog(orderNo){
      this.cancelDialog = true
      this.cancelID = orderNo
    },
    // async deleteItem(){
    //   this.deleteLoading = true
    //   const accessToken = this.$store.getters["auth/getAccessToken"]
    //   const loginID = this.$store.getters["auth/getUser"]
    //   const param = new URLSearchParams()
    //   param.append('LoginID', loginID)
    //   const res = await this.$memberBaseAxios.put(`order/cancelOrder/${this.cancelID}`, param, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`
    //     }
    //   })

    //   if (this.$config.DEBUG_MODE) {
    //     console.log(res)
    //   }
    //   if(res.data.Status === 'TRUE'){
    //     this.deleteLoading = false
    //     this.result = 'success'
    //     this.getOrderHistory()
    //   }else if(res.data.ErrorNo === 100002){
    //     const res = await this.$getAccessToken()
    //     this.deleteItem()
    //   }else{
    //     this.orderLoading = false
    //     this.result = res.data.ErrorNo
    //   }

    // },
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