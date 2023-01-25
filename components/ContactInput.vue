<template>
  <div v-if="!$fetchState.pending && !$fetchState.error">
    <top-bar title="お問い合わせ 入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <dl class="d-flex">
        <dt>会員番号</dt>
        <dd>：{{ loginInfo.MemberID }}</dd>
      </dl>
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form
            ref="form">
            <v-container>
              <div v-if="registerErr" class="err mb-5 red--text">
                <p v-if="registerErr==='120107'||registerErr==='120108'">
                  ご記入のメールアドレスで既に登録されております。
                </p>
                <p v-else>
                  処理が正常に行われませんでした。<br>しばらくして、もう一度お試しいただくか、お問い合わせ下さい。
                </p>
              </div>

              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> お問い合わせの種類</v-col>
                <v-col cols="12" md="8">
                  <v-select
                    v-model="syncedUser.ContactType"
                    item-text="ItemDispName"
                    :items="displayLists[0].ItemChoicesList"
                    hide-details="false"
                    outlined
                    dense
                  ></v-select>
                </v-col>
              </v-row>

              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 氏名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Name"
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
                name="nameKana"
                rules="max:50">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded">任意</span> お名前(カナ)</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.NameKana"
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
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="12" md="8">
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

              <ValidationProvider
                v-slot="{ errors }"
                name="orderNo"
                rules="numeric">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded">任意</span> 注文番号</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.OrderNo"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                      class="input-short"
                      @blur="syncedUser.OrderNo=toNum($event.target.value)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="Subject"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> お問い合わせ件名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Subject"
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
                name="Inquiry"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> お問い合わせ内容</v-col>
                  <v-col cols="12" md="8">
                    <v-textarea
                      v-model="syncedUser.Inquiry"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <div class="text-center mt-6">
                <!-- <v-btn large
                  class="my-4 mx-2"
                  color="secondary"
                  @click="reset()"
                >リセット</v-btn> -->
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
      displayLists: {},
      loginInfo: null,
      userInfo: {},
      contactInfo: {},
    }
  },

  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    window.scrollTo({
      top: 0,
    })
    this.displayLists = await this.$getDisplayInfo('DISP_2003')
    this.loginInfo = await this.$getLoginInfo()
    this.userInfo = await this.getUserInfo()
    if(this.$route.query.id) this.contactInfo = await this.getContactInfo()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  computed: {
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
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" })
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・その他", path: "/myaccount/other" })
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ 入力', path: '/myaccount/other/contact#input' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async getUserInfo(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]

      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      const res = await this.$memberBaseAxios.post(`member/getInfo/${this.loginInfo.MemberID}`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status === 'TRUE'){
        const member = res.data.MemberInfo
        this.$set(this.syncedUser, 'Name', member.MemberName)
        this.$set(this.syncedUser, 'NameKana', member.MemberKana)
        this.$set(this.syncedUser, 'Email', member.Email)
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        return this.getUserInfo()
      }

    },
    async getContactInfo(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      const res = await this.$memberBaseAxios.post(`contact/getInfo/${this.$route.query.id}`, param, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }

      if(res.data.Status === 'TRUE'){
        const info = res.data
        this.$set(this.syncedUser, 'Inquiry', info.Inquiry)
        this.$set(this.syncedUser, 'Subject', info.Subject)
        this.$set(this.syncedUser, 'ContactType', info.ContactType)
        this.$set(this.syncedUser, 'OrderNo', info.OrderNo)
        this.$set(this.syncedUser, 'Name', info.Name)
        this.$set(this.syncedUser, 'NameKana', info.NameKana)
        this.$set(this.syncedUser, 'Email', info.Email)
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        return this.getContactInfo()
      }
    },
    confirm(){
      this.$emit('update:registerErr', '')
      const query = this.$route.query.id ? `?id=${this.$route.query.id}` : ''
      this.$router.push(`/myaccount/other/contact${query}#confirm`)
    },
    // reset() {
    //   this.$refs.form.reset()
    //   this.$refs.observer.reset()
    // },
    toNum(e){
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      })
    }
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
.input-short{
  max-width: 225px;
}
</style>