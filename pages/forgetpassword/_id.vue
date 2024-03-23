<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="パスワード再設定" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <div v-if="tokenErrNo" class="text-center">
        <template v-if="tokenErrNo===111201">
          <p class="red--text">認証URLが正しくないか、有効期限が切れています。<br>お手数ですが、下記ボタンからもう一度お試しください。</p>
          <v-btn
            class="my-4 white--text"
            color="primary"
            to="/forgetpassword"
          >パスワード再設定</v-btn>
        </template>
        <template v-else-if="tokenErrNo===111202">
          <p>既にパスワード再設定の処理が行われました。</p>
          <v-btn
            color="outline"
            class="my-4 white--text"
            to="/">
            TOPページに戻る
          </v-btn>
        </template>
      </div>
      <div v-else>
        <p v-if="result==='111103'" class="red--text pb-4">メールアドレスが正しくありません</p>
        <ValidationObserver v-slot="ObserverProps">
          <v-form>
            <ValidationProvider
              v-slot="{ errors }"
              name="forgetMail"
              rules="required|email|max:50">
              <v-row>
                <v-col cols="12" md="4" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                  メールアドレス
                </v-col>
                <v-col cols="12" md="8" class="pt-1 pt-md-2">
                  <v-text-field
                    v-model="mail"
                    outlined
                    dense
                    type="email"
                    :error-messages="errors"
                  ></v-text-field>
                </v-col>
              </v-row>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|min:8|max:24|pass"
              name="forgetPassNew">
              <v-row>
                <v-col cols="12" md="4" class="pb-0">
                  <span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                  新しいパスワード
                  <span class="caption d-block">(半角英数字8文字以上24文字以下)</span>
                </v-col>
                <v-col cols="12" md="8" class="pt-1 pt-md-3">
                  <v-text-field
                    v-model="newPass"
                    outlined
                    dense
                    autocomplete="none"
                    :error-messages="errors"
                    :append-icon="show ? 'mdi-eye':'mdi-eye-off'"
                    :type="show ? 'text':'password'"
                    @click:append="show=!show"
                  ></v-text-field>

                </v-col>
              </v-row>
            </ValidationProvider>
            <div class="text-center mt-6">
              <v-btn large
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
                class="my-4 mx-2 white--text"
                color="primary"
                :loading="loading"
                @click="passChange()"
              >変更する</v-btn>
            </div>
          </v-form>
        </ValidationObserver>
      </div>
    </div>
    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'パスワード変更'"
          :status="'done'"
          :path="'/login'"
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
      show: false,
      newPass: null,
      mail: null,
      loading: false,
      resultDialog: false,
      result: null,
      tokenErrNo: null
    }
  },
  async fetch(){
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.tokenErrNo = await this.$checkMailToken(this.$route.params.id)
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "パスワード再設定",
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
      this.$store.commit("breadCrumbs/deleteList")
      this.$store.commit('breadCrumbs/addList', { name: "パスワード再設定", path: "/forgetpassword" })
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"]
    },
    async passChange(){
      this.loading = true
      const token = this.$route.params.id
      const param = new URLSearchParams()
      param.append('MailAddress', this.mail)
      param.append('NewPasswd', this.newPass)
      const res = await this.$memberAxios.post('auth/forgetPasswd', param,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.result = 'success'
        this.resultDialog = true
      }else{
        this.result = String( res.data.ErrorNo )
        if( this.result!=='111103' ) this.resultDialog = true
      }
      this.loading = false
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
