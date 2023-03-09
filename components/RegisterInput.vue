<template>
  <div>
    <top-bar title="新規登録 入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form ref="form">
            <v-container>
              <p v-if="result==='120107'||result==='120108'" class="red--text mb-5">
                ご記入のメールアドレスは既に使用されています。
              </p>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 会員タイプ</v-col>
                <v-col cols="12" md="8">
                  <v-radio-group v-model="syncedUser.MemberType"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="個人"
                      :value="0"
                    ></v-radio>
                    <v-radio
                      label="法人"
                      :value="1"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <div v-if="syncedUser.MemberType===0">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 所属先
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Organization"
                      outlined
                      dense
                      hide-details="auto"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div v-else>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="company"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 会社名
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.Organization"
                        outlined
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
                    <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 代表者名</v-col>
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
                    <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 事業内容</v-col>
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
                    <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 弊社担当者名</v-col>
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
                    <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お振込名義</v-col>
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
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 電子請求書受信メールアドレス</v-col>
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
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 氏名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.MemberName"
                      outlined
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="nameKana"
                rules="max:50">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 氏名(カナ)</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.MemberKana"
                      outlined
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
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 電話番号
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Tel"
                      outlined
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
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Email"
                      outlined
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 住所</v-col>
                <v-col cols="12" md="8">
                  <set-address
                    :set-zip-code.sync="syncedUser.ZipCode"
                    :set-prefect.sync="syncedUser.Prefect"
                    :set-address.sync="syncedUser.Address">
                  </set-address>
                </v-col>
              </v-row>

              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:8|max:24|pass"
                name="password">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                    パスワード
                    <span class="caption d-block">(半角英数字8文字以上24文字以下)</span>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedPass"
                      outlined
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
                <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> メールマガジン</v-col>
                <v-col cols="12" md="8">
                  <v-radio-group v-model="syncedUser.DMFlg"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="受け取る"
                      :value="0"
                    ></v-radio>
                    <v-radio
                      label="受け取らない"
                      :value="1"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>

              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">
                  <span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 本人確認
                  <span class="caption d-block">（後から登録できます）</span>
                </v-col>
                <v-col cols="12" md="8">
                  <v-radio-group v-model="syncedUser.NecDocFlg"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="登録する"
                      :value="1"
                    ></v-radio>
                    <v-radio
                      label="登録しない"
                      :value="0"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col v-if="syncedUser.NecDocFlg" cols="12" class="mt-4">
                  <v-card outlined class="pa-4">
                    <id-card :user.sync="syncedUser" :file.sync="syncedFile"></id-card>
                  </v-card>
                </v-col>

            </v-row>
              <!-- {{ObserverProps}} -->
              <div class="text-center mt-6">
                <!-- <v-btn large
                  class="my-4 mx-2"
                  color="secondary"
                  @click="reset()"
                >リセット</v-btn> -->
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
    result:{
      type: String,
      required: true
    },
    file:{
      type: Array,
      // required: true
      required: false,
      default: () => ([])
    }
  },

  data() {
    return {
      breadCrumbs: [],
      show: false,
      // idFlg: 0,
      loading: false,
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
    syncedFile: {
      get(){
        return this.file
      },
      set(val){
        this.$emit('update:file', val)
      }
    }
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '新規登録 入力', path: '/register' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    confirm(){
      this.$emit('update:result', '')
      this.$router.push('/register#confirm')
    },
    // reset() {
    //   this.$refs.form.reset()
    //   this.$refs.observer.reset()
    // },
    toNum(e){
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|ー|－/g,'')
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
.width-s{
  max-width: 225px;
}
</style>