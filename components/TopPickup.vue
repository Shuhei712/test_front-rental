<template>
  <section class="pickup px-3 px-lg-0 mt-10 mt-sm-14">
    <h3 class="pickup__heading text-center">
      <span
        class="heading__text orange_line text-caption text-md-h6 text-gray font-weight-medium zen-kaku-gothic letter-space-015em"
        >おすすめレンタル機材<span class="word-keep">ピックアップ</span>
      </span>
    </h3>
    <div class="pickup__content mt-5 pt-sm-5 pb-10">
      <div class="pickup__character d-flex align-baseline justify-center justify-sm-space-between">
        <img class="monitan" src="/img/pickup/monitan.png" alt="モニタン" />
        <img class="protan" src="/img/pickup/protan.png" alt="プロタン" />
      </div>
      <div v-for="(list, index) in pickupLists" :key="index" class="item py-10">
        <div v-if="list.PickupType === TYPE_TAG" class="item__heading d-flex align-center flex-column flex-lg-row mx-auto mb-4 mb-lg-5">
          <div class="d-flex align-center">
            <img class="icon mr-3" :src="list.IconImageURL" :alt="list.IconImageURL" />
            <h4
              class="heading__title font-heading text-h6 text-lg-h5 text-gray font-weight-regular letter-space-02em mr-lg-10">
              {{ list.PageCategoryName }}
            </h4>
          </div>
          <v-divider class="heading__line hidden-md-and-down" color="line"></v-divider>
          <v-btn
            :to="'/products?type=1&tagID=' + list.TagID + '&tagName=' + list.TagName"
            class="ml-lg-5 mt-4 mt-lg-0"
            color="headingText"
            elevation="2"
            outlined
            small>
            <span class="lh-crop-12">一覧へ</span>
            <v-icon color="primary" class="mr-n2">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <div v-else class="item__heading d-flex align-center flex-column flex-lg-row mx-auto mb-4 mb-lg-5">
          <div class="d-flex align-center">
            <img class="icon mr-3" :src="list.IconImageURL" :alt="list.IconImageURL" />
            <h4
              class="heading__title font-heading text-h6 text-lg-h5 text-gray font-weight-regular letter-space-02em mr-lg-10">
              {{ list.PageCategoryName }}
            </h4>
          </div>
          <v-divider class="heading__line hidden-md-and-down" color="line"></v-divider>
          <v-btn
            :to="'/products?type=2&categoryID=' + list.PageCategoryID + '&categoryName=' + list.PageCategoryName"
            class="ml-lg-5 mt-4 mt-lg-0"
            color="headingText"
            elevation="2"
            outlined
            small>
            <span class="lh-crop-12">一覧へ</span>
            <v-icon color="primary" class="mr-n2">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <v-container class="item__content pa-0">
          <v-row>
            <v-col v-for="(item, num) in list.PickupProductList" :key="num" class="item__col d-flex" cols="6" md="3">
              <item-card
                :path="item.ImageURL"
                :maker="item.MakerName"
                :name="item.ProductName"
                :link="'/products/' + item.ProductID + '?name=' + item.ProductName"
                :model="item.ProductTypeNumber"
                :price-unit="item.PriceUnit"
                :price="item.PriceValue"
                :price-type="item.PriceType"></item-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
    <div class="pickup__btn text-center">
      <v-btn to="/category" class="bg-white text-caption text-sm-body-2" color="headingText" elevation="2" outlined>
        <v-icon class="mr-2" color="primary">mdi-shape-outline</v-icon>
        <span class="lh-crop-12">すべてのカテゴリから探す</span>
        <v-icon color="primary">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </section>
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
      TYPE_TAG: 0,
      TYPE_CATEGORY: 1,
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.pickup {
  position: relative;
  z-index: 10;

  @include mq(sm) {
    margin-top: 100px;
    background-color: $cushion;
  }

  &__heading {
    position: relative;

    @include mq(sm) {
      top: -14px;
    }

    .heading__text {
      margin: 0 16px;
    }

    &::before,
    &::after {
      content: '';
      background: $accent;
      width: 2px;
      height: 1.5em;
      bottom: -0.2em;
      position: absolute;
    }
    &::before {
      transform: rotate(-45deg);
    }
    &::after {
      transform: rotate(45deg);
    }
  }

  &__content {
    position: relative;
    background-color: #fff;
    border: 1px solid $accent;
    border-radius: 10px;

    @include mq(sm) {
      border: none;
      background-color: $cushion;
    }

    .pickup__character {
      width: 95%;
      top: calc(-135px / 1.25);
      left: 50%;
      transform: translateX(-50%);
      position: absolute;

      @include mq(sm) {
        width: 100%;
        top: auto;
        position: relative;
      }

      .monitan {
        height: 135px;
        object-fit: contain;

        @include mq(sm) {
          height: 100px;
          margin-right: 20px;
        }
      }
      .protan {
        height: 90px;
        object-fit: contain;

        @include mq(sm) {
          height: 70px;
        }
      }
    }
  }

  &__btn {
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .item {
    &__heading {
      width: 95%;

      @include mq(sm) {
        width: 100%;
      }

      .heading__title {
        @include mq(sm) {
          letter-spacing: 0.1em !important;
        }
      }
      .heading__line {
        border: none;
        border-top: 1px solid $line;
      }
      .v-btn {
        @include mq(sm) {
          background-color: #ffffff !important;
        }
      }
    }
    &__content {
      @include mq(sm) {
        width: 100% !important;
      }

      .row {
        margin: -5px -6px !important;
      }
      .item__col {
        padding: 5px 6px !important;
      }
    }
  }
}
</style>
