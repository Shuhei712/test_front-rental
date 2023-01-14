<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <est-card
      :dialog="estDialog"
      :rent-obj="rentJson"
      :est-obj="estJson"
      :set-rent-range="rentRange"
      :set-format-range="getRentRange"
      :set-rent-range-min="rentRangeMin"
      @change-est-dialog="estDialog = $event"
      @change-rent-json="rentJson = $event"
      @change-rent-range="rentRange = $event"
      @change-get-rent-range="getRentRange = $event"
      @change-rent-range-min="rentRangeMin = $event"></est-card>
    <top-bar title="カート" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 cart">
      <div class="cart__item">
        <h1 class="mb-4">ショッピングカート一覧</h1>
        <p v-if="msg">{{msg}}</p>
        <v-data-table v-else
          dense
          :headers="headers"
          :items="cartInfo.ProductList"
          item-key="ProductID"
          class="cart__info"
          hide-default-footer>
          <template #[`item.ProductName`]="{ item }">
            <a :href="`https://rental.takenaka-co.co.jp/products/${item.ProductID}`" class="d-flex align-center text-left">
              <img :src=item.ProductImage alt="商品イメージ" class="info__img mr-4 my-2">
              <div class="info__txt">
                {{item.ProductName}}
                <p class="font-weight-bold">{{item.TypeNumber}}</p>
              </div>
            </a>
          </template>

          <template #[`item.Price`]="{ item }">
            {{ getPrice(item.PriceType, item.Price) }}
          </template>
          <template #[`item.Qty`]="{ item }">
            <div class="d-flex align-center">
              <v-text-field
                v-model.number="item.Qty"
                type="number"
                outlined
                hide-details="auto"
                class="d-inline-block"
                dense
                @change="changeQuantity(item.ProductID, $event)">
              </v-text-field>
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
          </template>
        </v-data-table>

        <v-divider></v-divider>

        <v-card
          max-width="320"
          color="cushion"
          elevation="0"
          class="ml-auto mt-3">
          <v-card-text>
            <template v-if="cartInfo.Total">
              <p class="d-flex justify-space-between">
                <span>小計</span><span>￥{{cartInfo.SubTotal}}</span>
              </p>
              <p class="d-flex justify-space-between mb-2">
                <span>消費税</span><span>￥{{cartInfo.Tax}}</span>
              </p>
              <v-divider></v-divider>
              <p class="font-weight-bold text-right mt-2 red--text">
                合計&emsp;
                <span class="text-h5">￥{{cartInfo.Total}}</span> (税込)
              </p>
            </template>
            <template v-else>
              <p class="font-weight-bold text-right mt-2 red--text">
                合計&emsp;
                <span class="text-h5">ASK</span>
              </p>
            </template>
          </v-card-text>
          <v-card-actions tag="div" class="justify-end">
            <v-btn
              class="mt-1"
              dark
              outlined
              elevation="0"
              color="primary"
              @click="getCartInfo()">再計算
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card
          max-width="320"
          elevation="0"
          class="ml-auto mt-1">
          <v-card-actions tag="div" class="flex-column px-0">
            <v-btn
              dark
              elevation="0"
              color="outline"
              width="100%"
              @click="estDialog=true">見積書ダウンロード
            </v-btn>
          </v-card-actions>

        </v-card>
      </div>

      <div class="cart__user mt-10">
        <h2 class="my-4 text-h6 accent white--text pa-2 rounded-sm">レンタル申し込み記入欄</h2>
        <v-card
          outlined
          class="py-6">
          <ValidationObserver v-slot="ObserverProps" ref="observer">
            <v-form>
              <v-container>
                <v-row class="border-bottom">
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
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
                  </v-col>
                </v-row>
                <v-row class="border-bottom">
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    お引渡
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-radio-group v-model.number="rentJson.DeliveryType"
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
                    <!-- <v-divider class="mb-4"></v-divider> -->

                    <div v-if="rentJson.DeliveryType===0">
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">引取日</v-col>
                        <v-col cols="12" md="9">
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
                                  v-model="DeliveryDate"
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
                              v-model="DeliveryDate"
                              no-title
                              scrollable
                              @input="datePick[0] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-divider class="my-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">引取時間</v-col>
                        <v-col cols="12" md="9">
                          <set-time v-model="rentJson.DeliveryTime" @change-time="rentJson.DeliveryTime = $event"></set-time>
                        </v-col>
                      </v-row>
                    </div>

                    <div v-else-if="rentJson.DeliveryType===1">
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">貴社着日</v-col>
                        <v-col cols="12" md="9">
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
                                name="RentDate1"
                                rules="required">
                                <v-text-field
                                  v-model="DeliveryDate"
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
                              v-model="DeliveryDate"
                              no-title
                              scrollable
                              @input="datePick[0] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </div>

                    <div v-else>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">搬入日</v-col>
                        <v-col cols="12" md="9">
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
                                name="RentDate2"
                                rules="required">
                                <v-text-field
                                  v-model="DeliveryDate"
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
                              v-model="DeliveryDate"
                              no-title
                              scrollable
                              @input="datePick[0] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-divider class="my-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">搬入時間</v-col>
                        <v-col cols="12" md="9">
                          <set-time @change-time="rentJson.DeliveryTime = $event"></set-time>
                        </v-col>
                      </v-row>
                      <v-divider class="my-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">場所{{address}}</v-col>
                        <v-col cols="12" md="9">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="DeliveryZipCode"
                          rules="required|num"
                          class="d-flex mb-1 ">
                          <v-text-field
                            v-model="rentJson.DeliveryZipCode"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            placeholder="0123456"
                            prefix="〒"
                            :error-messages="errors"
                            class="input-short"
                            @blur="rentJson.DeliveryZipCode=toNum($event.target.value)"
                          ></v-text-field>
                          <v-btn
                            color="primary"
                            class="ms-1"
                            :loading="loading"
                            @click="checkAddress('Delivery', rentJson.DeliveryZipCode)">
                            検索
                          </v-btn>
                        </ValidationProvider>

                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Prefect"
                          rules="required"
                          class="d-block mb-1">
                          <v-autocomplete
                            ref="country"
                            v-model="rentJson.DeliveryPrefect"
                            outlined
                            :items="prefect"
                            required
                            dense
                            hide-details="auto"
                            placeholder="都道府県"
                            :error-messages="errors"
                            class="input-short"
                          ></v-autocomplete>
                        </ValidationProvider>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="Address"
                          rules="required">
                          <v-text-field
                            v-model="rentJson.DeliveryAddress"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            placeholder="大阪市港区築港3-1-43 天保山シンユニティビル"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                          <!-- <v-text-field
                            v-model="rentJson.rentPlace"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            :error-messages="errors"
                          ></v-text-field> -->
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>

                <v-row class="border-bottom">
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
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
                            v-model="getRentRange"
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
                          @click="$refs.datePick.save(rentRange)"
                        >
                          確定
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                    ( {{rentJson.UseDay}}日間 )
                  </v-col>
                </v-row>

                <v-row class="border-bottom">
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
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
                    <!-- <v-divider class="mb-4"></v-divider> -->
                    <div v-if="rentJson.ReturnType===0">
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">返却日</v-col>
                        <v-col cols="12" md="9">
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
                                name="ReturnDate0"
                                rules="required">
                                <v-text-field
                                  v-model="ReturnDate"
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
                              v-model="ReturnDate"
                              no-title
                              scrollable
                              @input="datePick[2] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-divider class="my-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">返却時間</v-col>
                        <v-col cols="12" md="9">
                          <set-time @change-time="rentJson.ReturnTime = $event"></set-time>
                        </v-col>
                      </v-row>
                    </div>

                    <div v-else-if="rentJson.ReturnType===1">
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">貴社着日</v-col>
                        <v-col cols="12" md="9">
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
                                name="ReturnDate1"
                                rules="required">
                                <v-text-field
                                  v-model="ReturnDate"
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
                              v-model="ReturnDate"
                              no-title
                              scrollable
                              @input="datePick[2] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                    </div>

                    <div v-else>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">搬入日</v-col>
                        <v-col cols="12" md="9">
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
                                  v-model="ReturnDate"
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
                              v-model="ReturnDate"
                              no-title
                              scrollable
                              @input="datePick[2] = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-divider class="my-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">搬入時間</v-col>
                        <v-col cols="12" md="9">
                          <set-time @change-time="rentJson.ReturnTime = $event"></set-time>
                        </v-col>
                      </v-row>
                      <v-divider class="my-4"></v-divider>
                      <v-row>
                        <v-col cols="12" md="3" class="pb-0">場所{{address}}</v-col>
                        <v-col cols="12" md="9">
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="ReturnZipCode"
                          rules="required|num"
                          class="d-flex mb-1 ">
                          <v-text-field
                            v-model="rentJson.ReturnZipCode"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            placeholder="0123456"
                            prefix="〒"
                            :error-messages="errors"
                            class="input-short"
                            @blur="rentJson.ReturnZipCode=toNum($event.target.value)"
                          ></v-text-field>
                          <v-btn
                            color="primary"
                            class="ms-1"
                            :loading="loading"
                            @click="checkAddress('Return',rentJson.ReturnZipCode)">
                            検索
                          </v-btn>
                        </ValidationProvider>

                        <ValidationProvider
                          v-slot="{ errors }"
                          name="ReturnPrefect"
                          rules="required"
                          class="d-block mb-1">
                          <v-autocomplete
                            ref="country"
                            v-model="rentJson.ReturnPrefect"
                            outlined
                            :items="prefect"
                            required
                            dense
                            hide-details="auto"
                            placeholder="都道府県"
                            :error-messages="errors"
                            class="input-short"
                          ></v-autocomplete>
                        </ValidationProvider>
                        <ValidationProvider
                          v-slot="{ errors }"
                          name="ReturnAddress"
                          rules="required">
                          <v-text-field
                            v-model="rentJson.ReturnAddress"
                            outlined
                            required
                            dense
                            hide-details="auto"
                            placeholder="大阪市港区築港3-1-43 天保山シンユニティビル"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                        </v-col>
                      </v-row>
                    </div>

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
                :loading="orderLoading"
                :disabled="ObserverProps.invalid"
                @click="order()">注文する
              </v-btn>
            </div>
          </ValidationObserver>
        </v-card>

      </div>
    </div>


    <v-dialog v-model="deleteDialog"
      width="580">
      <v-card class="pa-5 text-center">
        <template v-if="!result">
          <p>選択した商品をカートから消去しますか？</p>
          <v-card-actions class="justify-center">
            <v-btn
              class="mt-4 mx-2"
              dark
              color="secondary"
              @click="deleteDialog=false">戻る
            </v-btn>
            <v-btn
              class="mt-4 mx-2"
              dark
              color="feature"
              :loading="deleteLoading"
              @click="deleteItem">消去
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <p v-if="result==='success'" class="text-left text-md-center">
            登録が完了いたしました。
          </p>
          <p v-else class="text-left text-md-center">
            処理が正常に行われませんでした。<br>
            しばらくしてもう一度お試しいただくか、お問い合わせ下さい。
          </p>
          <v-card-actions class="justify-center">
            <v-btn
              color="outline"
              class="mx-3 white--text"
              @click="deleteDialog=false">
              戻る
            </v-btn>
            <v-btn
              color="primary"
              class="mx-3 white--text"
              to="/myaccount">
              マイページ
            </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>

    <!-- <v-dialog v-model="doneDialog" width="600" persistent>
      <v-card class="text-center pa-5">

        <template v-if="registerErr" class="err mb-5 red--text">
          <p v-if="registerErr==='120107'||registerErr==='120108'">。
          </p>
          <p v-else>
            処理が正常に行われませんでした。<br>
            しばらくしてもう一度お試しいただくか、お問い合わせ下さい。
          </p>
          <v-card-actions class="justify-center">
            <v-btn
              color="outline"
              class="mx-3 white--text"
              @click="doneDialog=false">
              戻る
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          <p class="mb-4 text-left text-md-center">
            登録が完了いたしました。
          </p>
          <v-card-actions class="justify-center">
            <v-btn
              color="outline"
              class="mx-3 white--text"
              to="/myaccount">
              マイページ
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
      msg: null,
      cartInfo: null,
      headers: [
        { text: '商品名', value: 'ProductName', sortable: false,align: 'center' },
        { text: '価格(円)', value: 'Price', sortable: false },
        { text: '数量', value: 'Qty', sortable: false, width: '140px' },
        // { text: '', value: 'delete', sortable: false, width: '80px' },
      ],
      estDialog: false,
      deleteDialog: false,
      deleteProductID: null,
      deleteIndex: null,
      deleteLoading: false,
      rentJson: {},
      estJson: {},
      prefect: [
        '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県','その他'
      ],
      address: null,
      loading: false,
      datePick: [ false,false,false,false,],
      DeliveryDate: null,
      ReturnDate: null,
      rentRange: [],
      userInfo: null,
      doneDialog: false,
      registerErr: null,
      orderLoading: false,
      result: false

    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    await this.getCartInfo()
    await this.inputUserInfo()
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
  computed:{
    getRentRange(){
      if( this.rentRange.length === 2 ){
        const StartDate = this.rentRange[0].replace(/-/g,'')
        const EndDate = this.rentRange[1].replace(/-/g,'')
        this.$set(this.rentJson, 'UseStartDate', StartDate)
        this.$set(this.rentJson, 'UseEndDate', EndDate)
        const dateDiff = this.toDate(this.rentRange[1]).getTime() - this.toDate(this.rentRange[0]).getTime()
        const days = Math.ceil(dateDiff / (1000 * 3600 * 24)) + 1
        this.$set(this.rentJson, 'UseDay', days)
      }
      return this.rentRange.join(' ~ ')
    },
    rentRangeMin(){
      return this.rentRange[0]
    },
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
      const cartItem = this.$store.getters["cart/getCart"]
      const obj = {
        "UseDay": 1,
        "ProductListCnt": cartItem.length,
        "ProductList": cartItem
      }
      if(cartItem.length===0){
        this.msg = "カートは空です。"
        return false
      }

      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('JsonData', JSON.stringify(obj) )
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
        return true
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        this.getCartInfo()
      }
    },
    async inputUserInfo(){
      const res = await this.$getUserInfo()
      this.$set(this.estJson, 'OwnerName', res.MemberName)
      this.$set(this.estJson, 'OwnerEmail', res.Email)
      this.$set(this.estJson, 'OwnerTel', res.Tel)
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
      this.deleteDialog = true
      this.deleteIndex = row
      this.deleteProductID = ProductID
    },
    deleteItem(){
      this.deleteLoading = true

      this.$store.commit('cart/deleteItem', String(this.deleteProductID))
      this.cartInfo.ProductList.splice( this.deleteIndex, 1 )
      this.deleteDialog = false
      this.deleteLoading = false

    },
    changeQuantity(ProductID, qty){
      ProductID = String(ProductID)
      this.$store.commit('cart/changeQuantity', { ProductID, qty })
    },
    async checkAddress(target, zipCode){
      this.loading = true
      const url = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode='
      const res = await this.$axios.get(url + zipCode)
      this.address = this.address !== '' ? '' : null
      if (res.data.status !== 200 || !res.data.results) {
      this.$set(this.rentJson, `${target}Prefect`, '')
      this.$set(this.rentJson, `${target}Address`, '')
        this.loading = false
        return
      }
      this.$set(this.rentJson, `${target}Prefect`, res.data.results[0].address1)
      this.$set(this.rentJson, `${target}Address`, res.data.results[0].address2+res.data.results[0].address3)
      this.loading = false
    },
    toNum(e){
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|－|ー/g,'')
    },
    async order(){
      this.orderLoading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const cartItem = this.$store.getters["cart/getCart"]
      this.$set(this.rentJson, "DeliveryDate", this.DeliveryDate.replace(/-/g,''))
      this.$set(this.rentJson, "ReturnDate", this.ReturnDate.replace(/-/g,''))
      this.$set(this.rentJson, "ProductListCnt", cartItem.length)
      this.$set(this.rentJson, "ProductList", cartItem)

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
      if(res.data.Status === 'TRUE'){
        this.registerErr = null
        this.orderLoading = false
        this.result = 'success'
        // this.doneDialog = true
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        this.order()
      }else{
        this.orderLoading = false
        this.result = res.data.ErrorNo
        // this.doneDialog = true
        // this.registerErr = res.data.ErrorNo
      }
    },
    toDate (str) {
      return new Date(str.split('-')[0], str.split('-')[1] - 1, str.split('-')[2]);
    },
    async downloadEst(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const cartItem = this.$store.getters["cart/getCart"]

      const now = new Date()
      const nowFormat = now.getFullYear() + String(now.getMonth()+1) + now.getDate()
      this.$set(this.estJson, "PrintDate", nowFormat)
      this.$set(this.estJson, "UseStartDate", this.rentJson.UseStartDate)
      this.$set(this.estJson, "UseEndDate", this.rentJson.UseEndDate)
      this.$set(this.estJson, "UseDay", this.rentJson.UseDay)
      this.$set(this.estJson, "ProductListCnt", cartItem.length)
      this.$set(this.estJson, "ProductList", cartItem)
      console.log(JSON.stringify(this.estJson))

      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('JsonData', JSON.stringify(this.estJson) )
      const res = await this.$memberBaseAxios.post(`order/printRentalQuotation`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.$set(this.rentalJson, "QuotationID", res.QuotationID)
        this.$set(this.rentalJson, "QuotationNo", res.QuotationNo)
        this.$set(this.rentalJson, "DocumentNo", res.DocumentNo)
        this.$set(this.rentalJson, "QuotationURL", res.QuotationURL)
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        this.downloadEst()
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
}
.cart {
  .info__img{
    width: 140px;
    max-height: 120px;
    object-fit: contain;
    height: 60px;
  }
  ::v-deep .v-data-table-header{
    background-color: #f2f2f2;
  }
  ::v-deep td{
    border: 1px solid #f2f2f2;
  }
}
.border-bottom{
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
.input-short{
  max-width: 225px;
}
</style>