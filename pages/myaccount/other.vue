<template>
  <section v-if="!$fetchState.pending && !$fetchState.error">
    <to-top-btn></to-top-btn>
    <top-bar title="ヘルプ・その他" :bread-crumbs="breadCrumbs"></top-bar>
      <div class="sec__inner py-16">
        <ul>
          <li>
            <a href="">よくある質問</a>
          </li>
          <li>
            <a href="">お問い合わせ</a>
          </li>
        </ul>
        <!-- <v-row>
          <v-col
            cols="12" md="4"
            class="mb-4">
            <div class="px-3">
              <v-btn
                outlined
                block
                x-large
                >
                よくある質問
              </v-btn>
            </div>
          </v-col>
          <v-col
            cols="12" md="4"
            class="mb-4">
            <div class="px-3">
              <v-btn
                outlined
                block
                x-large
                >
                お問い合わせ
              </v-btn>
            </div>
          </v-col>
        </v-row> -->
      </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      breadCrumbs: [],
    }
  },
  fetch() {
    this.$store.commit('loading/changeStatus', true)
    this.setBreadCrumbs()
    this.$store.commit('loading/changeStatus', false)
  },
  head () {
    return {
      title: "ヘルプ・その他",
      meta: [
        { hid: 'description', name: 'description', content: 'ヘルプ・その他 | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。' }
      ]
    }
  },
  methods: {
    setBreadCrumbs() {
      this.$store.commit("breadCrumbs/deleteList");
      this.$store.commit("breadCrumbs/addList", { name: "会員情報", path: "/myaccount" });
      this.$store.commit("breadCrumbs/addList", { name: "ヘルプ・その他", path: "/myaccount/" });
      this.breadCrumbs = this.$store.getters["breadCrumbs/getLists"];
    },
  },
}
</script>

<style lang="scss" scoped>
.sec__inner {
  max-width: 1000px;
  margin: 0 auto;
  width: 95%;
}
</style>