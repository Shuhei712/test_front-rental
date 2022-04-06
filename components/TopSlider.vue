<template>
  <div class="top__slider">
    <!-- <div class="slider__button">
      <v-btn class="button__prev" icon color="primary">
        <v-icon x-large>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn class="button__next" icon color="primary">
        <v-icon x-large>mdi-chevron-down</v-icon>
      </v-btn>
    </div> -->
    <hooper ref="carousel" class="top-hooper" :settings="hooperSettings">
      <slide v-for="(list, index) in topSliderLists" :key="index">
        <div class="slider d-flex justify-space-between">
          <div class="slide__card mr-5">
            <div class="text-center">
              <img class="card__img" :src="list.imageURL" :alt="list.title" />
            </div>
            <div class="card__info mt-3">
              <div class="info__maker text-caption">{{ list.maker }}</div>
              <div class="info__content d-flex mt-3">
                <div class="flex-grow-1">
                  <div class="content__name text-subtitle-1 text-xl-h6">{{ list.title }}</div>
                  <div class="content__serial text-body-1 mt-2">{{ list.serial }}</div>
                </div>
                <div class="ml-3">
                  <v-btn class="content__detail" block elevation="0">詳細へ</v-btn>
                </div>
              </div>
            </div>
          </div>
          <div class="slide__copy">
            <div class="copy__inner d-flex">
              <p class="text-h6 text-xl-h5 letter-space-02em ma-6">
                <span class="pa-2">{{ list.catchCopy2 }}</span>
              </p>
              <p class="text-h6 text-xl-h5 letter-space-02em">
                <span class="pa-2">{{ list.catchCopy1 }}</span>
              </p>
            </div>
          </div>
        </div>
      </slide>
    </hooper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        vertical: true,
        autoPlay: true,
        infiniteScroll: true,
        playSpeed: 5000,
      },
      topSliderLists: [
        {
          title: 'マルチフォーマットビデオスイッチャー',
          catchCopy1: 'イベント・ライブ配信向け',
          catchCopy2: 'オールイン・ワンAVミキサー',
          serial: 'VR_50HD MK Ⅱ',
          imageURL: '/img/top/main_slider.png',
          maker: 'Roland',
        },
        {
          title: 'マルチフォーマットビデオスイッチャー',
          catchCopy1: 'イベント・ライブ配信向け',
          catchCopy2: 'オールイン・ワンAVミキサー',
          serial: 'VR_50HD MK Ⅱ',
          imageURL: '/img/top/main_slider.png',
          maker: 'Roland',
        },
        {
          title: 'マルチフォーマットビデオスイッチャー',
          catchCopy1: 'イベント・ライブ配信向け',
          catchCopy2: 'オールイン・ワンAVミキサー',
          serial: 'VR_50HD MK Ⅱ',
          imageURL: '/img/top/main_slider.png',
          maker: 'Roland',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top-hooper {
  width: 100%;
  height: 100%;
}

.top__slider {
  width: calc(750 * 100vw / 1920);
  height: calc(550 * 100vw / 1920);
  position: absolute;
  bottom: 6%;
  right: 2%;
  // background-color: red;
  z-index: 10;

  .slider__button {
    position: relative;

    .button__prev {
      z-index: 999;
      position: absolute;
      top: -50px;
      left: 30%;
    }

    .button__next {
      position: absolute;
      top: calc(550 * 100vw / 1920 - 100px);
      left: 30%;
    }
  }

  .slide__copy {
    position: relative;
    width: 100%;

    .copy__inner {
      position: relative;

      p {
        writing-mode: vertical-rl;
        color: #ffffff;
        text-orientation: upright;
        transform: rotate(6deg);

        span {
          background-color: $outline;
        }
      }
    }
  }

  .slide__card {
    min-width: calc(500 * 100vw / 1920);
    .card__img {
      width: calc(350 * 100vw / 1920);
      object-fit: cover;
    }

    .card__info {
      .info__maker {
        border-bottom: 1px solid $primary;
      }

      .content__detail {
        width: 90px;
        height: 90px;
        background-color: #ffffff;
        border: 1px solid $primary;
        color: $primary;

        @include mq(xl) {
          width: 75px;
          height: 75px;
        }
      }
    }
  }
}
</style>
