<template>
  <section class="top__main">
    <v-row class="">
      <v-col order-md="2" cols="12" md="6" class="main__pickup">
        <top-main-pickup :pickup-lists="pickupLists"></top-main-pickup>
      </v-col>
      <v-col order-md="1" cols="12" md="6" class="main__txt accent">
        <v-container class="top__inner py-2">
          <p class="d-none d-md-block white--text text-caption letter-space-02em mt-5">映像 / 音響機材のレンタルサービス</p>
          <v-row class="main__catch" no-gutters>
            <v-col cols="12" class="mt-sm-5 text-white">
              <h2
                class="catch__font text-md-h4 text-lg-h3 zen-kaku-gothic bold letter-space-015em line-height-normal">
                <span class="d-block">
                  必要<span class="catch__font--small">な</span>機材<span class="catch__font--small">が</span
                  >
                </span>
                <span class="d-inline-block">
                  レンタル<span class="catch__font--small">で</span><span class="d-inline-block">
                  揃います!
                </span></span>
              </h2>
              <div class="catch__intro my-5 my-md-8">
                <p class="text-body-2 text-sm-body-1 letter-space-02em lh-crop-25 py-4">
                  あなたが今実現したいことは<span class="word-keep">何でしょう。</span><br />
                  配信、イベント、会議…etc<br />
                  大丈夫! タケナカのレンタルに<span class="word-keep">おまかせください</span>
                </p>
              </div>
            </v-col>
          </v-row>
          <v-row class="main__menu pb-5 pr-md-16" no-gutters>
            <v-col cols="6">
              <div class="btn-wrap pr-2">
                <v-btn color="#fff" to="/guide#enrty" block v-bind="size" class=" letter-space-02em">
                  <img class="icon mr-1" src="/img/top/beginner-icon.png" /><span class="btn-text lh-crop-12"
                    >はじめての方へ</span
                  >
                  <v-icon color="primary" class="mr-n2"> mdi-chevron-right </v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="btn-wrap ps-2">
                <v-btn color="#fff" to="/faq" block v-bind="size" class=" letter-space-02em">
                  <v-icon class="mr-1" color="primary" v-bind="size">mdi-help-circle-outline</v-icon
                  ><span class="btn-text lh-crop-12">よくある質問</span>
                  <v-icon color="primary" class="mr-n2">mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row class="main__search pb-12 pr-md-16" no-gutters>
            <v-col cols="6" md="8">
              <div class="btn-wrap keyword-search pe-2">
                <v-text-field
                  class="bg-white text-caption"
                  color="primary"
                  placeholder="キーワード検索"
                  outlined
                  dense
                  prepend-inner-icon="mdi-magnify"
                  hide-details="auto"></v-text-field>
              </div>
            </v-col>
            <v-col cols="6" md="4">
              <div class="btn-wrap">
                <v-btn class="text-white" color="primary" :href="'/products?type=3&keyword=' + keyword" block
                v-bind="size">
                  <v-icon class="mr-1" color="#ffffff" v-bind="size">mdi-text-search</v-icon
                  ><span class="lh-crop-12">詳細検索</span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>

        <div class="d-lg-none text-center">
          <a href="https://www.symunity.co.jp/" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" class="main__su-logo mr-md-12" viewBox="0 0 315 23.4">
              <path class="st191" d="M224.9,22.6c-5.9,0-10-4.5-10-10.9v-0.1c0-6.1,4.4-10.9,10-10.9c3,0,5,0.7,7,2.5l0.2,0.2l-2.3,3.1 l-0.3-0.2c-1.1-0.9-2.5-1.9-4.8-1.9c-3.3,0-6,3.2-6,7.2v0.1c0,4.3,2.6,7.3,6.3,7.3c1.7,0,3.2-0.5,4.4-1.5v-3.7h-4.4v-3.4h7.9v8.9 l-0.1,0.1C230.6,21.5,227.8,22.6,224.9,22.6"></path>
              <path class="st191" d="M248.8,22.3l-4.1-6.8c-0.1-0.1-0.2-0.2-0.3-0.2h-3.7v7H237V1.2h8.7c2.4,0,4.3,0.7,5.5,2.1 c1.1,1.1,1.6,2.7,1.6,4.7V8c0,4-2.2,5.7-4,6.4c-0.1,0-0.2,0.1-0.2,0.2c0,0.1,0,0.3,0,0.4l4.4,7.2H248.8z M245.3,11.8 c2.3,0,3.6-1.3,3.6-3.5V8.3c0-2.3-1.3-3.5-3.7-3.5h-4.6v7H245.3z"></path>
              <path class="st191" d="M265.5,22.6c-5.8,0-10.1-4.7-10.1-10.9v-0.1c0-6.2,4.4-10.9,10.2-10.9c5.8,0,10.1,4.7,10.1,10.9v0.1 C275.7,17.9,271.3,22.6,265.5,22.6 M265.5,4.4c-3.6,0-6.2,3.1-6.2,7.2v0.1c0,4.1,2.7,7.3,6.3,7.3c3.5,0,6.2-3.1,6.2-7.2v-0.1 C271.8,7.6,269,4.4,265.5,4.4"></path>
              <path class="st191" d="M287.2,22.4c-5.3,0-8.2-3.3-8.2-9.3V1h3.7v12c0,3.7,1.7,5.8,4.6,5.8c2.9,0,4.6-2.1,4.6-5.6V1h3.7v12 C295.5,19.1,292.5,22.4,287.2,22.4"></path>
              <path class="st191" d="M299.3,22.3V1.2h8.1c4.7,0,7.6,2.7,7.6,7.2v0.1c0,4.4-3.2,7.3-8,7.3h-3.9v6.6H299.3z M307.1,12.2 c2.3,0,4-1.5,4-3.7c0-2.3-1.5-3.7-4.1-3.7h-3.9v7.5H307.1z"></path>
              <polygon class="st191" points="6.8,9.8 10.1,7.8 13.5,5.9 16.9,3.9 13.5,2 10.1,0 6.8,2 3.4,3.9 0,5.9 0,9.8 0,13.7 3.4,11.7 "></polygon>
              <polygon class="st191" points="27,13.7 30.4,11.7 33.8,9.8 37.2,7.8 40.6,5.9 37.2,3.9 33.8,2 30.4,0 27,2 23.7,3.9 20.3,5.9 16.9,7.8 13.5,9.8 10.1,11.7 6.8,13.7 3.4,15.6 0,17.6 3.4,19.5 6.8,21.5 10.1,23.4 13.5,21.5 16.9,19.5 20.3,17.6 23.7,15.6 "></polygon>
              <polygon class="st191" points="33.8,13.7 30.4,15.6 27,17.6 23.7,19.5 27,21.5 30.4,23.4 33.8,21.5 37.2,19.5 40.6,17.6 40.6,13.7 40.6,9.8 37.2,11.7 "></polygon>
              <path class="st191" d="M59.2,4.8c-0.4,0-0.7,0-1.1,0.1c-0.3,0.1-0.7,0.2-0.9,0.4c-0.4,0.3-0.7,0.6-0.9,1c-0.1,0.5,0,0.9,0.2,1.2 C56.7,7.8,57,8,57.3,8.2c0.3,0.2,0.8,0.4,1.3,0.5c0.5,0.2,1.1,0.4,1.9,0.6l0.7,0.3c0.9,0.3,1.6,0.6,2.3,1 c0.7,0.4,1.3,0.8,1.7,1.3c0.5,0.5,0.8,1.1,1.1,1.7c0.3,0.6,0.4,1.3,0.4,2.1c0,1-0.2,1.9-0.7,2.7c-0.4,0.8-1,1.5-1.8,2.1 c-0.8,0.6-1.6,1-2.6,1.4c-1,0.3-2,0.5-3.1,0.5c-1.1,0-2.2-0.2-3.1-0.5c-1-0.4-1.8-0.9-2.6-1.5c-0.5-0.4-0.9-0.8-1.2-1.3 c-0.3-0.4-0.5-0.9-0.7-1.2c0.2-0.1,3.3-1.9,3.5-1.9c0.5,0.5,1.4,2.4,4,2.6c0.4,0,0.9-0.1,1.3-0.2c0.5-0.1,0.9-0.3,1.3-0.5 c0.4-0.2,0.7-0.5,1-0.9c0.3-0.4,0.4-0.8,0.4-1.2c0-0.4-0.1-0.8-0.4-1.1c-0.2-0.3-0.6-0.5-0.9-0.7c-0.4-0.2-0.8-0.4-1.3-0.5 c-0.5-0.2-1-0.3-1.5-0.5c-0.8-0.3-1.5-0.6-2.3-0.9c-0.8-0.3-1.4-0.7-2-1.2c-0.6-0.5-1.1-1-1.4-1.7c-0.4-0.7-0.5-1.5-0.5-2.4 c0-0.9,0.2-1.7,0.6-2.4c0.4-0.7,0.9-1.3,1.6-1.8C55,2,55.8,1.6,56.6,1.3c0.2-0.1,0.4-0.1,0.5-0.1c1.9-0.5,4-0.2,5.7,0.8 c0,0,0,0,0,0c0.6,0.3,1.1,0.7,1.5,1.1c0.5,0.4,0.9,0.8,1.2,1.2l-2.9,2.2c0,0-2-1.3-2.2-1.4C60.3,5.1,59.5,4.8,59.2,4.8"></path>
              <path class="st191" d="M120.6,13.8c0,0.6,0.1,1.3,0.4,1.8c0.3,0.6,0.6,1.1,1,1.5c0.4,0.4,1,0.8,1.5,1c0.6,0.2,1.2,0.4,1.9,0.4 c0.7,0,1.3-0.1,1.9-0.4c0.6-0.2,1.1-0.6,1.5-1c0.4-0.4,0.8-0.9,1-1.5c0.3-0.6,0.4-1.2,0.4-1.8V1.1h3.9v12.7 c0,0.8-0.1,1.6-0.3,2.3c-0.2,0.7-0.5,1.4-0.9,2c-0.4,0.6-0.8,1.2-1.4,1.7c-0.5,0.5-1.1,1-1.8,1.3c-0.7,0.4-1.3,0.7-2.1,0.9 c-0.7,0.2-1.5,0.3-2.3,0.3c-1.2,0-2.3-0.2-3.4-0.7c-1.1-0.4-2-1.1-2.8-1.8c-0.8-0.8-1.4-1.7-1.9-2.7c-0.5-1-0.7-2.1-0.7-3.3V1.1 h3.9V13.8z"></path>
              <rect x="161" y="1.2" class="st191" width="3.9" height="21"></rect>
              <polygon class="st191" points="168.1,4.9 168.1,1.2 184.6,1.2 184.6,4.9 178.4,4.9 178.4,22.2 174.4,22.2 174.4,4.9 "></polygon>
              <path class="st191" d="M83.2,1.2c0,0-5.5,8-5.5,8c0,0-5.5-8-5.5-8h-4.5c0,0,8.2,11.9,8.2,12.1v8.9h1.8h0h1.9v-8.9 c0-0.3,8.2-12.1,8.2-12.1H83.2z"></path>
              <path class="st191" d="M202.8,1.2c0,0-5.5,8-5.5,8c0,0-5.5-8-5.5-8h-4.5c0,0,8.2,11.9,8.2,12.1v8.9h1.8h0h1.9v-8.9 c0-0.3,8.2-12.1,8.2-12.1H202.8z"></path>
              <path class="st191" d="M152.6,1.2V16c0-0.1-10.9-14.8-10.9-14.8h-3.5v21h3.7V7.4c0,0.1,10.9,14.8,10.9,14.8h3.5v-21H152.6z"></path>
              <path class="st191" d="M107,1.2c0,0-5.9,15.8-5.9,15.9c0-0.1-5.9-15.9-5.9-15.9h-5.6v21h3.7V6.9c0.1,0.3,6.1,15.3,6.1,15.3h3.4 c0,0,6-15,6.1-15.3v15.3h3.7v-21H107z"></path>
            </svg>
          </a>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  props: {
    pickupLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      keyword: '',
    }
  },
  computed:{
    size(){
      switch(this.$vuetify.breakpoint.name){
        case 'xl': return ''
        case 'lg': return ''
        default: return {'small':true}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__main {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.top__inner {
  width: 100% !important;
  max-width: 800px !important;
  padding: 0 5%;
  position: relative;
}
.main__txt, .main__pickup{
  position: relative;
}
.main__txt{
  padding-top: calc(5px + 60px + 32px);
  display: flex;
  align-items: center;
  @include mq(md){
    padding-top: 4rem;
  }
}
.main__catch {
  .catch__font {
    position: relative;
    z-index: 10;
    @include mq(md) {
      font-size: 42px !important;
    }
    &--small {
      font-size: 85% !important;
    }
  }
  .catch__intro {
    position: relative;
    z-index: 1;
    p {
      position: relative;
    }
  }
}

.main {
  &__menu,
  &__search {
    position: relative;
    z-index: 10;

    .btn-wrap {
      max-width: 500px;
      min-width: 135px;
    }
  }
  &__menu {
    .icon {
      @include mq(md) {
        width: 16px !important;
      }
    }
    .btn-text {
      color: $headingText;
    }
  }
  &__su-logo{
    width: 12rem;
    margin: auto;
    fill: #fff;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.top__corporate-link {
  position: absolute;
  top: 0;
  right: 0rem;
  writing-mode: vertical-rl;
  text-orientation: sideways;
  color: #1a264b !important;
}
</style>
