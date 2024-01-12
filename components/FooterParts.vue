<template>
  <footer class="footer pt-15">
    <v-container class="footer__inner">
      <div class="footer__head d-flex align-center flex-column flex-md-row line-height-normal">
        <a class="head__logo hover-opacity d-flex align-center mr-0 mr-md-10" href="/">
          <span class="logo__img mr-3 mr-md-5">
            <img src="/img/footer/tk-logo_white.svg" alt="TAKENAKA the SOLID WATER LOGO" />
          </span>
          <span class="logo__service text-body-2 no-wrap text-white line-height-normal">映像 / 音響機材の<br />レンタルサービス</span>
        </a>
        <a
          class="head__corporate hover-opacity d-flex align-center mt-5 mt-md-0 text-caption line-height-normal"
          href="https://www.takenaka-co.co.jp/"
          target="_blank"
          rel="noopener noreferrer">
          <v-icon class="mr-2" color="#ffffff" small>mdi-login-variant</v-icon>
          <span class="text-white">株式会社タケナカ コーポレートサイトへ</span>
        </a>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
        <div class="head__links d-flex align-center mt-5 mt-md-0">
          <a
            v-for="(list, index) in snsLists"
            :key="index"
            class="hover-opacity line-height-normal"
            :href="list.link"
            target="_blank"
            rel="noopener noreferrer">
            <img :src="list.src" :alt="list.alt" />
          </a>
        </div>
      </div>
      <v-row class="footer__info" no-gutters>
        <v-col
          v-for="(list, index) in informationLists"
          :key="index"
          cols="12"
          md="6"
          class="footer__info-inner mt-10 mt-md-16">
          <div class="information">
            <div class="information__head d-flex align-center">
              <h5 class="text-body-1 text-sm-h6 font-weight-medium letter-space-02em">{{ list.branchName }}</h5>
              <v-divider inset color="#ffffff" class="information__line ml-5"></v-divider>
            </div>
            <div class="information__content mt-5">
              <div class="content__address text-caption text-sm-body-2">
                <!-- eslint-disable-next-line vue/no-v-html -->
                <span>{{ list.postCode }}&ensp;</span><span class="word-keep" v-html="list.address"></span>
              </div>
              <div class="content__contact d-flex flex-wrap align-center text-caption text-sm-body-2">
                <div class="contact__tel d-flex align-center mt-4 mr-5">
                  <v-icon class="mr-2" color="primary">mdi-phone</v-icon>{{ list.phone }}
                </div>
                <div class="contact__fax d-flex align-center mt-4"><v-icon class="mr-2" color="primary">mdi-fax</v-icon>{{ list.fax }}</div>
              </div>
              <div class="content__mail d-flex align-center flex-wrap text-caption text-sm-body-2 mt-4">
                <div class="mail__address d-flex align-center mr-lg-5">
                  <v-icon class="mr-2" color="primary">mdi-email-outline</v-icon>{{ list.email }}
                </div>
                <v-btn
                  class="mail__copy text-white text-caption text-sm-body-2 mt-3 mt-lg-0"
                  outlined
                  small
                  @click="mailCopy(list.email)">
                  <v-icon class="mr-2" color="primary" small>mdi-content-copy</v-icon>メールアドレスをコピー
                </v-btn>
                <v-snackbar
                  v-model="snackbar"
                  color="primary"
                  class="mail__snackbar">
                  <span class="text-white">
                    {{ copiedMail }} を<span class="word-keep">コピーしました</span>
                  </span>
                  <template #action="{ attrs }">
                    <v-btn
                      color="#fff"
                      text
                      v-bind="attrs"
                      @click="snackbar = false">
                      Close
                    </v-btn>
                  </template>
                </v-snackbar>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="footer__company-group d-flex justify-center align-center flex-column-reverse flex-lg-row text-caption text-sm-body-2">
        <p class="text-center">株式会社タケナカは<span class="word-keep">シンユニティグループの一員です</span></p>
        <img class="ml-0 ml-lg-5 mb-4 mb-lg-0" src="/img/footer/symunity_logo.svg" alt="SYMUNITY GROUP" />
      </div>
      <div class="footer__copy-light text-center text-caption text-sm-body-2 mb-5">
        <span class="montserrat">2022</span> © Takenaka All Rights Reserved.
      </div>
    </v-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      copiedMail: '',
      snsLists: [
        {
          name: 'facebook',
          link: 'https://www.facebook.com/TAKENAKACoLtd',
          src: '/img/footer/facebook.svg',
          alt: '株式会社タケナカ TAKENAKA Co Ltd facebookリンク',
        },
        {
          name: 'youtube',
          link: 'https://www.youtube.com/user/takenakaofficial',
          src: '/img/footer/youtube.svg',
          alt: 'SYMUNITY GROUP [ TAKENAKA / SYMDIRECT ] youtubeリンク',
        },
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/takenaka__/',
          src: '/img/footer/instagram.svg',
          alt: '株式会社タケナカ Instagramリンク',
        },
      ],
      informationLists: [
        {
          branchName: 'Tokyo',
          postCode: '〒136-0072',
          address: '東京都江東区大島2-32-8&ensp;シンユニティ東京',
          phone: '03-6690-3457',
          fax: '03-5628-2894',
          email: 'C_TokyoSales@takenaka-co.co.jp',
        },
        {
          branchName: 'Nagoya',
          postCode: '〒453-0013',
          address: '愛知県名古屋市中村区亀島2丁目30-28',
          phone: '052-526-2871',
          fax: '052-526-2872',
          email: 'C_NagoyaSales@takenaka-co.co.jp',
        },
        {
          branchName: 'Osaka',
          postCode: '〒552-0021',
          address: '大阪府大阪市港区築港3-1-43&ensp;天保山シンユニティビル',
          phone: '06-7174-8990',
          fax: '06-6571-5132',
          email: 'C_OsakaSales@takenaka-co.co.jp',
        },
        {
          branchName: 'Kyoto',
          postCode: '〒612-8415',
          address: '京都府京都市伏見区竹田中島町251',
          phone: '075-647-3111',
          fax: '075-647-3112',
          email: 'C_KyotoSales@takenaka-co.co.jp',
        },
      ],
    }
  },
  methods: {
    mailCopy(mail) {
      this.$copyText(mail)
      this.copiedMail = mail
      this.snackbar = true
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.footer {
  width: 100%;
  background-color: $footer;
  color: #ffffff !important;

  &__inner {
    max-width: 1200px !important;
    padding: 0 !important;
    overflow-x: hidden;

    .head__logo {
      .logo__img {
        display: inherit;
        max-width: 400px;

        @include mq(md) {
          max-width: 200px;
        }

        @include mq(sm) {
          max-width: 180px;
        }

        img {
          width: 100%;
          object-fit: contain;
        }
      }
      .logo__service {
        display: inline-block;
        white-space: nowrap;

        @include mq(sm) {
          font-size: 11px !important;
        }
      }
    }

    .head__corporate,
    .content__address,
    .content__contact,
    .footer__company-group {
      letter-spacing: 0.18em !important;
    }

    .head__corporate {

      @include mq(sm) {
        font-size: 10px !important;
      }
    }

    .head__links {
      width: 165px;
      justify-content: space-between;

      @include mq(sm) {
        width: 50%;
        max-width: 100px;
      }

      img {
        width: auto;
        height: 37px;

        @include mq(sm) {
          height: 23px;
        }
      }
    }

    .footer__info {
      margin: 0 -2%;

      @include mq(md){
        margin: 0;
      }

      &-inner {
        padding: 0 2% !important;

        @include mq(md){
          padding: 0 !important;
        }
      }
      .information__line {
        border-color: #fff;
      }
      .contact__tel,
      .contact__fax {
        min-width: 140px;
      }
      .mail__address {
        letter-spacing: 0.13em !important;

        @include mq(lg) {
          width: 100%;
        }
      }
      .mail__copy {
        border: 1px solid #8e8e8e !important;
        font-size: 13px !important;

        @include mq(sm) {
          font-size: 11px !important;
        }
      }
      .mail__snackbar .v-snack__wrapper {
        @include mq(sm) {
          width: 95%;
          min-width: 300px;
        }
      }
    }

    .footer__company-group {
      margin-top: 120px;

      @include mq(sm) {
        margin-top: 85px;
      }
    }

    .footer__copy-light {
      margin-top: 70px;
    }
  }
}
</style>
