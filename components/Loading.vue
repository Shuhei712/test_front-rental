<template>
  <div class="loading">
    <div id="hexagon-1" class="hexagon"></div>
    <div id="hexagon-2" class="hexagon"></div>
    <div class="loading__inner d-flex align-center">
      <img id="monitan" src="/img/pickup/monitan.png" alt="" />
      <div class="loading__text text-h4 text-white letter-space-015em">
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
      <img id="protan" src="/img/pickup/protan.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.loading {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: $accent;

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

    #monitan,
    #protan {
      width: 75px;
      object-fit: contain;
      margin: 0 30px;
      vertical-align: bottom;
    }

    .loading__text {
      color: white;
    }
  }
}

.loading__text {
  display: inline-block;
  white-space: nowrap;
}
.loading__text span {
  display: inline-block;
  vertical-align: middle;
}
.loading__text span:nth-of-type(1) {
  animation: animation 2s ease 0s infinite;
}
.loading__text span:nth-of-type(2) {
  animation: animation 2s ease 0.1s infinite;
}
.loading__text span:nth-of-type(3) {
  animation: animation 2s ease 0.2s infinite;
}
.loading__text span:nth-of-type(4) {
  animation: animation 2s ease 0.3s infinite;
}
.loading__text span:nth-of-type(5) {
  animation: animation 2s ease 0.4s infinite;
}
.loading__text span:nth-of-type(6) {
  animation: animation 2s ease 0.5s infinite;
}
.loading__text span:nth-of-type(7) {
  animation: animation 2s ease 0.6s infinite;
}
.loading__text span:nth-of-type(8) {
  animation: animation 2s ease 0.7s infinite;
}
.loading__text span:nth-of-type(9) {
  animation: animation 2s ease 0.8s infinite;
}
.loading__text span:nth-of-type(10) {
  animation: animation 2s ease 0.9s infinite;
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
