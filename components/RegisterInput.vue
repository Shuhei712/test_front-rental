<template>
  <div>
    <top-bar title="入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form
            ref="form"
            v-model="valid">
            <v-container>
              <div class="err mb-5 red--text">
                <p v-if="registerErr==='120107'||registerErr==='120108'">
                  ご記入のメールアドレスで既に登録されております。
                </p>
                <p v-else-if="registerErr">
                  処理が正常に行われませんでした。<br>しばらくして、もう一度お試しいただくか、お問い合わせ下さい。
                </p>
              </div>
              <v-row class="my-1">
                <v-col cols="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 会員タイプ</v-col>
                <v-col cols="8">
                  <v-radio-group v-model="syncedUser.MemberType"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="個人"
                      :value="'0'"
                    ></v-radio>
                    <v-radio
                      label="法人"
                      :value="'1'"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 氏名</v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="syncedUser.MemberName"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email">
                <v-row class="my-1">
                  <v-col cols="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="syncedUser.Email"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <!-- <v-row>
                <v-col cols="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> メールアドレス</v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="syncedUser.Email"
                    :rules="emailRule"
                    outlined
                    required
                    dense
                    hide-details="auto"
                  ></v-text-field>
                </v-col>
              </v-row> -->

              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:8|max:24|pass"
                name="password">
                <v-row class="my-1">
                  <v-col cols="4">
                    <span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    パスワード
                    <span class="caption d-block">(半角英数字8文字以上24文字以下)</span>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="syncedPass"
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
              <!-- <v-row>
                <v-col cols="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                  パスワード
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="syncedPass"
                    :rules="requireRule"
                    outlined
                    required
                    dense
                    hide-details="auto"
                    :append-icon="show ? 'mdi-eye':'mdi-eye-off'"
                    :type="show ? 'text':'password'"
                    @click:append="show=!show"
                  ></v-text-field>

                </v-col>
              </v-row> -->

              <v-row class="my-1">
                <v-col cols="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> メールマガジン</v-col>
                <v-col cols="8">
                  <v-radio-group v-model="syncedUser.DMFlg"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="受け取る"
                      :value="'0'"
                    ></v-radio>
                    <v-radio
                      label="受け取らない"
                      :value="'1'"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              {{ObserverProps}}
              <div class="text-center mt-6">
                <v-btn large
                  class="my-4 mx-2"
                  color="secondary"
                  @click="reset()"
                >リセット</v-btn>
                <v-btn large
                  :disabled="ObserverProps.invalid"
                  class="my-4 mx-2 white--text"
                  color="primary"
                  @click="confirm()"
                >確認</v-btn>
              </div>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-card>
    </div>
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
      required: true
    },
    registerErr:{
      type: String,
      required: true
    },
  },

  data() {
    return {
      breadCrumbs: [],
      valid: true,
      show: false,
      // Password: null,
      // requireRule: [v => !!v || '必須です'],
      // emailRule: [
      //   v => !!v || '必須です',
      //   v => /.+@.+\..+/.test(v) || '形式が正しくありません',
      // ],
    }
  },

  fetch() {
    this.setBreadCrumbs()
  },
  computed: {
    syncedPass: {
      get(){
        return this.pass
      },
      set(val){
        this.$emit('update:pass', val)
      }
    },
    syncedUser: {
      get(){
        return this.user
      },
      set(val){
        this.$emit('update:user', val)
      }
    },
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '新規登録', path: '/register' })
      this.$store.commit('breadCrumbs/addList', { name: '入力', path: '/register#input' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    confirm(){
      this.$emit('update:registerErr', '')
      this.$router.push('/register#confirm')
    },

    reset() {
      console.log('rest')
      this.$refs.form.reset()
      this.$refs.observer.reset()
    },
  }
}
</script>
<style lang="scss" scoped>
.register{
  &__inner{
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>