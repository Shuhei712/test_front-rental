<template>
  <header id="header" class="header" :class="{ active: menuFlg }">
    <div class="header__inner">
      <div class="header__content d-flex justify-space-between px-4 px-xl-10 py-2 py-sm-3 py-xl-5">
        <a class="header__logo d-flex align-center hover-opacity" href="/">
          <span class="logo__img mr-3">
            <img class="logo--pc" src="/img/top/logo.svg" alt="TAKENAKA the SOLID WATER" />
            <img class="logo--sp" src="/img/sp/top/logo.svg" alt="TAKENAKA the SOLID WATER" />
          </span>
          <span class="logo__service text-caption text-gray">映像 / 音響機材の<br />レンタルサービス</span>
        </a>
        <div class="d-flex">
          <div class="header__main d-flex align-center">
            <nav class="menu">
              <ul class="main-menu d-flex">
                <li v-for="(root, index) in menuLists" :key="root.MenuTitle">
                  <!-- サブメニューあり -->
                  <div
                    v-if="root.MenuType === 0"
                    class="
                      main-menu__text
                      d-block d-lg-flex
                      justify-space-between
                      text-body-2 text-gray
                      py-4 py-lg-2
                      px-2
                    "
                    :class="{ active: subMenuFlg[index] }"
                    :href="root.ActionURL"
                    @click="toggleSubMenu(index)"
                    @mouseover="!isMobile ? openSubMenu(index) : null"
                    @mouseleave="!isMobile ? closeSubMenu(index) : null">
                    <div class="d-flex justify-space-between align-center">
                      <span class="d-flex align-center">
                        <v-icon class="mr-1" color="primary">{{ root.IconImageURL }}</v-icon>
                        {{ root.MenuTitle }}
                      </span>
                      <span class="main-menu__trigger">
                        <v-icon>{{ subMenuFlg[index] === true ? 'mdi-minus' : 'mdi-plus' }}</v-icon>
                      </span>
                    </div>
                    <!-- サブメニュー部分 -->
                    <ul
                      v-if="root.MenuType === 0"
                      class="sub-menu mt-0 mt-lg-3 mt-xl-5"
                      :class="{ show: subMenuFlg[index] }">
                      <li v-for="child in root.SubMenuList" :key="child.MenuTitle" class="px-7 my-2">
                        <sub-menu :menu-type="child.MenuType" :action-url="child.ActionURL" :title="child.MenuTitle">
                        </sub-menu>
                      </li>
                    </ul>
                  </div>
                  <!-- サブメニューなし -->
                  <div v-else>
                    <no-sub-menu
                      :menu-type="root.MenuType"
                      :action-url="root.ActionURL"
                      :icon-image-url="root.IconImageURL"
                      :title="root.MenuTitle">
                    </no-sub-menu>
                  </div>
                </li>
              </ul>
            </nav>
            <v-form class="header__search d-flex align-center mt-5 mt-lg-0 ml-lg-2" @submit.prevent>
              <v-text-field
                v-model="keyword"
                color="primary"
                placeholder="キーワード検索"
                outlined
                dense
                hide-details="auto"
                @keyup.enter="searchKeyword"></v-text-field>
              <v-btn color="primary"
                max-width="40"
                min-width="53"
                class="text-white ml-2"
                :href="'/products?type=3&keyword=' + keyword">
                <v-icon class="mr-1" color="#fff">mdi-magnify</v-icon>
              </v-btn>
            </v-form>
            <div v-if="isLogin" class="header__login--active d-flex text-center py-4 py-lg-0 ms-2">
              <router-link
                tag="a"
                class="d-flex flex-column px-1"
                to="/myaccount" exact>
                <v-icon color="secondary">mdi-account</v-icon>
                <span class="caption">マイページ</span>
              </router-link>
              <router-link
                tag="a"
                class="d-flex flex-column px-1"
                to="/myaccount/favorite" exact>
                <v-icon color="secondary">mdi-heart</v-icon>
                <span class="caption">お気に入り</span>
              </router-link>
              <router-link
                tag="a"
                class="d-flex flex-column px-1"
                to="/myaccount/cart" exact>
                <v-icon color="secondary">mdi-cart</v-icon>
                <span class="caption">カート</span>
              </router-link>
            </div>
            <div v-else class="header__login--active ms-3 py-4 py-lg-0">
              <v-btn outlined small href="/login"> ログイン </v-btn>
              <v-btn small color="accent" class="text-white" href="/register"> 新規登録 </v-btn>
            </div>
            <div class="header__corporate--sp">
              <a
                class="d-flex align-center justify-center hover-opacity mt-10 text-caption"
                href="https://www.takenaka-co.co.jp/"
                target="_blank"
                rel="noopener noreferrer">
                <v-icon class="mr-2" color="#1A264B" small>mdi-login-variant</v-icon>
                <span>株式会社タケナカ <span class="word-keep">コーポレートサイトへ</span></span>
              </a>
            </div>
          </div>
          <div class="header__icon align-center">
            <div class="icon__search">
              <v-btn class="mr-3" color="primary" icon large @click="toggleSearchWindow()">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </div>
            <div class="hamburger d-flex flex-column align-center justify-space-between" @click="toggleMenu()">
              <div class="hamburger__line">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="hamburger__text">menu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$route.path === '/' || $route.path === 'index'" class="header__corporate--pc">
      <a
        class="hover-opacity d-flex align-center text-caption letter-space-03em mr-2 mr-xl-5"
        href="https://www.takenaka-co.co.jp/"
        target="_blank"
        rel="noopener noreferrer">
        <v-icon class="mb-2" color="#1A264B" small>mdi-login-variant</v-icon>株式会社タケナカ
      </a>
    </div>
    <div id="search-window" class="search-window" :class="{ show: searchWindowFlg }">
      <div class="search-window__inner px-4 px-xl-10 py-2 py-sm-3 py-xl-5">
        <div class="text-right">
          <v-btn icon large @click="toggleSearchWindow()">
            <v-icon large color="lightGray">mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <v-form class="d-flex align-center" @submit.prevent>
          <v-text-field
            ref="searchWindow"
            v-model="keyword"
            color="primary"
            placeholder="キーワード検索"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            hide-details="auto"
            @keyup.enter="searchKeyword"></v-text-field>
          <v-btn color="primary" class="text-white ml-2" :href="'/products?type=3&keyword=' + keyword">
            <v-icon class="mr-1" color="#fff">mdi-text-search</v-icon>詳細検索
          </v-btn>
        </v-form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      keyword: undefined,
      windowWidth: '',
      scrollPosition: 0,
      isClient: process.client,
      menuFlg: false,
      subMenuFlg: [],
      searchWindowFlg: false,
      memberNav: null
    }
  },
  computed: {
    menuLists() {
      return this.$store.getters['menu/getLists']
    },
    isMobile() {
      const headerBP = 1263
      if (this.windowWidth < headerBP) {
        return true
      } else {
        return false
      }
    },
    isLogin() {
      return this.$store.getters['auth/getAuthToken']
    },
  },
  mounted() {
    this.$store.dispatch('menu/getLists')
    this.subMenuFlg = Array(this.menuLists.length).fill(false)
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.resizeWindow)
    if (this.isClient) {
      window.addEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    toggleMenu() {
      this.menuFlg = !this.menuFlg
    },
    toggleSubMenu(index) {
      this.subMenuFlg.splice(index, 1, !this.subMenuFlg[index])
    },
    openSubMenu(index) {
      this.subMenuFlg.splice(index, 1, true)
    },
    closeSubMenu(index) {
      this.subMenuFlg.splice(index, 1, false)
    },
    toggleSearchWindow() {
      this.searchWindowFlg = !this.searchWindowFlg
      if (this.searchWindowFlg) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.searchWindow.$refs.input.focus()
          }, 100)
        })
      } else {
        this.keyword = undefined
      }
    },
    resizeWindow() {
      const headerBP = 1263
      this.windowWidth = window.innerWidth
      // PC用メニュー表示の時
      if (this.windowWidth > headerBP) {
        // 検索窓を閉じるようにする
        if (this.searchWindowFlg) {
          this.searchWindowFlg = false
        }
        // SP用メニューのactiveは外す
        if (this.menuFlg) {
          this.menuFlg = false
        }
        // SP用メニュー表示の時 サブメニュー開いたままの場合は閉じる
      } else if (this.subMenuFlg) {
        this.subMenuFlg.fill(false)
      }
    },
    onScroll() {
      const headerElm = window.document.getElementById('header')
      const scroll = window.scrollY
      if (this.scrollPosition < scroll) {
        if (!this.menuFlg) {
          headerElm.classList.add('is-scroll')
        }
      } else {
        headerElm.classList.remove('is-scroll')
      }
      this.scrollPosition = scroll
    },
    searchKeyword() {
      window.location.href = '/products?type=3&keyword=' + this.keyword
    },
    logout() {
      return false
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

ul {
  list-style: none;
}

.header {
  width: 100%;
  position: relative;
  z-index: 500;

  &__inner {
    top: calc(30 / 1920 * 100vw);
    width: 100%;
    position: fixed;
    transition: top 0.4s;

    @include mq(sm) {
      top: 5px;
    }
  }
  &__member {
    width: 95%;
    max-width: 1700px;
    margin: 0 auto;
  }

  &__content {
    border-radius: 10px;
    box-shadow: 3px 5px 5px rgba(#5b0d0d, 15%);
    background-color: #fff;
    width: 95%;
    max-width: 1700px;
    margin: 0 auto;

    @include mq(sm) {
      border-radius: 2px;
    }
  }

  &__logo {
    .logo__img {
      display: flex;
      max-width: 200px;

      @include mq(sm) {
        max-width: 55px;
      }
    }
    img {
      width: 100%;
    }
    .logo--pc {
      @include mq(sm) {
        display: none;
      }
    }
    .logo--sp {
      display: none;

      @include mq(sm) {
        display: block;
      }
    }
    .logo__service {
      display: inline-block;
      white-space: nowrap;

      @include mq(sm) {
        font-size: 10px !important;
      }
    }
  }

  &__main {
    background-color: rgba(#fff, 95%);

    @include mq(lg) {
      flex-direction: column !important;
      width: 100%;
      min-height: 100vh;
      top: 0;
      left: 100%;
      position: fixed;
      transition: left 0.4s;
    }
  }

  .menu {
    @include mq(lg) {
      width: 95%;
    }

    .main-menu {
      @include mq(lg) {
        flex-direction: column !important;
        width: 100%;
        padding-top: 100px;
      }
      @include mq(sm) {
        padding-top: calc(5px + 60px + 10px); // top + header高さ + 余白
      }

      > li {
        position: relative;

        @include mq(lg) {
          &:not(:last-child) {
            border-bottom: 1px solid $line;
          }
        }
      }

      .main-menu__text {
        font-weight: 700;
        cursor: pointer;
        transition: color 0.4s;

        @include mq(lg) {
          font-weight: 400;
        }

        &.active,
        &:hover {
          color: #dd6743 !important;

          .v-icon {
            color: #dd6743 !important;
          }
        }
      }

      .main-menu__trigger {
        display: none;

        @include mq(lg) {
          display: block;
        }
      }
    }

    .sub-menu {
      background-color: #fff;
      border-radius: 0 0 5px 5px;
      box-shadow: 3px 5px 5px rgba(#5b0d0d, 15%);
      opacity: 0;
      visibility: hidden;
      width: 230px;
      position: absolute;
      top: 100%;
      transition: opacity 0.4s, visibility 0.4s;

      &.show {
        opacity: 1;
        visibility: visible;
      }

      @include mq(lg) {
        background-color: transparent;
        border-radius: 0;
        box-shadow: none;
        width: 100%;
        display: none;
        padding-top: 10px;
        position: relative;

        &.show {
          display: block;
        }
      }

      &__text {
        transition: color 0.4s;

        &:hover {
          color: #dd6743 !important;

          .v-icon {
            color: #dd6743 !important;
          }
        }
      }
    }
  }

  &__search {
    flex: 1;
    max-width: 220px;

    @include mq(lg) {
      flex: none;
      width: 95%;
      max-width: none;
    }
  }

  &__corporate--pc,
  &__corporate--sp {
    a {
      color: #1a264b !important;
    }
  }

  &__corporate--pc {
    text-orientation: sideways;
    white-space: nowrap;
    writing-mode: vertical-rl;
    top: calc(30 / 1920 * 100vw);
    right: 0;
    position: absolute;

    @include mq(lg) {
      display: none;
    }

    .v-icon {
      writing-mode: horizontal-tb;
    }
  }

  &__corporate--sp {
    display: none;

    @include mq(lg) {
      display: block;
      width: 95%;
    }
  }

  .header__icon {
    display: none;

    @include mq(lg) {
      display: flex;
    }
  }

  .hamburger {
    cursor: pointer;
    z-index: 1;

    &__line {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30px;
      height: 20px;

      span {
        background-color: $primary;
        border-radius: 2px;
        display: inline-block;
        width: 100%;
        height: 2px;
        transition: all 0.4s;
      }
    }
    &__text {
      font-size: 10px !important;
      line-height: $leading-tight;
      user-select: none;
      -moz-user-select: none; // Firefox
      -webkit-user-select: none; // Safariなど
      -ms-user-select: none; // Edge,IE
    }
  }

  .search-window {
    background-color: #fff;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    left: 0;
    top: 0;
    position: fixed;
    transition: opacity 0.4s, visibility 0.4s;

    .search-window__inner {
      width: 95%;
      margin: 0 auto;
    }

    &.show {
      opacity: 1;
      visibility: visible;
    }
  }
}

// ハンバーガーメニューを開いたとき
.header.active {
  .hamburger {
    .hamburger__line {
      span:nth-of-type(1) {
        transform: translateY(8px) rotate(-45deg);
      }

      span:nth-of-type(2) {
        opacity: 0;
      }

      span:nth-of-type(3) {
        transform: translateY(-10px) rotate(45deg);
      }
    }
  }

  .header__main {
    @include mq(lg) {
      left: 0;
    }
  }

  .icon__search {
    z-index: -1;
  }
}
.header.is-scroll {
  .header__inner {
    top: 0;
    transition: top 0.4s;
  }
}
.nuxt-link-exact-active{
  color: $primary !important;
}
.nuxt-link-exact-active .v-icon{
  color: $primary !important;
}
</style>
