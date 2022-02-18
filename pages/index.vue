<template>
  <div id="top" class="top">
    <div class="top__share top__share--fixed">
      <v-btn class="share__twitter text-white text-body-2 mr-2" color="#00ACED"
        ><div class="btn-shadow"></div>
        <v-icon class="mr-2 rotate-90">mdi-twitter</v-icon>Tweet</v-btn
      >
      <v-btn class="share__twitter text-white text-body-2 mr-2" color="#3B5998"
        ><v-icon class="mr-2 rotate-90">mdi-facebook</v-icon>Share</v-btn
      >
    </div>
    <div class="top__back top__back--fix">
      <v-btn class="text-body-2" v-scroll-to="'#top'" color="cushion"
        ><v-icon color="accent">mdi-chevron-up</v-icon>トップにもどる</v-btn
      >
    </div>
    <top-main></top-main>
    <div class="top__inner d-flex py-16">
      <category-lists></category-lists>
      <div class="content">
        <top-new></top-new>
        <top-article></top-article>
        <top-pickup></top-pickup>
      </div>
    </div>
  </div>
</template>
<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export default {
  mounted() {
    this.scrollShareButton()
    this.scrollBackButton()
  },
  methods: {
    scrollShareButton() {
      gsap.to('.top', {
        scrollTrigger: {
          trigger: '.footer',
          markers: false,
          start: 'top bottom',
          end: 'bottom top',
          toggleClass: {
            targets: '.top__share',
            className: 'top__share--absolute',
          },
        },
      })
    },
    scrollBackButton() {
      gsap.to('.top__back', {
        scrollTrigger: {
          trigger: '.content',
          markers: false,
          start: 'top bottom',
          end: 'bottom top',
          toggleClass: {
            targets: '.top__back',
            className: 'top__back--active',
          },
        },
      })

      gsap.to('.top', {
        scrollTrigger: {
          trigger: '.footer',
          markers: false,
          start: 'top bottom',
          end: 'bottom top',
          toggleClass: {
            targets: '.top__back',
            className: 'top__back--absolute',
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top {
  position: relative;
  height: auto;

  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
}

.top__share {
  z-index: 100;
  transform-origin: right top;
  transform: rotate(90deg) translate(0, 0);

  .share__twitter {
    box-shadow: 5px -5px 0px -2px #ffffff;
    border-radius: 10px;
  }
}

.top__back {
  z-index: 100;
  transform: translate(110%, 0);
  transition: all 0.5s ease-in-out;
}

.top__back--active {
  transform: translate(0, 0);
}

.top__back--fix {
  position: fixed;
  bottom: 4px;
  right: 10px;
}

.top__back--absolute {
  position: absolute;
  bottom: 4px;
  right: 10px;
}

.top__share--fixed {
  position: fixed;
  bottom: 10px;
  right: 10px;
}

.top__share--absolute {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.content {
  width: 70%;
  flex-grow: 1;
}
</style>
