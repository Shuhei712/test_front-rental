<template>

  <div>
    <template v-if="result==='success'">
      <div class="text-left text-md-center mb-4">
        <p v-if="status==='done'">
          {{ action }}を完了いたしました。
        </p>
        <p v-else>
          {{action}}を承りました。
          <template v-if="action==='レンタル申し込み'">
            <br>お申し込みいただいたレンタル商品の空き状況を確認の上、指定いただいた連絡方法にて、<span class="d-inline-block">レンタルの可否をご連絡させていただきます。</span><br>
            <span class="red--text">（※注文はまだ確定しておりません）</span>
          </template>
          <template v-if="action==='注文依頼'">
            <!-- <br>ご登録いただいたメールアドレスに、確認メールを送信しました。<br>
            メールが届かない場合は、しばらくしてもう一度お試しいただくか、<span class="d-inline-block">弊社までお問い合わせ下さい。</span><br>
            <v-divider class="my-3"></v-divider> -->
            <br>
            ご注文の内容を確認後、注文完了メールを送信いたします。<br>
            注文完了メールが届きましたら、注文確定となります。
          </template>
          <template v-else-if="action==='申し込みのキャンセル'||action==='本人確認の登録'">
            <br>
            ご登録いただいたメールアドレスに確認メールを送信しましたので、ご確認ください。
          </template>
          <template v-else-if="action==='パスワード変更依頼'">
            <br>ご登録いただいたメールアドレスに通知メールを送信しましたので、
            <span class="d-inline-block">メールに記載されている認証URLにアクセスし、パスワードの変更をお願いいたします。</span>
          </template>
          <template v-else-if="action==='新規登録'"><br>
            ご登録いただいたメールアドレスに確認メールを送信しました。<br>メールに記載されている認証URLにアクセスすると本登録が完了いたします。<br>
            （<span class="red--text">※まだ仮登録の状態となります</span>）
          </template>
          <template v-else-if="action==='お問い合わせ'">
            <br>ご登録いただいたメールアドレスに受付完了メールを送信いたしました。
            <!-- メールが届かない場合は、しばらくしてもう一度お試しいただくか、<span class="d-inline-block">弊社までお問い合わせ下さい。</span> -->
          </template>
          <template v-if="action==='退会'">
            <br>ご登録いただいたメールアドレスに、退会完了メールを送信いたしました。<br>またのご利用をお待ちしております。
          </template>
          <span class="text-caption text-left d-inline-block">
            <br>
            通知メールが届かない場合、迷惑メールフォルダに届いているか、処理が正常に行われていない可能性があります。<br>
            大変お手数ですが、再度お試しいただくか、<a href="https://www.takenaka-co.co.jp/contact/" target="_blank" class="link">お問い合わせ</a>ください。<br>
            ※「takenaka-co.co.jp」からのメールを受信出来るように設定をお願いします。
          </span>
        </p>
      </div>
      <v-btn
        v-if="path==='stay'"
        color="outline"
        class="mx-3 white--text"
        @click="resultDialog=false">
        閉じる
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
        閉じる
      </v-btn>
      <v-btn
        color="primary"
        class="mx-3 white--text"
        href="https://www.takenaka-co.co.jp/contact/" target="_blank">
        お問い合わせ
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
    status:{
      type: String,
      required: false,
      default: null
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
