<template>
  <section id="top" class="py-16">
    <to-top-btn></to-top-btn>
    <div class="text-center py-16 red--text">
      <h1 class="py-3 mb-4">処理に失敗いたしました。</h1>
      <p class="mb-2 text-left text-md-center">
        既にログインされているため、処理を実行できません。<br>
        ログアウトして、再度お試しください。
      </p>
    </div>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: "処理失敗",
      meta: [
        { hid: "robots", name: "robots", content: "noindex" }
      ]
    }
  }
}
</script>
