<template>
  <div>
      <v-card
        outlined
        class="py-6 confirm">
        <v-container>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">会員タイプ</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">
                <template v-if="syncedUser.MemberType===0">
                  一般WEB会員
                </template>
                <template v-else>
                  法人WEB会員
                </template>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">
              <template v-if="syncedUser.MemberType===0">所属先</template>
              <template v-else>会社名</template>
            </v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{ syncedUser.Organization }}</v-card>
            </v-col>
          </v-row>
          <template v-if="syncedUser.MemberType===1">
            <v-row>
              <v-col cols="12" md="4" class="pb-0">会社名(フリガナ)</v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.OrganizationKana}}</v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" class="pb-0">所属部署</v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.Department}}</v-card>
              </v-col>
            </v-row>
          </template>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">お名前</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.MemberName}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">お名前(フリガナ)</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.MemberKana}}</v-card>
            </v-col>
          </v-row>
          <template v-if="syncedUser.MemberType===1">
            <v-row>
              <v-col cols="12" md="4" class="pb-0">勤務先事業所名</v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.OfficeName}}</v-card>
              </v-col>
            </v-row>
          </template>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">
              <template v-if="syncedUser.MemberType===1">勤務先</template>電話番号
            </v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.Tel}}</v-card>
            </v-col>
          </v-row>
          <template v-if="syncedUser.MemberType===1">
            <v-row>
              <v-col cols="12" md="4" class="pb-0">
                <template v-if="syncedUser.MemberType===1">勤務先</template>FAX番号
              </v-col>
              <v-col cols="12" md="8" class="pt-0 pt-md-3">
                <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.Fax}}</v-card>
              </v-col>
            </v-row>
          </template>

          <v-row>
            <v-col cols="12" md="4" class="pb-0">
              <template v-if="syncedUser.MemberType===1">勤務先</template>住所
            </v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border width-s mb-1">〒{{syncedUser.ZipCode}}</v-card>
              <v-card elevation="0" class="px-2 py-1 border mb-1">{{syncedUser.Prefect}}{{syncedUser.Address}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">メールアドレス</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.Email}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">弊社担当者名</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.SalesStaff}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">
              パスワード
            </v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-text-field
                :value="pass"
                readonly
                outlined
                dense
                hide-details="auto"
                :append-icon="show ? 'mdi-eye':'mdi-eye-off'"
                :type="show ? 'text':'password'"
                @click:append="show=!show"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">メールマガジン</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">
                <template v-if="syncedUser.DMFlg==='0'">
                  受け取る
                </template>
                <template v-else>
                  受け取らない
                </template>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">本人確認</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">
                <template v-if="syncedUser.NecDocFlg">
                  登録する
                </template>
                <template v-else>
                  登録しない
                </template>
              </v-card>
            </v-col>
            <v-col v-if="syncedUser.NecDocFlg" cols="12" class="mt-4">
              <v-card outlined class="pa-4">
                <id-card ref="id"
                  :user.sync="syncedUser" :file.sync="file" :read="true"
                ></id-card>
                <template v-if="syncedUser.MemberType===1">
                  <v-row class="mt-3">
                    <v-col cols="12" md="4" class="pb-0">本社住所</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" class="px-2 py-1 border width-s mb-1">〒{{syncedUser.HOfficeZipCode}}</v-card>
                      <v-card elevation="0" class="px-2 py-1 border mb-1">{{syncedUser.HOfficePrefect}}{{syncedUser.HOfficeAddress}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">本社電話番号</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.HOfficeTel}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">本社FAX番号</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.HOfficeFax}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">代表者名</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.Representative}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">設立年月</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" class="px-2 py-1 border">{{dateFormat(syncedUser.Incorporation)}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">法人番号</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.CorpNumber}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">法人区分</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" class="px-2 py-1 border">
                        <template v-if="syncedUser.CorpType==='1'">
                          上場
                        </template>
                        <template v-else-if="syncedUser.CorpType==='2'">
                          非上場
                        </template>
                        <template v-else>
                          公共団体ほか
                        </template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">お支払い方法</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" class="px-2 py-1 border">
                        <template v-if="syncedUser.PaymentMethod==='0'">
                          事前お振込
                        </template>
                        <template v-else>
                          店頭お支払い(現金)
                        </template>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="4" class="pb-0">お振込名義</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.PayeeName}}</v-card>
                    </v-col>
                  </v-row>
                  <v-row class="last-row">
                    <v-col cols="12" md="4" class="pb-0">請求書送付先メールアドレス</v-col>
                    <v-col cols="12" md="8" class="pt-0 pt-md-3">
                      <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.BillingEmail}}</v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-card>

            </v-col>
          </v-row>
          <div class="text-center mt-6">
            <v-btn large
              class="my-4 mx-2 white--text"
              color="secondary"
              :disabled="loading"
              @click="$router.go(-2)"
            >入力画面に戻る</v-btn>
            <v-btn large
              class="my-4 mx-2"
              color="primary"
              :loading="loading"
              @click="register()"
            >登録</v-btn>
          </div>
        </v-container>
      </v-card>
    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="syncedResult"
          :action="'新規登録'"
          :path="'/login'"
          :dialog.sync="resultDialog">
        </result-card>
      </v-card>
    </v-dialog>
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
      required: true,
      default: () => {},
    },
    result:{
      type: String,
      required: true
    },
    file:{
      type: Array,
      required: false,
      default: () => ([])
    }
  },
  data() {
    return {
      show: false,
      loading: false,
      resultDialog: false,
    }
  },

  fetch() {
    this.$store.commit('loading/changeStatus', true)
    if(!this.pass){
      this.$router.push('/register#input')
    }
    history.pushState(null, '', null)
    this.$store.commit('loading/changeStatus', false)
  },
  computed: {
    syncedUser: {
      get(){
        return this.user
      },
      set(val){
        this.$emit('update:user', val)
      }
    },
    syncedResult: {
      get(){
        return this.result
      },
      set(val){
        this.$emit('update:result', val)
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
    async register(){
      this.loading = true
      if(this.syncedUser.NecDocFlg){
        const id = await this.$refs.id.register()
        if( !id ) {
          this.loading = false
          return false
        }
      }else{
        this.$set(this.syncedUser, 'UploadKey', '')
        this.$set(this.syncedUser, 'DocFileName1', '')
        this.$set(this.syncedUser, 'DocFileName2', '')
        this.$set(this.syncedUser, 'DocFileName3', '')
      }
      const userInfo = JSON.stringify(this.syncedUser)
      const param = new URLSearchParams()
      param.append('LoginID', this.syncedUser.Email)
      param.append('Password', this.pass)
      param.append('JsonData', userInfo)
      const res = await this.$memberAxios.post('member/', param)
      if(res.data.Status === 'TRUE'){
        this.syncedResult = 'success'
      }else{
        this.syncedResult = String( res.data.ErrorNo )
      }
      this.resultDialog = true
      this.loading = false
    },
    dateFormat(num){
      if(num){
        const year = num.substring(0, 4)
        const month = num.substring(4, 6)
        const entryDate = year+"-"+month
        return entryDate
      }
    },
    popstateHook(){
      history.pushState(null, '', null)
    }

  }
}
</script>
<style lang="scss" scoped>
@import 'assets/css/common.scss';
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
.border{
  border: 1px solid $line;
}
.width-s{
  max-width: 225px;
}
</style>
