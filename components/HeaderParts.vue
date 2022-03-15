<template>
  <header class="header d-flex align-center mt-6 mt-xl-10 px-4 px-xl-10 py-4 py-xl-8">
    <a class="header__logo d-flex align-center" href="/">
      <img class="logo__img" src="@/assets/img/top/logo.png" alt="TAKENAKA the SOLID WATER" />
      <img class="logo__img--sp mr-2" src="/img/sp/top/logo.png" alt="TAKENAKA the SOLID WATER" />
      <span class="logo__service text-body-2 no-wrap">映像 / 音響機材の<br />レンタルサービス</span>
    </a>
    <nav class="header__menu d-flex justify-center align-center ml-auto">
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-list-item v-bind="attrs" v-on="on">
            <v-list-item-icon class="mr-1">
              <v-icon color="primary">mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-body-2">レンタルご利用案内</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(list, index) in guidanceLists" :key="index">
              <v-list-item-content>
                <v-list-item-title class="text-body-2">{{ list.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-list flat>
        <v-list-item-group class="d-flex align-center">
          <v-list-item v-for="(list, index) in menuLists" :key="index" :to="list.link">
            <v-list-item-icon class="mr-1">
              <v-icon color="primary">{{ list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="text-body-2">{{ list.title }}</v-list-item-title>
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
        hide-details="auto"></v-text-field>
      <v-btn color="primary" class="ml-2 text-body-2 text-white" to="/products"
        ><v-icon class="mr-1" color="#fff">mdi-text-search</v-icon>詳細検索</v-btn
      >
    </v-form>
    <v-spacer class="hidden-lg-and-up"></v-spacer>
    <div class="header__icon d-flex align-center">
      <v-btn text><v-icon color="primary" large>mdi-magnify</v-icon></v-btn>
      <div class="icon__trigger d-flex flex-column align-center" @click="toggleMenu()">
        <div class="trigger__humberger" :class="{ active: menuFlg }">
          <span></span>
          <span></span>
          <span></span>
        </div>
        menu
      </div>
    </div>
    <nav class="header__menu--sp mt-n6 mt-xl-n10" :class="{ active: menuFlg }">
      <v-list class="menu__lists">
        <v-list-group :value="false">
          <template #activator>
            <v-list-item-icon>
              <v-icon>mdi-information-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>レンタルご利用案内</v-list-item-title>
          </template>
          <v-list-item v-for="(list, index) in guidanceLists" :key="index" link>
            <v-list-item-title>{{ list.title }}</v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <v-list-item v-for="(list, index) in menuLists" :key="index" :to="list.link" class="px-0" link>
          <v-list-item>
            <v-list-item-icon
              ><v-icon>{{ list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ list.title }}
            </v-list-item-title>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item>
      </v-list>
      <v-row class="menu__search mt-5 pa-2" justify="center" no-gutters>
        <v-col cols="8"
          ><v-text-field
            class="mr-3"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"></v-text-field
        ></v-col>
        <v-col cols="4">
          <v-btn color="primary" class="text-body-2 text-white" to="/products" block
            ><v-icon class="mr-1" color="#fff">mdi-text-search</v-icon>詳細検索</v-btn
          ></v-col
        >
      </v-row>
      <div class="menu__corporate text-center mt-10">
        <a
          class="hover-opacity mt-10 mt-md-0 text-center"
          href="https://www.takenaka-co.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
          ><v-icon class="mr-2" color="#1A264B">mdi-login-variant</v-icon
          ><span class="text-body-2">株式会社タケナカ コーポレートサイトへ</span></a
        >
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menuFlg: false,
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
  methods: {
    toggleMenu() {
      this.menuFlg = !this.menuFlg
    },
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
  z-index: 100;
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

      @include mq(sm) {
        display: none;
      }
    }

    .logo__img--sp {
      display: none;

      @include mq(sm) {
        max-width: 55px;
        display: inline-block;
      }
    }

    .logo__service {
      display: inline-block;
      white-space: nowrap;
    }
  }

  &__logo:hover {
    opacity: 0.75;
  }

  .header__menu {
    @include mq(lg) {
      display: none !important;
    }
  }

  .header__form {
    @include mq(lg) {
      display: none !important;
    }
  }

  .header__icon {
    display: none !important;

    @include mq(lg) {
      display: flex !important;
    }

    .icon__trigger {
      cursor: pointer;
      z-index: 110;
    }

    .trigger__humberger {
      position: relative;
      width: 26px;
      height: 26px;

      span {
        position: absolute;
        left: 0;
        height: 2px;
        width: 26px;
        background-color: $primary;
        border-radius: 2px;
        display: inline-block;
        transition: all 0.4s;
      }

      span:nth-of-type(1) {
        bottom: 16px;
      }

      span:nth-of-type(2) {
        bottom: 8px;
      }

      span:nth-of-type(3) {
        bottom: 0px;
      }
    }

    .trigger__humberger.active {
      span:nth-of-type(1) {
        transform: translateY(8px) rotate(-45deg);
      }

      span:nth-of-type(2) {
        opacity: 0;
      }

      span:nth-of-type(3) {
        transform: translateY(-8px) rotate(45deg);
      }
    }
  }

  .header__menu--sp {
    position: fixed;
    top: 0%;
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 100;
    width: 110%;
    background-color: rgba($color: #ffffff, $alpha: 0.95);
    padding: 100px 20px 50px;
    transition: all 0.75s ease-in-out;
    overflow: hidden;

    .v-list {
      background-color: transparent !important;
    }

    .menu__corporate {
      span {
        color: #1a264b;
      }
    }
  }

  .header__menu--sp.active {
    transform: translate(-50%, 0%);
  }
}
</style>
