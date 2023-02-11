<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="アカウント情報" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <v-card
        outlined
        class="py-6">
        <ValidationObserver v-slot="ObserverProps" ref="observer">
          <v-form
            ref="form">
            <v-container>
              <p v-if="result==='120201'" class="mb-5 red--text">
                ご入力のメールアドレスは既に使用されております。
              </p>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">ログインID</v-col>
                <v-col cols="12" md="8" class="pt-0 pt-md-3">{{loginID}}
                </v-col>
              </v-row>
              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0">会員タイプ</v-col>
                <v-col cols="12" md="8" class="pt-0 pt-md-3">{{ userInfo.MemberTypeDisp }}
                </v-col>
              </v-row>
              <div v-if="userInfo.MemberType===1">

                <ValidationProvider
                  v-slot="{ errors }"
                  name="company"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 会社名</v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="userInfo.Organization"
                        outlined
                        dense
                        hide-details="auto"
                        :error-messages="errors"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </ValidationProvider>
              </div>

              <ValidationProvider
                v-slot="{ errors }"
                name="name"
                rules="required">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 氏名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="userInfo.MemberName"
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
                rules="max:50">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text secondary px-2 py-1 rounded body-2">任意</span> 氏名(カナ)</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="userInfo.MemberKana"
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
                name="tel"
                rules="required|num">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 連絡先</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="userInfo.Tel"
                      outlined
                      dense
                      hide-details="auto"
                      placeholder="0123456789"
                      :error-messages="errors"
                      @blur="userInfo.Tel=toNum($event.target.value)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> 住所</v-col>
                <v-col cols="12" md="8">
                  <set-address
                    :set-zip-code.sync="userInfo.ZipCode"
                    :set-prefect.sync="userInfo.Prefect"
                    :set-address.sync="userInfo.Address">
                  </set-address>
                </v-col>
              </v-row>

              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email">
                <v-row class="my-1">
                  <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="userInfo.Email"
                      outlined
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <v-row class="my-1">
                <v-col cols="12" md="4" class="pb-0"><span class="white--text red darken-1 px-2 py-1 rounded body-2">必須</span> メールマガジン</v-col>
                <v-col cols="12" md="8">
                  <v-radio-group v-model="userInfo.DMFlg"
                    hide-details="auto"
                    mandatory
                    row
                    class="mt-0">
                    <v-radio
                      label="受け取る"
                      :value="0"
                    ></v-radio>
                    <v-radio
                      label="受け取らない"
                      :value="1"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <div class="text-center mt-6">
                <!-- <v-btn
                  class="my-4 mx-2 white--text"
                  color="secondary"
                  to="/myaccount"
                  :disabled="loading"
                >マイページへ</v-btn> -->
                <v-btn
                  :disabled="(ObserverProps.invalid)"
                  class="my-4 mx-2 white--text"
                  color="primary"
                  :loading="loading"
                  @click="update()"
                >変更する</v-btn>
              </div>
            </v-container>
          </v-form>
        </ValidationObserver>
      </v-card>
    </div>
    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'アカウント情報の変更'"
          :path="'/myaccount'"
          :dialog.sync="resultDialog">
        </result-card>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>

export default {

  data() {
    return {
      breadCrumbs: [],
      loginID: null,
      userInfo: [],
      userUpInfo: {},
      loading: false,
      result: null,
      resultDialog: false
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    await this.getAccountInfo()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "アカウント情報",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "アカウント情報", path: "/myaccount/info" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async getAccountInfo(){
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const res = await this.$memberAxios.get(`member/${loginID}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        this.userInfo = res.data.MemberInfo
        this.loginID = res.data.LoginID
      }else if(res.data.ErrorNo===100002){
        // access認証token有効期限切れ
        const res = await this.$getAccessToken()
        if( res ) return this.getAccountInfo()
      }
    },
    async update(){
      this.loading = true
      this.$set(this.userUpInfo, 'MemberType', this.userInfo.MemberType)
      this.$set(this.userUpInfo, 'MemberName', this.userInfo.MemberName)
      this.$set(this.userUpInfo, 'Tel', this.userInfo.Tel)
      this.$set(this.userUpInfo, 'ZipCode', this.userInfo.ZipCode)
      this.$set(this.userUpInfo, 'Prefect', this.userInfo.Prefect)
      this.$set(this.userUpInfo, 'Address', this.userInfo.Address)
      this.$set(this.userUpInfo, 'Email', this.userInfo.Email)
      this.$set(this.userUpInfo, 'DMFlg', this.userInfo.DMFlg)
      this.$set(this.userUpInfo, 'MemberKana', this.userInfo.MemberKana ? this.userInfo.MemberKana : '')
      if( this.userInfo.MemberType ){
        this.$set(this.userUpInfo, 'Organization', this.userInfo.Organization)
      }
      this.$set(this.userUpInfo, 'NecDocFlg', this.userInfo.NecDocFlg)

      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const userUpInfo = JSON.stringify(this.userUpInfo)
      const param = new URLSearchParams()
      param.append('JsonData', userUpInfo)
      const res = await this.$memberAxios.put(`member/${loginID}`,param,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      this.$setLog('会員情報', '更新', res.data.Status)
      if(res.data.Status === 'TRUE'){
        this.result = 'success'
        this.resultDialog = true
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        if( res ) return this.update()
      }else{
        this.result = String(res.data.ErrorNo)
        if( this.result!=='120201' ) this.resultDialog = true
      }
      window.scrollTo({ top: 0, })
      this.loading = false
    },
    // reset() {
    //   this.$refs.form.reset()
    //   this.$refs.observer.reset()
    // },
    toNum(e){
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|－|ー/g,'')
    }
  },
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
.row{
  border-bottom: 1px solid #dddddd;
  padding-bottom: 0.5rem;
  padding-top: 0.2rem;
}
.input-short{
  max-width: 225px;
}
</style>