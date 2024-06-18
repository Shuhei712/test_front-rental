<template>
  <div v-if="!$fetchState.pending && !$fetchState.error">
    <top-bar title="お問い合わせ 入力" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card color="grey lighten-4" class="pt-3 pb-3 px-6 mb-4" elevation="0" height="100%">
        <div class="d-flex align-center register__tel">
          <div class="pb-5 pb-md-0 pe-md-6">
            <div class="d-flex align-center pb-1 justify-center">
              <v-icon class="mr-1" color="primary" large>mdi-phone</v-icon>
              <span class="text-h6 font-heading font-weight-regular letter-space-01em">電話番号</span>
              &emsp;&emsp;
            </div>
            <span class="text-caption d-flex">
              <business-hours></business-hours>
            </span>
          </div>
          <v-row class="tel__branch">
            <v-col v-for="item in branchTel" :key="item.branch" cols="12" sm="6" class="py-1">
              <dl class="d-flex align-center">
                <dt class="tel__branch-dt"><v-chip label outlined small color="accent" class="d-block">{{item.branch}}</v-chip></dt>
                <dd><a :href="`tel:${item.tel}`" class="tel__link">{{item.tel}}</a></dd>
              </dl>
            </v-col>
          </v-row>
        </div>
      </v-card>
      <p class="mb-2 text-right">
        <v-icon class="mb-1" color="orange lighten-3">mdi-lightbulb</v-icon>
        <NuxtLink to="/faq" class="primary--text">よくある質問はこちら</NuxtLink>
      </p>
      <v-card
        outlined
        class="py-4">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form ref="form">
            <v-container>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">会員番号</v-col>
                <v-col cols="8">{{loginInfo.MemberID}}</v-col>
              </v-row>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">お名前 </v-col>
                <v-col cols="8">{{syncedUser.Name}}</v-col>
              </v-row>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">お名前(フリガナ)</v-col>
                <v-col cols="8">{{syncedUser.NameKana}}</v-col>
              </v-row>
              <ValidationProvider
                name="type"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0 pt-4"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お問い合わせの種類</v-col>
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
                name="email"
                rules="required|email|max:50">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0 pt-4"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
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
                  <v-col cols="12" md="4" class="pb-0 pt-4"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 注文番号</v-col>
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
                  <v-col cols="12" md="4" class="pb-0 pt-4"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お問い合わせ件名</v-col>
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
                  <v-col cols="12" md="4" class="pb-0 pt-4"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> お問い合わせ内容</v-col>
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
    loginInfo:{
      type: Object,
      required: true
    },
  },

  data() {
    return {
      breadCrumbs: [],
      displayLists: {},
      branchTel: [
        { branch: '東京', tel: '03-6690-3457' },
        { branch: '名古屋', tel: '052-526-2872' },
        { branch: '大阪', tel: '06-6571-5132' },
        { branch: '京都', tel: '075-647-3111' },
      ]
    }
  },

  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.displayLists = await this.$getDisplayInfo('DISP_2003')
    if(this.displayLists[0].ItemChoicesList) {
      this.displayLists[0].ItemChoicesList.shift()
    }
    if( !this.syncedUser.Inquiry ) {
      if(this.$route.query.id) { // 再問合せ
        await this.getContactInfo()
      }else{
        await this.getUserInfo()
        if (this.$route.query.orderId) {
          this.syncedUser.OrderNo = this.$route.query.orderId
          this.syncedUser.ContactType = "ご注文について"
        }
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
@import 'assets/css/common.scss';
.register{
  &__tel{
    // max-width: 720px;
    @include mq(md){
      flex-direction: column;
    }
    .tel__link {
      cursor: default;
    }
    .tel__branch {
      max-width: 500px;
      @include mq(md){
        border-top: solid 1px $primary;
        padding: 0.5rem 0;
      }
      &-dt {
        width: 4rem;
        text-align: center;
        margin-right: 0.4rem;
        .v-chip:hover::before {
          opacity: 0;
        }
      }
    }
  }
  &__inner{
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
  }
}
.row:not(.tel__branch){
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.2rem;
}
.width-s{
  max-width: 225px;
}
</style>
