<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <cancel-card
      :id="order.OrderNo"
      :dialog.sync="cancelDialog"
      @get-new-info="getHxDetails">
    </cancel-card>
    <branch-address
      :dialog.sync="branchDialog"
    ></branch-address>
    <order-card
      :dialog.sync="orderDialog"
      :pay-method="order.PayMethod"
      :delivery-type="order.DeliveryType"
      @update-data="getHxDetails"
    ></order-card>
    <top-bar title="詳細" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 order">
      <div class="order__status">
        <h2 class="mb-2 text-h6 outline white--text py-2 px-3 rounded-sm d-flex justify-space-between">
          申し込み状況
          <v-chip color="#707776" class="order__status-status white--text px-4">{{order.OrderStatusDisp}}</v-chip>
        </h2>
        <div class="pa-2">
          <dl class="d-flex">
            <dt class="order__status-title">注文番号</dt>
            <dd>{{order.OrderNo}}</dd>
          </dl>
          <dl class="d-flex">
            <dt class="order__status-title">ステータス</dt>
            <dd>{{order.OrderStatusDisp}}</dd>
          </dl>
          <dl class="d-flex">
            <dt class="order__status-title">申し込み日</dt>
            <dd>{{getDate(order.RegistDate)}}</dd>
          </dl>
          <dl v-if="order.OrderRequestDate" class="d-flex mt-3">
            <dt class="order__status-title">注文依頼日</dt>
            <dd>{{getDate(order.OrderRequestDate)}}</dd>
          </dl>
          <dl v-if="order.OrderCommitDate" class="d-flex">
            <dt class="order__status-title">注文確定日</dt>
            <dd>
              {{getDate(order.OrderCommitDate)}}
              <a
                v-if="order.InvoiceFlg&&order.InvoiceURL"
                class="ms-1 link text-body-2"
                :href="order.InvoiceURL">
                ( 請求書ダウンロード )
              </a>
            </dd>
          </dl>
          <dl v-if="order.OrderCancelReqDate" class="d-flex mt-3">
            <dt class="order__status-title">キャンセル依頼日</dt>
            <dd>{{getDate(order.OrderCancelReqDate)}}</dd>
          </dl>
          <dl v-if="order.OrderCancelCommitDate" class="d-flex">
            <dt class="order__status-title">キャンセル確定日</dt>
            <dd>{{getDate(order.OrderCancelCommitDate)}}</dd>
          </dl>
          <!-- //「レンタル申込中」の場合は表示しない -->
          <dl v-if="order.OrderStatus!==0 && order.OrderResponse" class="mt-4">
            <dt class="font-weight-bold">回答内容</dt>
            <dd class="flex-grow-1">
              <v-card outlined color="cushion" min-width="100%">
                <v-card-text class="text--text">
                  {{getDate(order.OrderResponseDate)}}
                  <p class="pre-wrap">{{order.OrderResponse}}</p>
                </v-card-text>
                <v-card-actions v-if="order.ResponseQuotationURL" class="flex-wrap">
                  <v-btn
                    outlined
                    color=primary
                    class="letter-space-005em"
                    :href="order.ResponseQuotationURL">
                    回答見積書ダウンロード
                  </v-btn>
                  <!-- {{getDate(order.ResQuotationLimit)}} -->
                  <span v-if="order.ResQuotationLimit" class="caption">&emsp;( 見積有効期限：{{getDate(order.ResQuotationLimit)}} )</span>
                </v-card-actions>
              </v-card>
            </dd>
          </dl>
          <div v-if="order.OrderEnableFlg===0" class="text-right">
            <v-btn
              color="accent"
              height="3.8rem"
              min-width="220px"
              class="text-white mt-1 btn-column text-h6"
              @click="checkID">
              <span class="caption">回答見積書の内容で</span>注文を進める
            </v-btn>
          </div>
          <p v-if="order.OrderEnableFlg===2" class="red--text mt-3">
            <span class="text-subtitle-1 font-weight-bold">* 回答見積書の有効期限が切れております</span><br>
            回答見積書の有効期限が切れており、ご注文を確定することができません。<br>ご注文の確定を希望される場合は、レンタルスタッフまで<a href="https://www.takenaka-co.co.jp/contact/#information" class="link" target="_blank">お問い合わせ</a>ください。
          </p>
          <p v-if="order.OrderEnableFlg===9" class="red--text mt-3">
            <span class="text-subtitle-1 font-weight-bold">* お引渡し日の5営業日前より後のご注文の確定について</span><br>
            本システムでは、レンタルお引渡し日の5営業日前より後のご注文の確定を受け付けておりません。<br>ご注文の確定を希望される場合は、レンタルスタッフまで<a href="https://www.takenaka-co.co.jp/contact/#information" class="link" target="_blank">お問い合わせ</a>ください。
          </p>
        </div>

      </div>

      <div class="order__details mt-15">
        <h2 class="mt-4 text-h6 outline white--text py-2 px-3 rounded-sm">申し込み詳細</h2>
        <v-card
          outlined
          class="py-6">
          <v-container>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">
                注文件名
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{order.OrderTitle}}</v-card>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">連絡方法
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card v-if="order.ContactType" elevation="0" class="px-2 py-1 border">メール： {{order.ContactEmail}}</v-card>
                <v-card v-else elevation="0" class="px-2 py-1 border">お電話： {{order.ContactTel}}</v-card>

              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="4" class="pb-0">お引渡し方法
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border">{{order.DeliveryTypeDisp}}</v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">
                <template v-if="order.DeliveryType===0">
                  お引取り日時
                </template>
                <template v-else-if="order.DeliveryType===1">
                  商品到着日
                </template>
                <template v-else>搬入日時</template>
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border">{{getDate(order.DeliveryDate,order.DeliveryTime)}}</v-card>
              </v-col>
            </v-row>
            <v-row v-if="order.DeliveryType===0">
              <v-col cols="12" md="4" class="pb-0">お引取り店舗</v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" min-height="2rem" class="px-2 py-1 border mb-1 width-s">{{order.DeliveryShop}}</v-card>
                <v-btn
                  small outlined
                  class="mt-1"
                  @click="branchDialog=true"
                >店舗一覧</v-btn>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" md="4" class="pb-0">
                <template v-if="order.DeliveryType===1">発送先 住所</template>
                <template v-else>搬入場所</template>
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border mb-1 width-s">〒{{order.DeliveryZipCode}}</v-card>
                <v-card v-if="order.DeliveryPrefect" elevation="0" class="px-2 py-1 border mb-1">{{order.DeliveryPrefect}}</v-card>
                <v-card v-if="order.DeliveryAddress" elevation="0" class="px-2 py-1 border">{{order.DeliveryAddress}}</v-card>
              </v-col>
            </v-row>
            <v-row v-if="order.DeliveryType===1">
              <v-col cols="12" md="4" class="pb-0">発送先 電話番号</v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border mb-1 width-s">{{order.DeliveryTel}}</v-card>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="4" class="pb-0">ご使用日
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border">{{`${getDate(order.UseStartDate,order.UseStartTime)} ~ ${getDate(order.UseEndDate,order.UseEndTime)}`}}</v-card>
                ({{ order.UseDay }}日間)
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="4" class="pb-0">ご返却方法
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border">{{order.ReturnTypeDisp}}</v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">
                <template v-if="order.ReturnType===0">
                  ご返却日時
                </template>
                <template v-else-if="order.ReturnType===1">
                  商品到着日
                </template>
                <template v-else>搬出日時</template>
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border">{{getDate(order.ReturnDate,order.ReturnTime)}}</v-card>
              </v-col>
            </v-row>
            <v-row v-if="order.ReturnType!==2">
              <v-col cols="12" md="4" class="pb-0">ご返却店舗</v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" min-height="2rem" class="px-2 py-1 border pre-wrap width-s">{{ order.ReturnShop }}</v-card>
                <v-btn
                  small outlined
                  class="mt-1"
                  @click="branchDialog=true"
                >店舗一覧</v-btn>
              </v-col>
            </v-row>
            <v-row v-else>
              <v-col cols="12" md="4" class="pb-0">搬出場所</v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border mb-1 width-s">〒{{order.ReturnZipCode}}</v-card>
                <v-card v-if="order.ReturnPrefect" elevation="0" class="px-2 py-1 border mb-1">{{order.ReturnPrefect}}</v-card>
                <v-card v-if="order.ReturnAddress" elevation="0" class="px-2 py-1 border">{{order.ReturnAddress}}</v-card>
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">お支払い方法
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border width-s">
                  {{ order.PayMethodDisp }}
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">備考
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" min-height="2rem" class="pa-2 border pre-wrap">{{ order.OrderComment }}</v-card>
              </v-col>
            </v-row>
          </v-container>

        </v-card>
      </div>
      <div class="order__item mt-15">
        <h2 class="mb-2 text-h6 outline white--text py-2 px-3 rounded-sm">商品一覧 ( レンタル申し込み時 )</h2>
        <v-data-table
          dense
          :headers="headers"
          :items="order.ProductList"
          :items-per-page="30"
          :footer-props="{'items-per-page-options':[5, 15, 30, -1]}"
          item-key="ProductID"
          hide-default-footer
          mobile-breakpoint="890">
          <template #[`item.ProductName`]="{ item }">
            <nuxt-link :to="`/products/${item.ProductID}?name=${item.ProductName}`" tag="a" class="d-flex align-center text-left flex-column flex-sm-row">
            <!-- <a :href="`https://rental.takenaka-co.co.jp/products/${item.ProductID}`" class="d-flex align-center text-left flex-column flex-sm-row"> -->
              <img :src=item.ProductImage alt="商品イメージ" class="table__img mr-4 my-2">
              <div class="table__txt text-truncate">
                {{item.ProductName}}
                <p class="font-weight-bold text-truncate">{{item.TypeNumber}}</p>
              </div>
            <!-- </a> -->
            </nuxt-link>
          </template>

          <template #[`item.Price`]="{ item }">
            {{ getPrice(item.PriceType, item.Price) }}
          </template>
          <template #[`item.SubTotal`]="{ item }">
            {{ getPrice(item.PriceType, item.SubTotal) }}
          </template>
        </v-data-table>

        <v-divider></v-divider>
        <div class="text-right">
          <div class="d-inline-flex flex-column flex-direction-">

            <price-card
              :item-info="order"
              :use-day="order.UseDay">
            </price-card>
            <v-card
              elevation="0"
              class="mt-1 d-inline-block">
              <v-card-actions tag="div" class="px-0">
                <v-btn
                  v-if="order.CancelEnableFlg !== 1"
                  elevation="0"
                  color="feature"
                  width="100%"
                  class="white--text"
                  :disabled="order.CancelEnableFlg===9"
                  @click="setCancelDialog()">申し込みキャンセル*
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </div>
        <template v-if="order.CancelEnableFlg !== 1">
          <h3 class="text-subtitle-1 red--text mt-3 font-weight-bold">
            *
            <template v-if="order.CancelEnableFlg == 0">
              お引渡し日の5営業日前より後のキャンセルについて
            </template>
            <template v-else>キャンセル可能期間が過ぎているため、システムからのキャンセルをお受けできません</template>
          </h3>
          <p>本システムでは、レンタルお引渡し日の5営業日前より後のキャンセルを受け付けておりません。<br>注文をキャンセルする場合は、レンタルご利用ガイドから「<NuxtLink :to="{ path: '/guide/cancel', hash: '#cancel-3' }" class="link" target="_blank">注文後のキャンセルについて</NuxtLink>」をご確認いただき、<span class="d-inline-block">レンタルスタッフまで<a href="https://www.takenaka-co.co.jp/contact/#information" class="link" target="_blank">お問い合わせ</a>ください。</span></p>
        </template>
      </div>
    </div>

    <v-dialog v-model="idDialog"
      width="580">
      <v-card class="pa-5 text-md-center">
        <p>
          <span class="note">レンタルのお申込みには、本人確認の登録が必要になります。</span><br>
          <template v-if="rentalFlg===0">
            <span class="red--text">本人確認の登録をお願いいたします。</span>
          </template>
          <template v-else-if="rentalFlg===5">
            <span class="red--text">現在、本人確認の登録申請中でございます。</span><br>
            申請が通るまで、もうしばらくお待ちください。
          </template>
        </p>
        <v-card-actions class="justify-center">
          <v-btn
            v-if="rentalFlg===0"
            class="mt-4 mx-2 white--text"
            dark
            color="primary"
            :to="'/myaccount/identification'">本人確認の登録
          </v-btn>
          <v-btn
            class="mt-4 mx-2"
            color="secondary"
            @click="idDialog=false">戻る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
