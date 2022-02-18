<template>
  <header
    class="header d-flex align-center mt-6 mt-xl-10 px-4 px-xl-10 py-4 py-xl-8"
  >
    <a class="header__logo d-flex align-center" href="/">
      <img
        class="logo__img"
        src="@/assets/img/top/logo.png"
        alt="TAKENAKA the SOLID WATER"
      />
      <span class="logo__service text-body-2 no-wrap"
        >映像 / 音響機材の<br />レンタルサービス</span
      >
    </a>
    <nav class="header__menu d-flex justify-center align-center ml-auto">
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-icon class="mr-1">
              <v-icon color="primary">mdi-information-outline</v-icon>
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
            <v-list-item v-for="(list, index) in guidanceLists" :key="index">
              <v-list-item-content>
                <v-list-item-title class="text-body-2">{{
                  list.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-list flat>
        <v-list-item-group class="d-flex align-center">
          <v-list-item
            v-for="(list, index) in menuLists"
            :key="index"
            :to="list.link"
          >
            <v-list-item-icon class="mr-1">
              <v-icon color="primary">{{ list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-body-2">{{
                list.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </nav>
    <v-form class="header__form d-flex align-center ml-2">
      <v-text-field
        color="primary"
        placeholder="キーワード検索"
        outlined
        dense
        prepend-inner-icon="mdi-magnify"
        hide-details="auto"
      ></v-text-field>
      <v-btn color="primary" class="ml-2 text-body-2 text-white"
        ><v-icon class="mr-1" color="#fff">mdi-text-search</v-icon
        >詳細検索</v-btn
      >
    </v-form>
  </header>
</template>

<script>
export default {
  data() {
    return {
      guidanceLists: [
        { title: 'ご利用方法', link: '/' },
        { title: 'はじめての方へ', link: '/' },
        { title: 'よくある質問', link: '/' },
        { title: '用語集', link: '/' },
        { title: 'スクリーンサイズ表', link: '/' },
        { title: 'レンタル申込書', link: '/' },
        { title: '会社概要', link: '/' },
      ],
      menuLists: [
        {
          title: 'カテゴリからさがす',
          link: '/category',
          icon: 'mdi-shape-outline',
        },
        { title: '閲覧履歴', link: '/history', icon: 'mdi-history' },
        { title: 'お問い合わせ', link: '/inquiry', icon: 'mdi-email-outline' },
      ],
    }
  },
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

  &__logo {
    .logo__img {
      max-width: 210px;
      object-fit: contain;
    }
    .logo__service {
      display: inline-block;
      white-space: nowrap;
    }
  }

  &__logo:hover {
    opacity: 0.75;
  }
}
</style>
