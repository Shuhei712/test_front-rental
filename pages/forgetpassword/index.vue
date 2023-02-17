<template>
  <section>
    <div class="sec__inner py-16 text-center">
      <div class="text-center py-15">
        <h1 class="py-6 mb-4">パスワードをお忘れですか？</h1>
        <p class="mb-8 text-left text-md-center">
          ご登録のアドレスに、通知メールを送信いたします。<br>
          通知メールでお知らせするURLにアクセスいただくことで、パスワードの変更が可能となります。
        </p>
        <div v-if="errFlg">
          <p class="mb-4 red--text text-left">
            ご指定のメールアドレスのアカウントが見つかりません。
          </p>
        </div>
        <ValidationObserver v-slot="ObserverProps">
          <ValidationProvider
            v-slot="{ errors }"
            name="メールアドレス"
            rules="required|email">
            <v-row>
              <v-col sm="3" cols="12" class="text-left pb-0">
                メールアドレス
              </v-col>
              <v-col sm="9" cols="12" class="pt-0 pt-sm-3">
                <v-text-field
                  v-model="mail"
                  outlined
                  dense
                  hide-details="auto"
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
          :path="'./'"
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
  head () {
    return {
      title: "パスワード変更",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods: {
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