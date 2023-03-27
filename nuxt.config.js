import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  head: {
    titleTemplate: '%s - 映像機材・音響機器のレンタルサービス | 株式会社タケナカ',
    title: '映像機材・音響機器のレンタルサービス | 株式会社タケナカ',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '大阪 東京 名古屋 京都での映像機器・音響機器のレンタルや学会・展示会・式典・試写会などのイベント制作・運営/HDV映像・音楽制作/VJ機器・HDVカメラなどクリエイターに向けの映像設備のプランニング・施工/デジタルサイネージやITネットワーク構築など映像・音響・レンタル・販売・設備に関することは80年の歴史を持つ(株)タケナカにご相談下さい。',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,700;1,900&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },
  server: {
    port: 3005,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/common.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~plugins/vue-scrollto', '~plugins/hooper', '~/plugins/persistedState.client.js', '~/plugins/gsap.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-scrollto/nuxt',
    'nuxt-clipboard2',
    '@nuxtjs/gtm',
  ],

  gtm: {
    id: 'GTM-KQMB8MN',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  publicRuntimeConfig: {
    PROJECT_KEY: process.env.PROJECT_KEY,
    LANG_JAPANESE: process.env.LANG_JAPANESE,
    PRODUCT_INFO: process.env.PRODUCT_INFO,
    PRODUCT_SPEC: process.env.PRODUCT_SPEC,
    PRODUCT_REFFER: process.env.PRODUCT_REFFER,
    PRODUCT_DOC: process.env.PRODUCT_DOC,
    ORDER_NEW: process.env.ORDER_NEW,
    ORDER_OLD: process.env.ORDER_OLD,
    ORDER_ASC: process.env.ORDER_ASC,
    ORDER_DESC: process.env.ORDER_DESC,
    PAGE_ROW_COUNT: process.env.PAGE_ROW_COUNT,
    UNDER_NEW_PRODUCT_DAY: process.env.UNDER_NEW_PRODUCT_DAY,

    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: '#3BB2A3',
          secondary: '#424242',
          accent: '#DD6743',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          headingText: '#4B5654',
          text: '#232323',
          outline: '#4B5654',
          line: '#AFAFAF',
          cushion: '#F2F2F2',
          footer: '#4B5654',
          all: '#4B5654',
          feature: '#c97061',
          suggest: '#579b8f',
          catalog: '#c19c49',
          sns: '#638bba',
          sales: '#af69aa',
          twitter: '#00ACED',
          facebook: '#3B5998',
          lightGray: '#9da5a4',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['gsap'],
  },
}
