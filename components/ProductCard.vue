<template>
  <v-card class="product mt-8" elevation="0" :to="'/products/' + id + '?name=' + name">
    <div class="categories--sp d-flex flex-wrap px-3 py-1 mb-4">
      <div class="search-tag text-caption mr-2"><v-icon class="mr-2" small>mdi-check</v-icon>{{ categoryName01 }}</div>
      <div class="search-tag text-caption mr-2"><v-icon class="mr-2" small>mdi-check</v-icon>{{ categoryName02 }}</div>
    </div>
    <div class="product__info d-flex">
      <div class="info__img mr-3">
        <img :src="image" :alt="name" />
      </div>
      <div class="info__details flex-grow-1 d-flex flex-column">
        <div class="categories d-flex px-3 py-1">
          <div class="search-tag text-body-2 mr-2"><v-icon class="mr-2">mdi-check</v-icon>{{ categoryName01 }}</div>
          <div class="search-tag text-body-2 mr-2"><v-icon class="mr-2">mdi-check</v-icon>{{ categoryName02 }}</div>
        </div>
        <div class="name mt-2">
          <div class="name__maker text-caption text-sm-body-2">{{ maker }}</div>
          <div class="name__product text-body-2 font-weight-medium text-sm-h6 letter-space-015em mt-2">
            {{ name }} {{ typeNumber }}
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="price d-flex align-center mb-2 text-body-2">
          <span class="price__head text-body-2 px-3 py-1 text-no-wrap">レンタル価格</span>
          <span class="price__day text-body-2 letter-space-015em px-3 py-1 text-no-wrap">1日/税別</span>
          <span class="price__product text-h5 letter-space-015em px-3 py-1">{{ priceValue }}</span
          >円
          <v-btn class="price__more text-body-2 ml-5" color="primary" @click="openTariffModal(id, 1)">
            <span class="price__class text-body-1 mr-2 font-weight-bold text-center">{{ tariffName }}</span>
            2日目以降の料金
          </v-btn>
        </div>
        <div class="price--md d-flex align-center flex-wrap mt-5 text-body-2">
          <div class="mr-4">
            <div class="price__head text-caption px-3 py-2 text-no-wrap text-center">レンタル価格</div>
            <div class="price__day text-caption letter-space-015em px-3 py-2 text-center text-no-wrap">1日/税別</div>
          </div>
          <span class="price__product text-h5 letter-space-015em font-weight-medium">{{ priceValue }}</span>
          円
          <button class="price__more pa-2 ml-4" @click="openTariffModal(id, 1)">
            <span class="price__class text-caption mb-1">{{ tariffName }}</span>
            2日目以降<br />の料金
          </button>
        </div>
      </div>
    </div>
    <div class="price--sp d-flex justify-space-between align-center flex-wrap mt-5 text-body-2">
      <div>
        <div class="price__head text-caption px-3 py-2 text-no-wrap text-center">レンタル価格</div>
        <div class="price__day text-caption letter-space-015em px-3 py-2 text-center text-no-wrap">1日/税別</div>
      </div>
      <span class="price__product text-h5 letter-space-015em font-weight-medium">{{ priceValue }}</span>
      円
      <button class="price__more pa-2 ml-4" @click="openTariffModal(id, 1)">
        <span class="price__class text-caption mb-1">{{ tariffName }}</span>
        2日目以降<br />の料金
      </button>
    </div>
    <div class="product__tags mt-2">
      <v-btn
        v-for="tag in tagLists"
        :key="tag.TagName"
        class="product-tag px-3 py-1 mr-2 mt-2"
        elevation="0"
        tile
        small
        @click="searchTag(tag.TagID, tag.TagName)">
        {{ tag.TagName }}
      </v-btn>
    </div>
    <div class="product__descriptions text-caption text-sm-body-1 mt-4">
      {{ description }}
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    typeNumber: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    maker: {
      type: String,
      required: false,
      default: 'No Maker',
    },
    categoryName01: {
      type: String,
      required: false,
      default: 'No Category',
    },
    categoryName02: {
      type: String,
      required: false,
      default: 'No Category',
    },
    priceValue: {
      type: String,
      required: true,
    },
    priceType: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      required: true,
    },
    tariffId: {
      type: Number,
      required: true,
    },
    tariffName: {
      type: String,
      required: true,
    },
    tagLists: {
      type: Array,
      required: false,
      deafault: [],
    },
    description: {
      type: String,
      required: false,
      default: 'No description',
    },
  },
  data() {
    return {
      productTariffList: [],
    }
  },
  methods: {
    async getProductTariff(productID, tariffID) {
      const param = new URLSearchParams()
      param.append('ProjectKey', this.$config.PROJECT_KEY)
      param.append('LangType', this.$config.LANG_JAPANESE)
      param.append('ProductID', productID)
      param.append('TariffID', tariffID)
      param.append('TariffType', 0)
      const res = await this.$axios.$post('get_product_tariff.php', param)
      this.productTariffList = res.TariffList
    },
    async openTariffModal(productID, tariffID) {
      event.preventDefault()
      await this.getProductTariff(productID, tariffID)
      this.$emit('send-tariff-data', this.productTariffList)
    },
    searchTag(tagID, tagName) {
      event.preventDefault()
      window.location.href = '/products?type=1&tagID=' + tagID + '&tagName=' + tagName
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.product {
  z-index: 10;
}

.product__main {
  .info__img img {
    border: 1px solid $line;
    width: 185px;
    height: 185px;
    object-fit: contain;

    @include mq(sm) {
      width: 100px;
      height: 100px;
    }
  }

  .info__details {
    .categories {
      background-color: $cushion;

      @include mq(md) {
        display: none !important;
      }
    }
  }

  .price {
    @include mq(md) {
      display: none !important;
    }

    .price__head {
      background-color: $accent;
      color: #ffffff;
    }
    .price__day {
      background-color: $cushion;
    }

    .price__more {
      z-index: 100;
    }

    .price__class {
      display: inline-block;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      background-color: #ffffff;
      color: $primary;
    }
  }

  .product-tag {
    background-color: $cushion;
    color: $primary !important;
  }

  // レスポンシブ用のクラス
  .categories--sp {
    background-color: $cushion;
    display: none !important;

    @include mq(md) {
      display: flex !important;
    }
  }

  .price--md,
  .price--sp {
    display: none !important;
    .price__head {
      background-color: $accent;
      color: #ffffff;
    }
    .price__day {
      background-color: $cushion;
    }

    .price__more {
      min-width: 75px;
      display: inline-block;
      font-size: 11px;
      line-height: 15px;
      border-radius: 10px;
      height: 100%;
      background-color: $primary;
      color: #ffffff;

      span {
        display: block;
        margin: 0 auto;
        font-size: 11px;
        line-height: 11px;
        font-weight: bold;
        width: 25px;
        height: 25px;
        line-height: 25px;
        border-radius: 50%;
        background-color: #ffffff;
        color: $primary;
      }
    }

    .price__class {
      display: inline-block;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border-radius: 50%;
      background-color: #ffffff;
      color: $primary;
    }
  }

  .price--md {
    @include mq(md) {
      display: flex !important;
    }

    @include mq(sm) {
      display: none !important;
    }
  }

  .price--sp {
    @include mq(sm) {
      display: flex !important;
    }
  }
}
</style>
