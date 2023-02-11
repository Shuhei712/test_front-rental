<template>
  <div class="popup text-center">
    <v-dialog
      v-model="estDialog"
      width="800" scrollable>
      <ValidationObserver v-slot="ObserverProps" ref="observer">
        <v-card class="pa-5">
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                  担当者名
                </v-col>
                <v-col cols="12" md="9">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="name"
                    rules="required">
                    <v-text-field
                      v-model="estJson.OwnerName"
                      outlined
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text secondary px-2 py-1 rounded">任意</span>
                  会社名
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                  v-model="estJson.Organization"
                  dense
                  outlined
                  hide-details="auto"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                  件名
                </v-col>
                <v-col cols="12" md="9">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="title"
                    rules="required">
                    <v-text-field
                      v-model="estJson.QuotationTitle"
                      outlined
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                  ご使用期間
                </v-col>
                <v-col cols="12" md="9">
                  <v-menu
                    ref="datePick"
                    v-model="datePickFlg"
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
                          :value="concatRentRange"
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
                      :min="rentRangeMin">
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="rentRange=[]">リセット
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="setRange">確定
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  ( {{rentJson.UseDay}}日間 )
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3" class="pb-0">
                  <span class="white--text secondary px-2 py-1 rounded">任意</span>
                  ご使用場所
                </v-col>
                <v-col cols="12" md="9">
                  <v-text-field
                    v-model="estJson.UsePlase"
                    dense
                    outlined
                    hide-details="auto">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <p v-if="result && result!=='success'" class="red--text text-center mt-6">処理に失敗いたしました。</p>
          <v-card-actions class="justify-center">
            <v-btn
              class="mx-2"
              dark
              color="secondary"
              @click="estDialog=false">戻る
            </v-btn>
            <v-btn
              class="mx-2"
              color="primary"
              :loading="loading"
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
    concatRentRange: {
      type: String,
      required: false,
      default: null
    },
    rentRangeMin: {
      type: String,
      required: false,
      default: ""
    },
  },
  data(){
    return {
      datePickFlg: false,
      loading: false,
      result: null
    }
  },
  computed:{
    estDialog:{
      get(){
        return this.dialog
      },
      set(val){
        this.$emit('update:dialog', val)
      }
    },
    rentJson: {
      get(){
        return this.rentObj
      },
      set(obj){
        this.$emit('update:rent-obj', obj)
      }
    },
    estJson: {
      get(){
        return this.estObj
      },
      set(obj){
        this.$emit('update:est-obj', obj)
      }
    },
    rentRange: {
      get(){
        return this.setRentRange
      },
      set(val){
        this.$emit('update:set-rent-range', val)
      }
    },
  },
  methods:{
    async downloadEst(){
      this.result = null
      this.loading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]

      const now = new Date()
      const nowDate = String(now.getDate()).padStart(2, '0')
      const nowMonth = String(now.getMonth()+1).padStart(2, '0')
      const nowFormat = now.getFullYear() + nowMonth + nowDate
      this.$set(this.estJson, "DeliveryDate", "")
      this.$set(this.estJson, "ReturnDate", "")
      this.$set(this.estJson, "PrintDate", nowFormat)
      this.$set(this.estJson, "UseStartDate", this.rentJson.UseStartDate)
      this.$set(this.estJson, "UseEndDate", this.rentJson.UseEndDate)
      this.$set(this.estJson, "UseDay", this.rentJson.UseDay)

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
      this.$setLog('会員見積もり', 'DL', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.$set(this.rentJson, "QuotationID", res.data.QuotationID)
        this.$set(this.rentJson, "QuotationNo", res.data.QuotationNo)
        this.$set(this.rentJson, "DocumentNo", res.data.DocumentNo)
        this.$set(this.rentJson, "QuotationURL", res.data.QuotationURL)
        const a = document.createElement("a");
        a.href = res.data.QuotationURL;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.estDialog = false
        this.loading = false
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.downloadEst()
      }else{
        this.result = res.data.ErrorNo
        this.loading = false
      }
    },
    setRange(){
      this.$refs.datePick.save(this.rentRange)
      this.$emit('setRange')
    }
  }
}
</script>