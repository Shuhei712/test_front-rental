<template>
  <div class="popup text-center">
    <v-dialog
      v-model="orderDialog"
      width="900" scrollable
      persistent>
      <ValidationObserver v-slot="ObserverProps" ref="observer">
        <v-card class="pa-5">
          <v-card-title>注文内容</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                  見積番号
                </v-col>
                <v-col cols="12" md="9">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="no"
                    rules="required|max:50">
                    <v-text-field
                      v-model="json.OrderReqQuotationNo"
                      outlined
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                  <p>注文する回答見積書の見積番号を記載下さい。</p>
                </v-col>
              </v-row>

              <v-row class="border-bottom">
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2 body-2">必須</span> お支払い方法
                </v-col>
                <v-col cols="12" md="9">
                  <v-radio-group v-model.number="json.PayMethod"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0 mb-4">
                    <v-radio label="事前お振込"
                      :value="0"
                    ></v-radio>
                    <!-- <v-radio v-if="userType"
                      label="店頭お支払い(現金)"
                      :disabled="deliveryType!==0"
                      :value="1"
                    ></v-radio> -->
                  </v-radio-group>
                  <!-- <p v-if="userType" class="caption note">来社お引取りの方のみ店頭お支払いが可能です。</p> -->
                  <v-card color="cushion" elevation="0">
                    <v-card-text>
                      <dl class="d-flex flex-column flex-md-row align-start">
                        <dt class="font-weight-bold colon">事前お振込</dt>
                        <dd class="ps-md-4">お引き取り予定３営業日前までにお振り込み</dd>
                      </dl>
                      <!-- <dl v-if="userType" class="d-flex flex-column flex-md-row align-start pt-1">
                        <dt class="font-weight-bold colon">店頭お支払い</dt>
                        <dd class="ps-md-4">お引き取り時に現金でご精算</dd>
                      </dl> -->

                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row class="border-bottom">
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2 body-2">必須</span> 請求書
                </v-col>
                <v-col cols="12" md="9">
                  <v-radio-group v-model.number="json.InvoiceFlg"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0 mb-4">
                    <v-radio label="不要"
                      :value="0"
                    ></v-radio>
                    <v-radio label="必要"
                      :value="1"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <v-row v-if="json.InvoiceFlg">
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text secondary px-2 py-1 rounded body-2">任意</span>
                  請求書記載 注文番号
                </v-col>
                <v-col cols="12" md="9">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="invoiceNo"
                    rules="max:50">
                    <v-text-field
                      v-model="json.InvoiceOrderNo"
                      dense
                      outlined
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              class="mx-2"
              dark
              color="secondary"
              @click="orderDialog=false">戻る
            </v-btn>
            <v-btn
              class="mx-2"
              color="primary"
              :loading="loading"
              :disabled="ObserverProps.invalid"
              @click="order">注文確定
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
    <v-dialog v-model="resultDialog"
      width="580"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'注文依頼'"
          :path="'stay'"
          :dialog.sync="resultDialog">
        </result-card>
      </v-card>
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
    payMethod: {
      type: Number,
      required: true
    },
    deliveryType: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      loading: false,
      result: null,
      json: {},
      resultDialog: false,
      userType: null
    }
  },
  async fetch() {
    const res = await this.$getUserInfo()
    if(res) this.userType = res.MemberType
  },
  computed:{
    orderDialog:{
      get(){
        return this.dialog
      },
      set(val){
        this.$emit('update:dialog', val)
      }
    },
  },
  mounted(){
    this.$set(this.json, "PayMethod", this.payMethod)

  },
  methods:{
    async order(){
      this.result = null
      this.loading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]

      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('JsonData', JSON.stringify(this.json) )
      const res = await this.$memberBaseAxios.put(`order/requestOrder/${this.$route.params.id}`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('注文履歴', 'レンタル注文依頼登録処理', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.$emit('update-data')
        this.result = 'success'
        this.resultDialog = true
        this.orderDialog = false
        this.loading = false
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.order()
      }else{
        this.result = String(res.data.ErrorNo)
        this.resultDialog = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.colon{
  @include wordSymbol('：', false, -0.8rem)
}
.note{
  padding-left: 1.4rem;
  @include wordSymbol('※')
}
</style>
