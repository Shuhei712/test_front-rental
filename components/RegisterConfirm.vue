<template>
  <div>
    <top-bar title="新規登録 確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6 confirm">
        <v-container>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">会員タイプ</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">
                <template v-if="syncedUser.MemberType===0">
                  個人
                </template>
                <template v-else>
                  法人
                </template>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="syncedUser.MemberType===0">
            <v-col cols="12" md="4" class="pb-0">所属先</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{ syncedUser.Organization }}</v-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12" md="4" class="pb-0">会社名</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.Organization}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">氏名</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.MemberName}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">氏名(カナ)</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" min-height="2rem" class="px-2 py-1 border">{{syncedUser.MemberKana}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">電話番号</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.Tel}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">メールアドレス</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border">{{syncedUser.Email}}</v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4" class="pb-0">住所</v-col>
            <v-col cols="12" md="8" class="pt-0 pt-md-3">
              <v-card elevation="0" class="px-2 py-1 border width-s mb-1">〒{{syncedUser.ZipCode}}</v-card>
              <v-card elevation="0" class="px-2 py-1 border mb-1">{{syncedUser.Prefect}} {{syncedUser.Address}}</v-card>
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
              </v-card>
            </v-col>
          </v-row>
          <div class="text-center mt-6">
            <v-btn large
              class="my-4 mx-2 white--text"
              color="secondary"
              :disabled="loading"
              :to="{ hash: '#input' }"
            >戻る</v-btn>
            <v-btn large
              class="my-4 mx-2"
              color="primary"
              :loading="loading"
              @click="register()"
            >登録</v-btn>
          </div>
        </v-container>
      </v-card>
    </div>
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
      // required: true
      required: false,
      default: () => ([])
    }
  },
  data() {
    return {
      breadCrumbs: [],
      show: false,
      loading: false,
      resultDialog: false,
      // result: null,
    }
  },

  fetch() {
    this.$store.commit('loading/changeStatus', true)
    if(!this.pass){
      this.$router.push('/register#input')
    }
    this.setBreadCrumbs()
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
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '新規登録 確認', path: '/register#confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async register(){
      this.loading = true
      if(this.syncedUser.NecDocFlg){
        const id = await this.$refs.id.register()
        if( !id ) return false
      }else{
        this.$set(this.syncedUser, 'UploadKey', '')
        this.$set(this.syncedUser, 'DocFileName1', '')
        this.$set(this.syncedUser, 'DocFileName2', '')
        this.$set(this.syncedUser, 'DocFileName3', '')
      }
      const userInfo = JSON.stringify(this.syncedUser);
      const param = new URLSearchParams()
      param.append('LoginID', this.syncedUser.Email)
      param.append('Password', this.pass)
      param.append('JsonData', userInfo)
      const res = await this.$memberAxios.post('member/', param)
      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.syncedResult = 'success'
      }else{
        this.syncedResult = String( res.data.ErrorNo )
        if(res.data.ErrorNo===120107){
          this.$router.push('/register#input')
          return
        }
      }
      this.resultDialog = true
      this.loading = false
    },

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
.row{
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