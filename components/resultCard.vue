<template>

  <div>
    <template v-if="result==='success'">
      <p class="text-left text-md-center mb-4">
        {{action}}を承りました。
        <template v-if="action==='注文'">
          <br>申し込みいただいたレンタル商品の空き状況を確認の上、指定いただいた連絡方法にて、レンタルの可否をご連絡させていただきます。<br>
          <span class="red--text">（※注文は確定しておりません）</span>
        </template>
        <template v-else-if="action==='パスワード変更依頼'">
          <br>登録されているメールアドレスに、通知メールを送信しましたので、
          <span class="d-inline-block">メールに記載されているURLにアクセスし、パスワードの変更をお願いいたします。</span>
        </template>
        <template v-else-if="action==='新規登録'"><br>
          ご登録いただいたメールアドレスに確認メールを送信しました。<br>メールに記載されているURLにアクセスすると本登録が完了いたします。<br>
          （<span class="red--text">※まだ仮登録の段階になります</span>）
        </template>
        <template v-else-if="action==='フォームの送信'">
          <br>ご登録いただいたメールアドレスに受付完了メールを送信いたしました。<br>
          メールが届かない場合は、しばらくしてもう一度お試しいただくか、<span class="d-inline-block">弊社までお問い合わせ下さい。</span>
        </template>
      </p>
      <v-btn
        v-if="path==='stay'"
        color="outline"
        class="mx-3 white--text"
        @click="resultDialog=false">
        戻る
      </v-btn>
      <v-btn
        v-else
        color="outline"
        class="mx-3 white--text"
        :to=path>
        OK
      </v-btn>
    </template>
    <template v-else-if="result==='100001'">
      <p class="red--text text-left text-md-center mb-4">セッションの有効期限が切れました。再度ログインしてください。</p>
      <v-btn
        color="outline"
        class="mx-3 white--text"
        @click="toLogin">
        ログイン画面へ
      </v-btn>
    </template>
    <template v-else-if="result==='110802'||result==='111102'">
      <p class="red--text text-left text-md-center mb-4">既にパスワード変更の処理が行われました。</p>
      <v-btn
        color="outline"
        class="mx-3 white--text"
        :to=path>
        OK
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
        return this.dialog
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