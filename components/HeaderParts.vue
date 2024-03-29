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
                    class="main-menu__text d-block d-lg-flex justify-space-between text-body-2 text-gray py-4 py-lg-2 px-2"
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
            <v-form class="header__search d-flex mt-5 mt-lg-0 ml-lg-2" @submit.prevent>
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
                height="auto"
                elevation="0"
                class="text-white ml-2"
                :href="'/products?type=3&page=1&keyword=' + keyword">
                <v-icon color="#fff">mdi-magnify</v-icon>
              </v-btn>
            </v-form>
            <div v-if="isLogin" class="header__member d-flex text-center py-6 py-lg-0 ms-2">
              <a
                class="d-flex flex-column px-1 hover-opacity"
                href="/myaccount">
                <v-icon color="secondary">mdi-account</v-icon>
                <span class="caption">マイページ</span>
              </a>
              <a
                class="d-flex flex-column px-1 hover-opacity"
                href="/myaccount/favorite">
                <v-icon color="secondary">mdi-heart</v-icon>
                <span class="caption">お気に入り</span>
              </a>
              <a
                class="d-flex flex-column px-1 hover-opacity"
                href="/myaccount/cart">
                <!-- offset-x -->
                <v-badge
                  color="green"
                  overlap
                  :content="cartNum"
                  :value="cartNum"
                >
                  <v-icon color="secondary">mdi-cart</v-icon>
                </v-badge>
                <span class="caption">カート</span>
              </a>
            </div>
            <div v-else class="header__signIn ms-3 py-6 py-lg-0">
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
              <a href="https://www.symunity.co.jp/"
                target="_blank"
                rel="noopener noreferrer"
                class="d-flex align-center justify-center hover-opacity mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="corporate__su-logo" viewBox="0 0 304.81 22.67">
                  <path class="brand-gold" d="m217.67,21.91c-5.71,0-9.7-4.32-9.7-10.51v-.08c0-5.92,4.25-10.56,9.67-10.56,2.87,0,4.83.69,6.79,2.37l.24.2-2.21,3-.27-.23c-1.03-.89-2.4-1.79-4.69-1.79-3.18,0-5.77,3.13-5.77,6.97v.05c0,4.12,2.55,7.11,6.07,7.11,1.68,0,3.12-.49,4.27-1.46v-3.59h-4.23v-3.28h7.65v8.62l-.11.1c-2.22,2.02-4.89,3.09-7.71,3.09"/><path class="brand-gold" d="m240.73,21.54l-4-6.62c-.06-.1-.15-.15-.25-.15h-3.61v6.77h-3.57V1.13h8.4c2.34,0,4.14.69,5.34,2.06,1.02,1.11,1.52,2.6,1.52,4.55v.05c0,3.83-2.1,5.5-3.85,6.21-.09.04-.16.12-.19.23-.03.12-.02.25.04.35l4.27,6.96h-4.11Zm-3.31-10.14c2.18,0,3.53-1.29,3.53-3.36v-.05c0-2.23-1.24-3.4-3.6-3.4h-4.48v6.81h4.54Z"/><path class="brand-gold" d="m256.95,21.91c-5.58,0-9.79-4.52-9.79-10.52v-.08c0-6.02,4.23-10.56,9.84-10.56s9.78,4.52,9.78,10.51v.05c0,6.04-4.22,10.59-9.83,10.59m0-17.61c-3.44,0-6.03,3-6.03,6.97v.05c0,4.02,2.61,7.04,6.08,7.04s6.02-3,6.02-6.97v-.08c0-3.94-2.67-7.02-6.07-7.02"/><path class="brand-gold" d="m277.9,21.71c-5.12,0-7.94-3.21-7.94-9.04V.95h3.56v11.6c0,3.56,1.61,5.6,4.41,5.6s4.45-1.99,4.45-5.46V.95h3.56v11.56c0,5.93-2.86,9.2-8.04,9.2"/><path class="brand-gold" d="m289.6,21.54V1.13h7.85c4.54,0,7.36,2.66,7.36,6.95v.05c0,4.3-3.05,7.07-7.77,7.07h-3.73v6.34h-3.71Zm7.58-9.74c2.26,0,3.84-1.48,3.84-3.59,0-2.27-1.48-3.63-3.95-3.63h-3.76v7.22h3.87Z"/><polygon class="brand-gold" points="6.54 9.45 9.82 7.56 13.09 5.67 16.36 3.78 13.09 1.89 9.82 0 6.54 1.89 3.27 3.78 0 5.67 0 9.45 0 13.22 3.27 11.33 6.54 9.45"/><polygon class="brand-gold" points="26.17 13.22 29.45 11.33 32.72 9.45 35.99 7.56 39.26 5.67 35.99 3.78 32.72 1.89 29.45 0 26.17 1.89 22.9 3.78 19.63 5.67 16.36 7.56 13.09 9.45 9.82 11.33 6.54 13.22 3.27 15.11 0 17 3.27 18.89 6.54 20.78 9.82 22.67 13.09 20.78 16.36 18.89 19.63 17 22.9 15.11 26.17 13.22"/><polygon class="brand-gold" points="32.72 13.22 29.45 15.11 26.17 17 22.9 18.89 26.17 20.78 29.45 22.67 32.72 20.78 35.99 18.89 39.26 17 39.26 13.22 39.26 9.45 35.99 11.33 32.72 13.22"/><path class="brand-blue" d="m57.33,4.68c-.37,0-.72.04-1.06.12-.34.08-.64.2-.9.35-.41.25-.69.58-.83.99-.06.5.01.9.21,1.19.15.23.39.43.71.61.32.18.74.35,1.24.51.51.16,1.11.35,1.8.57l.72.26c.83.28,1.57.6,2.23.97.66.37,1.22.8,1.68,1.29.46.49.82,1.04,1.07,1.65.25.61.38,1.29.38,2.04,0,.96-.21,1.83-.65,2.63-.43.8-1.01,1.48-1.73,2.05-.73.57-1.56,1.01-2.51,1.33-.95.32-1.93.48-2.95.48-1.09,0-2.11-.18-3.04-.53-.93-.35-1.76-.85-2.47-1.49-.46-.4-.83-.81-1.12-1.24-.29-.43-.51-.83-.68-1.19.2-.1,3.15-1.83,3.4-1.83.46.47,1.39,2.37,3.91,2.56.41.03.83-.06,1.28-.18.44-.12.85-.29,1.23-.53.37-.23.68-.52.93-.87.25-.35.37-.74.37-1.19s-.12-.78-.35-1.07c-.23-.28-.53-.53-.9-.73-.37-.2-.8-.37-1.27-.53-.47-.15-.95-.32-1.44-.5-.76-.27-1.5-.55-2.22-.85-.73-.3-1.38-.68-1.96-1.12-.58-.44-1.04-.98-1.4-1.62-.35-.64-.53-1.43-.53-2.37,0-.87.19-1.65.58-2.34.39-.69.9-1.27,1.54-1.74.64-.47,1.37-.83,2.19-1.08.18-.05.35-.1.53-.14,1.87-.44,3.87-.16,5.54.81,0,0,.02,0,.02.01.54.31,1.03.66,1.49,1.05.46.38.85.77,1.17,1.14l-2.83,2.17s-1.94-1.28-2.15-1.36c-.21-.09-1.02-.3-1.25-.3"/><path class="brand-blue" d="m116.71,13.34c0,.63.12,1.22.37,1.77.25.55.58,1.04,1.01,1.45.43.41.92.74,1.49.98.56.24,1.16.36,1.8.36s1.24-.12,1.8-.36c.57-.24,1.06-.57,1.49-.98.42-.41.76-.9,1.01-1.45.25-.56.38-1.14.38-1.77V1.04h3.79v12.3c0,.77-.1,1.5-.3,2.2-.2.7-.48,1.36-.85,1.98-.37.62-.81,1.18-1.32,1.68-.51.5-1.09.93-1.72,1.29-.63.36-1.31.64-2.03.84-.72.2-1.47.3-2.25.3-1.16,0-2.26-.22-3.28-.65-1.02-.44-1.92-1.03-2.68-1.78-.76-.75-1.37-1.62-1.82-2.63-.45-1-.67-2.08-.67-3.23V1.04h3.79v12.3Z"/><rect class="brand-blue" x="155.79" y="1.15" width="3.79" height="20.37"/><polygon class="brand-blue" points="162.72 4.74 162.72 1.14 178.68 1.14 178.68 4.74 172.6 4.74 172.6 21.53 168.81 21.53 168.81 4.74 162.72 4.74"/><path class="brand-blue" d="m80.5,1.15s-5.35,7.74-5.35,7.75c0,0-5.35-7.75-5.35-7.75h-4.35s7.91,11.5,7.91,11.75v8.63h3.59v-8.63c0-.25,7.9-11.75,7.9-11.75h-4.35Z"/><path class="brand-blue" d="m196.25,1.15s-5.35,7.74-5.35,7.75c0,0-5.35-7.75-5.35-7.75h-4.35s7.9,11.5,7.9,11.75v8.63h3.59v-8.63c0-.25,7.9-11.75,7.9-11.75h-4.35Z"/><path class="brand-blue" d="m147.68,1.15v14.34c-.01-.1-10.56-14.34-10.56-14.34h-3.35v20.37h3.61V7.18c.01.1,10.56,14.34,10.56,14.34h3.35V1.15h-3.61Z"/><path class="brand-blue" d="m103.57,1.15s-5.69,15.32-5.71,15.41c-.01-.09-5.71-15.41-5.71-15.41h-5.41v20.37h3.63V6.71c.09.27,5.86,14.81,5.86,14.81h3.27s5.77-14.54,5.86-14.81v14.81h3.63V1.15h-5.42Z"/>
                </svg>
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
      <a href="https://www.symunity.co.jp/" target="_blank" rel="noopener noreferrer" class="hover-opacity mr-5">
        <svg xmlns="http://www.w3.org/2000/svg" class="corporate__su-logo" viewBox="0 0 304.81 22.67">
          <path class="brand-gold" d="m217.67,21.91c-5.71,0-9.7-4.32-9.7-10.51v-.08c0-5.92,4.25-10.56,9.67-10.56,2.87,0,4.83.69,6.79,2.37l.24.2-2.21,3-.27-.23c-1.03-.89-2.4-1.79-4.69-1.79-3.18,0-5.77,3.13-5.77,6.97v.05c0,4.12,2.55,7.11,6.07,7.11,1.68,0,3.12-.49,4.27-1.46v-3.59h-4.23v-3.28h7.65v8.62l-.11.1c-2.22,2.02-4.89,3.09-7.71,3.09"/><path class="brand-gold" d="m240.73,21.54l-4-6.62c-.06-.1-.15-.15-.25-.15h-3.61v6.77h-3.57V1.13h8.4c2.34,0,4.14.69,5.34,2.06,1.02,1.11,1.52,2.6,1.52,4.55v.05c0,3.83-2.1,5.5-3.85,6.21-.09.04-.16.12-.19.23-.03.12-.02.25.04.35l4.27,6.96h-4.11Zm-3.31-10.14c2.18,0,3.53-1.29,3.53-3.36v-.05c0-2.23-1.24-3.4-3.6-3.4h-4.48v6.81h4.54Z"/><path class="brand-gold" d="m256.95,21.91c-5.58,0-9.79-4.52-9.79-10.52v-.08c0-6.02,4.23-10.56,9.84-10.56s9.78,4.52,9.78,10.51v.05c0,6.04-4.22,10.59-9.83,10.59m0-17.61c-3.44,0-6.03,3-6.03,6.97v.05c0,4.02,2.61,7.04,6.08,7.04s6.02-3,6.02-6.97v-.08c0-3.94-2.67-7.02-6.07-7.02"/><path class="brand-gold" d="m277.9,21.71c-5.12,0-7.94-3.21-7.94-9.04V.95h3.56v11.6c0,3.56,1.61,5.6,4.41,5.6s4.45-1.99,4.45-5.46V.95h3.56v11.56c0,5.93-2.86,9.2-8.04,9.2"/><path class="brand-gold" d="m289.6,21.54V1.13h7.85c4.54,0,7.36,2.66,7.36,6.95v.05c0,4.3-3.05,7.07-7.77,7.07h-3.73v6.34h-3.71Zm7.58-9.74c2.26,0,3.84-1.48,3.84-3.59,0-2.27-1.48-3.63-3.95-3.63h-3.76v7.22h3.87Z"/><polygon class="brand-gold" points="6.54 9.45 9.82 7.56 13.09 5.67 16.36 3.78 13.09 1.89 9.82 0 6.54 1.89 3.27 3.78 0 5.67 0 9.45 0 13.22 3.27 11.33 6.54 9.45"/><polygon class="brand-gold" points="26.17 13.22 29.45 11.33 32.72 9.45 35.99 7.56 39.26 5.67 35.99 3.78 32.72 1.89 29.45 0 26.17 1.89 22.9 3.78 19.63 5.67 16.36 7.56 13.09 9.45 9.82 11.33 6.54 13.22 3.27 15.11 0 17 3.27 18.89 6.54 20.78 9.82 22.67 13.09 20.78 16.36 18.89 19.63 17 22.9 15.11 26.17 13.22"/><polygon class="brand-gold" points="32.72 13.22 29.45 15.11 26.17 17 22.9 18.89 26.17 20.78 29.45 22.67 32.72 20.78 35.99 18.89 39.26 17 39.26 13.22 39.26 9.45 35.99 11.33 32.72 13.22"/><path class="brand-blue" d="m57.33,4.68c-.37,0-.72.04-1.06.12-.34.08-.64.2-.9.35-.41.25-.69.58-.83.99-.06.5.01.9.21,1.19.15.23.39.43.71.61.32.18.74.35,1.24.51.51.16,1.11.35,1.8.57l.72.26c.83.28,1.57.6,2.23.97.66.37,1.22.8,1.68,1.29.46.49.82,1.04,1.07,1.65.25.61.38,1.29.38,2.04,0,.96-.21,1.83-.65,2.63-.43.8-1.01,1.48-1.73,2.05-.73.57-1.56,1.01-2.51,1.33-.95.32-1.93.48-2.95.48-1.09,0-2.11-.18-3.04-.53-.93-.35-1.76-.85-2.47-1.49-.46-.4-.83-.81-1.12-1.24-.29-.43-.51-.83-.68-1.19.2-.1,3.15-1.83,3.4-1.83.46.47,1.39,2.37,3.91,2.56.41.03.83-.06,1.28-.18.44-.12.85-.29,1.23-.53.37-.23.68-.52.93-.87.25-.35.37-.74.37-1.19s-.12-.78-.35-1.07c-.23-.28-.53-.53-.9-.73-.37-.2-.8-.37-1.27-.53-.47-.15-.95-.32-1.44-.5-.76-.27-1.5-.55-2.22-.85-.73-.3-1.38-.68-1.96-1.12-.58-.44-1.04-.98-1.4-1.62-.35-.64-.53-1.43-.53-2.37,0-.87.19-1.65.58-2.34.39-.69.9-1.27,1.54-1.74.64-.47,1.37-.83,2.19-1.08.18-.05.35-.1.53-.14,1.87-.44,3.87-.16,5.54.81,0,0,.02,0,.02.01.54.31,1.03.66,1.49,1.05.46.38.85.77,1.17,1.14l-2.83,2.17s-1.94-1.28-2.15-1.36c-.21-.09-1.02-.3-1.25-.3"/><path class="brand-blue" d="m116.71,13.34c0,.63.12,1.22.37,1.77.25.55.58,1.04,1.01,1.45.43.41.92.74,1.49.98.56.24,1.16.36,1.8.36s1.24-.12,1.8-.36c.57-.24,1.06-.57,1.49-.98.42-.41.76-.9,1.01-1.45.25-.56.38-1.14.38-1.77V1.04h3.79v12.3c0,.77-.1,1.5-.3,2.2-.2.7-.48,1.36-.85,1.98-.37.62-.81,1.18-1.32,1.68-.51.5-1.09.93-1.72,1.29-.63.36-1.31.64-2.03.84-.72.2-1.47.3-2.25.3-1.16,0-2.26-.22-3.28-.65-1.02-.44-1.92-1.03-2.68-1.78-.76-.75-1.37-1.62-1.82-2.63-.45-1-.67-2.08-.67-3.23V1.04h3.79v12.3Z"/><rect class="brand-blue" x="155.79" y="1.15" width="3.79" height="20.37"/><polygon class="brand-blue" points="162.72 4.74 162.72 1.14 178.68 1.14 178.68 4.74 172.6 4.74 172.6 21.53 168.81 21.53 168.81 4.74 162.72 4.74"/><path class="brand-blue" d="m80.5,1.15s-5.35,7.74-5.35,7.75c0,0-5.35-7.75-5.35-7.75h-4.35s7.91,11.5,7.91,11.75v8.63h3.59v-8.63c0-.25,7.9-11.75,7.9-11.75h-4.35Z"/><path class="brand-blue" d="m196.25,1.15s-5.35,7.74-5.35,7.75c0,0-5.35-7.75-5.35-7.75h-4.35s7.9,11.5,7.9,11.75v8.63h3.59v-8.63c0-.25,7.9-11.75,7.9-11.75h-4.35Z"/><path class="brand-blue" d="m147.68,1.15v14.34c-.01-.1-10.56-14.34-10.56-14.34h-3.35v20.37h3.61V7.18c.01.1,10.56,14.34,10.56,14.34h3.35V1.15h-3.61Z"/><path class="brand-blue" d="m103.57,1.15s-5.69,15.32-5.71,15.41c-.01-.09-5.71-15.41-5.71-15.41h-5.41v20.37h3.63V6.71c.09.27,5.86,14.81,5.86,14.81h3.27s5.77-14.54,5.86-14.81v14.81h3.63V1.15h-5.42Z"/>
        </svg>
      </a>
      <a
        class="hover-opacity d-flex align-center text-caption letter-space-03em mr-2 mr-xl-5"
        href="https://www.takenaka-co.co.jp/"
        target="_blank"
        rel="noopener noreferrer">
        <v-icon class="mr-2" color="#1A264B" small>mdi-login-variant</v-icon>
        <span>株式会社タケナカ</span>
      </a>
    </div>
    <div id="search-window" class="search-window" :class="{ show: searchWindowFlg }">
      <div class="search-window__inner px-4 px-xl-10 py-2 py-sm-3 py-xl-5">
        <div class="text-right">
          <v-btn icon large @click="toggleSearchWindow()">
            <v-icon large color="lightGray">mdi-close-circle-outline</v-icon>
          </v-btn>
        </div>
        <v-form class="d-flex" @submit.prevent>
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
          <v-btn color="primary" class="text-white ml-2"
            height="auto" elevation="0"
            :href="'/products?type=3&page=1&keyword=' + keyword"
          >
            <v-icon color="#fff">mdi-magnify</v-icon>
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
      memberNav: null,
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
    cartNum() {
      return this.$store.getters['cart/getCartNum']
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
      window.location.href = '/products?type=3&page=1&keyword=' + this.keyword
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
  z-index: 200;

  &__inner {
    top: calc(30 / 1920 * 100vw);
    width: 100%;
    position: fixed;
    transition: top 0.4s;

    @include mq(sm) {
      top: 5px;
    }
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
    top: calc(30 / 1920 * 100vw);
    right: 2%;
    position: absolute;
    transform: rotate(90deg) translateX(100%);
    transform-origin: right top;
    display: flex;
    align-items: center;
    @include mq(xl) {
      right: 0.3%;
    }
    @include mq(lg) {
      display: none;
    }

    .v-icon {
      transform: rotate(-90deg);
    }
  }
  .corporate__su-logo{
    .brand-blue {
      fill: #00225c;
    }
    .brand-gold {
      fill: #c0994c;
    }
    height: 0.8rem;
    fill: #fff;
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
.nuxt-link-exact-active {
  color: $primary !important;
}
.nuxt-link-exact-active .v-icon {
  color: $primary !important;
}
</style>
