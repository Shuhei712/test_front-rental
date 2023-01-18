<template>
  <div>

    <top-bar title="お問い合わせ 確認" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <v-form
          ref="form"
          class="confirm">
          <v-container>
            <v-row class="my-1">
              <v-col cols="12" md="4">お問い合わせの種類</v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  :value="user.ContactType"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-text-field>
                  <!-- <v-select
                    :value="user.ContactType"
                    item-text="SelectItemName"
                    :items="displayLists"
                    hide-details="false"
                    readonly
                    outlined
                    dense
                  ></v-select> -->
              </v-col>
            </v-row>

            <v-row class="my-1">
              <v-col cols="12" md="4">氏名</v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  :value="user.Name"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="my-1">
              <v-col cols="12" md="4">お名前(カナ)</v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  :value="user.NameKana"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="my-1">
              <v-col cols="12" md="4">メールアドレス</v-col>
              <v-col cols="12" md="8">
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

            <v-row class="my-1">
              <v-col cols="12" md="4">注文番号</v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  :value="user.OrderNo"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                  class="input-short"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="my-1">
              <v-col cols="12" md="4">お問い合わせ件名</v-col>
              <v-col cols="12" md="8">
                <v-text-field
                  :value="user.Subject"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="my-1">
              <v-col cols="12" md="4">お問い合わせ内容</v-col>
              <v-col cols="12" md="8">
                <v-textarea
                  :value="user.Inquiry"
                  readonly
                  outlined
                  required
                  dense
                  hide-details="auto"
                ></v-textarea>
              </v-col>
            </v-row>

            <div class="text-center mt-6">
              <v-btn large
                class="my-4 mx-2 white--text"
                color="secondary"
                :to="{ query:{id:$route.query.id}, hash: 'input' }"
              >戻る</v-btn>
              <v-btn large
                class="my-4 mx-2"
                color="primary"
                :loading="loading"
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
    user:{
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      breadCrumbs: [],
      loading: false
    }
  },

  fetch() {
    this.$store.commit('loading/changeStatus', true)
    if(!this.user.Name){
      this.$router.push('/myaccount/other/contact#input')
    }
    window.scrollTo({
      top: 0,
    })
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  methods: {

    setBreadCrumbs() {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・その他", path: "/myaccount/other" })
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ 確認', path: '/myaccount/other/contact#confirm' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async register(){
      this.loading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      if(!this.user.NameKana) this.$set(this.user, 'NameKana', '')
      if(!this.user.OrderNo) this.$set(this.user, 'OrderNo', '')
      const userInfo = JSON.stringify(this.user);
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      param.append('JsonData', userInfo)
      const res = await this.$memberBaseAxios.post('contact/registInquiry', param,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員お問い合わせ', '登録', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.$router.push('/myaccount/other/contact#complete')
      }else if(res.data.ErrorNo===100001){
        // 認証tokenの有効期限が切れています
        this.$store.dispatch('auth/resetUser')
        this.$router.push('/login');
      }else if(res.data.ErrorNo===100002){
        // access認証tokenの有効期限が切れています
        const res = await this.$getAccessToken()
        this.register()
      }else{
        this.$emit('update:registerErr', String(res.data.ErrorNo))
        const query = this.$route.query.id ? `?id=${this.$route.query.id}` : ''
        this.$router.push(`/myaccount/other/contact${query}#input`)
      }
      this.$store.commit('loading/changeStatus', false)
    },

  }
}
</script>
<style lang="scss" scoped>
.register{
  &__inner{
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }
}
.row{
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.2rem;
}
.confirm input{
  cursor: default;
}
.input-short{
  max-width: 225px;
}
</style>