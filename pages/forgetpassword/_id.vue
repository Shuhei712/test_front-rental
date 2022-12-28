<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <!-- <top-bar title="パスワード変更 入力" :bread-crumbs="breadCrumbs"></top-bar> -->
    <div class="sec__inner py-16">
      <div class="py-15">
        <h1 class="text-center py-6 mb-4">パスワード再設定</h1>
        <div v-if="doneFlg" class="text-center">
          <p>パスワード変更が完了いたしました。</p>
          <v-btn large
            class="my-4 text-white"
            color="primary"
            to="/"
          >トップページ</v-btn>
        </div>

        <div v-else>

          <div v-if="errFlg" class="text-center mt-4">
            <p v-if="(errFlg===111102)" class="red--text text-left text-md-center">既にパスワード変更の処理が行われました。</p>
            <p v-else-if="(errFlg===111103)" class="red--text text-left text-md-center">メールアドレスが正しくありません</p>
            <div v-else>
              <p class="red--text text-left text-md-center">処理が正常に行われませんでした。<br>もう一度お試しいただくか、弊社にお問い合わせください。</p>
              <v-btn large
                class="my-4 mx-2 text-white pb-9"
                color="primary"
                to="/forgetpassword/"
              >最初から始める</v-btn>
            </div>
          </div>

          <div>
            <ValidationObserver v-slot="ObserverProps">
              <v-form class="pt-5">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="メールアドレス"
                  rules="required|email">
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                      メールアドレス
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="mail"
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
                  rules="required"
                  name="passOld">
                  <v-row>
                    <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                      現在のパスワード
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="oldPass"
                        outlined
                        required
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                        :append-icon="showOld ? 'mdi-eye':'mdi-eye-off'"
                        :type="showOld ? 'text':'password'"
                        @click:append="showOld=!showOld"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider> -->
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|min:8|max:24|pass"
                  name="passNew">
                  <v-row>
                    <v-col cols="12" md="4">
                      <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                      新しいパスワード
                      <span class="caption d-block">(半角英数字8文字以上24文字以下)</span>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="newPass"
                        outlined
                        required
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      doneFlg: false,
      activateFlg: null,
      errFlg: false,
      showNew: false,
      newPass: null,
      mail: null,
    }
  },
  fetch(){
    this.$store.commit('loading/changeStatus', true)
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
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'パスワード変更 入力', path: '/setpassword' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async passChange(){
      const token = this.$route.params.id
      const param = new URLSearchParams()
      param.append('MailAddress', this.mail)
      param.append('NewPasswd', this.newPass)
      const res = await this.$memberAxios.post('/auth/forgetPasswd', param,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        this.doneFlg = true
      }else{
        this.errFlg = res.data.ErrorNo
      }
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