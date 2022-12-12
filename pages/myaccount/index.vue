<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="会員情報" :bread-crumbs="breadCrumbs"></top-bar>
    <div class="sec__inner py-16">
      <v-row>
        <v-col
          v-for="item in menu" :key="item.title"
          cols="4"
          class="mb-4">
          <div class="px-3">
            <v-btn
              outlined
              block
              x-large
              :href=item.path>
              {{item.title}}
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="4"
          class="mb-4">
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
      <v-row>
        <v-col
          cols="4"
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
      menu: [
        {
          title: 'アカウント情報',
          path: 'myaccount/edit'
        },
        {
          title: 'お気にいり',
          path: 'myaccount/favorite'
        },
        {
          title: '本人確認',
          path: 'myaccount/identification'
        },
        {
          title: 'パスワード変更',
          path: 'myaccount/password'
        },
        {
          title: 'ヘルプ・その他',
          path: 'myaccount/delete'
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
      title: "会員情報",
      meta: [
        { hid: 'description', name: 'description', content: '会員情報 | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit("breadCrumbs/addList", { name: "会員情報", path: "/myaccount" });
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
      console.log(res)
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
          this.logout('logout')
        }else if(task==='delete'){
          this.logout('delete')
        }
      }

      this.$store.commit('loading/changeStatus', false)
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