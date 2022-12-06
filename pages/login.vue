<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top" class="products">
    <to-top-btn></to-top-btn>

    <top-bar title="ログイン" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="login__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps">
          <v-container>
            <v-form>
              <p v-if="loginErr" class="red--text pb-4">
                メールアドレスまたはパスワードが正しくありません。
              </p>
              <ValidationProvider
                v-slot="{ errors }"
                name="メールアドレス"
                rules="required|email">
                <v-row>
                  <v-col cols="3">
                    メールアドレス
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      v-model="id"
                      outlined
                      required
                      dense
                      hide-details="auto"
                    ></v-text-field>
                    <span class="red--text">{{errors[0]}}</span>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="パスワード">
                <v-row>
                  <v-col cols="3">
                    パスワード
                  </v-col>
                  <v-col cols="9">
                    <v-text-field
                      v-model="password"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :append-icon="show ? 'mdi-eye':'mdi-eye-off'"
                      :type="show ? 'text':'password'"
                      @click:append="show=!show"
                    ></v-text-field>
                    <span class="red--text">{{errors[0]}}</span>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <div class="text-center mt-6">
                <v-btn large
                  class="my-4"
                  color="primary"
                  :disabled="ObserverProps.invalid || !ObserverProps.validated"
                  @click="login()"
                >ログイン</v-btn>
                <a class="text-gray d-block text-decoration-underline my-2" href="">メールアドレスやパスワードを忘れた方はこちら</a>
                <a class="text-gray d-block text-decoration-underline" href="/register">新規会員登録</a>
              </div>

            <!-- {{ObserverProps}} -->
            </v-form>
          </v-container>
        </ValidationObserver>
      </v-card>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      breadCrumbs: [],
      show: false,
      id: null,
      password: null,
      loginErr : null,
      emailRule: [
        v => !!v || '必須です',
        v => /.+@.+\..+/.test(v) || '形式が正しくありません',
      ],
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "ログイン",
      meta: [
        { hid: 'description', name: 'description', content: 'ログイン | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: 'ログイン', path: '/login' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async login(){
      const param = new URLSearchParams()
      param.append('LoginID', this.id)
      param.append('Password', this.password)
      const res = await this.$memberAxios.post('auth/login', param)
      console.log(res.data)
      if(res.data.Status === 'TRUE'){
        this.$store.commit('auth/setUser',this.id)
        this.$store.commit('auth/setAuthToken', res.data.AuthToken)
        this.$store.commit('auth/setAccessToken', res.data.AccessToken)
        this.$router.push('/');

      }else{
        this.loginErr = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
  &__inner{
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>