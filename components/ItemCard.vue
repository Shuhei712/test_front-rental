<template>
  <v-card class="item-card px-2 py-3" elevation="0" link :to="link">
    <div class="item__img">
      <img :src="isNullCheckImageURL" />
    </div>
    <v-card-title class="item__maker text-body-2 mb-2 px-0">{{ maker }}</v-card-title>
    <v-card-subtitle class="text-caption text-sm-body-2 pa-0" color="text">
      <span class="item__name">{{ name }}</span>
      &ensp;
      <span class="item__maker word-keep">{{ model }}</span>
    </v-card-subtitle>
    <v-card-title v-if="isPrice" class="item__price text-body-1 mb-2 px-0 py-1">
      {{ getPrice }}
      <span v-if="isPriceUnit" class="item__price-unit">{{ priceUnit }}</span>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true,
    },
    maker: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: false,
      default: '',
    },
    priceUnit: {
      type: String,
      required: false,
      default: '',
    },
    priceType: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    isNullCheckImageURL() {
      return this.path === null ? '/img/new/no-image.png' : this.path
    },
    isPrice() {
      return this.price !== ''
    },
    isPriceUnit() {
      switch (this.priceType) {
        case 0:
          return true
        case 1:
          return true
        case 2:
          return false
        case 9:
          return false
        default:
          return true
      }
    },
    getPrice() {
      switch (this.priceType) {
        case 0:
          return this.price
        case 1:
          return this.price
        case 2:
          return '本体に含む'
        case 9:
          return 'ASK'
        default:
          return 'ASK'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
.v-card {
  &__subtitle {
    color: $text !important;
    font-weight: 300;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: 1.5em; // IE対策
    min-height: 3em;
    max-height: 3em; // IE対策
  }
}
.item-card {
  width: 100%;
  .item__img {
    width: 100%;
    padding-top: 66.6666%; // 比率3:2
    position: relative;

    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
  }
  .item__maker {
    @include mq(sm) {
      font-size: 11px !important;
    }
  }

  .item__price {
    color: $text;
    font-size: 18px !important;
    font-weight: 500;
    @include mq(sm) {
      font-size: 15px !important;
    }
  }

  .item__price-unit {
    display: inline-block;
    vertical-align: bottom;
    padding: 0 2px;
    font-size: 12px !important;
    font-weight: 500;
    @include mq(sm) {
      line-height: 10px;
      font-size: 8px !important;
    }
  }
}
</style>
