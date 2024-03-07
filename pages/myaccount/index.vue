<template>
  <section v-if="!$fetchState.pending && !$fetchState.error" id="top">
    <to-top-btn></to-top-btn>
    <top-bar title="マイページ" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <h2 class="pb-1 headingText--text">商品管理</h2>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col
          v-for="item in menuItem" :key="item.title"
          cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              :to=item.path>
              {{item.title}}
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <h2 class="pt-12 pb-1 headingText--text">アカウント管理</h2>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col
          v-for="item in menuAccount" :key="item.title"
          cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              :to=item.path>
              {{item.title}}
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              :disabled="user.RentalFlg!==0&&user.RentalFlg!==9"
              :to="'/myaccount/identification'">本人確認
              <v-badge
                :color="idStatusColor"
                :content="idStatus"
                class="font-weight-regular pointer-none"
                inline
              ></v-badge>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <h2 class="pt-12 pb-1 headingText--text">その他</h2>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col
          cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              to="myaccount/other">
              ヘルプ・お問い合わせ
            </v-btn>
          </div>
        </v-col>
        <v-col
          cols="12" md="4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              @click="(logoutDialog=true)">
              ログアウト
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mt-12 mb-4"></v-divider>
      <v-row>
        <v-col
          cols="12" md="4"
          class="mb-4">
          <div class="px-3">
            <v-btn
              block
              x-large
              color="#cdcece"
              @click="setDeleteDialog">
              退会手続き
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="logoutDialog"
      class="popup"
      width="500"
      persistent>
      <v-card class="pa-5 text-center">
        <p class="mb-4">ログアウトしますか？</p>
        <v-btn
          color="primary"
          class="mx-3"
          :loading="loading"
          @click="logout">
          ログアウトする
        </v-btn>
        <v-btn
          color="outline"
          class="mx-3 white--text"
          :disabled="loading"
          @click="logoutDialog=false">
          戻る
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteDialog"
      width="780"
      persistent>
      <v-card class="pa-5 text-center">
        <template v-if="result">
          <result-card
            :result="result" :action="'退会'"
            :path="'/'" :dialog.sync="deleteDialog">
          </result-card>
        </template>
        <template v-else>
          <p class="mb-4">退会しますか？</p>
          <ul class="d-inline-block mb-4">
            <li>お気に入りや購入履歴が消失します。</li>
          </ul>
          <div>
            <v-btn
              color="primary"
              class="mx-3"
              :loading="loading"
              @click="deleteAccount">
              退会する
            </v-btn>
            <v-btn
              color="outline"
              class="mx-3 white--text"
              :disabled="loading"
              @click="deleteDialog=false">
              戻る
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>

export default {

  data() {
    return {
      breadCrumbs: [],
      menuItem: [
        {
          title: 'お気に入り',
          path: '/myaccount/favorite'
        },
        {
          title: 'カート',
          path: '/myaccount/cart'
        },
        {
          title: '注文履歴',
          path: '/myaccount/order-history'
        },
      ],
      menuAccount: [
        {
          title: 'アカウント情報',
          path: '/myaccount/info'
        },
        // {
        //   title: '本人確認',
        //   path: '/myaccount/identification'
        // },
        {
          title: 'パスワード変更',
          path: '/myaccount/password'
        },
      ],
      user: null,
      logoutDialog: false,
      deleteDialog: false,
      loading: false,
      result: null
    }
  },
  async fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.user = await this.$getLoginInfo()
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "マイページ",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  },
  computed:{
    idStatus(){
      switch(this.user.RentalFlg){
        case 0:
          return '未提出'
        case 1:
          return '確認済み'
        case 5:
          return '申請中'
        case 9:
          return '不備あり'
        default:
          return '未提出'
      }
    },
    idStatusColor(){
      switch(this.user.RentalFlg){
        case 0:
          return 'red'
        case 1:
          return 'green'
        case 5:
          return 'blue'
        default:
          return 'red'
      }
    },
  },
  updated() {
    this.$scrollBackButton()
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async execAction(task){
      this.loading = true
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      let res;
      const headers = { headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      if(task==='logout'){
        res = await this.$memberAxios.get(`auth/logout/${loginID}`, headers)
        this.$setLog('会員', 'ログアウト', res.data.Status)
      }else if(task==='delete'){
        res = await this.$memberAxios.delete(`member/${loginID}`, headers)
        this.$setLog('会員', '退会', res.data.Status)
      }

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        this.$store.dispatch('auth/resetUser')
        if(task==='logout') this.$router.push('/')
        this.result = 'success'
      }else if(res.data.ErrorNo===100002){
        // access認証tokenの有効期限が切れています
        const res = await this.$getAccessToken()
        if( res ) return this.execAction(task)
      }else {
        this.result = String(res.data.ErrorNo)
      }

    },
    setDeleteDialog(){
      this.result = null
      this.deleteDialog = true
    },
    logout(){
      this.execAction('logout')
    },
    deleteAccount(){
      this.execAction('delete')
    }
  },
}
</script>
<style lang="scss" scoped>
.sec__inner {
  max-width: 1200px;
  margin: 0 auto;
  width: 95%;
}
.pointer-none{
  ::v-deep.v-badge__badge{
    pointer-events: none;
  }
}
</style>
