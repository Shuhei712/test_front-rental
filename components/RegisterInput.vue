<template>
  <div>
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form ref="form">
            <v-container>
              <p v-if="result==='120107'||result==='120108'||result==='120201'" class="red--text mb-5">
                ご記入のメールアドレスは既に使用されています。
              </p>
              <v-row v-if="memberId" class="my-1">
                <v-col cols="12" md="4" class="pb-0">会員番号</v-col>
                <v-col cols="12" md="8">{{ memberId }}</v-col>
              </v-row>
              <v-row v-if="loginId" class="my-1">
                <v-col cols="12" md="4" class="pb-0">ログインID</v-col>
                <v-col cols="12" md="8">{{ loginId }}</v-col>
              </v-row>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">会員タイプ</v-col>
                <v-col cols="12" md="8">
                  <template v-if="syncedUser.MemberType===0">
                    一般 Web会員登録
                  </template>
                  <template v-else>
                    法人 Web会員登録
                  </template>
                </v-col>
              </v-row>
              <div v-if="syncedUser.MemberType===0">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="organization"
                  rules="max:150">
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
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider>
              </div>
              <div v-else>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="company"
                  rules="required|max:150">
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

                <ValidationProvider
                  v-slot="{ errors }"
                  name="companyKana"
                  rules="kana|max:150">
                  <v-row class="my-1">
                    <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 会社名(フリガナ)</v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.OrganizationKana"
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
                  name="department"
                  rules="required|max:150">
                  <v-row class="my-1">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 所属部署
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.Department"
                        outlined
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider>

              </div>

              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required|max:100">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お名前</v-col>
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
                rules="kana|max:100">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> お名前(フリガナ)</v-col>
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

              <template v-if="syncedUser.MemberType===1">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="companyOffice"
                  rules="max:150">
                  <v-row class="my-1">
                    <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 勤務先事業所名</v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.OfficeName"
                        outlined
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider>
              </template>

              <ValidationProvider
                v-slot="{ errors }"
                name="tel"
                rules="required|num">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0">
                    <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                  <template v-if="syncedUser.MemberType===1">勤務先</template>電話番号
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
              <template v-if="syncedUser.MemberType===1">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="fax"
                  rules="num">
                  <v-row class="my-1">
                    <v-col cols="12" md="4" class="pb-0">
                      <span class="white--text secondary px-2 py-1 rounded body-2">任意</span>
                      <template v-if="syncedUser.MemberType===1">勤務先</template>FAX番号
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="syncedUser.Fax"
                        outlined
                        dense
                        hide-details="auto"
                        placeholder="0123456789"
                        :error-messages="errors"
                        @blur="syncedUser.Fax=toNum($event.target.value)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider>
              </template>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                  <template v-if="syncedUser.MemberType===1">勤務先</template>住所
                </v-col>
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
                name="email"
                rules="required|email|max:50">
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

              <ValidationProvider
                v-slot="{ errors }"
                name="staff"
                rules="max:100">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 弊社担当者名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.SalesStaff"
                      outlined
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <ValidationProvider
                v-if="!loginId"
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

              <v-row v-if="!loginId" class="my-1">
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
              <div v-if="!loginId" class="text-center mt-6">
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
</template>
<script>


export default {
  props: {
    pass:{
      type: String,
      required: false,
      default: null
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
      required: false,
      default: () => ([])
    },
    loginId:{
      type: String,
      required: false,
      default: null
    },
    memberId:{
      type: Number,
      required: false,
      default: null
    }
  },

  data() {
    return {
      show: false,
      loading: false,
    }
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
.row:not(.last-row){
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.2rem;
}
.width-s{
  max-width: 225px;
}
</style>
