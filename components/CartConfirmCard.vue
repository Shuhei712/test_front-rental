<template>
  <div class="popup text-center">
    <v-dialog
      v-model="confirmDialog"
      width="90%"
      scrollable
      persistent>
      <v-card>
        <v-card-text class="py-10 px-2 px-sm-5 cart-confirm">
          <div class="cart-confirm__inner">
            <h1 class="pb-10 accent--text text-h5 text-md-h4 font-weight-bold">レンタル申し込み 確認画面</h1>
            <div class="order__item">
              <h2 class="mb-2 text-h6 outline white--text py-1 px-3 rounded-sm">商品一覧</h2>
              <v-data-table
                v-if="cartInfo"
                dense
                :headers="headers"
                :items="cartInfo.ProductList"
                :items-per-page="30"
                item-key="ProductID"
                hide-default-footer
                mobile-breakpoint="890">
                <template #[`item.ProductName`]="{ item }">
                  <a :href="`https://rental.takenaka-co.co.jp/products/${item.ProductID}`" target="_blank" class="d-flex align-center text-left flex-column flex-sm-row">
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
                :item-info="cartInfo"
                :use-day="rentJson.UseDay">
              </price-card>

            </div>

            <div class="order__detail mt-15">
              <h2 class="text-h6 outline white--text py-1 px-3 rounded-sm">レンタル申し込み記入欄</h2>
              <v-card
                outlined
                class="py-12 px-md-10 px-5">

                <v-row>
                  <v-col cols="12" md="4" class="pb-0">
                    注文件名
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" min-height="2rem" class="pa-2 border">{{ rentJson.OrderTitle }}</v-card>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>
                <v-row>
                  <v-col cols="12" md="4" class="pb-0">連絡方法
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card v-if="rentJson.ContactType" elevation="0" class="pa-2 border">メール：{{ rentJson.ContactEmail }}</v-card>
                    <v-card v-else elevation="0" class="pa-2 border">お電話：{{ rentJson.ContactTel }}</v-card>

                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <v-row>
                  <v-col cols="12" md="4" class="pb-0">お引渡し方法
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border width-s">
                      <template v-if="rentJson.DeliveryType===0">ご来社</template>
                      <template v-else-if="rentJson.DeliveryType===1">宅配(混載)便</template>
                      <template v-else>チャーター便</template>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4" class="pb-0">
                    <template v-if="rentJson.DeliveryType===0">
                      お引取り日時
                    </template>
                    <template v-else-if="rentJson.DeliveryType===1">
                      商品到着日
                    </template>
                    <template v-else>搬入日時</template>
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border">{{ getDate(rentDate[0],rentJson.DeliveryTime) }}</v-card>
                  </v-col>
                </v-row>
                <v-row v-if="rentJson.DeliveryType===0">
                  <v-col cols="12" md="4" class="pb-0">お引取り店舗
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" min-height="2rem" class="pa-2 border width-s">{{ rentJson.DeliveryShop }}</v-card>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12" md="4" class="pb-0">
                    <template v-if="rentJson.DeliveryType===1">発送先 住所</template>
                    <template v-else>搬入場所</template>
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border mb-1 width-s">〒{{ rentJson.DeliveryZipCode }}</v-card>
                    <v-card elevation="0" class="pa-2 border mb-1">{{ rentJson.DeliveryPrefect }}</v-card>
                    <v-card elevation="0" class="pa-2 border mb-1">{{ rentJson.DeliveryAddress }}</v-card>
                  </v-col>
                </v-row>

                <v-row v-if="rentJson.DeliveryType===1">
                  <v-col cols="12" md="4" class="pb-0">発送先 電話番号
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border">{{ rentJson.DeliveryTel }}</v-card>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <v-row>
                  <v-col cols="12" md="4" class="pb-0">ご使用期間(リハーサル含む)
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border">{{ concatRentRange }}</v-card>
                    ({{ rentJson.UseDay }}日間)
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>

                <v-row>
                  <v-col cols="12" md="4" class="pb-0">ご返却方法
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border width-s">
                      <template v-if="rentJson.ReturnType===0">ご来社</template>
                      <template v-else-if="rentJson.ReturnType===1">宅配(混載)便</template>
                      <template v-else>チャーター便</template>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="4" class="pb-0">
                    <template v-if="rentJson.ReturnType===0">
                      ご返却日時
                    </template>
                    <template v-else-if="rentJson.ReturnType===1">
                      商品到着日
                    </template>
                    <template v-else>搬出日時</template>
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border">{{ getDate(rentDate[1],rentJson.ReturnTime) }}</v-card>
                  </v-col>
                </v-row>
                <v-row v-if="rentJson.ReturnType!==2">
                  <v-col cols="12" md="4" class="pb-0">ご返却店舗
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" min-height="2rem" class="pa-2 border width-s">{{ rentJson.ReturnShop }}</v-card>
                  </v-col>
                </v-row>
                <v-row v-else>
                  <v-col cols="12" md="4" class="pb-0">搬出場所
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border width-s mb-1">〒{{ rentJson.ReturnZipCode }}</v-card>
                    <v-card elevation="0" class="pa-2 border mb-1">{{rentJson.ReturnPrefect}}</v-card>
                    <v-card elevation="0" class="pa-2 border mb-1">{{rentJson.ReturnAddress}}</v-card>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>
                <v-row>
                  <v-col cols="12" md="4" class="pb-0">お支払い方法
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" class="pa-2 border width-s">
                      <template v-if="rentJson.PayMethod===0">事前お振込</template>
                      <template v-else-if="rentJson.PayMethod===1">店頭お支払い(現金)</template>
                    </v-card>
                  </v-col>
                </v-row>

                <v-divider class="my-4"></v-divider>
                <v-row class="border-bottom">
                  <v-col cols="12" md="4" class="pb-0">備考
                  </v-col>
                  <v-col cols="12" md="8" class="pt-0 pt-md-3">
                    <v-card elevation="0" min-height="2rem" class="pa-2 border pre-wrap">{{ rentJson.OrderComment }}</v-card>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </div>

        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            elevation="0"
            color="outline"
            class="ma-2 px-6 white--text"
            :disabled="loading"
            @click="backInput()">戻る
          </v-btn>
          <v-btn
            elevation="0"
            color="primary"
            class="ma-2 px-6"
            :loading="loading"
            @click="order()">レンタル申し込み
          </v-btn>

        </v-card-actions>
      </v-card>
      <v-dialog v-model="resultDialog"
        width="580"
        persistent>
        <v-card class="pa-5 text-center">
          <result-card
            :result="result"
            :action="'レンタル申し込み'"
            :path="'/myaccount'"
            :dialog.sync="resultDialog">
          </result-card>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
