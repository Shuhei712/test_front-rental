<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <cancel-card
      :id="order.OrderNo"
      :dialog.sync="cancelDialog"
      @get-new-info="getHxDetails">
    </cancel-card>
    <top-bar title="詳細" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 order">
      <div class="order__item">
        <div class="order__status pb-10">
          <dl class="d-flex">
            <dt class="order__status-title">注文番号</dt>
            <dd>{{order.OrderNo}}</dd>
          </dl>
          <dl class="d-flex">
            <dt class="order__status-title">申込日</dt>
            <dd>{{getDate(order.RegistDate)}}</dd>
          </dl>
          <dl class="d-flex">
            <dt class="order__status-title">注文状況</dt>
            <dd>{{order.OrderStatusDisp}}</dd>
          </dl>
          <dl v-if="order.OrderResponse" class="d-flex">
            <dt class="order__status-title">コメント</dt>
            <dd>
              {{getDate(order.OrderResponseDate)}}
              <p>{{order.OrderResponse}}</p>
              <v-btn
                v-if="order.ResponseQuotationURL"
                outlined
                class="mt-1"
                :href="order.ResponseQuotationURL">
                資料ダウンロード
              </v-btn>
            </dd>
          </dl>
        </div>
        <h2 class="mb-4">商品一覧</h2>
        <v-data-table
          dense
          :headers="headers"
          :items="order.ProductList"
          :items-per-page="30"
          item-key="ProductID"
          hide-default-footer
          mobile-breakpoint="890">
          <template #[`item.ProductName`]="{ item }">
            <a :href="`https://rental.takenaka-co.co.jp/products/${item.ProductID}`" class="d-flex align-center text-left flex-column flex-sm-row">
              <img :src=item.ProductImage alt="商品イメージ" class="table__img mr-4 my-2">
              <div class="table__txt text-truncate">
                {{item.ProductName}}
                <p class="font-weight-bold text-truncate">{{item.TypeNumber}}</p>
              </div>
            </a>
          </template>

          <template #[`item.Price`]="{ item }">
            {{ getPrice(item.PriceType, item.Price) }}
          </template>
          <template #[`item.SubTotal`]="{ item }">
            {{ getPrice(item.PriceType, item.SubTotal) }}
          </template>
        </v-data-table>

        <v-divider></v-divider>

        <price-card
          :item-info="order"
          :use-day="order.UseDay">
        </price-card>

        <v-card
          v-if="order.OrderStatus===0||order.OrderStatus===1"
          max-width="320"
          elevation="0"
          class="ml-auto mt-1">
          <v-card-actions tag="div" class="px-0">
            <v-btn
              dark
              elevation="0"
              color="outline"
              width="100%"
              @click="setCancelDialog()">申し込みキャンセル
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div class="order__details">
        <h2 class="my-4 text-h6 accent white--text pa-2 rounded-sm">レンタル申し込み詳細</h2>
        <v-card
          outlined
          class="py-6">
          <v-container>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">
                注文件名
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  :value="order.OrderTitle"
                  outlined
                  dense
                  hide-details="auto"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">連絡方法
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  v-if="order.ContactType"
                  :value="order.ContactEmail"
                  outlined
                  dense
                  hide-details="auto"
                  prefix="メール： "
                  readonly>
                </v-text-field>
                <v-text-field
                  v-else
                  :value="order.ContactTel"
                  outlined
                  dense
                  hide-details="auto"
                  prefix="お電話： "
                  readonly>
                </v-text-field>

              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="4" class="pb-0">お引渡方法
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  :value="order.DeliveryTypeDisp"
                  outlined
                  dense
                  hide-details="auto"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">お引渡日時
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  :value="getDate(order.DeliveryDate,order.DeliveryTime)"
                  outlined
                  dense
                  hide-details="auto"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="order.DeliveryType!==0">
              <v-col cols="12" md="4" class="pb-0">お引渡場所
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  :value="order.DeliveryZipCode"
                  outlined
                  dense
                  hide-details="auto"
                  prefix="〒"
                  class="input-short"
                  readonly>
                </v-text-field>
                <v-text-field
                  v-if="order.DeliveryPrefect"
                  :value="order.DeliveryPrefect"
                  outlined
                  dense
                  hide-details="auto"
                  class="my-1"
                  readonly>
                </v-text-field>
                <v-text-field
                  v-if="order.DeliveryAddress"
                  :value="order.DeliveryAddress"
                  outlined
                  dense
                  hide-details="auto"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="4" class="pb-0">ご使用日
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <div class="d-flex align-center">
                  <v-text-field
                    :value="`${getDate(order.UseStartDate,order.UseStartTime)} ~ ${getDate(order.UseEndDate,order.UseEndTime)}`"
                    outlined
                    dense
                    hide-details="auto"
                    readonly>
                  </v-text-field>
                </div>
                ({{ order.UseDay }}日間)
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="4" class="pb-0">ご返却方法
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  :value="order.ReturnTypeDisp"
                  outlined
                  dense
                  hide-details="auto"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">ご返却日時
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  :value="getDate(order.ReturnDate,order.ReturnTime)"
                  outlined
                  dense
                  hide-details="auto"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="order.ReturnType===2">
              <v-col cols="12" md="4" class="pb-0">ご返却場所
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-text-field
                  :value="order.ReturnZipCode"
                  outlined
                  dense
                  hide-details="auto"
                  prefix="〒"
                  class="input-short"
                  readonly>
                </v-text-field>
                <v-text-field
                  v-if="order.ReturnPrefect"
                  :value="order.ReturnPrefect"
                  outlined
                  dense
                  hide-details="auto"
                  class="my-1"
                  readonly>
                </v-text-field>
                <v-text-field
                  v-if="order.ReturnAddress"
                  :value="order.ReturnAddress"
                  outlined
                  dense
                  hide-details="auto"
                  readonly>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

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
      order: {},
      headers: [
        { text: '商品名', value: 'ProductName', sortable: false, align: 'center'},
        { text: '単価(円)', value: 'Price', sortable: false },
        { text: '日数掛率', value: 'DayRate', sortable: false, width: '84px' },
        { text: '数量', value: 'Qty', sortable: false, width: '60px' },
        { text: '小計(円)', value: 'SubTotal', sortable: false },
        { text: '備考', value: 'ProductComment', sortable: false, width: '120px' },
      ],
      cancelDialog:false,
      cancelID: null,
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    await this.getHxDetails()
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
      const year = date.substring(0, 4)
      const month = date.substring(4, 6)
      const day = date.substring(6, 8)
      let t;
      if(time){
        const h = time.substring(0, 2)
        const min = time.substring(2, 4)
        t = "  " + h + ":" + min
      }
      let dateTime = year + "-" + month + "-" + day
      if(t) dateTime += t
      return dateTime
    },
    setCancelDialog(){
      this.cancelDialog = true
    },
  }
}
</script>
<style lang="scss" scoped>
.sec__inner {
  max-width: 1050px;
  margin: 0 auto;
  width: 95%;
}
.order__status-title{
  flex-basis: 6rem;
  flex-grow: 0;
  position: relative;
  &::after{
    content: '：';
    display: inline-block;
    position: absolute;
    right: 3px;
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

.input-short{
  max-width: 225px;
}
::v-deep {
  .v-data-table-header{
    background-color: #f2f2f2;
  }
  td{
    border: 1px solid #f2f2f2;
  }
  input{
    cursor: default;
  }
  .v-data-table__mobile-row__header{
    white-space: nowrap;
  }
  .v-data-table__mobile-table-row{
    margin-bottom: 1rem;
  }
}
</style>