<template>
  <section class="article px-3 px-lg-0">
    <div class="article__heading d-flex align-center">
      <v-icon class="mr-3 mr-md-5" color="accent">mdi-creation</v-icon>
      <h3 class="font-heading text-h6 text-md-h5 text-gray font-weight-regular letter-space-02em mr-4 mr-md-9">
        特設ページ<span class="font-heading text-body-2 text-md-h6 font-weight-regular letter-space-02em word-keep">ほか</span>
      </h3>
      <v-divider color="line" class="heading__line"></v-divider>
      <v-btn class="ml-4 ml-md-5" to="/article" color="headingText" outlined elevation="2" small>
        <span class="lh-crop-12">一覧へ</span><v-icon color="primary" class="mr-n2">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-container class="article__content d-flex flex-column pt-6 pb-16 px-0">
      <div class="article__list order-1 order-sm-0">
        <div class="slide__prev" @click="slidePrev()"></div>
        <div class="slide__next" @click="slideNext()"></div>
        <hooper ref="article" class="hooper" :settings="hooperSettings">
          <slide v-for="(list, index) in matchedSpecialPageLists" :key="index">
            <article-card
              :color="toPageClassColorFrom(list.PageClassID)"
              :path="list.SpecialPageImageURL"
              :class-name="toPageClassNameFrom(list.PageClassID)"
              :title="list.SpecialPageName"
              :link="list.PageURL">
            </article-card>
          </slide>
        </hooper>
      </div>
      <div class="article__search mb-3 mb-sm-0 mt-sm-3 pa-sm-2">
        <div class="search__input d-flex flex-wrap align-center">
          <div class="search__title text-caption text-sm-body-2">絞り込み</div>
          <span class="search__line mx-2"></span>
          <div v-for="(list, index) in pageClassLists" :key="index">
            <input :id="list.PageClassName" v-model="tag" type="radio" :value="list.PageClassID" />
            <label
              :id="list.PageClassColor"
              :for="list.PageClassName"
              class="tag--all rounded-pill px-4 py-1 text-caption text-sm-body-2">
              {{ list.PageClassName }}
            </label>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {
  props: {
    pageClassLists: {
      type: Array,
      required: true,
    },
    specialPageLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      tag: 6,
      hooperSettings: {
        itemsToShow: 4,
        vertical: true,
        autoPlay: true,
        playSpeed: 3000,
        infiniteScroll: true,
        breakpoints: {
          600: {
            itemsToShow: 3,
            vertical: false,
          },
          960: {
            itemsToShow: 4,
            vertical: false,
          },
        },
      },
    }
  },
  computed: {
    matchedSpecialPageLists() {
      return this.specialPageLists.filter((el) => {
        return this.tag === 6 ? true : el.PageClassID === this.tag
      }, this)
    },
  },
  methods: {
    toPageClassNameFrom(pageClassID) {
      const result = this.pageClassLists.find((list) => list.PageClassID === pageClassID)
      return result.PageClassName
    },
    toPageClassColorFrom(pageClassID) {
      const result = this.pageClassLists.find((list) => list.PageClassID === pageClassID)
      return result.PageClassColor
    },
    slidePrev() {
      this.$refs.article.slidePrev()
    },
    slideNext() {
      this.$refs.article.slideNext()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.article {
  &__heading {
    width: 95%;
    margin: 0 auto;

    @include mq(sm) {
      width: 100%;
    }

    .heading__line {
      border: none;
      border-top: 1px solid $line;
    }
  }
  &__content {
    @include mq(sm) {
      width: 100% !important;
    }

    .article__list {
      position: relative;
    }
  }

  .slide__prev {
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translate(-50%, 0) rotate(-45deg);
    width: 20px;
    height: 20px;
    border-top: 2px solid $primary;
    border-left: 2px solid $primary;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    @include mq(sm) {
      display: none;
    }
  }

  .slide__next {
    position: absolute;
    top: 50%;
    right: -30px;
    transform: translate(-50%, 0) rotate(45deg);
    width: 20px;
    height: 20px;
    border-top: 2px solid $primary;
    border-right: 2px solid $primary;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    @include mq(sm) {
      display: none;
    }
  }

  .slide__prev:hover {
    transform: scale(1.1) translate(-50%, 0) rotate(-45deg);
  }

  .slide__next:hover {
    transform: scale(1.1) translate(-50%, 0) rotate(45deg);
  }

  .search {
    &__title {
      margin-top: -10px;
    }
    &__line {
      background-color: $line;
      display: inline-block;
      width: 20px;
      height: 1px;
      margin-top: -10px;
    }
  }
  .search__input {
    input {
      display: none;
    }

    input:checked + label {
      color: #ffffff;
    }

    label {
      display: inline-block;
      margin: 0 10px 10px 0;
      cursor: pointer;
    }

    #all {
      border: 1px solid $outline;
      color: $outline;
    }

    input:checked + #all {
      background-color: $outline;
      color: #ffffff;
    }

    #feature {
      border: 1px solid $feature;
      color: $feature;
    }

    input:checked + #feature {
      background-color: $feature;
      color: #ffffff;
    }

    #suggest {
      border: 1px solid $suggest;
      color: $suggest;
    }

    input:checked + #suggest {
      background-color: $suggest;
      color: #ffffff;
    }

    #catalog {
      border: 1px solid $catalog;
      color: $catalog;
    }

    input:checked + #catalog {
      background-color: $catalog;
      color: #ffffff;
    }

    #sns {
      border: 1px solid $sns;
      color: $sns;
    }

    input:checked + #sns {
      background-color: $sns;
      color: #ffffff;
    }

    #sales {
      border: 1px solid $sales;
      color: $sales;
    }

    input:checked + #sales {
      background-color: $sales;
      color: #ffffff;
    }
  }
}

.hooper {
  height: auto;
  @include mq(sm) {
    height: calc(70px * 4 + 10px * 4);
  }
}

.hooper-slide {
  height: auto !important;
  padding: 0 5px !important;
  @include mq(sm) {
    max-height: 70px !important;
    margin: 5px 0 !important;
  }
}

.is-clone {
  height: auto !important;
}
</style>