</template>

<script>

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    rentJson: {
      type: Object,
      required: true
    },
    rentDate: {
      type: Array,
      required: true
    },
    concatRentRange: {
      type: String,
      required: false,
      default: null
    },
    cartInfo: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  data(){
    return{
      loading: false,
      resultDialog: false,
      result: null,
      headers: [
        { text: '商品名', value: 'ProductName', sortable: false, align: 'center' },
        { text: '単価(円)', value: 'Price', sortable: false },
        { text: '日数掛率', value: 'DayRate', sortable: false, width: '84px' },
        { text: '数量', value: 'Qty', sortable: false },
        { text: '小計(円)', value: 'SubTotal', sortable: false },
      ],
    }
  },
  computed: {
    confirmDialog:{
      get(){
        return this.dialog
      },
      set(val){
        this.$emit('update:dialog', val)
      }
    },
  },
  mounted(){
    window.addEventListener('popstate', this.popstateHook)
  },
  beforeDestroy(){
    window.removeEventListener('popstate', this.popstateHook)
  },
  methods: {
    getDate(date, time){
      let t
      if(time){
        t = time
      }
      let dateTime = date
      if(t) dateTime += "  " + t
      return dateTime
    },
    async order(){
      this.loading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      this.$set(this.rentJson, "DeliveryDate", this.rentDate[0].replace(/-/g,''))
      this.$set(this.rentJson, "ReturnDate", this.rentDate[1].replace(/-/g,''))

      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('JsonData', JSON.stringify(this.rentJson) )
      const res = await this.$memberBaseAxios.post(`order/orderRental`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員カート', '申し込み', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.loading = false
        this.result = 'success'
        this.resultDialog = true
        this.$store.commit('cart/resetCartNum')
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.order()
      }else{
        this.loading = false
        this.result = String(res.data.ErrorNo)
        this.resultDialog = true
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
    popstateHook(){
      if(this.confirmDialog){
        history.pushState(null, '', null)
      }
    },
    backInput(){
      this.confirmDialog = false
      this.$router.go(-1)
    }
  }
}

</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.cart-confirm__inner{
  max-width: 900px;
  margin: auto;
}
.width-s{
  max-width: 225px;
}
.border{
  border: 1px solid $line;
}
.pre-wrap{
  white-space: pre-wrap;
}
.table{
  &__img{
    width: 120px;
    max-height: 120px;
    object-fit: contain;
    height: 60px;
  }
  &__txt{
    max-width: 230px;
    @media (min-width: 700px) and (max-width: 888px) {
      max-width: 430px;
    }
    @media (min-width: 1050px) {
      max-width: 400px;
    }
  }
}
::v-deep {
  .v-data-table-header{
    background-color: #f2f2f2;
  }
  .v-data-table__mobile-table-row{
    margin-bottom: 1rem;
  }
  td{
    border: 1px solid #f2f2f2;
  }
  .v-data-table__mobile-row__header{
    white-space: nowrap;
  }
}
</style>
