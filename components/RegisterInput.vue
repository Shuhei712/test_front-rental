<template>
  <div>
    <top-bar title="入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form
            ref="form">
            <v-container>
              <div v-if="registerErr" class="err mb-5 red--text">
                <p v-if="registerErr==='120107'||registerErr==='120108'">
                  ご記入のメールアドレスで既に登録されております。
                </p>
                <p v-else>
                  処理が正常に行われませんでした。<br>しばらくして、もう一度お試しいただくか、お問い合わせ下さい。
                </p>
              </div>
              <v-row class="my-1">
                <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 会員タイプ</v-col>
                <v-col cols="12" md="8">
                  <v-radio-group v-model="syncedUser.MemberType"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="個人"
                      :value="'0'"
                    ></v-radio>
                    <v-radio
                      label="法人"
                      :value="'1'"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <div v-if="syncedUser.MemberType==='0'">

              </div>
              <div v-else>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="company"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 会社名</v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.Organization"
                        outlined
                        required
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider>

                <!-- <ValidationProvider
                  v-slot="{ errors }"
                  name="representative"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4"><span class="white--text secondary px-2 py-1 rounded">任意</span> 代表者名</v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.Representative"
                        outlined
                        required
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider> -->

                <!-- <ValidationProvider
                  v-slot="{ errors }"
                  name="business"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 事業内容</v-col>
                    <v-col class="d-flex">
                      <v-checkbox
                        v-model="syncedUser.Business"
                        label="John"
                        value="John"
                        hide-details="auto"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="syncedUser.Business"
                        label="Jacob"
                        value="Jacob"
                      ></v-checkbox>
                    </v-col>
                    {{errors}}
                  </v-row>
                </ValidationProvider> -->

                <!-- <ValidationProvider
                  v-slot="{ errors }"
                  name="salesStaff"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 弊社担当者名</v-col>
                    <v-col cols="12" md="8">
                      <p>※担当者がわからない場合は不明と記載ください。</p>
                      <v-text-field
                        v-model="syncedUser.SalesStaff"
                        outlined
                        required
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider> -->

                <!-- <ValidationProvider
                  v-slot="{ errors }"
                  name="payment"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> お振込名義</v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.PayeeName"
                        outlined
                        required
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider> -->

                <!-- <v-row class="my-1">
                  <v-col cols="12" md="4"><span class="white--text secondary px-2 py-1 rounded">任意</span> 電子請求書受信メールアドレス</v-col>
                  <v-col cols="12" md="8">
                    <v-radio-group
                      v-model="syncedUser.BillingEmailFlg"
                      hide-details="auto"
                      mandatory
                      row
                      class="mt-0 mb-3">
                      <v-radio
                        label="あり"
                        :value="'1'"
                      ></v-radio>
                      <v-radio
                        label="なし"
                        :value="'0'"
                      ></v-radio>
                    </v-radio-group>
                    <div v-if="syncedUser.BillingEmailFlg==='1'">

                      <ValidationProvider
                        v-slot="{ errors }"
                        name="email2"
                        rules="email">
                        <p>受信メールアドレスをご記入ください。(複数可)</p>
                        <v-text-field
                          v-model="syncedUser.Email1"
                          outlined
                          required
                          dense
                          hide-details="auto"
                          :error-messages="errors"
                        ></v-text-field>
                        <v-text-field
                          v-model="syncedUser.Email2"
                          outlined
                          required
                          dense
                          hide-details="auto"
                          :error-messages="errors"
                        ></v-text-field>
                        <v-text-field
                          v-model="syncedUser.Email3"
                          outlined
                          required
                          dense
                          hide-details="auto"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </div>
                  </v-col>
                </v-row> -->
              </div>

              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 氏名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.MemberName"
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
                name="tel"
                rules="required|num">
                <v-row class="my-1">
                  <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 連絡先</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Tel"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      placeholder="0123456789"
                      :error-messages="errors"
                      @blur="syncedUser.Tel=toNum($event.target.value)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email">
                <v-row class="my-1">
                  <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Email"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <v-row class="my-1">
                <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 住所
                  {{address}}</v-col>
                <v-col cols="12" md="8">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="zipCode"
                    rules="required|num"
                    class="d-flex mb-1 ">
                    <v-text-field
                      v-model="syncedUser.ZipCode"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      placeholder="0123456"
                      prefix="〒"
                      :error-messages="errors"
                      class="input-short"
                      @blur="syncedUser.ZipCode=toNum($event.target.value)"
                    ></v-text-field>
                    <v-btn
                      color="primary"
                      class="ms-1"
                      :loading="loading"
                      @click="checkAddress">
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
                      v-model="syncedUser.Prefect"
                      outlined
                      :items="prefect"
                      required
                      dense
                      hide-details="auto"
                      placeholder="都道府県"
                      :error-messages="errors"
                      class="input-short"
                    ></v-autocomplete>
                    <!-- <v-text-field
                      v-model="syncedUser.Prefect"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field> -->
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Address"
                    rules="required">
                    <v-text-field
                      v-model="syncedUser.Address"
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

              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:8|max:24|pass"
                name="password">
                <v-row class="my-1">
                  <v-col cols="12" md="4">
                    <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    パスワード
                    <span class="caption d-block">(半角英数字8文字以上24文字以下)</span>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedPass"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                      :append-icon="show ? 'mdi-eye':'mdi-eye-off'"
                      :type="show ? 'text':'password'"
                      @click:append="show=!show"
                    ></v-text-field>

                  </v-col>
                </v-row>
              </ValidationProvider>

              <v-row class="my-1">
                <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> メールマガジン</v-col>
                <v-col cols="12" md="8">
                  <v-radio-group v-model="syncedUser.DMFlg"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="受け取る"
                      :value="'0'"
                    ></v-radio>
                    <v-radio
                      label="受け取らない"
                      :value="'1'"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <!-- {{ObserverProps}} -->
              <div class="text-center mt-6">
                <v-btn large
                  class="my-4 mx-2"
                  color="secondary"
                  @click="reset()"
                >リセット</v-btn>
                <v-btn large
                  :disabled="ObserverProps.invalid"
                  class="my-4 mx-2 white--text"
                  color="primary"
                  @click="confirm()"
                >確認</v-btn>
              </div>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-card>
    </div>
  </div>
