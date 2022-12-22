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
              <div v-if="doneFlg" class="mb-5 px-1 primary white--text">
                アカウント情報を変更いたしました。
              </div>
              <div v-if="errFlg" class="mb-5 red--text">
                <p v-if="errFlg===120201">
                  ご記入のメールアドレスは既に使用されております。
                </p>
                <p v-else>
                  処理が正常に行われませんでした。<br>しばらくして、もう一度お試しいただくか、お問い合わせ下さい。
                </p>
              </div>
              <v-row class="my-1">
                <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 会員タイプ</v-col>
                <v-col cols="12" md="8">
                  <v-radio-group v-model="userInfo.MemberType"
                    hide-details="auto"
                    mandatory
                    disabled
                    row
                    class="mt-0">
                    <v-radio
                      label="個人"
                      :value="0"
                    ></v-radio>
                    <v-radio
                      label="法人"
                      :value="1"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
              <div v-if="userInfo.MemberType===1">

                <ValidationProvider
                  v-slot="{ errors }"
                  name="company"
                  rules="required">
                  <v-row class="my-1">
                    <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 会社名</v-col>
                    <v-col cols="12" md="8">
                      <v-text-field
                        v-model="userInfo.Organization"
                        outlined
                        required
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
                  <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 氏名</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="userInfo.MemberName"
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
                name="tel"
                rules="required|num">
                <v-row class="my-1">
                  <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 連絡先</v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="userInfo.Tel"
                      outlined
                      required
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
                <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> 住所</v-col>
                <v-col cols="12" md="8">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="zipCode"
                    rules="required|num"
                    class="d-flex mb-1 ">
                    <v-text-field
                      v-model="userInfo.ZipCode"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      placeholder="0123456"
                      prefix="〒"
                      :error-messages="errors"
                      class="input-short"
                      @blur="userInfo.ZipCode=toNum($event.target.value)"
                    ></v-text-field>
                    <v-btn
                      color="primary"
                      class="ms-1"
                      :loading="loading"
                      @click="checkAddress">
                      検索
                    </v-btn>
                  </ValidationProvider>

                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Prefect"
                    rules="required"
                    class="d-block mb-1">
                    <v-autocomplete
                      ref="country"
                      v-model="userInfo.Prefect"
                      outlined
                      :items="prefect"
                      required
                      dense
                      hide-details="auto"
                      placeholder="都道府県"
                      :error-messages="errors"
                      class="input-short"
                    ></v-autocomplete>
                  </ValidationProvider>
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Address"
                    rules="required">
                    <v-text-field
                      v-model="userInfo.Address"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      placeholder="大阪市港区築港3-1-43 天保山シンユニティビル"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email">
                <v-row class="my-1">
                  <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span>
                    メールアドレス
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-text-field
                      v-model="userInfo.Email"
                      outlined
                      required
                      dense
                      hide-details="auto"
                      :error-messages="errors"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>

              <v-row class="my-1">
                <v-col cols="12" md="4"><span class="white--text red darken-1 px-2 py-1 rounded">必須</span> メールマガジン</v-col>
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
                <v-btn large
                  class="my-4 mx-2 white--text"
                  color="secondary"
                  href="/myaccount"
                >戻る</v-btn>
                <v-btn large
                  :disabled="(ObserverProps.invalid)"
                  class="my-4 mx-2 white--text"
                  color="primary"
                  @click="update()"
                >変更</v-btn>
              </div>
            </v-container>
          </v-form>
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
      errFlg: null,
      doneFlg: null,
      userInfo: [],
      userNewInfo: {},
      prefect: ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県','その他'],
      loading:false
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    const userInfo = await this.getAccountInfo()
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
      this.$store.commit("breadCrumbs/addList", { name: "会員情報", path: "/myaccount" });
      this.$store.commit("breadCrumbs/addList", { name: "アカウント情報", path: "/myaccount" });
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
      console.log(res)
      if(res.data.Status==='TRUE'){
        this.userInfo = res.data.MemberInfo
      }else if(res.data.ErrorNo===100001){
        // 認証tokenの有効期限切れ
        this.$store.dispatch('auth/resetUser')
        this.$router.push('/login');
      }else if(res.data.ErrorNo===100002){
        // access認証token有効期限切れ
        const res = await this.$getAccessToken()
        this.getAccountInfo()
      }
    },
    async update(){
      this.$store.commit('loading/changeStatus', true)
      this.$set(this.userNewInfo, 'MemberName', this.userInfo.MemberName)
      this.$set(this.userNewInfo, 'Email', this.userInfo.Email)
      this.$set(this.userNewInfo, 'MemberType', this.userInfo.MemberType)
      this.$set(this.userNewInfo, 'DMFlg', this.userInfo.DMFlg)
      this.$set(this.userNewInfo, 'NecDocFlg','0')
      this.$set(this.userNewInfo, 'Organization', this.userInfo.Organization)
      this.$set(this.userNewInfo, 'Tel', this.userInfo.Tel)
      this.$set(this.userNewInfo, 'ZipCode', this.userInfo.ZipCode)
      this.$set(this.userNewInfo, 'Prefect', this.userInfo.Prefect)
      this.$set(this.userNewInfo, 'Address', this.userInfo.Address)

      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      const userNewInfo = JSON.stringify(this.userNewInfo);

      const param = new URLSearchParams()
      param.append('JsonData',userNewInfo)
      const res = await this.$memberAxios.put(`member/${loginID}`,param,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      console.log(res)
      if(res.data.Status === 'TRUE'){
        this.doneFlg = true
        this.errFlg = null
      }else if(res.data.ErrorNo === 100002){
        const res = await this.$getAccessToken()
        this.update()
      }else{
        this.errFlg = res.data.ErrorNo
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      this.$store.commit('loading/changeStatus', false)
    },
    async checkAddress(){
      this.loading = true
      const url = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode='
      const res = await this.$axios.get(url + this.userInfo.ZipCode)
      if (res.data.status !== 200 || !res.data.results) {
        this.userInfo.Prefect = ''
        this.userInfo.Address = ''
        this.loading = false
        return
      }
      this.userInfo.Prefect = res.data.results[0].address1
      this.userInfo.Address = res.data.results[0].address2+res.data.results[0].address3
      this.loading = false
    },
    reset() {
      this.$refs.form.reset()
      this.$refs.observer.reset()
    },
    toNum(e){
      return e.replace(/[０-９]/g, function(m) {
        return "０１２３４５６７８９".indexOf(m)
      }).replace(/-|ー/g,'')
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
.input-short{
  max-width: 225px;
}
</style>