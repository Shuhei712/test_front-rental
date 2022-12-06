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
                @click="logoutConfirm">
                ログアウト
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
      logoutFlg:false
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
    logoutConfirm(){
      this.logoutFlg = true
    },
    async logout(){
      const accessKey = this.$store.getters["auth/getAccessToken"]
      const res = await this.$memberAxios.get('/auth/logout' ,{
        headers: {
          Authorization: `Bearer ${accessKey}`
        }
      })
      console.log(res)
      this.$store.dispatch('auth/resetUser')
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