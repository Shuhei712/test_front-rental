<template>
  <div>

    <top-bar title="確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <v-form
          ref="form"
          class="confirm"
          :value="valid">
          <v-container>
            <v-row>
              <v-col cols="4">会員タイプ</v-col>
              <v-col cols="8">
                <div v-if="user.MemberType==='0'">
                  個人
                </div>
                <div v-else>
                  法人
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">氏名</v-col>
              <v-col cols="8">
                <v-text-field
                  :value="user.MemberName"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">メールアドレス</v-col>
              <v-col cols="8">
                <v-text-field
                  :value="user.Email"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                パスワード
              </v-col>
              <v-col cols="8">
                <v-text-field
                  :value="pass"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                  :append-icon="show ? 'mdi-eye':'mdi-eye-off'"
                  :type="show ? 'text':'password'"
                  @click:append="show=!show"
                ></v-text-field>

              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">メールマガジン</v-col>
              <v-col cols="8">
                <div v-if="user.DMFlg==='0'">
                  受け取る
                </div>
                <div v-else>
                  受け取らない
                </div>
              </v-col>
            </v-row>
            <div class="text-center mt-6">
              <v-btn large
                class="my-4 mx-2 white--text"
                color="secondary"
                :to="{ hash: '#input' }"
              >戻る</v-btn>
              <v-btn large
                class="my-4 mx-2"
                color="primary"
                @click="register()"
              >登録</v-btn>
            </div>
          </v-container>
        </v-form>
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
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      breadCrumbs: [],
      valid: true,
      show: false,
    }
  },

  fetch() {
    this.$store.commit('loading/changeStatus', true)
    if(!this.pass){
      this.$router.push('/register#input')
    }
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: '新規登録', path: '/register' })
      this.$store.commit('breadCrumbs/addList', { name: '確認', path: '/register#confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async register(){

      this.$store.commit('loading/changeStatus', true)
      this.$set(this.user,'NecDocFlg','0')
      const userInfo = JSON.stringify(this.user);
      const param = new URLSearchParams()
      param.append('LoginID',this.user.Email)
      param.append('Password',this.pass)
      param.append('JsonData',userInfo)
      const res = await this.$memberAxios.post('member/', param)
      console.log(res)
      if(res.data.Status === 'TRUE'){
        this.$store.commit('user/setUser',this.user.Email)
        this.$store.commit('auth/setAuthToken', res.AuthToken)
        this.$store.commit('auth/setAccessToken', res.AccessToken)
        this.$router.push('/register#complete')
      }else{
        this.$emit('update:registerErr', String(res.data.ErrorNo))
        this.$router.push('/register#input')
      }
      this.$store.commit('loading/changeStatus', false)
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
.confirm input{
  cursor: default;
}
</style>