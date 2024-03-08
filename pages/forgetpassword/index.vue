<template>
  <section id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="パスワードをお忘れの方" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16 text-center">
      <div class="text-center">
        <h1 class="py-3 mb-4">パスワードをお忘れですか？</h1>
        <p class="mb-8 text-left text-md-center">
          ご登録のアドレスに通知メールを送信いたします。<br>
          通知メールでお知らせする認証URLにアクセスいただくことで、パスワードの変更が可能となります。<br>
          ※「takenaka-co.co.jp」からのメールを受信出来るように設定をお願いします。
        </p>
        <div v-if="errFlg">
          <p class="mb-4 red--text text-left">
            ご指定のメールアドレスのアカウントが見つかりません。
          </p>
        </div>
        <ValidationObserver v-slot="ObserverProps">
          <ValidationProvider
            v-slot="{ errors }"
            name="mail"
            rules="required|email|max:50">
            <v-row>
              <v-col sm="3" cols="12" class="text-left pb-0">
                メールアドレス
              </v-col>
              <v-col sm="9" cols="12" class="pt-0 pt-sm-2">
                <v-text-field
                  v-model="mail"
                  outlined
                  dense
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </v-row>
          </ValidationProvider>
          <div class="mt-9">
            <v-btn
              :disabled="ObserverProps.invalid || !ObserverProps.validated"
              color="primary"
              class="mx-3"
              :loading="loading"
              @click="passChange">
              パスワード変更
            </v-btn>
            <!-- <v-btn
              color="outline"
              class="mx-3 white--text"
              to="/login">
              ログイン画面へ
            </v-btn> -->
          </div>
        </ValidationObserver>
      </div>
    </div>
    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'パスワード変更依頼'"
          :path="'/'"
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
      errFlg: false,
      mail: null,
      loading: false,
      resultDialog: false,
      result: null,
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "パスワードをお忘れの方",
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
      this.$store.commit('breadCrumbs/addList', { name: "パスワードをお忘れの方", path: "/forgetpassword" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async passChange(){
      this.loading = true
      const res = await this.$memberAxios.get(`/auth/forgetRequest/${this.mail}`)
      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        this.result = 'success'
        this.resultDialog = true
      }else{
        this.errFlg = true
      }
      this.loading = false
    }
  },
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 800px;
  margin: 0 auto;
  width: 95%;
}
</style>
