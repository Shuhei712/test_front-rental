<template>
  <div class="top__slide-rp">
    <img class="hexagon__pickup" src="/img/sp/top/pickup.png" alt="" />
    <img class="hexagon__top-image" :src="pickUpItem.ImageURL" alt="" />
    <div class="hexagon">
      <div class="hexagon__inner-1">
        <div class="hexagon__inner-2">
          <div class="hexagon__inner-3">
            <div class="hexagon__content">
              <div class="content__bg"></div>
              <div class="content__item">
                <div class="item__container px-3">
                  <div class="item__image text-center">
                    <img :src="pickUpItem.ImageURL" :alt="pickUpItem.PickupTitle" />
                  </div>
                  <div class="item__info">
                    <div class="item__maker letter-space-015em">
                      {{ pickUpItem.PickupHeader }}
                    </div>
                    <div class="item__border mb-1"></div>
                    <div class="item__name">{{ pickUpItem.PickupTitle }}</div>
                  </div>
                  <!-- <div class="item__name text-caption text-md-body-2">{{ pickUpItem.PickupTypeNumber }}</div> -->
                </div>
                <div class="item__btn text-center">
                  <v-btn :href="'/products/' + pickUpItem.ProductID + '?name=' + pickUpItem.PickupTitle" text
                    ><v-icon color="#ffffff" large>mdi-arrow-right</v-icon></v-btn
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  computed: {
    pickUpItem() {
      const itemLists = this.pickupLists.filter((ele) => ele.PickupType === 0)
      const max = itemLists.length
      const min = 0
      const pickUpNum = Math.floor(Math.random() * (max - min)) + min
      return itemLists[pickUpNum]
    },
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__slide-rp {
  position: absolute;
  bottom: 0;
  right: 0;

  $hexagon-width: calc(850 * 100vw / 1920);
  $hexagon-rotate: -10deg;

  @media screen and (max-width: 320px) {
    display: none;
  }

  .hexagon__pickup {
    position: absolute;
    width: 80%;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
    object-fit: contain;
  }

  .hexagon__top-image {
    display: none;

    @include mq(sm) {
      display: block;
      position: absolute;
      width: calc(#{$hexagon-width} - 50px);
      top: -10%;
      left: 50%;
      transform: translate(-50%, -50%);
      object-fit: contain;
      z-index: 50;
    }
  }

  .hexagon {
    z-index: 100;
    position: relative;
    width: $hexagon-width;
    // box-shadow: 0 0 0 1px #1699cb inset;
    overflow: hidden;
    transform: rotate(10deg);
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
    background-color: $accent;
    position: relative;
  }

  .content__bg {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(10deg);
    background-color: rgba($color: #fff57d, $alpha: 0.18);
    clip-path: polygon(0 25%, 100% 15%, 100% 100%);
    width: 200%;
    height: 120%;
  }

  .content__item {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .item__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-10deg);
    width: 90%;
    height: 60%;
    overflow: hidden;

    @include mq(sm) {
      width: 100%;
      height: 50%;
    }

    .item__image {
      position: relative;
      height: 60%;
      @include mq(sm) {
        display: none;
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(#{$hexagon-width} - 45%);
        max-height: 100%;
        object-fit: contain;
      }
    }

    .item__maker {
      color: #ffffff;
      font-weight: 600;
      font-size: 0.8rem;

      @include mq(sm) {
        font-size: 0.7rem;
      }
    }

    .item__border {
      width: 120%;
      height: 1px;
      transform: translate(-10%, 0);
      background-color: #ffffff;
    }

    .item__name {
      color: #ffffff;
      font-weight: 600;
      font-size: 1rem;
      line-height: 1.25rem;

      @include mq(sm) {
        font-size: 0.75rem;
        line-height: 1.25rem;
      }
    }
  }

  .item__btn {
    position: absolute;
    bottom: 10%;
    left: 0%;
    transform: rotate(-10deg);
    width: 100%;
    height: auto;
  }
}
</style>
