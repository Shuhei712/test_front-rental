<template>
  <div class="loading">
    <div id="hexagon-1" class="hexagon"></div>
    <div id="hexagon-2" class="hexagon"></div>
    <div class="loading__inner">
      <div class="loading__img d-flex justify-center justify-sm-space-between align-end">
        <img id="monitan" class="mr-5 mr-sm-0" src="/img/pickup/monitan.png" alt="" />
        <img id="protan" src="/img/pickup/protan.png" alt="" />
      </div>
      <div class="loading__text text-h5 text-sm-h4 text-white letter-space-015em">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    document.addEventListener('touchmove', this.disableScroll, { passive: false })
    document.addEventListener('mousewheel', this.disableScroll, { passive: false })
  },
  beforeDestroy() {
    document.removeEventListener('touchmove', this.disableScroll, { passive: false })
    document.removeEventListener('mousewheel', this.disableScroll, { passive: false })
  },
  methods: {
    disableScroll(event) {
      event.preventDefault()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: $accent;
  z-index: 9999;

  #hexagon-1 {
    position: absolute;
    width: 500px;
    height: calc(500px * 1.732 / 2);
    top: -50px;
    left: -50px;
    animation: 15s linear infinite rotation;
  }

  #hexagon-1::before {
    content: '';
    width: 500px;
    position: absolute;
    border-bottom: calc(500px * 1.732 / 2 / 2) solid rgba($color: #fff57d, $alpha: 0.18);
    border-left: calc(500px * 0.25) solid transparent;
    border-right: calc(500px * 0.25) solid transparent;
    box-sizing: border-box;
  }

  #hexagon-1::after {
    content: '';
    width: 500px;
    position: absolute;
    top: calc(500px * 1.732 / 2 / 2);
    border-top: calc(500px * 1.732 / 2 / 2) solid rgba($color: #fff57d, $alpha: 0.18);
    border-left: calc(500px * 0.25) solid transparent;
    border-right: calc(500px * 0.25) solid transparent;
    box-sizing: border-box;
  }

  #hexagon-2 {
    position: absolute;
    width: 300px;
    height: calc(300px * 1.732 / 2);
    bottom: 0;
    right: -25px;
    animation: 5s linear infinite rotation;
  }

  #hexagon-2::before {
    content: '';
    width: 300px;
    position: absolute;
    border-bottom: calc(300px * 1.732 / 2 / 2) solid rgba($color: #fff57d, $alpha: 0.18);
    border-left: calc(300px * 0.25) solid transparent;
    border-right: calc(300px * 0.25) solid transparent;
    box-sizing: border-box;
  }

  #hexagon-2::after {
    content: '';
    width: 300px;
    position: absolute;
    top: calc(300px * 1.732 / 2 / 2);
    border-top: calc(300px * 1.732 / 2 / 2) solid rgba($color: #fff57d, $alpha: 0.18);
    border-left: calc(300px * 0.25) solid transparent;
    border-right: calc(300px * 0.25) solid transparent;
    box-sizing: border-box;
  }

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 100px;

    @include mq(sm) {
      padding: 20px 0;
    }
  }

  &__img {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    @include mq(sm) {
      bottom: 100%;
    }

    #monitan,
    #protan {
      width: 75px;
      object-fit: contain;
    }
  }

  &__text {
    color: white;
    display: inline-block;
    white-space: nowrap;

    span {
      display: inline-block;
      vertical-align: middle;

      &:nth-of-type(1) {
        animation: animation 2s ease 0s infinite;
      }
      &:nth-of-type(2) {
        animation: animation 2s ease 0.1s infinite;
      }
      &:nth-of-type(3) {
        animation: animation 2s ease 0.2s infinite;
      }
      &:nth-of-type(4) {
        animation: animation 2s ease 0.3s infinite;
      }
      &:nth-of-type(5) {
        animation: animation 2s ease 0.4s infinite;
      }
      &:nth-of-type(6) {
        animation: animation 2s ease 0.5s infinite;
      }
      &:nth-of-type(7) {
        animation: animation 2s ease 0.6s infinite;
      }
      &:nth-of-type(8) {
        animation: animation 2s ease 0.7s infinite;
      }
      &:nth-of-type(9) {
        animation: animation 2s ease 0.8s infinite;
      }
      &:nth-of-type(10) {
        animation: animation 2s ease 0.9s infinite;
      }
    }
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes animation {
  0% {
    margin-top: 0;
  }
  5% {
    margin-top: -1em;
  }
  10% {
    margin-top: 0;
  }
  13% {
    margin-top: -0.5em;
  }
  16% {
    margin-top: 0;
  }
  18% {
    margin-top: -0.2em;
  }
  20% {
    margin-top: 0;
  }
}
</style>
