<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="アカウント情報" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="register__inner py-16 px-3 px-lg-0">
      <ValidationObserver v-slot="ObserverProps" ref="observer">
        <v-form
          ref="form">
          <v-container>
            <register-input
              :user.sync="userUpInfo"
              :result.sync="result"
              :login-id="loginID"
              :member-info="userInfo"
              @mail-duplicate="mailDuplicateErr=$event"
            ></register-input>
            <div class="text-center mt-6">
              <v-btn
                :disabled="ObserverProps.invalid||mailDuplicateErr"
                class="my-4 mx-2 white--text"
                color="primary"
                :loading="loading"
                @click="update()"
              >変更する</v-btn>
            </div>
          </v-container>
        </v-form>
      </ValidationObserver>
    </div>
    <v-dialog v-model="resultDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <result-card
          :result="result"
          :action="'アカウント情報の変更'"
          :status="'done'"
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
      result: '',
      resultDialog: false,
      mailDuplicateErr: false
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
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.$store.commit('breadCrumbs/addList', { name: "アカウント情報", path: "/myaccount/info" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async getAccountInfo(){
      const res = await this.$getUserInfo()
      if(res){
        this.userInfo = res
        const arr = ['MemberType','MemberName','Organization','OrganizationKana','Department','OfficeName','SalesStaff','Tel','Fax','ZipCode','Prefect','Address','Email','DMFlg','MemberKana']
        arr.forEach((item) => {
          this.$set(this.userUpInfo, item, this.userInfo[item])
        })
        this.loginID = this.$store.getters['auth/getUser']
      }
    },
    async update(){
      this.loading = true
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
.width-s{
  max-width: 225px;
}
</style>
