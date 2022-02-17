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
    <footer class="footer pt-15">
      <v-container class="footer__container">
        <div class="top d-flex align-center">
          <a class="link d-flex align-center mr-10" href="/">
            <img
              class="footer-logo mr-5"
              src="/img/footer/logo.png"
              alt="TAKENAKA the SOLID WATER LOGO"
            />
            <span class="footer-service text-body-2 text-white"
              >映像 / 音響機材の<br />レンタルサービス</span
            >
          </a>
          <a href=""
            ><v-icon class="mr-2" color="#ffffff">mdi-login-variant</v-icon
            ><span class="text-white text-body-2"
              >株式会社タケナカ コーポレートサイトへ</span
            ></a
          >
          <v-spacer></v-spacer>
          <div class="sns">
            <a class="mx-2" href=""
              ><img src="/img/footer/facebook.png" alt=""
            /></a>
            <a class="mx-2" href=""
              ><img src="/img/footer/youtube.png" alt=""
            /></a>
            <a class="mx-2" href=""
              ><img src="/img/footer/instagram.png" alt=""
            /></a>
          </div>
        </div>
        <v-row class="informations mt-10">
          <v-col cols="6">
            <div class="information mx-5">
              <div class="information__heading d-flex align-center">
                <h5 class="text-h6 letter-space-02em montserrat">Tokyo</h5>
                <v-divider inset color="#ffffff"></v-divider>
              </div>
              <div class="information__content mt-5">
                <div class="address text-body-2">
                  <span class="mr-3 montserrat">〒136-0072</span
                  >東京都江東区大島<span class="montserrat">2-32-8</span>
                  シンユニティ東京
                </div>
                <div class="contact mt-5 d-flex align-center text-body-2">
                  <div class="contact__tel mr-10 montserrat">
                    <v-icon class="mr-2" color="primary">mdi-phone</v-icon
                    >03-6690-3457
                  </div>
                  <div class="contact__fax montserrat">
                    <v-icon class="mr-2" color="primary">mdi-fax</v-icon
                    >03-5628-289
                  </div>
                </div>
                <div class="mail mt-5 d-flex align-center text-body-2">
                  <div class="mail__address montserrat mr-5">
                    <v-icon class="mr-2" color="primary"
                      >mdi-email-outline</v-icon
                    >C_TokyoSales@takenaka-co.co.jp
                  </div>
                  <v-btn class="text-white text-body-2" outlined
                    ><v-icon class="mr-2" color="primary"
                      >mdi-content-copy</v-icon
                    >メールアドレスをコピー</v-btn
                  >
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="information mx-5">
              <div class="information__heading d-flex align-center">
                <h5 class="text-h6 letter-space-02em montserrat">Nagoya</h5>
                <v-divider inset color="#ffffff"></v-divider>
              </div>
              <div class="information__content mt-5">
                <div class="address text-body-2">
                  <span class="mr-3 montserrat">〒454-0034</span
                  >愛知県名古屋市中川区五女子町<span class="montserrat"
                    >2-25</span
                  >
                </div>
                <div class="contact mt-5 d-flex align-center text-body-2">
                  <div class="contact__tel mr-10 montserrat">
                    <v-icon class="mr-2" color="primary">mdi-phone</v-icon
                    >052-354-5559
                  </div>
                  <div class="contact__fax montserrat">
                    <v-icon class="mr-2" color="primary">mdi-fax</v-icon
                    >052-354-5119
                  </div>
                </div>
                <div class="mail mt-5 d-flex align-center text-body-2">
                  <div class="mail__address montserrat mr-5">
                    <v-icon class="mr-2" color="primary"
                      >mdi-email-outline</v-icon
                    >C_NagoyaSales@takenaka-co.co.jp
                  </div>
                  <v-btn class="text-white text-body-2" outlined
                    ><v-icon class="mr-2" color="primary"
                      >mdi-content-copy</v-icon
                    >メールアドレスをコピー</v-btn
                  >
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="information mx-5">
              <div class="information__heading d-flex align-center">
                <h5 class="text-h6 letter-space-02em montserrat">Osaka</h5>
                <v-divider inset color="#ffffff"></v-divider>
              </div>
              <div class="information__content mt-5">
                <div class="address text-body-2">
                  <span class="mr-3 montserrat">〒552-0021</span
                  >大阪府大阪市港区築港
                  <span class="montserrat">3-1-43</span>天保山シンユニティビル
                </div>
                <div class="contact mt-5 d-flex align-center text-body-2">
                  <div class="contact__tel mr-10 montserrat">
                    <v-icon class="mr-2" color="primary">mdi-phone</v-icon
                    >06-7174-8990
                  </div>
                  <div class="contact__fax montserrat">
                    <v-icon class="mr-2" color="primary">mdi-fax</v-icon
                    >06-6571-5132
                  </div>
                </div>
                <div class="mail mt-5 d-flex align-center text-body-2">
                  <div class="mail__address montserrat mr-5">
                    <v-icon class="mr-2" color="primary"
                      >mdi-email-outline</v-icon
                    >C_OsakaSales@takenaka-co.co.jp
                  </div>
                  <v-btn class="text-white text-body-2" outlined
                    ><v-icon class="mr-2" color="primary"
                      >mdi-content-copy</v-icon
                    >メールアドレスをコピー</v-btn
                  >
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="information mx-5">
              <div class="information__heading d-flex align-center">
                <h5 class="text-h6 letter-space-02em montserrat">Kyoto</h5>
                <v-divider inset color="#ffffff"></v-divider>
              </div>
              <div class="information__content mt-5">
                <div class="address text-body-2">
                  <span class="mr-3 montserrat">〒612-8415</span
                  >京都府京都市伏見区竹田中島町<span class="montserrat"
                    >251</span
                  >
                </div>
                <div class="contact mt-5 d-flex align-center text-body-2">
                  <div class="contact__tel mr-10 montserrat">
                    <v-icon class="mr-2" color="primary">mdi-phone</v-icon
                    >075-647-3111
                  </div>
                  <div class="contact__fax montserrat">
                    <v-icon class="mr-2" color="primary">mdi-fax</v-icon
                    >075-647-3112
                  </div>
                </div>
                <div class="mail mt-5 d-flex align-center text-body-2">
                  <div class="mail__address montserrat mr-5">
                    <v-icon class="mr-2" color="primary"
                      >mdi-email-outline</v-icon
                    >C_KyotoSales@takenaka-co.co.jp
                  </div>
                  <v-btn class="text-white text-body-2" outlined
                    ><v-icon class="mr-2" color="primary"
                      >mdi-content-copy</v-icon
                    >メールアドレスをコピー</v-btn
                  >
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <div
          class="company-group d-flex justify-center align-center text-body-2"
        >
          株式会社タケナカはシンユニティグループの一員です。
          <img class="ml-5" src="/img/footer/symunity_logo.png" alt="" />
        </div>
        <div class="copy-light montserrat text-center">
          <span class="montserrat">2022</span> © Takenaka All Rights Reserved.
        </div>
      </v-container>
    </footer>
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

.footer {
  width: 100%;
  background-color: $footer;
  color: #ffffff;

  &__container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    .link {
      .header-logo {
        max-width: 210px;
        object-fit: contain;
      }
      .header-service {
        display: inline-block;
        white-space: nowrap;
      }
    }

    .link:hover {
      opacity: 0.75;
    }
  }

  .company-group {
    margin-top: 120px;
  }

  .copy-light {
    margin-top: 70px;
  }
}
</style>
