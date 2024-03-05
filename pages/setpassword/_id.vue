<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="パスワード変更 入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <div v-if="tokenErrNo" class="text-center">
        <template v-if="tokenErrNo===111201">
          <p class="red--text">認証URLが正しくないか、有効期限が切れています。<br>お手数ですが、下記ボタンからもう一度お試しください。</p>
          <v-btn
            class="my-4 white--text"
            color="primary"
            to="/myaccount/password"
          >パスワード変更</v-btn>
        </template>
        <template v-else-if="tokenErrNo===111202">
          <p>既にパスワード変更の処理が行われました。</p>
          <v-btn
            color="outline"
            class="my-4 white--text"
            to="/myaccount">
            マイページに戻る
          </v-btn>
        </template>
      </div>
      <template v-else>
        <p v-if="result==='110804'" class="red--text pb-4">現在のパスワードが正しくありません</p>
        <ValidationObserver v-slot="ObserverProps">
          <v-form>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              name="passOld">
              <v-row>
                <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                  現在のパスワード
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="oldPass"
                    outlined
                    dense
                    hide-details="auto"
                    :error-messages="errors"
                    :append-icon="showOld ? 'mdi-eye':'mdi-eye-off'"
                    :type="showOld ? 'text':'password'"
                    @click:append="showOld=!showOld"
                  ></v-text-field>
                </v-col>
              </v-row>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:8|max:24|pass"
              name="passNew">
              <v-row>
                <v-col cols="12" md="4">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                  新しいパスワード
                  <span class="caption d-block">(半角英数字8文字以上24文字以下)</span>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="newPass"
                    outlined
                    dense
                    hide-details="auto"
                    :error-messages="errors"
                    :append-icon="showNew ? 'mdi-eye':'mdi-eye-off'"
                    :type="showNew ? 'text':'password'"
                    @click:append="showNew=!showNew"
                  ></v-text-field>

                </v-col>
              </v-row>
            </ValidationProvider>
            <div class="text-center mt-6">
              <v-btn large
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
                class="my-4 mx-2 white--text"
                color="primary"
                @click="passChange()"
              >変更する</v-btn>
            </div>
          </v-form>
        </ValidationObserver>
      </template>
    </div>
    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'パスワード変更'"
          :status="'done'"
          :path="'/myaccount'"
          :dialog.sync="resultDialog">
        </result-card>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showOld: false,
      showNew: false,
      oldPass: null,
      newPass: null,
      resultDialog: false,
      result: null,
      tokenErrNo: null
    }
  },
  async fetch(){
    this.$store.commit('loading/changeStatus', true)
    this.tokenErrNo = await this.$checkMailToken(this.$route.params.id)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'パスワード変更 入力', path: '/setpassword' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async passChange(){
      this.$store.commit('loading/changeStatus', true)
      const token = this.$route.params.id
      const param = new URLSearchParams()
      param.append('OldPasswd', this.oldPass)
      param.append('NewPasswd', this.newPass)
      const res = await this.$memberAxios.post('auth/changePasswd', param,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員パス', '変更', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.result = 'success'
        this.resultDialog = true
      }else{
        this.result = String( res.data.ErrorNo )
        if( this.result!=='110804' ) this.resultDialog = true
      }
      this.$store.commit('loading/changeStatus', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.sec__inner {
  max-width: 700px;
  margin: 0 auto;
  width: 95%;
}
</style>
