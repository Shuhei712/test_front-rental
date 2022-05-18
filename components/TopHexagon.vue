<template>
  <div class="top__slide">
    <img class="hexagon__pickup" src="/img/top/pickup.png" alt="" />
    <div id="catch-copy-1" class="hexagon__catch text-h6 text-xl-h5 letter-space-015em pl-1 pr-2 py-5">
      キャッチコピー一行目
    </div>
    <div id="catch-copy-2" class="hexagon__catch text-h6 text-xl-h5 letter-space-015em pl-1 pr-2 py-5">
      キャッチコピー二行目
    </div>
    <div class="slide__prev" @click="slidePrev()"></div>
    <div class="slide__next" @click="slideNext()"></div>
    <div class="hexagon">
      <div class="hexagon__inner-1">
        <div class="hexagon__inner-2">
          <div class="hexagon__inner-3">
            <div class="hexagon__content">
              <hooper ref="carousel" class="top-hooper" :settings="hooperSettings" @slide="updateCarousel">
                <slide v-for="(list, index) in pickUpLists" :key="index">
                  <div class="catch-copy-1--hidden">{{ list.PickupCatchCopy1 }}</div>
                  <div class="catch-copy-2--hidden">{{ list.PickupCatchCopy2 }}</div>
                  <div v-if="list.PickupType !== 1" class="content__item">
                    <div class="item__box d-flex flex-column justify-center align-center">
                      <div class="item__image mb-4">
                        <img :src="list.ImageURL" :alt="list.PickupTitle" />
                      </div>
                      <div class="item__info">
                        <div class="info__maker text-caption text-xl-body-2 pb-1">{{ list.PickupHeader }}</div>
                        <div class="info__box d-flex my-4">
                          <div class="box__left flex-grow-1">
                            <div class="item-name text-subtitle-1 text-xl-h6">{{ list.PickupTitle }}</div>
                            <div class="item-number text-body-2 text-xl-subtitle-1">{{ list.PickupTypeNumber }}</div>
                          </div>
                          <div class="box__right ml-3">
                            <v-btn
                              class="text-body-2"
                              :href="'/products/' + list.ProductID + '?name=' + list.PickupTitle"
                              :elevation="0"
                              >詳細へ</v-btn
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-else
                    class="content__feature"
                    :style="[
                      {
                        'background-image': 'url(' + list.ImageURL + ')',
                      },
                    ]">
                    <div class="feature__bg"></div>
                    <div class="feature__content">
                      <div class="feature__info">
                        <div class="info__category text-caption text-xl-body-2 pb-1">{{ list.PickupHeader }}</div>
                        <div class="info__box d-flex my-4">
                          <div class="box__left flex-grow-1">
                            <div class="feature-title text-subtitle-1 text-xl-h6">{{ list.PickupTitle }}</div>
                            <div class="feature-subtitle text-body-2 text-xl-subtitle-1">
                              {{ list.PickupCatchCopy1 }}
                            </div>
                          </div>
                          <div class="box__right ml-3">
                            <v-btn class="text-body-2" :href="list.PageURL" :elevation="0">詳細へ</v-btn>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </slide>
              </hooper>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hexagon__shadow">
      <div class="shadow__path"></div>
    </div>
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
        wheelControl: false,
        playSpeed: 10000,
        transition: 500,
      },
      catchCopy1: '',
      catchCopy2: '',
      pickUpLists: [
        {
          ImageURL: 'https://rental-resource.takenaka-co.co.jp/catalog-img/article/suggest/04.png',
          PageURL: 'https://www.takenaka-co.co.jp/streaming/',
          PickupCatchCopy1: 'ライブ配信に関する',
          PickupCatchCopy2: 'お困りごとを解決！',
          PickupDescription:
            'ライブ配信に関するお困りごとを解決！\r\nオンラインイベント実績の多い弊社が、生配信もサポートします。',
          PickupHeader: 'SPECIAL',
          PickupTitle: 'ライブ配信ソリューション',
          PickupType: 1,
          PickupTypeNumber: null,
          PicupHeaderID: 1,
          ProductID: null,
          TagID: null,
        },
        {
          ImageURL: 'https://rental-resource.takenaka-co.co.jp/catalog-img/article/feature/03.png',
          PageURL: 'https://www.takenaka-co.co.jp/thermal-camera/',
          PickupCatchCopy1: 'サーモグラフィーカメラで',
          PickupCatchCopy2: '安全なイベント運営を！',
          PickupDescription: '高度な検知機能搭載サーモグラフィーカメラを使って安全なイベント運営を！',
          PickupHeader: 'SPECIAL',
          PickupTitle: 'サーモグラフィーカメラ特設ページ',
          PickupType: 1,
          PickupTypeNumber: null,
          PicupHeaderID: 2,
          ProductID: null,
          TagID: null,
        },
        {
          ImageURL:
            'https://rental-document.takenaka-co.co.jp/catalog-img/Resources/root/visual_device/VR-50HD MkⅡ_top_re.png',
          PageURL: null,
          PickupCatchCopy1: 'イベント・ライブ配信向け',
          PickupCatchCopy2: 'オールイン・ワンAVミキサー',
          PickupDescription: 'イベント・ライブ配信向けオールイン・ワンAVミキサー',
          PickupHeader: 'Roland',
          PickupTitle: 'マルチフォーマットビデオスイッチャー',
          PickupType: 0,
          PickupTypeNumber: 'VR50HD MKⅡ',
          PicupHeaderID: 3,
          ProductID: 2594,
          TagID: null,
        },
        {
          ImageURL:
            'https:/rental-document.takenaka-co.co.jp/catalog-img/takenaka/01rental/04visual_device/img_visual_device/roland_vr-4hd.jpg',
          PageURL: null,
          PickupCatchCopy1: 'HDMI、コンポジ入力、XLR',
          PickupCatchCopy2: 'RCAUSBストリーム出力',
          PickupDescription: 'HDMI、コンポジ入力、XLR、\r\nRCAUSBストリーム出力',
          PickupHeader: 'Roland',
          PickupTitle: 'AVミキサー',
          PickupType: 0,
          PickupTypeNumber: 'VR4-HD',
          PicupHeaderID: 4,
          ProductID: 1801,
          TagID: null,
        },
      ],
    }
  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev()
    },
    slideNext() {
      this.$refs.carousel.slideNext()
    },
    async updateCarousel() {
      this.hideCatchCopy()
      await this.waitUpdateCatchCopy()
      this.updateCatchCopy()
      this.showCatchCopy()
    },
    waitUpdateCatchCopy() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    updateCatchCopy() {
      const catchCopy1Text = document.querySelectorAll('li.hooper-slide.is-active > div.catch-copy-1--hidden')[0]
        .textContent

      const catchCopy2Text = document.querySelectorAll('li.hooper-slide.is-active > div.catch-copy-2--hidden')[0]
        .textContent

      const catchCopy1Elem = document.getElementById('catch-copy-1')
      const catchCopy2Elem = document.getElementById('catch-copy-2')

      catchCopy1Elem.textContent = catchCopy1Text
      catchCopy2Elem.textContent = catchCopy2Text
    },
    hideCatchCopy() {
      const catchCopy1Elem = document.getElementById('catch-copy-1')
      const catchCopy2Elem = document.getElementById('catch-copy-2')
      catchCopy1Elem.classList.add('is-active')
      catchCopy2Elem.classList.add('is-active')
    },
    showCatchCopy() {
      const catchCopy1Elem = document.getElementById('catch-copy-1')
      const catchCopy2Elem = document.getElementById('catch-copy-2')
      catchCopy1Elem.classList.remove('is-active')
      catchCopy2Elem.classList.remove('is-active')
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__slide {
  position: absolute;
  top: 19%;
  left: 55%;

  @include mq(xl) {
    top: 21%;
  }

  $hexagon-width: calc(650 * 100vw / 1920);
  $hexagon-rotate: 10deg;

  .hexagon__pickup {
    position: absolute;
    width: 70%;
    top: -20px;
    right: -60px;
    z-index: 100;
    object-fit: contain;
    transform: rotate(-1deg);
  }

  .hexagon__catch {
    display: inline-block;
    z-index: 100;
    position: absolute;
    writing-mode: vertical-rl;
    // text-orientation: upright;
    align-items: center;
    background-color: $primary;
    text-align: center;
    color: #ffffff;
    transform: scale(1, 1) rotate(10deg);
    white-space: nowrap;
    transform-origin: top;
    animation-name: catch-copy-show;
    animation-duration: 0.9s;
    animation-timing-function: ease-in-out;
  }

  #catch-copy-1 {
    top: 220px;
    right: -45px;

    @include mq(xl) {
      top: 180px;
      right: -55px;
    }
  }

  #catch-copy-2 {
    top: 320px;
    right: 25px;
    @include mq(xl) {
      top: 280px;
      right: 15px;
    }
  }

  #catch-copy-1.is-active {
    // transform: scale(0, 0) rotate(10deg);
    animation-name: catch-copy-hide;
    animation-duration: 1.1s;
    animation-timing-function: ease-in-out;
  }

  #catch-copy-2.is-active {
    // transform: scale(0, 0) rotate(10deg);
    animation-name: catch-copy-hide;
    animation-duration: 1.1s;
    animation-timing-function: ease-in-out;
  }

  @keyframes catch-copy-hide {
    0% {
      transform: scale(1, 1) rotate(10deg);
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: scale(0, 0) rotate(10deg);
    }
  }

  @keyframes catch-copy-show {
    0% {
      transform: scale(0, 0) rotate(10deg);
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: scale(1, 1) rotate(10deg);
    }
  }

  .catch-copy-1--hidden,
  .catch-copy-2--hidden {
    display: none;
  }

  .slide__prev {
    z-index: 100;
    position: absolute;
    top: 15%;
    left: 45%;
    display: block;
    width: 20px;
    height: 20px;
    border-top: solid 2px $primary;
    border-right: solid 2px $primary;
    transform: rotate(-45deg);
    transition: all 0.1s ease-in-out;
  }

  .slide__prev:hover {
    width: 25px;
    height: 25px;
  }

  .slide__next {
    z-index: 100;
    position: absolute;
    bottom: 10%;
    left: 45%;
    display: block;
    width: 20px;
    height: 20px;
    border-top: solid 2px $primary;
    border-right: solid 2px $primary;
    transform: rotate(135deg);
    transition: all 0.1s ease-in-out;
  }

  .slide__next:hover {
    width: 25px;
    height: 25px;
  }

  .hexagon {
    z-index: 1;
    position: relative;
    width: $hexagon-width;
    // box-shadow: 0 0 0 1px #1699cb inset;
    overflow: hidden;
    transform: rotate(-10deg);
  }
  .hexagon::before {
    display: block;
    padding-top: calc(#{$hexagon-width} * 2 / 1.732); /*  2√3 / 4 x 100  */
    content: '';
  }

  .hexagon__inner-1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // box-shadow: 0 0 0 1px #cb163f inset;
    overflow: hidden;
    transform: rotate(60deg);
  }
  .hexagon__inner-2 {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // box-shadow: 0 0 0 1px #1bc13e inset;
    transform: rotate(60deg);
  }
  .hexagon__inner-3 {
    width: 100%;
    height: 100%;
    // padding-top: calc(#{$hexagon-width} * 2 / 1.732 / 4);
    transform: rotate(-120deg);
  }

  .hexagon__content {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    position: relative;
  }

  .content__item {
    position: relative;
    width: 100%;
    height: 100%;

    .item__box {
      position: absolute;
      width: 70%;
      top: 45%;
      left: 35%;
      transform: translate(-35%, -50%) rotate(10deg);
    }

    .item__image {
      img {
        width: 320px;
        object-fit: contain;

        @include mq(xl) {
          width: 250px;
        }
      }
    }

    .item__info {
      min-width: 100%;
      .info__maker {
        border-bottom: 1px solid $primary;
      }

      .info__box {
        .box__left {
          // width: 70%;
        }

        .box__right {
          // width: 30%;

          .v-btn {
            width: 90px;
            height: 90px;
            background-color: #ffffff;
            border: 1px solid $primary;
            color: $primary !important;

            @include mq(xl) {
              width: 75px;
              height: 75px;
            }
          }
        }
      }
    }
  }

  .content__feature {
    width: 110%;
    height: 100%;
    position: relative;
    // background-image: url('/img/top/top_slide.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transform: translate(-5%, -10px) rotate(10deg);

    .feature__bg {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 55%;
      background-color: rgba($color: #ffffff, $alpha: 0.85);
      clip-path: polygon(0 0, 100% 30%, 100% 100%, 0% 100%);
    }

    .feature__content {
      position: absolute;
      bottom: 0;
      left: -5%;
      width: 100%;
      height: 42%;
      @include mq(xl) {
        height: 44%;
      }
    }

    .feature__info {
      width: 60%;
      margin: 0 auto;
      .info__category {
        border-bottom: 1px solid $primary;
      }

      .info__box {
        .box__left {
          // width: 70%;
        }

        .box__right {
          // width: 30%;

          .v-btn {
            width: 90px;
            height: 90px;
            background-color: transparent;
            border: 1px solid $primary;
            color: $primary !important;
            @include mq(xl) {
              width: 75px;
              height: 75px;
            }
          }
        }
      }
    }
  }

  .hexagon__shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: rotate(-70deg);

    .shadow__path {
      z-index: -1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform-origin: center bottom;
      transform: translate(0, -75%) scale(1, 2);
      background-color: rgba($color: #fff57d, $alpha: 0.18);
      clip-path: polygon(40% 0, 55% 0, 100% 100%, 0 100%);
    }
  }
}
</style>
