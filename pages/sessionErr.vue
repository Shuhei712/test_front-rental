<template>
  <div>
    <section class="session py-16 px-3">
      <div class="px-3 py-16 text-center">
        <p class="red--text text-left text-md-center pt-16 mb-7">セッションの有効期限が切れました。再度ログインしてください。</p>
        <v-btn
          color="outline"
          class="mx-3 white--text"
          :to="'/login'">
          ログイン画面へ
        </v-btn>
      </div>
    </section>
  </div>
</template>