export default {
  data() {
    return {
      breadCrumbs: [],
      order: {},
      headers: [
        { text: '商品名', value: 'ProductName', sortable: false, align: 'center'},
        { text: '単価(円)', value: 'Price', sortable: false },
        { text: '日数掛率', value: 'DayRate', sortable: false, width: '84px' },
        { text: '数量', value: 'Qty', sortable: false, width: '60px' },
        { text: '小計(円)', value: 'SubTotal', sortable: false },
        { text: '回答コメント', value: 'ProductComment', sortable: false, width: '120px' },
      ],
      cancelDialog: false,
      cancelID: null,
      branchDialog: false,
      orderDialog: false,
      idDialog: false,
      rentalFlg: null,
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    await this.getHxDetails()
    const res = await this.$getUserInfo()
    if(res) this.rentalFlg = res.RentalFlg
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head() {
    return {
      title: "注文履歴 詳細",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    };
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: '注文履歴', path: '/myaccount/order-history' })
      this.$store.commit('breadCrumbs/addList', { name: '詳細', path: '/myaccount/other-history' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async getHxDetails(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      const res = await this.$memberBaseAxios.post(`order/getOrderInfo/${this.$route.params.id}`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.order = res.data
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return await this.getHxDetails()
      }
    },
    getPrice(priceType, price) {
      switch (priceType) {
        case 0:
          return price.toLocaleString()
        case 1:
          return price.toLocaleString()
        case 2:
          return '本体に含む'
        case 9:
          return 'ASK'
        default:
          return 'ASK'
      }
    },
    getDate(date, time){
      if(!date) return
      const year = date.substring(0, 4)
      const month = date.substring(4, 6)
      const day = date.substring(6, 8)
      let t
      if(time){
        t = time
      }
      let dateTime = year + "-" + month + "-" + day
      if(t) dateTime += "  " + t
      return dateTime
    },
    setCancelDialog(){
      this.cancelDialog = true
    },
    orderDate(date){
      if(!date) return
      const now = new Date()
      const limitY = date.substr(0, 4)
      const limitM = date.substr(4, 2)
      const limitD = date.substr(6, 2)
      const limit = new Date(limitY, limitM - 1, limitD)
      const diffMmSec = limit.getTime() - now.getTime()
      const diffDays = parseInt(diffMmSec / 1000 / 60 / 60 / 24)
      return diffDays >= 0
    },
    checkID(){
      if(this.rentalFlg!==1){
        this.idDialog = true
      }else{
        this.orderDialog = true
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/common.scss';
.sec__inner {
  max-width: 1050px;
  margin: 0 auto;
  width: 95%;
}
.border{
  border: 1px solid $line;
}
.pre-wrap{
  white-space: pre-wrap;
}
.order__status{
  &-status{
    letter-spacing: 0.1em;
  }
  &-title{
    flex-basis: 9.5rem;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    @include wordSymbol('：', false)
  }
}
.table{
  &__img{
  width: 85px;
  max-height: 120px;
  object-fit: contain;
  height: 60px;
  }
  &__txt{
    max-width: 260px;
    @media (min-width: 700px) and (max-width: 888px) {
      max-width: 430px;
    }
    @media (min-width: 1050px) {
      max-width: 400px;
    }
  }
}

.width-s{
  max-width: 225px;
}
::v-deep {
  .v-chip:hover::before{
    opacity: 0;
  }
  .v-data-table-header{
    background-color: #f2f2f2;
  }
  td{
    border: 1px solid #f2f2f2;
  }
  input,textarea{
    cursor: default;
  }
  .v-data-table__mobile-row__header{
    white-space: nowrap;
  }
  .v-data-table__mobile-table-row{
    margin-bottom: 1rem;
  }
  .btn-column .v-btn__content{
    flex-wrap: wrap;
    flex-direction: column;
  }
}
</style>
