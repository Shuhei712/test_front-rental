<template>
  <div class="top__slide">
    <img class="hexagon__pickup" src="/img/top/pickup.png" alt="PICKUP" />
    <div id="catch-copy-1" class="hexagon__catch pl-2 pr-3 py-3">
      <span id="catch-copy-1--text">ライブ配信に関する</span>
    </div>
    <div id="catch-copy-2" class="hexagon__catch pl-2 pr-3 py-3">
      <span id="catch-copy-2--text">お困りごとを解決！</span>
    </div>
    <div class="slide__prev" @click="slidePrev()"></div>
    <div class="slide__next" @click="slideNext()"></div>
    <div class="hexagon">
      <div class="hexagon__inner-1">
        <div class="hexagon__inner-2">
          <div class="hexagon__inner-3">
            <div class="hexagon__content">
              <hooper ref="carousel" class="top-hooper" :settings="hooperSettings" @slide="updateCarousel">
                <slide v-for="(list, index) in pickupLists" :key="index">
                  <div class="catch-copy-1--hidden">{{ list.PickupCatchCopy01 }}</div>
                  <div class="catch-copy-2--hidden">{{ list.PickupCatchCopy02 }}</div>
                  <div v-if="list.PickupType !== 1" class="content__item">
                    <div class="item__box">
                      <div class="item__image">
                        <img :src="list.ImageURL" :alt="list.PickupTitle" />
                      </div>
                      <div class="item__info">
                        <div class="info__maker pb-1">{{ list.PickupHeader }}</div>
                        <div class="info__box d-flex mt-3">
                          <div class="box__left flex-grow-1">
                            <div class="item-name">{{ list.PickupTitle }}</div>
                            <div class="item-number">{{ list.PickupTypeNumber }}</div>
                          </div>
                          <div class="box__right ml-2 mr-0">
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
                        <div class="info__category pb-1">{{ list.PickupHeader }}</div>
                        <div class="info__box d-flex my-2 my-xl-4">
                          <div class="box__left flex-grow-1">
                            <div class="feature-title">{{ list.PickupTitle }}</div>
                            <div class="feature-subtitle">
                              {{ list.PickupDescription }}
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
  props: {
    pickupLists: {
      type: Array,
      required: true,
    },
  },
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
      this.showCatchCopy()
      await this.waitUpdateCatchCopy()
      this.updateCatchCopy()
      this.hideCatchCopy()
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

      const catchCopy1Elem = document.getElementById('catch-copy-1--text')
      const catchCopy2Elem = document.getElementById('catch-copy-2--text')

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
    top: 23%;
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
    align-items: center;
    background-color: $primary;
    text-align: center;
    transform: rotate(8deg) scaleY(0);
    white-space: nowrap;
    transform-origin: left top;
  }

  .hexagon__catch.is-active {
    transform: rotate(8deg) scaleY(1);
  }

  #catch-copy-1 {
    top: 220px;
    right: -45px;
    transition: all 0.3s ease-in;

    @include mq(xl) {
      top: 150px;
      right: -55px;
    }
  }

  #catch-copy-2 {
    top: calc(220px + 2em);
    right: 25px;
    transition: all 0.3s 0.1s ease-in;
    @include mq(xl) {
      top: calc(150px + 2em);
      right: 5px;
    }
  }

  .hexagon__catch span {
    display: inline-block;
    font-size: 1.5rem;
    line-height: 1.5rem;
    opacity: 0;
    text-align: left;
    color: #ffffff;
    writing-mode: vertical-rl;
    text-orientation: upright;
    letter-spacing: 0.15em;
    transition: opacity 0.3s 0.3s ease-in;

    @include mq(xl) {
      font-size: 1.25rem;
      line-height: 1.25rem;
    }
  }

  .catch-copy-2--text {
    transition: opacity 0.3s 0.4s ease-in;
  }

  .hexagon__catch.is-active span {
    opacity: 1;
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
    cursor: pointer;
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
    cursor: pointer;
  }

  .slide__next:hover {
    width: 25px;
    height: 25px;
  }

  .hexagon {
    z-index: 1;
    position: relative;
    width: $hexagon-width;
    overflow: hidden;
    transform: rotate(-10deg);

    @include mq(md) {
    }
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
    height: calc(#{$hexagon-width} * 2 / 1.732);

    .item__box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transform: translate(-5%, 0) rotate(10deg);
      padding: 0 15%;
    }

    .item__image {
      position: relative;
      width: 100%;
      height: 60%;
      text-align: center;
      img {
        position: absolute;
        bottom: 0%;
        left: 50%;
        transform: translate(-50%, 0%);
        width: 100%;
        height: 75%;
        object-fit: contain;
      }
    }

    .item__info {
      width: 100%;
      max-height: 20%;
      .info__maker {
        font-size: 0.85rem;
        border-bottom: 1px solid $primary;
      }

      .info__box {
        width: 100%;
        .box__left {
          .item-name {
            font-size: 1.2rem;
            line-height: 1.4em;

            @include mq(xl) {
              font-size: 1rem;
            }
          }

          .item-number {
            font-size: 0.9rem;
            @include mq(xl) {
              font-size: 0.85rem;
            }
          }
        }

        .box__right {
          .v-btn {
            width: 90px;
            height: 90px;
            background-color: #ffffff;
            border: 1px solid $primary;
            color: $primary !important;

            @include mq(xl) {
              width: 70px;
              height: 70px;
            }
          }
        }
      }
    }
  }

  .content__feature {
    width: 110%;
    height: calc(#{$hexagon-width} * 2 / 1.732);
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transform: translate(-5%, 0) rotate(10deg);

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
      height: 43%;
      @include mq(xl) {
        height: 42.5%;
      }
    }

    .feature__info {
      width: 65%;
      margin: 0 auto;
      .info__category {
        font-size: 0.85rem;
        border-bottom: 1px solid $primary;
      }

      .info__box {
        .box__left {
          .feature-title {
            font-size: 1.2rem;
            line-height: 1.4em;

            @include mq(xl) {
              font-size: 0.9rem;
            }
          }

          .feature-subtitle {
            line-height: 1.25em;
            font-size: 0.9rem;
            padding-top: 0.5em;
            @include mq(xl) {
              font-size: 0.8rem;
            }
          }
        }

        .box__right {
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
