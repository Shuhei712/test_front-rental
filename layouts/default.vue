<template>
  <v-app>
    <header
      class="header mt-6 mt-xl-10 px-4 px-xl-10 py-4 py-xl-8 d-flex align-center"
    >
      <a class="header__link d-flex align-center" href="/">
        <img
          class="header-logo"
          src="@/assets/img/top/logo.png"
          alt="TAKENAKA the SOLID WATER LOGO"
        />
        <span class="header-service text-body-2"
          >映像 / 音響機材の<br />レンタルサービス</span
        >
      </a>
      <nav class="header__menu d-flex justify-center align-center ml-auto">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-on="on" v-bind="attrs">
              <v-list-item-icon class="mr-1">
                <v-icon>mdi-information-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2"
                  >レンタルご利用案内</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-content>
                  <v-list-item-title class="text-body-2">{{
                    item.title
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
        <v-list flat>
          <v-list-item-group class="d-flex">
            <v-list-item to="/category">
              <v-list-item-icon class="mr-1">
                <v-icon>mdi-shape-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2"
                  >カテゴリからさがす</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/history">
              <v-list-item-icon class="mr-1">
                <v-icon>mdi-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2"
                  >閲覧履歴</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item to="/inquiry">
              <v-list-item-icon class="mr-1">
                <v-icon>mdi-email-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="text-body-2"
                  >お問い合わせ</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </nav>
      <v-form class="d-flex align-center ml-2">
        <v-text-field
          color="main"
          placeholder="キーワード検索"
          outlined
          dense
          prepend-inner-icon="mdi-magnify"
          hide-details="auto"
        ></v-text-field>
        <v-btn color="main" class="ml-2 text-body-2 text-white"
          ><v-icon class="mr-1" color="#fff">mdi-text-search</v-icon
          >詳細検索</v-btn
        >
      </v-form>
    </header>
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'ご利用方法', link: '/' },
      { title: 'はじめての方へ', link: '/' },
      { title: 'よくある質問', link: '/' },
      { title: '用語集', link: '/' },
      { title: 'スクリーンサイズ表', link: '/' },
      { title: 'レンタル申込書', link: '/' },
      { title: '会社概要', link: '/' },
    ],
  }),
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.header {
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  z-index: 999;
  width: 95%;
  max-width: 1700px;
  height: auto;
  max-height: 100px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 3px 5px 5px 0px rgba($color: #5b0d0d, $alpha: 0.15);

  &__link {
    .header-logo {
      max-width: 210px;
      object-fit: contain;
    }
    .header-service {
      display: inline-block;
      white-space: nowrap;
    }
  }

  &__link:hover {
    opacity: 0.75;
  }
}
</style>
