<template >

  <v-card
    outlined
    class="py-6">
    <ValidationObserver v-slot="ObserverProps">
      <v-container>
        <v-form>
          <p v-if="loginErr" class="red--text pb-4">
            ログインIDまたはパスワードが正しくありません。
          </p>
          <ValidationProvider
            v-slot="{ errors }"
            name="id"
            rules="required">
            <v-row>
              <v-col cols="12" md="3" class="pb-0 text-left">
                ログインID
              </v-col>
              <v-col cols="12" md="9" class="pt-0 pt-md-3">
                <v-text-field
                  v-model="id"
                  outlined
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
              <v-col cols="12" md="9" class="pt-0 pt-md-3">
                <v-text-field
                  v-model="password"
                  outlined
                  dense
                  hide-details="auto"
                  autocomplete="on"
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
              :loading="loading"
              :disabled="ObserverProps.invalid || !ObserverProps.validated"
              @click="login()"
            >ログイン</v-btn>
            <div class="text-gray text-decoration-underline">
              <router-link class="d-block my-2" :to="'/forgetpassword'">パスワードを忘れた方はこちら</router-link>
              <router-link class="d-block" :to="'/register'">新規会員登録</router-link>
            </div>
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
      loginErr: null,
      loading: false,
    }
  },
  methods: {
    async login(){
      this.loading = true
      const param = new URLSearchParams()
      param.append('LoginID', this.id)
      param.append('Password', this.password)
      const res = await this.$memberAxios.post('auth/login', param)
      this.$setLog('会員', 'ログイン', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.$store.commit('auth/setUser', this.id)
        this.$store.commit('auth/setAuthToken', res.data.AuthToken)
        this.$store.commit('auth/setAccessToken', res.data.AccessToken)
        await this.$getCartNum()
        location.reload()
      }else{
        this.loginErr = true
      }
      this.loading = false
    },
  }
}
</script>
