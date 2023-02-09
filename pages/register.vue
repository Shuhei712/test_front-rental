<template>
  <section>
    <to-top-btn></to-top-btn>
    <component :is="child" :pass.sync="pass" :user.sync="user" :result.sync="result" :file.sync="file"></component>
  </section>
</template>
<script>

export default {
  data() {
    return {
      user: {},
      pass: '',
      result: '',
      file: [null,null,null]
    };
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
          return 'register-input'
        case '#confirm':
          return 'register-confirm'
        case '#complete':
          return 'register-complete'
        default:
          return 'register-input'
      }
    }
  },
  updated() {
    this.$scrollBackButton()
  },
}
</script>
