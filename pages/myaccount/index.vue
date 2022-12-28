<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="マイページ" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <h2 class="pb-1 headingText--text">商品管理</h2>
      <v-divider class="mb-4"></v-divider>
      <v-row>
        <v-col
          v-for="item in menuItem" :key="item.title"
          cols="12" md="4"
          class="">
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
          cols="12" md="4"
          class="">
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
              ヘルプ・ガイド
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
              @click="(logoutFlg=true)">
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
              @click="(deleteFlg=true)">
              退会手続き
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog
      v-model="logoutFlg"
      width="500">
      <v-card class="pa-5 text-center">
        <p class="mb-4">ログアウトしますか？</p>
        <v-btn
          color="primary"
          class="mx-3"
          @click="logout">
          はい
        </v-btn>
        <v-btn
          color="outline"
          class="mx-3 white--text"
          @click="logoutFlg=false">
          いいえ
        </v-btn>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteFlg"
      width="500">
      <v-card class="pa-5 text-center">
        <p class="mb-4">本当に退会しますか？</p>
        <ul class="d-inline-block mb-4">
          <li>お気に入りや購入履歴が消失します。</li>
        </ul>
        <div>
          <v-btn
            color="primary"
            class="mx-3"
            @click="deleteAccount">
            はい
          </v-btn>
          <v-btn
            color="outline"
            class="mx-3 white--text"
            @click="deleteFlg=false">
            いいえ
          </v-btn>
        </div>
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
          title: 'お気にいり',
          path: 'myaccount/favorite'
        },
        {
          title: 'カート',
          path: 'myaccount/cart'
        },
        {
          title: '申し込み履歴',
          path: 'myaccount/order-history'
        },
      ],
      menuAccount: [
        {
          title: 'アカウント情報',
          path: 'myaccount/info'
        },
        {
          title: '本人確認',
          path: 'myaccount/identification'
        },
        {
          title: 'パスワード変更',
          path: 'myaccount/password'
        },
      ],
      logoutFlg:false,
      deleteFlg:false,
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
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
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit('breadCrumbs/addList', { name: "マイページ", path: "/myaccount" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
    async execAction(task){
      this.$store.commit('loading/changeStatus', true)
      const accessToken = this.$store.getters["auth/getAccessToken"]
      const loginID = this.$store.getters["auth/getUser"]
      let res;
      if(task==='logout'){
        res = await this.$memberAxios.get(`auth/logout/${loginID}` ,{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      }else if(task==='delete'){
        res = await this.$memberAxios.delete(`member/${loginID}` ,{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
      }

      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        this.$store.dispatch('auth/resetUser')
        this.$router.push('/');
      }else if(res.data.ErrorNo===100001){
        // 認証tokenの有効期限が切れています
        this.$store.dispatch('auth/resetUser')
        this.$router.push('/login');
      }else if(res.data.ErrorNo===100002){
        // access認証tokenの有効期限が切れています
        const res = await this.$getAccessToken()
        // this.logout()
        if(task==='logout'){
          this.logout()
        }else if(task==='delete'){
          this.deleteAccount()
        }
      }

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
</style>