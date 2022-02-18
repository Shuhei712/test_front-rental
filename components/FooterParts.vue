<template>
  <footer class="footer pt-15">
    <v-container class="footer__inner">
      <div class="footer__head d-flex align-center">
        <a class="head__logo hover-opacity d-flex align-center mr-10" href="/">
          <img
            class="logo__img mr-5"
            src="/img/footer/logo.png"
            alt="TAKENAKA the SOLID WATER LOGO"
          />
          <span class="logo__service text-body-2 no-wrap text-white"
            >映像 / 音響機材の<br />レンタルサービス</span
          >
        </a>
        <a
          class="head__corporate hover-opacity"
          href="https://www.takenaka-co.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
          ><v-icon class="mr-2" color="#ffffff">mdi-login-variant</v-icon
          ><span class="text-white text-body-2"
            >株式会社タケナカ コーポレートサイトへ</span
          ></a
        >
        <v-spacer></v-spacer>
        <div class="head__links">
          <a
            v-for="(list, index) in snsLists"
            :key="index"
            class="hover-opacity mx-2"
            :href="list.link"
            target="_blank"
            rel="noopener noreferrer"
            ><img :src="list.src" :alt="list.alt"
          /></a>
        </div>
      </div>
      <v-row class="footer__info mt-10">
        <v-col v-for="(list, index) in informationLists" :key="index" cols="6">
          <div class="information mx-5">
            <div class="information__head d-flex align-center">
              <h5 class="text-h6 letter-space-02em">{{ list.branchName }}</h5>
              <v-divider inset color="#ffffff"></v-divider>
            </div>
            <div class="information__content mt-5">
              <div class="content__address text-body-2">
                <span class="mr-3">{{ list.postCode }}</span
                >{{ list.address }}
              </div>
              <div
                class="content__contact mt-5 d-flex align-center text-body-2"
              >
                <div class="contact__tel mr-10">
                  <v-icon class="mr-2" color="primary">mdi-phone</v-icon
                  >{{ list.phone }}
                </div>
                <div class="contact__fax">
                  <v-icon class="mr-2" color="primary">mdi-fax</v-icon
                  >{{ list.fax }}
                </div>
              </div>
              <div class="content__mail mt-5 d-flex align-center text-body-2">
                <div class="mail__address mr-5">
                  <v-icon class="mr-2" color="primary">mdi-email-outline</v-icon
                  >{{ list.email }}
                </div>
                <v-btn class="mail__copy text-white text-body-2" outlined
                  ><v-icon class="mr-2" color="primary">mdi-content-copy</v-icon
                  >メールアドレスをコピー</v-btn
                >
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <div
        class="footer__company-group d-flex justify-center align-center text-body-2"
      >
        株式会社タケナカはシンユニティグループの一員です。
        <img
          class="ml-5"
          src="/img/footer/symunity_logo.png"
          alt="SYMUNITY GROUP"
        />
      </div>
      <div class="footer__copy-light text-center">
        <span class="montserrat">2022</span> © Takenaka All Rights Reserved.
      </div>
    </v-container>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      snsLists: [
        {
          name: 'facebook',
          link: 'https://www.facebook.com/TAKENAKACoLtd',
          src: '/img/footer/facebook.png',
          alt: '株式会社タケナカ TAKENAKA Co Ltd facebookリンク',
        },
        {
          name: 'youtube',
          link: 'https://www.youtube.com/user/takenakaofficial',
          src: '/img/footer/youtube.png',
          alt: 'SYMUNITY GROUP [ TAKENAKA / SYMDIRECT ] youtubeリンク',
        },
        {
          name: 'Instagram',
          link: 'https://www.instagram.com/takenaka__/',
          src: '/img/footer/instagram.png',
          alt: '株式会社タケナカ Instagramリンク',
        },
      ],
      informationLists: [
        {
          branchName: 'Tokyo',
          postCode: '〒136-0072',
          address: '東京都江東区大島2-32-8シンユニティ東京',
          phone: '03-6690-3457',
          fax: '03-5628-289',
          email: 'C_TokyoSales@takenaka-co.co.jp',
        },
        {
          branchName: 'Nagoya',
          postCode: '〒454-0034',
          address: '愛知県名古屋市中川区五女子町2-25',
          phone: '052-354-5559',
          fax: '052-354-5119',
          email: 'C_NagoyaSales@takenaka-co.co.jp',
        },
        {
          branchName: 'Osaka',
          postCode: '〒552-0021',
          address: '大阪府大阪市港区築港天保山シンユニティビル',
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
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.footer {
  width: 100%;
  background-color: $footer;
  color: #ffffff !important;

  &__inner {
    width: 100%;
    max-width: 1200px !important;
    margin: 0 auto;

    .head__logo {
      .logo__img {
        max-width: 400px;
        object-fit: contain;
      }
      .logo__service {
        display: inline-block;
        white-space: nowrap;
      }
    }

    .footer__info {
      .mail__copy {
        border: 1px solid $line !important;
      }
    }

    .footer__company-group {
      margin-top: 120px;
    }

    .footer__copy-light {
      margin-top: 70px;
    }
  }
}
</style>
