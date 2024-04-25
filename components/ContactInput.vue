<template>
  <div v-if="!$fetchState.pending && !$fetchState.error">
    <top-bar title="お問い合わせ 入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form ref="form">
            <v-container>
              <v-row class="my-1">
                <v-col>会員番号 {{loginInfo.MemberID}}</v-col>
              </v-row>
              <ValidationProvider
                name="type"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お問い合わせの種類</v-col>
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
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required|max:50">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お名前</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Name"
                      outlined
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
                rules="kana|max:50">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> お名前(フリガナ)</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.NameKana"
                      outlined
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
                rules="required|email|max:50">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Email"
                      outlined
                      dense
                      hide-details="auto"
                      type="email"
                      autocomplete="email"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="orderNo"
                rules="numeric|max:20">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 注文番号</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.OrderNo"
                      outlined
                      dense
                      hide-details="auto"
                      inputmode="numeric"
                      :error-messages="errors"
                      class="width-s"
                      @blur="syncedUser.OrderNo=toNum($event.target.value)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="Subject"
                rules="required|max:255">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お問い合わせ件名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="syncedUser.Subject"
                      outlined
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
                rules="required|max:1500">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お問い合わせ内容</v-col>
                  <v-col cols="12" md="8">
                    <v-textarea
                      v-model="syncedUser.Inquiry"
                      outlined
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
                <v-btn
                  :disabled="ObserverProps.invalid"
                  class="my-4 mx-2 white--text"
                  color="primary"
                  @click="confirm()"
                >お問い合わせ内容を確認</v-btn>
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
  },

  data() {
    return {
      breadCrumbs: [],
      displayLists: {},
      loginInfo: null
    }
  },

  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.displayLists = await this.$getDisplayInfo('DISP_2003')
    if(this.displayLists[0].ItemChoicesList) {
      this.displayLists[0].ItemChoicesList.shift()
    }
    this.loginInfo = await this.$getLoginInfo()
    if( !this.syncedUser.Inquiry ) {
      if(this.$route.query.id) {
        await this.getContactInfo()
      }else{
        await this.getUserInfo()
      }
    }
    this.setBreadCrumbs()
    window.scrollTo({
      top: 0,
    })
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
      this.$store.commit('breadCrumbs/addList', { name: "ヘルプ・お問い合わせ", path: "/myaccount/other" })
      this.$store.commit('breadCrumbs/addList', { name: 'お問い合わせ 入力', path: '/myaccount/other/contact#input' })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    async getUserInfo(){
      const res = await this.$getUserInfo()
      if(res){
        this.$set(this.syncedUser, 'Name', res.MemberName)
        this.$set(this.syncedUser, 'NameKana', res.MemberKana)
        this.$set(this.syncedUser, 'Email', res.Email)
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
        if( res ) return this.getContactInfo()
      }
    },
    confirm(){
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
.width-s{
  max-width: 225px;
}
</style>
