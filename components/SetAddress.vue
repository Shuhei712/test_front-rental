<template>
  <div>
    <ValidationProvider
      v-slot="{ errors }"
      name="ZipCode"
      rules="required|num"
      class="d-flex mb-1 ">
      <v-text-field
        v-model="zipCode"
        outlined
        required
        dense
        hide-details="auto"
        placeholder="0123456"
        prefix="〒"
        :error-messages="errors"
        class="width-s"
        @blur="zipCode=toNum($event.target.value)"
      ></v-text-field>
      <v-btn
        color="primary"
        class="ms-1"
        :loading="loading"
        @click="checkAddress(zipCode)">
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
        v-model="prefect"
        outlined
        :items="prefectArr"
        required
        dense
        hide-details="auto"
        placeholder="都道府県"
        :error-messages="errors"
        class="width-s"
      ></v-autocomplete>
    </ValidationProvider>
    <ValidationProvider
      v-slot="{ errors }"
      name="Address"
      rules="required">
      <v-text-field
        v-model="address"
        outlined
        required
        dense
        hide-details="auto"
        placeholder="大阪市港区築港3-1-43 天保山シンユニティビル"
        :error-messages="errors"
      ></v-text-field>
    </ValidationProvider>
  </div>

</template>
<script>
export default {
  props: {
    setZipCode:{
      type: String,
      required: false,
      default: null
    },
    setPrefect:{
      type: String,
      required: false,
      default: null
    },
    setAddress:{
      type: String,
      required: false,
      default: null
    }
  },
  data(){
    return{
      loading: false,
      prefectArr: [
        '北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県','その他'
      ],
    }
  },
  computed:{
    zipCode: {
      get(){
        return this.setZipCode
      },
      set(val){
        this.$emit('update:set-zip-code', val)
      }
    },
    prefect: {
      get(){
        return this.setPrefect
      },
      set(val){
        this.$emit('update:set-prefect', val)
      }
    },
    address: {
      get(){
        return this.setAddress
      },
      set(val){
        this.$emit('update:set-address', val)
      }
    }
  },
  methods:{
    toNum(e){
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|－|ー/g,'')
    },
    async checkAddress(zipCode){
      this.loading = true
      const url = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode='
      await this.$axios.get(url + zipCode).then(res => {
        if (res.data.status !== 200 || !res.data.results) {
          this.prefect = ''
          this.address = ''
          this.loading = false
          return
        }
        this.prefect = res.data.results[0].address1
        this.address = res.data.results[0].address2+res.data.results[0].address3
      }).catch(() => {
        // console.log(err)
        return false
      })

      this.loading = false
    },

  }
}
</script>
<style lang="scss" scoped>

.width-s{
  max-width: 225px;
}
</style>
