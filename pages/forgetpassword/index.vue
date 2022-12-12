<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <!-- <to-top-btn></to-top-btn>
    <top-bar title="パスワード変更" :bread-crumbs="breadCrumbs"></top-bar> -->
    <div class="sec__inner py-16 text-center">
      <div class="text-center py-15">
        <h1 class="py-6 mb-4">パスワードをお忘れですか？</h1>
        <div v-if="doneFlg">
          <p class="mb-4 text-left text-md-center">
            パスワード変更を承りました。<br>
            登録されているメールアドレスに、通知メールを送信しましたので、
            <span class="d-inline-block">メールに記載されているURLにアクセスし、パスワードの変更をお願いいたします。</span>
          </p>
          <v-btn
            color="outline"
            class="mx-3 white--text"
            href="/login">
            戻る
          </v-btn>
        </div>
        <div v-else>
          <p class="mb-8 text-left text-md-center">
            ご登録のアドレスに、通知メールを送信いたします。<br>
            通知メールでお知らせするURLにアクセスいただくことで、パスワードの変更が可能となります。
          </p>
          <div v-if="errFlg">
            <p class="mb-4 red--text text-left text-md-center">
              メールアドレスが正しくありません。
            </p>
          </div>
          <ValidationObserver v-slot="ObserverProps">
            <ValidationProvider
              v-slot="{ errors }"
              name="メールアドレス"
              rules="required|email">
              <v-row>
                <v-col sm="3" cols="12" class="text-left text-md-center pb-0 pb-sm-3">
                  メールアドレス
                </v-col>
                <v-col sm="9" cols="12">
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
            <div class="mt-9">
              <v-btn
                :disabled="ObserverProps.invalid || !ObserverProps.validated"
                color="primary"
                class="mx-3"
                @click="passChange">
                パスワード変更
              </v-btn>
              <v-btn
                color="outline"
                class="mx-3 white--text"
                href="/login">
                戻る
              </v-btn>
            </div>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
      doneFlg: false,
      errFlg: false,
      mail: null
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "パスワード変更",
      meta: [
        { hid: 'description', name: 'description', content: 'パスワード変更 | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/addList", { name: "パスワード変更", path: "/forgetpassword" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async passChange(){

      this.$store.commit('loading/changeStatus', true)
      const res = await this.$memberAxios.get(`/auth/forgetRequest/${this.mail}`)
      console.log(res)
      if(res.data.Status==='TRUE'){
        this.doneFlg = true
      }else{
        this.errFlg = true
      }

      this.$store.commit('loading/changeStatus', false)

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