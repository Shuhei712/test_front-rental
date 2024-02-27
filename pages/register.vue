<template>
  <section id="top">
    <top-bar :title="title" :bread-crumbs="breadCrumbs"></top-bar>
    <to-top-btn></to-top-btn>
    <div class="register__inner py-16 px-3 px-lg-0">
      <component :is="child" :pass.sync="pass" :user.sync="user" :result.sync="result" :file.sync="file" @agree="checkbox=$event"></component>
    </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      user: {},
      pass: '',
      result: '',
      file: [null,null,null],
      title: '新規登録',
      checkbox: false
    }
  },
  fetch(){
    this.changeChild('新規登録','/register')

  },
  head() {
    return {
      title: "新規登録",
      meta: [
        { hid: "description", name: "description", content: "新規登録 | 大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。" }
      ]
    };
  },
  computed: {
    child(){
      switch(this.$route.hash){
        case '#input':
          this.changeChild('新規登録 入力','/register#input')
          return 'register-input'
        case '#confirm':
          this.changeChild('新規登録 確認','/register#confirm')
          return 'register-confirm'
        default:
          return 'register-top'
      }
    }
  },
  updated() {
    this.$scrollBackButton()
  },
  methods:{
    setBreadCrumbs(title, path) {
      this.$store.commit('breadCrumbs/deleteList')
      this.$store.commit('breadCrumbs/addList', { name: title, path })
      this.breadCrumbs = this.$store.getters['breadCrumbs/getLists']
    },
    changeChild(title, path){
      this.title = title
      this.setBreadCrumbs(title, path)
      if(!this.checkbox && this.$route.hash) this.$router.push('/register')
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
</style>
