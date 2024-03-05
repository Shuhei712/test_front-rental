<template>
  <div class="loading">
    <div id="hexagon-1" class="hexagon"></div>
    <div id="hexagon-2" class="hexagon"></div>
    <div class="loading__inner">
      <div class="loading__img d-flex justify-center justify-sm-space-between align-end">
        <img id="monitan" class="mr-5 mr-sm-0" src="/img/pickup/monitan.png" alt="モニタン" />
        <img id="protan" src="/img/pickup/protan.png" alt="プロタン" />
      </div>
      <div class="loading__text text-h5 text-sm-h4 text-white letter-space-015em">Sorry... An Error occurred.</div>
      <p v-if="error.code === 'ECONNABORTED'" class="text-white my-3">
        ネットワークに問題がある可能性があります。<br>
        設定をお確かめの上、再度お試しください。
      </p>
      <div class="text-center">
        <v-btn v-if="error.code === 'ECONNABORTED'&&isNonMemRegister" class="text-white" text @click="$router.go(-1)"><v-icon color="#ffffff">mdi-form-select</v-icon>入力画面に戻る</v-btn>
        <v-btn class="text-white" href="/" text><v-icon color="#ffffff">mdi-home</v-icon>TOPページに戻る</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isNonMemRegister: this.$route.path.includes('non-mem-register'),
    }
  },
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
    width: 90%;
    max-width: 770px;

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
    word-break: break-word;

    span {
      display: inline-block;
      vertical-align: middle;
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
