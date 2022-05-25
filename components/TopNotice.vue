<template>
  <div class="top__notice text-body-1">
    <div class="notice__inner d-flex">
      <div class="notice__pickup d-flex text-body-2 text-sm-body-1 pr-md-3 py-2">
        <hooper :settings="hooperSettings">
          <slide v-for="(list, index) in newsLists" :key="index">
            <div class="d-flex">
              <div>
                <span class="pickup__category d-none d-md-inline-block text-caption text-white mr-3 px-6 py-1">
                  {{ list.NewsCategory }}
                </span>
              </div>
              <a href="/notice" class="pickup__link">
                <p class="py-1 mb-0">
                  {{ list.NewsTitle }}
                </p>
              </a>
            </div>
          </slide>
        </hooper>
      </div>
      <div class="notice__lists d-flex align-center justify-center justify-lg-start px-3 pl-lg-10 py-2">
        <a class="text-white text-caption text-sm-body-2" href="/notice">
          お知らせ一覧へ<v-icon color="primary">mdi-chevron-right</v-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newsLists: {
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
        playSpeed: 5000,
        transition: 500,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.top__notice {
  position: relative;
  width: 100%;
  background-color: $cushion;
  overflow-x: hidden;

  .notice__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    @include mq(lg) {
      flex-direction: column-reverse;
    }
  }
  .notice__pickup {
    width: 70%;
    color: $category;
    flex-grow: 1;

    @include mq(lg) {
      width: 90%;
      margin: 0 auto;
    }

    .pickup__category {
      background-color: $category;
      border-radius: 30px;
    }
    .pickup__link p {
      color: $category;
    }
  }

  .notice__lists {
    width: 30%;
    background-color: $outline;
    position: relative;
    z-index: 1;

    &::before {
      content: '';
      width: 200%;
      height: 100%;
      top: 0;
      left: 99%;
      background-color: $outline;
      position: absolute;
      z-index: -1;
    }

    @include mq(lg) {
      width: 100%;

      &::before {
        left: -20%;
      }
    }
  }
}
</style>
