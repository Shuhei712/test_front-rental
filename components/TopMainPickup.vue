<template>
  <div class="top__slide">
    <div class="item__container">
      <hooper ref="carousel" class="slide__hooper" :settings="hooperSettings" group="pick">
        <slide v-for="(list, index) in pickupLists" :key="index">
          <div class="content__item"
            :style="pickUpBG(list.PickupType, list.ImageURL)">
            <div class="item__box"
            :class="list.PickupType === TYPE_PRODUCT ? 'item__product' : 'item__feature'">
              <div class="item__image">
                <img v-if="list.PickupType === TYPE_PRODUCT" :src="list.ImageURL" :alt="list.PickupTitle" />
                <div class="image__catch white--text">
                  <div id="catch-copy-1" class="my-1 catch__txt">
                    <span id="catch-copy-1--text">{{ list.PickupCatchCopy01 }}</span>
                  </div>
                  <div id="catch-copy-2" class="catch__txt">
                    <span id="catch-copy-2--text">{{ list.PickupCatchCopy02 }}</span>
                  </div>
                </div>
              </div>
              <a class="item__info d-block hover-opacity"
                :href="list.PageURL ? list.PageURL : '/products/' + list.ProductID + '?name=' + list.PickupTitle"
                :target="list.PageURL ? '_blank' : '_self'">
                <div class="info__maker">
                  <div class="info__maker-txt px-5 d-flex align-center justify-center">{{ list.PickupType === TYPE_PRODUCT ? 'RENTAL' : 'SPECIAL' }}</div>
                </div>
                <div class="info__box d-flex align-center ps-10 ps-lg-13 justify-space-between">
                  <div class="info__name letter-space-015em">
                    <div v-if="list.PickupType === TYPE_FEATURE" class="name__sub">{{ list.PickupDescription }}</div>
                    <div v-else class="name__sub">{{ list.PickupHeader }}</div>
                    <span class="name__main font-weight-bold letter-space-015em">{{ list.PickupTitle }}</span>
                  </div>
                  <div class="item__btn">
                    <v-btn
                      :href="list.PageURL ? list.PageURL : '/products/' + list.ProductID + '?name=' + list.PickupTitle"
                      :target="list.PageURL ? '_blank' : '_self'"
                       min-width="40" text class="pa-0 px-md-5"><span class="item__btn-arrow"></span></v-btn>
                  </div>
                </div>
                <div class="info__number letter-space-015em ps-11 ps-lg-13">
                  <span v-if="list.PickupTypeNumber">{{ list.PickupTypeNumber }}</span>
                </div>
              </a>
            </div>
          </div>
        </slide>
      </hooper>
      <div class="slide__thumbnail">
        <hooper group="pick" :items-to-show="5" class="thumbnail__slide" :settings="thumbHooper">
          <slide v-for="(list, index) in pickupLists" :key="index">
            <div class="thumbnail__item" @click="$refs.carousel.slideTo(index)">
              <img :src=list.ImageURL alt="サムネイル">
            </div>
          </slide>

        </hooper>
        <div class="slide__prev" @click="slidePrev()"></div>
        <div class="slide__next" @click="slideNext()"></div>
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
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        autoPlay: true,
        infiniteScroll: true,
        wheelControl: false,
        playSpeed: 10000,
        transition: 500,
      },
      thumbHooper: {
        itemsToShow: 5,
        autoPlay: true,
        infiniteScroll: true,
        wheelControl: false,
        playSpeed: 10000,
        transition: 500,
        breakpoints: {
          600: {
            itemsToShow: 8
          },
          960: {
            itemsToShow: 6
          },
          1500: {
            itemsToShow: 9,
          }
        }
      },
      TYPE_PRODUCT: 0,
      TYPE_FEATURE: 1,
      TYPE_TAG: 2,
    }
  },
  computed: {
    pickUpBG() {
      return(type, url)=>{
        if(type === this.TYPE_FEATURE){
          return { 'background-image': 'url(' + url + ')'}
        }else{
          return { 'background-image': 'url(https://rental-resource-sw.symunity.co.jp/catalog-img/top/sp/first-view.jpg)'}
        }
      }
    }
  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev()
    },
    slideNext() {
      this.$refs.carousel.slideNext()
    },

  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__slide {
  width: 110%;
  transform: translateX(-8.8%);
  height: 100%;
  margin: auto;
  position: relative;
  z-index: 2;
  @include mq(md) {
    width: 100%;
    transform: unset;
  }
  &::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: -1px;
    top: 0;
    pointer-events: none;
    background-image: linear-gradient(79deg, $accent 4%, transparent 4.1%), linear-gradient(-79deg, transparent calc(81.9% + 3.7vw), $accent calc(82% + 3.7vw));
    z-index: 1;
    @include mq(lg) {
      background-image: linear-gradient(79deg, $accent 6%, transparent 6.1%), linear-gradient(-79deg, transparent calc(80.9% + 2.7vw), $accent calc(81% + 2.7vw));
    }
    @include mq(md) {
      bottom: 0;
      top: auto;
      background-image: linear-gradient(5deg, $accent 12%, transparent 12.1%);
    }
  }
  $pick-img-width: calc(1000 * 100vw / 1920);
  $sns-space: 11%;
  $thumb-space: 6rem;
  $thumb-space-s: 7rem;
  .item__container{
    position: relative;
    height: 100%;
  }
  .content__item {
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: calc(#{$sns-space} + 1vw);
    padding-right: $sns-space;
    padding-bottom: calc(#{$thumb-space} + 4%);
    padding-top: 10rem;
    overflow: hidden;
    background-position: center;
    background-size: cover;
    @include mq(xl) {
      padding-top: 5rem;
    }
    @include mq(lg) {
      padding-right: 8%;
      padding-top: 8rem;
      padding-left: 10%;
    }
    @include mq(md) {
      padding-right: 3%;
      padding-bottom: 6rem;
      padding-top: 5rem;
    }
    @include mq(sm) {
      padding-left: 8%;
    }
    .item__image {
      position: relative;
      width: 100%;
      max-width: 840px;
      height: 66%;
      z-index: 5;
      padding-top: 53%;
      padding-top: clamp(28px, 66%, 530px);
      @include mq(md) {
        z-index: 0;
      }

      img {
        position: absolute;
        left: -8%;
        top: 0;
        width: calc(#{$pick-img-width});
        width: 100%;
        max-height: 100%;
        object-fit: contain;
        @include mq(md) {
          left: -16%;
        }
        @include mq(sm) {
          left: -22%;
        }
      }
      .image__catch{
        @include mq(md) {
          position: absolute;
          right: 0%;
          top: 6%;
        }
        @include mq(sm) {
          top: -1%;
        }
      }
      .catch__txt{
        transition: all 0.3s ease-in;
        transform: rotate(8deg) scaleY(1);
        transform-origin: bottom;
        position: absolute;
        @include mq(md) {
          transform: scaleY(1);
          position: relative;
          right: 0 !important;
          bottom: auto !important;
          margin: 1px 0;
        }
        &:nth-child(1){
          bottom: 0.3rem;
          right: 0;
        }
        &:nth-child(2){
          bottom: -0.5rem;
          right: 2.6rem;
        }
        span{
          font-family: "Noto Sans JP", sans-serif;
          font-size: 1.3rem;
          line-height: 1.5rem;
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: 0.15em;
          padding: 0.8rem 0.3rem 0.8rem 0.2rem;
          display: inline-block;
          background-color: $primary;
          @include mq(xl){
            font-size: 1.1rem;
          }
          @include mq(md) {
            writing-mode: initial;
            padding: 0.2rem 0.6rem 0.3rem;
          }
          @include mq(sm){
            font-size: 1rem;
            padding: 0.05rem 0.4rem 0.1rem;
          }
        }
      }

    }
    .item__box{
      &.item__product::before{
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(255,255,255,0.8);
      }
      &.item__feature::before{
        content: "";
        width: 17%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        background: linear-gradient(-90deg, rgba(255,255,255,.9) 0%, transparent 100%);
        @include mq(lg){
          display: none;
        }
      }
    }
    .item__info {
      position: relative;
      margin-bottom: 2rem;
      margin-left: 4rem;
      margin-top: -2rem;
      // max-width: 650px;
      &::before,&::after{
        position: absolute;
        width: 120%;
        height: 100%;
        content: "";
        transform: skewX(9deg);
        pointer-events: none;
      }
      &::before{
        background: rgba(255,255,255,0.85);
        top: 0;
        left: 0;
      }
      &::after{
        border: 1px solid $primary;
        top: -0.35rem;
        left: -0.5rem;
      }
      @include mq(md) {
        margin-left: auto;
        max-width: 600px;
      }
    }
    .info__maker {
      color: #ffffff;
      font-size: 1rem;
      font-weight: 500;
      position: absolute;
      display: inline-block;
      min-width: 100px;
      z-index: 3;
      top: 50%;
      transform: translate(-85%,-50%);
      &::before{
        position: absolute;
        width: 100%;
        height: 100%;
        display: inline-block;
        content: "";
        transform: skewX(9deg);
        background: $primary;
        top: 0;
        left: 0;
      }
      .item__feature &{
        background: $accent;
      }

      @include mq(md) {
        font-size: 0.7rem;
        top: 0;
        left: 0;
        transform: translateY(-55%);
      }
      &-txt {
        position: relative;
        height: 100%;
        min-height: 2.8rem;
        width: 7.8rem;
        line-height: 1.2;
        letter-spacing: 0.13em;
        padding: 0.5rem 0.4rem;
        word-break: break-word;
        @include mq(md) {
          width: auto;
        }
      }
    }

    .info__box{
      // min-height: 9.8rem;
      color: $primary;
      padding-top: 2rem;
      padding-bottom: clamp(1rem, 6vw, 5rem);
      @include mq(lg) {
        // min-height: 8.4rem;
        padding-bottom: clamp(3.8rem, 8vw, 4.8rem);
      }
      @include mq(md){
        padding-bottom: clamp(3.8rem, 17vw, 5rem);
        padding-top: 2.6rem;
      }
    }

    .info__name {
      position: relative;
      line-height: 1.2;
      > *{
        font-family:"Montserrat","Zen Kaku Gothic Antique", sans-serif !important;
      }
      .name__main{
        font-size: 1.45rem;
        @include mq(sm){
          font-size: 1.2rem;
        }
      }
      .name__sub{
        font-weight: 700;
        font-size: 1.1rem;
        padding-bottom: 0.5rem;
        @include mq(sm){
          font-size: 0.9rem;
        }
      }
    }
    .item__btn {
      height: auto;
      &-arrow{
        width: 1.4rem;
        height: 1.4rem;
        border-right: 2px $primary solid;
        border-top: 2px $primary solid;
        transform: rotate(45deg);
      }
    }
    .item__feature {
      .info__number{
        color: $accent;
      }
      .info__name .name__sub{
        font-weight: 500;
        font-size: 1rem;
      }
    }

    .info__number {
      position: absolute;
      color: $primary;
      font-weight: 900;
      font-size: clamp(28px, 2.8vw, 34px);
      line-height: 0.9;
      font-style: italic;
      transform: translateY(clamp(-4.8rem, -5.5vw, -3.6rem));
      transform: translateY(clamp(-4.8rem, -4.8vw, -3.6rem));
      text-shadow: 0 0 2px #fff, 0 0 2px #fff, 0 0 2px #fff, 0 0 2px #fff;
      z-index: 3;
      width: calc(100% + 1rem);
      word-break: break-word;
      @include mq(lg){
        transform: translateY(clamp(-4.5rem, -6.7vw, -3.6rem));
        width: calc(100% + 2rem);
        font-size: clamp(28px, 7.4vw, 38px);
      }
      @include mq(md){
        transform: translateY(clamp(-4.8rem, -8vw, -3.8rem));
        width: calc(100% + 0rem);
      }

    }
    .item__feature {
      .item__info::after,
      .item__btn-arrow{
        border-color: $accent;
      }
      .info__box{
        color: $accent;
      }
      .info__maker::before,
      .catch__txt > span{
        background-color: $accent;
      }
    }

  }
  .slide__thumbnail{
    position: absolute;
    bottom: 2%;
    left: 50%;
    transform: translateX(-50%) skewX(9deg);
    height: $thumb-space;
    width: calc(100% - #{$sns-space} * 2.2 );
    padding: 0 4% 0 3%;
    @include mq(md) {
      width: 90%;
      transform: translate(-50%,55%) skewX(9deg);
      z-index: 3;
      padding: 0 6% 0 5%;
    }
    .hooper-slide{
      padding: 0 5px;
    }
    .thumbnail__item{
      background-color: rgba(255,255,255,0.5);
      line-height: 0;
      height: 100%;
      overflow: hidden;
      img{
        width: 140%;
        height: 100%;
        object-fit: cover;
        transform: translateX(-15%) skew(-9deg);
      }

    }
    .slide__prev,.slide__next{
      z-index: 100;
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      border-right: solid 2px $primary;
      border-top: solid 2px $primary;
      transition: all 0.1s ease-in-out;
      cursor: pointer;
      top: 50%;
      @include mq(md) {
        border-color: #fff;
        border-left: solid transparent;
        border-bottom: solid transparent;
        border-width: 20px;
        border-radius: 3px;
      }
    }
    .slide__prev {
      left: -2%;
      transform: translateY(-50%) rotate(-135deg);
    }
    .slide__next {
      right: -2%;
      transform: translateY(-50%) rotate(45deg);
    }

    .slide__prev:hover,.slide__next:hover {
      width: 25px;
      height: 25px;
    }

  }
}
</style>
