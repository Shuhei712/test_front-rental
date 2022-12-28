<template >

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
            name="email"
            rules="required|email">
            <v-row>
              <v-col cols="12" md="3" class="pb-0 text-left">
                ログインID
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="id"
                  outlined
                  required
                  dense
                  hide-details="auto"
                  autocomplete="on"
                  :error-messages="errors"
                ></v-text-field>
              </v-col>
            </v-row>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            name="password">
            <v-row>
              <v-col cols="12" md="3" class="pb-0 text-left">
                パスワード
              </v-col>
              <v-col cols="12" md="9">
                <v-text-field
                  v-model="password"
                  outlined
                  required
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
          <div class="text-center mt-6">
            <v-btn large
              class="my-4"
              color="primary"
              :disabled="ObserverProps.invalid || !ObserverProps.validated"
              @click="login()"
            >ログイン</v-btn>
            <a class="text-gray d-block text-decoration-underline my-2" href="/forgetpassword">パスワードを忘れた方はこちら</a>
            <a class="text-gray d-block text-decoration-underline" href="/register">新規会員登録</a>
          </div>
        </v-form>
      </v-container>
    </ValidationObserver>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      id: null,
      password: null,
      loginErr : null,
    }
  },
  methods: {
    async login(){
      this.$store.commit('loading/changeStatus', true)
      const param = new URLSearchParams()
      param.append('LoginID', this.id)
      param.append('Password', this.password)
      const res = await this.$memberAxios.post('auth/login', param)
      console.log(res.data)
      if(res.data.Status === 'TRUE'){
        this.$store.commit('auth/setUser',this.id)
        this.$store.commit('auth/setAuthToken', res.data.AuthToken)
        this.$store.commit('auth/setAccessToken', res.data.AccessToken)
        // this.$router.push('/');
        location.reload()
      }else{
        this.loginErr = true
        this.$store.commit('loading/changeStatus', false)
      }

    }
  }
}
</script>