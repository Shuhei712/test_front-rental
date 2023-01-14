<template>
  <div class="popup text-center">
    <v-dialog
      v-model="estDialog"
      width="800" scrollable>
      <ValidationObserver v-slot="ObserverProps" ref="observer">
        <v-card class="pa-5">
          <v-card-title class="justify-center">
            <h3>宛先情報</h3>
          </v-card-title>
          <v-card-text>
            <v-divider class="mb-8"></v-divider>
            <v-form>
              <v-row>
                <v-col cols="12" md="3"><span class="white--text secondary px-2 py-1 rounded">任意</span>
                  ご担当者様</v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                  v-model="estJson.OwnerName"
                  dense
                  outlined
                  hide-details="auto"
                  required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3"><span class="white--text secondary px-2 py-1 rounded">任意</span>
                  電話番号</v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                  v-model="estJson.OwnerTel"
                  dense
                  outlined
                  hide-details="auto"
                  required></v-text-field>
                </v-col>
              </v-row>
              <ValidationProvider
                v-slot="{ errors }"
                name="title"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="3"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    件名
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-text-field
                      v-model="estJson.QuotationTitle"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email">
                <v-row class="my-1">
                  <v-col cols="12" md="3"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="12" md="9">
                    <v-text-field
                      v-model="estJson.OwnerEmail"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <v-row>
                <v-col cols="12" md="3">
                  <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                  ご使用期間
                </v-col>
                <v-col cols="12" md="9">

                  <v-menu
                    ref="datePick2"
                    v-model="datePick"
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
                      locale="jp-ja"
                      :day-format="(date) => new Date(date).getDate()"
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
                        @click="$refs.datePick2.save(rentRange)"
                      >
                        作成
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  ( {{rentJson.UseDay}}日間 )
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3"><span class="white--text secondary px-2 py-1 rounded">任意</span>
                  ご使用場所</v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                  v-model="estJson.UsePlase"
                  dense
                  outlined
                  hide-details="auto"
                  required></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn
              class="mt-4 mx-2"
              dark
              color="secondary"
              @click="estDialog=false">戻る
            </v-btn>
            <v-btn
              class="mt-4 mx-2"
              color="primary"
              :disabled="ObserverProps.invalid"
              @click="downloadEst">ダウンロード
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
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
    rentObj: {
      type: Object,
      required: true
    },
    estObj: {
      type: Object,
      required: true
    },
    setRentRange: {
      type: Array,
      required: true,
    },
    setFormatRange: {
      type: String,
      required: true,
    },
    setRentRangeMin: {
      type: String,
      required: false,
      default: ""
    },

  },
  data(){
    return {
      datePick: false
    }
  },
  computed:{
    estDialog:{
      get(){
        return this.$props.dialog
      },
      set(value){
        this.$emit('change-est-dialog', value)
      }
    },
    rentJson: {
      get(){
        return this.$props.rentObj
      },
      set(obj){
        this.$emit('change-rent-json', obj)
      }
    },
    estJson: {
      get(){
        return this.$props.estObj
      },
      set(obj){
        this.$emit('change-est-json', obj)
      }
    },
    rentRange: {
      get(){
        return this.$props.setRentRange
      },
      set(value){
        this.$emit('change-rent-range', value)
      }
    },
    getRentRange: {
      get(){
        return this.$props.setFormatRange
      },
      set(value){
        this.$emit('change-get-rent-range', value)
      }
    },
    rentRangeMin: {
      get(){
        return this.$props.setRentRangeMin
      },
      set(value){
        this.$emit('change-rent-range-min', value)
      }
    },
  },
  methods:{

    async downloadEst(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const cartItem = this.$store.getters["cart/getCart"]

      const now = new Date()
      const nowFormat = now.getFullYear() + String(now.getMonth()+1) + now.getDate()

      this.$set(this.estJson, "DeliveryDate", "")
      this.$set(this.estJson, "ReturnDate", "")
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
        this.$set(this.rentJson, "QuotationID", res.data.QuotationID)
        this.$set(this.rentJson, "QuotationNo", res.data.QuotationNo)
        this.$set(this.rentJson, "DocumentNo", res.data.DocumentNo)
        this.$set(this.rentJson, "QuotationURL", res.data.QuotationURL)
        const a = document.createElement("a");
        a.href = res.data.QuotationURL;
        a.download = "TAKENAKAお見積もり.pdf";
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.estDialog = false
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        this.downloadEst()
      }
    }
  }
}
</script>