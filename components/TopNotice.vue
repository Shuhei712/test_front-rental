<template>
  <div class="top__notice text-body-1">
    <div class="notice__inner d-flex">
      <div class="notice__pickup d-flex text-body-2 text-sm-body-1 pr-md-3 py-2">
        <hooper :settings="hooperSettings">
          <slide v-for="(list, index) in newsLists" :key="index">
            <div class="d-flex" :class="addCategoryClass(list.NewsCategory)">
              <div>
                <span class="pickup__category d-none d-md-inline-block text-caption text-white no-wrap mr-3 px-6 py-1">
                  {{ list.NewsCategory }}
                </span>
              </div>
              <a href="/notice" class="pickup__link d-flex align-center">
                <p class="text-body-2 text-sm-body-1">
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
  methods: {
    addCategoryClass(category) {
      if(category === '重要なお知らせ') {
        return 'important'
      } else {
        ;
      }
    },
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
    flex-grow: 1;

    @include mq(lg) {
      width: 90%;
      margin: 0 auto;
    }

    .pickup__category {
      background-color: $outline;
      border-radius: 30px;
      min-width: 120px;
      text-align: center;
    }

    .pickup__link {
      overflow: hidden;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        @include mq(sm) {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: clip;
          white-space: normal;
        }
      }
    }
  }

  .important {
    .pickup__category {
      background-color: $category;
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
