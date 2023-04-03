<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <est-card
      :dialog.sync="estDialog"
      :rent-obj.sync="rentJson"
      :est-obj.sync="estJson"
      :set-rent-range.sync="rentRange"
      :concat-rent-range="concatRentRange"
      :rent-range-min="rentRangeMin"
      :rent-range-max="rentRangeMax"
      @setRange="setRange">
    </est-card>
    <cart-confirm-card
      :dialog.sync="confirmDialog"
      :rent-json="rentJson"
      :rent-date="rentDate"
      :concat-rent-range="concatRentRange"
      :cart-info="cartInfo">
    </cart-confirm-card>
    <top-bar title="カート" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 cart">
      <v-card v-if="!cartInfo" class="text-center pa-4" outlined>
        <v-icon color="lightGray">mdi-cart-outline</v-icon><br>
        <p class="mt-3">カートに入っている商品はございません。
        </p>
        <v-btn
          color="primary"
          class="white--text mt-4"
          :to="'/'">トップページへ
        </v-btn>
      </v-card>
      <div v-else>
        <div class="cart__item">
          <h2 class="mb-2 text-h6 outline white--text py-1 px-3 rounded-sm">商品一覧</h2>
          <v-data-table
            dense
            :headers="headers"
            :items="cartInfo.ProductList"
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
            <template #[`item.Qty`]="{ item }">
              <td class="px-2 table__qty">
                <div class="d-flex align-center">
                  <v-autocomplete
                    v-model.number="item.Qty"
                    outlined
                    :items="qtyArr"
                    dense
                    hide-details="auto"
                    class="d-inline-block"
                    @change="changeQuantity(item.ProductID, $event)"
                  ></v-autocomplete>
                  <v-btn
                    class="ml-2"
                    fab
                    dark
                    x-small
                    elevation="0"
                    color="feature"
                    @click="setDeleteDialog(item.ProductID, item)">
                    <v-icon dark>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </div>
              </td>
            </template>
          </v-data-table>
          <p class="pt-2 text-subtitle-2">※レンタル期間は下部のレンタル申し込み記入欄「ご使用期間」より変更可能です。</p>

          <price-card
            :item-info="cartInfo"
            :use-day="rentJson.UseDay">
          </price-card>

          <v-card
            max-width="320"
            elevation="0"
            class="ml-auto mt-1">
            <v-card-actions tag="div" class="flex-column px-0">
              <v-btn
                dark
                elevation="0"
                color="accent"
                width="100%"
                @click="estDialog=true">見積書ダウンロード
              </v-btn>
            </v-card-actions>

          </v-card>
        </div>

        <div class="cart__user mt-15">
          <h2 class="mt-4 text-h6 outline white--text py-1 px-3 rounded-sm">レンタル申し込み記入欄</h2>
          <v-card
            outlined
            class="py-6">
            <ValidationObserver v-slot="ObserverProps" ref="observer">
              <v-form>
                <v-container>
                  <v-row class="border-bottom">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 注文件名
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="rentJson.OrderTitle"
                        outlined
                        dense
                        hide-details="auto"
                        placeholder="タケナカ内覧会2023"
                        counter="50"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="border-bottom">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                      連絡方法
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-radio-group v-model.number="rentJson.ContactType"
                        hide-details="auto"
                        mandatory
                        row
                        class="mt-0 mb-4">
                        <v-radio
                          label="お電話"
                          :value="0"
                        ></v-radio>
                        <v-radio
                          label="メール"
                          :value="1"
                        ></v-radio>

                      </v-radio-group>
                      <div v-if="rentJson.ContactType===0">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="tel"
                          rules="required|num">
                          <v-text-field
                            v-model.number="rentJson.ContactTel"
                            outlined
                            dense
                            hide-details="auto"
                            :error-messages="errors"
                            @blur="rentJson.ContactTel=toNum($event.target.value)">
                          </v-text-field>
                        </ValidationProvider>
                      </div>
                      <div v-else>

                        <ValidationProvider
                          v-slot="{ errors }"
                          name="email"
                          rules="required|email">
                          <v-text-field
                            v-model="rentJson.ContactEmail"
                            outlined
                            dense
                            hide-details="auto"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row class="border-bottom">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                      お引渡
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-radio-group v-model.number="rentJson.DeliveryType"
                        hide-details="auto"
                        mandatory
                        row
                        class="mt-0 mb-4">
                        <v-radio label="ご来社"
                          :value="0"
                        ></v-radio>
                        <v-radio label="宅配(混載)便"
                          :value="1"
                        ></v-radio>
                        <v-radio label="チャーター便"
                          :value="2"
                        ></v-radio>
                      </v-radio-group>
                      <div class="notes my-4">
                        <p class="note caption">大型機材のイベント会場や施設への直接配送、発送到着のお時間指定ご希望の場合はチャーター便となります。</p>
                        <p class="note caption">宅配送料及びチャーター費はお客様ご負担となります。</p>
                      </div>
                      <v-divider class="mb-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">
                          <template v-if="rentJson.DeliveryType===0">
                            引取日
                          </template>
                          <template v-else-if="rentJson.DeliveryType===1">
                            貴社着日
                          </template>
                          <template v-else>搬入日</template>
                        </v-col>
                        <v-col cols="12" md="9" class="pt-0 pt-md-3">
                          <v-menu
                            v-model="datePick[0]"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <ValidationProvider
                                v-slot="{ errors }"
                                name="RentDate0"
                                rules="required">
                                <v-text-field
                                  v-model="rentDate[0]"
                                  outlined
                                  dense
                                  readonly
                                  hide-details="auto"
                                  :error-messages="errors"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </ValidationProvider>
                            </template>
                            <v-date-picker
                              v-model="rentDate[0]"
                              no-title
                              scrollable
                              :max="deliverMax"
                              @input="datePick[0] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>

                      <div v-if="rentJson.DeliveryType===0">
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                          <v-col cols="12" md="3" class="pb-0">引取時間</v-col>
                          <v-col cols="12" md="9" class="pt-0 pt-md-3">
                            <set-time @change-time="rentJson.DeliveryTime = $event"></set-time>
                          </v-col>
                        </v-row>
                      </div>

                      <div v-else-if="rentJson.DeliveryType===1">
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                          <v-col cols="12" md="3" class="pb-0">場所</v-col>
                          <v-col cols="12" md="9" class="pt-0 pt-md-3">
                            <set-address
                              :set-zip-code.sync="rentJson.DeliveryZipCode"
                              :set-prefect.sync="rentJson.DeliveryPrefect"
                              :set-address.sync="rentJson.DeliveryAddress">
                            </set-address>
                          </v-col>
                        </v-row>

                        <p class="note caption mt-2">
                          弊社機材出庫日は基本的に前営業日となります
                        </p>
                      </div>

                      <div v-else>
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                          <v-col cols="12" md="3" class="pb-0">搬入時間</v-col>
                          <v-col cols="12" md="9" class="pt-0 pt-md-3">
                            <set-time @change-time="rentJson.DeliveryTime = $event"></set-time>
                          </v-col>
                        </v-row>
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                          <v-col cols="12" md="3" class="pb-0">場所</v-col>
                          <v-col cols="12" md="9" class="pt-0 pt-md-3">
                            <set-address
                              :set-zip-code.sync="rentJson.DeliveryZipCode"
                              :set-prefect.sync="rentJson.DeliveryPrefect"
                              :set-address.sync="rentJson.DeliveryAddress">
                            </set-address>
                          </v-col>
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>

                  <v-row class="border-bottom">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                      ご使用期間(リハーサル含む)
                    </v-col>
                    <v-col cols="12" md="8">

                      <v-menu
                        ref="datePick"
                        v-model="datePick[1]"
                        :close-on-click="false"
                        :close-on-content-click="false"
                        :return-value.sync="rentRange"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template #activator="{ on, attrs }">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="rentRange"
                            rules="required">
                            <v-text-field
                              v-model="concatRentRange"
                              outlined
                              dense
                              hide-details="auto"
                              readonly
                              :error-messages="errors"
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </ValidationProvider>
                        </template>
                        <v-date-picker
                          v-model="rentRange"
                          no-title
                          scrollable
                          range
                          :min="rentRangeMin"
                          :max="rentRangeMax"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="primary"
                            @click="rentRange=[]"
                          >
                            リセット
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="setRange">
                            確定
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                      ( {{rentJson.UseDay}}日間 )
                    </v-col>
                  </v-row>

                  <v-row class="border-bottom">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                      ご返却
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-radio-group v-model.number="rentJson.ReturnType"
                        hide-details="auto"
                        mandatory
                        row
                        class="mt-0 mb-4">
                        <v-radio
                          label="ご来社"
                          :value="0"
                        ></v-radio>
                        <v-radio
                          label="宅配(混載)便"
                          :value="1"
                        ></v-radio>
                        <v-radio
                          label="チャーター便"
                          :value="2"
                        ></v-radio>
                      </v-radio-group>
                      <div class="notes my-4">
                        <p class="note caption">ご返送料及びチャーター費はお客様ご負担となります。</p>
                      </div>
                      <v-divider class="mb-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">
                          <template v-if="rentJson.ReturnType===0">
                            返却日
                          </template>
                          <template v-else-if="rentJson.ReturnType===1">
                            貴社着日
                          </template>
                          <template v-else>搬入日</template>
                        </v-col>
                        <v-col cols="12" md="9" class="pt-0 pt-md-3">
                          <v-menu
                            v-model="datePick[2]"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <ValidationProvider
                                v-slot="{ errors }"
                                name="ReturnDate2"
                                rules="required">
                                <v-text-field
                                  v-model="rentDate[1]"
                                  outlined
                                  dense
                                  hide-details="auto"
                                  readonly
                                  :error-messages="errors"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </ValidationProvider>
                            </template>
                            <v-date-picker
                              v-model="rentDate[1]"
                              no-title
                              scrollable
                              :min="returnMin"
                              @input="datePick[2] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <div v-if="rentJson.ReturnType===0">
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                          <v-col cols="12" md="3" class="pb-0">返却時間</v-col>
                          <v-col cols="12" md="9" class="pt-0 pt-md-3">
                            <set-time @change-time="rentJson.ReturnTime = $event"></set-time>
                          </v-col>
                        </v-row>
                      </div>

                      <div v-else-if="rentJson.ReturnType===2">
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                          <v-col cols="12" md="3" class="pb-0">搬入時間</v-col>
                          <v-col cols="12" md="9" class="pt-0 pt-md-3">
                            <set-time @change-time="rentJson.ReturnTime = $event"></set-time>
                          </v-col>
                        </v-row>
                        <v-divider class="my-4"></v-divider>
                        <v-row>
                          <v-col cols="12" md="3" class="pb-0">場所</v-col>
                          <v-col cols="12" md="9" class="pt-0 pt-md-3">
                            <set-address
                              :set-zip-code.sync="rentJson.ReturnZipCode"
                              :set-prefect.sync="rentJson.ReturnPrefect"
                              :set-address.sync="rentJson.ReturnAddress">
                            </set-address>
                          </v-col>
                        </v-row>
                      </div>

                    </v-col>
                  </v-row>

                  <v-row class="border-bottom">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 備考
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-textarea
                        v-model="rentJson.OrderComment"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
              <!-- {{ObserverProps.fields}} -->

              <div class="text-center mt-10">
                <!-- <v-btn large
                  class="my-4 mx-2"
                  color="secondary"
                  @click="reset()"
                >リセット</v-btn> -->

                <v-btn
                  elevation="0"
                  color="primary"
                  large
                  class="ml-0 my-1 text-h6 px-6"
                  :disabled="ObserverProps.invalid"
                  @click="checkID()">確認する
                </v-btn>
              </div>
            </ValidationObserver>
          </v-card>

        </div>
      </div>
    </div>

    <v-dialog v-model="dialog"
      width="580"
      persistent>
      <v-card class="pa-5 text-center">
        <p>選択した商品をカートから消去しますか？</p>
        <v-card-actions class="justify-center">
          <v-btn
            class="mt-4 mx-2"
            color="secondary"
            :disabled="deleteLoading"
            @click="dialog=false">戻る
          </v-btn>
          <v-btn
            class="mt-4 mx-2"
            dark
            color="feature"
            :loading="deleteLoading"
            @click="deleteItem">消去
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="idDialog"
      width="580">
      <v-card class="pa-5 text-center">
        <p class="red--text">レンタルのお申込みには、本人確認の登録が必要になります。</p>
        <v-card-actions class="justify-center">
          <v-btn
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
      cartInfo: null,
      rentJson: {},
      estJson: {},
      userInfo: null,
      headers: [
        { text: '商品名', value: 'ProductName', sortable: false, align: 'center' },
        { text: '単価(円)', value: 'Price', sortable: false },
        { text: '日数掛率', value: 'DayRate', sortable: false, width: '84px' },
        { text: '数量', value: 'Qty', sortable: false, width: '130px' },
        { text: '小計(円)', value: 'SubTotal', sortable: false },
      ],
      estDialog: false,
      dialog: false,
      deleteProductID: null,
      deleteRow: null,
      deleteLoading: false,
      datePick: [ false,false,false],
      rentRange: [],
      rentDate: [],
      rentRangeMin: null,
      rentRangeMax: null,
      deliverMax: null,
      returnMin: null,
      concatRentRange: null,
      confirmDialog: false,
      qtyArr: [...Array(99).keys()].map(i => i + 1),
      idDialog: false,
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.getCartInfo()
    if(this.cartInfo) await this.inputUserInfo()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "カート",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  watch: {
    'rentJson.UseDay'(newVal, oldVal){
      if(newVal!== oldVal && oldVal) {
        this.getCartInfo()
        this.resetEst()
      }
    },
    'rentDate.0'(value){
        this.rentRangeMin = value
        if(!this.rentRange.length){
          this.returnMin = value
        }
    },
    'rentDate.1'(value){
        this.rentRangeMax = value
        if(!this.rentRange.length){
          this.deliverMax = value
        }
    },
    'rentRange'(value){
      if( value.length === 1 ){
        this.rentRangeMin = value[0]
        this.concatRentRange = `${value[0]}~${value[0]}`
      }else if( value.length === 2 ){
        this.concatRentRange = this.rentRange.join(' ~ ')
        this.rentRangeMin = this.rentDate[0]
        this.rentRangeMax = this.rentDate[1]
      }else{
        this.rentRangeMin = this.rentDate[0]
        this.concatRentRange = null
      }
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "カート", path: "/myaccount/cart" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async getCartInfo(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      if(!this.rentJson.UseDay) this.$set(this.rentJson, "UseDay", 1)

      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('UseDay', this.rentJson.UseDay)
      const res = await this.$memberBaseAxios.post(`order/getCartProductInfo`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.cartInfo = res.data
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.getCartInfo()
      }else{
        this.$store.commit('cart/changeCartNum', 0)
        this.cartInfo = null
      }
    },
    async inputUserInfo(){
      const res = await this.$getUserInfo()
      this.userInfo = res
      if(res.NecDocFlg===0){
        this.idDialog = true
      }
      this.$set(this.estJson, 'OwnerName', res.MemberName)
      this.$set(this.estJson, 'Organization', res.Organization)
      this.$set(this.rentJson, 'ContactEmail', res.Email)
      this.$set(this.rentJson, 'ContactTel', res.Tel)
      this.$set(this.rentJson, 'DeliveryZipCode', res.ZipCode)
      this.$set(this.rentJson, 'DeliveryPrefect', res.Prefect)
      this.$set(this.rentJson, 'DeliveryAddress', res.Address)
      this.$set(this.rentJson, 'ReturnZipCode', res.ZipCode)
      this.$set(this.rentJson, 'ReturnPrefect', res.Prefect)
      this.$set(this.rentJson, 'ReturnAddress', res.Address)
    },
    getPrice(priceType, price) {
      switch (priceType) {
        case 0:
          return price
        case 1:
          return price
        case 2:
          return '本体に含む'
        case 9:
          return 'ASK'
        default:
          return 'ASK'
      }
    },
    setDeleteDialog(ProductID, row){
      this.dialog = true
      this.deleteRow = row
      this.deleteProductID = ProductID
    },
    async deleteItem(){
      this.deleteLoading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('UseDay', this.rentJson.UseDay)
      const res = await this.$memberBaseAxios.delete(`order/deleteCartProduct/${this.deleteProductID}`, {
        data: param,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員カート', '消去', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.cartInfo = res.data
        this.resetEst()
        this.$getCartNum()
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return await this.deleteItem()
      }else if(res.data.ErrorNo === 130902){
        this.$store.commit('cart/changeCartNum', 0)
        this.cartInfo = null
      }
      this.dialog = false
      this.deleteLoading = false
    },
    async changeQuantity(ProductID, Qty){
      if( !Qty || Qty <= 0 ) return false
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('Qty', Qty)
      param.append('UseDay', this.rentJson.UseDay)
      const res = await this.$memberBaseAxios.put(`order/changeCartQty/${ProductID}`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員カート', '数量変更', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.$getCartNum()
        this.cartInfo = res.data
        this.resetEst()
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.changeQuantity(ProductID, Qty)
      }
    },
    resetEst(){
      this.$set(this.rentJson, "QuotationID", '')
      this.$set(this.rentJson, "QuotationNo", '')
      this.$set(this.rentJson, "DocumentNo", '')
      this.$set(this.rentJson, "QuotationURL", '')
    },
    toDate (str) {
      return new Date(str.split('-')[0], str.split('-')[1] - 1, str.split('-')[2]);
    },
    toNum(e){
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|－|ー/g,'')
    },
    setRange(){
      if( this.rentRange.length ){
        if( this.rentRange.length === 1 ) this.rentRange[1] = this.rentRange[0]
        // API用にフォーマット変更
        const StartDate = this.rentRange[0].replace(/-/g,'')
        const EndDate = this.rentRange[1].replace(/-/g,'')
        this.$set(this.rentJson, 'UseStartDate', StartDate)
        this.$set(this.rentJson, 'UseEndDate', EndDate)
        // 使用期間抽出
        const dateDiff = this.toDate(this.rentRange[1]).getTime() - this.toDate(this.rentRange[0]).getTime()
        const days = Math.ceil(dateDiff / (1000 * 3600 * 24)) + 1
        this.$set(this.rentJson, 'UseDay', days)
      }else{
        // 初期設定
        this.$set(this.rentJson, 'UseDay', 1)
        this.$set(this.rentJson, 'UseStartDate', '')
        this.$set(this.rentJson, 'UseEndDate', '')
      }
      this.deliverMax = this.rentRange[0] ? this.rentRange[0] : this.rentDate[1]
      this.returnMin = this.rentRange[1] ? this.rentRange[1] : this.rentDate[0]
      this.$refs.datePick.save(this.rentRange)
    },
    checkID(){
      if(this.userInfo.NecDocFlg===0){
        this.idDialog = true
      }else{
        this.confirmDialog = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sec__inner {
  max-width: 1050px;
  margin: 0 auto;
  width: 95%;
}
.cart {
  .table{
    &__img{
      width: 120px;
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
    &__qty{
      max-width: 140px;
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
    .v-autocomplete.v-select.v-input--is-focused input{
      min-width: auto;
    }
    .v-autocomplete.v-input .v-input__slot,
    .v-autocomplete.v-input input{
        cursor: pointer;
      }
  }
}
.border-bottom{
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
.width-s{
  max-width: 225px;
}
.note{
  margin-bottom: 0;
  padding-left: 1rem;
  position: relative;
  &::before{
    content: "※";
    left: 0;
    position: absolute;
  }
}
</style>