</template>
<script>


export default {
  props: {
    pass:{
      type: String,
      required: true
    },
    user:{
      type: Object,
      required: true
    },
    registerErr:{
      type: String,
      required: true
    },
  },

  data() {
    return {
      breadCrumbs: [],
      show: false,
      prefect: ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県','その他'],
      address: null,
      loading:false
    }
  },

  fetch() {
    this.setBreadCrumbs()
  },
  computed: {
    syncedPass: {
      get(){
        return this.pass
      },
      set(val){
        this.$emit('update:pass', val)
      }
    },
    syncedUser: {
      get(){
        return this.user
      },
      set(val){
        this.$emit('update:user', val)
      }
    },
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '新規登録', path: '/register' })
      this.$store.commit('breadCrumbs/addList', { name: '入力', path: '/register#input' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    confirm(){
      this.$emit('update:registerErr', '')
      this.$router.push('/register#confirm')
    },

    reset() {
      this.$refs.form.reset()
      this.$refs.observer.reset()
    },
    async checkAddress(){
      this.loading = true
      const url = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode='
      const res = await this.$axios.get(url + this.syncedUser.ZipCode)
      this.address = this.address !== '' ? '' : null
      if (res.data.status !== 200 || !res.data.results) {
        this.syncedUser.Prefect = ''
        this.syncedUser.Address = ''
        this.loading = false
        return
      }
      this.syncedUser.Prefect = res.data.results[0].address1
      this.syncedUser.Address = res.data.results[0].address2+res.data.results[0].address3
      this.loading = false
    },
    toNum(e){
      console.log(e.replace(/-/g,''))
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|ー/g,'')
    }
  }
}
</script>
<style lang="scss" scoped>
.register{
  &__inner{
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }
}
.row{
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.2rem;
}
.input-short{
  max-width: 225px;
}
</style>