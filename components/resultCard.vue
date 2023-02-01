<template>

  <div>
    <template v-if="result==='success'">
      <p class="text-left text-md-center mb-4">
        {{action}}を受付いたしました。
        <span v-if="action==='注文'">
          <br>
          申し込みいただいたレンタル商品の空き状況を確認の上、指定いただいた連絡方法にて、レンタルの可否をご連絡させていただきます。<br>
          <span class="red--text">（※注文は確定しておりません）</span>
        </span>
      </p>
      <v-btn
        color="outline"
        class="mx-3 white--text"
        :to=path>
        OK
      </v-btn>
    </template>
    <template v-else-if="result==='100001'">
      <p class="text-left text-md-center mb-4">セッションの有効期限が切れました。再度ログインしてください。</p>
      <v-btn
        color="outline"
        class="mx-3 white--text"
        @click="toLogin">
        ログイン画面へ
      </v-btn>
    </template>
    <template v-else>
      <p class="red--text text-left text-md-center mb-4">処理に失敗いたしました。<br>
      しばらくしてもう一度お試しいただくか、お問い合わせ下さい。</p>
      <v-btn
        color="outline"
        class="mx-3 white--text"
        @click="resultDialog=false">
        戻る
      </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    result: {
      type: String,
      required: false,
      default: null
    },
    action: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    resultDialog: {
      get(){
        return this.prop.dialog
      },
      set(val){
        this.$emit('update:dialog', val)
      }
    }
  },
  toLogin(){
    this.$store.dispatch('auth/resetUser')
    this.$router.push('/login')
  }
}
</script>