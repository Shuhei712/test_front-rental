<template>
  <v-card class="product mt-8 mt-sm-10 mt-lg-13" elevation="0">
    <div class="categories categories--sp d-flex flex-wrap px-3 py-1 mb-3">
      <div class="search-tag d-flex text-caption mr-4">
        <v-icon class="mr-2" small>mdi-check</v-icon>{{ categoryName01 }}
      </div>
      <div v-if="isCategoryName2" class="search-tag d-flex text-caption">
        <v-icon class="mr-2" small>mdi-check</v-icon>{{ categoryName02 }}
      </div>
    </div>
    <div class="product__info d-flex">
      <div class="info__img mr-3">
        <div class="img__inner">
          <span v-if="isComingsoon(releaseDate)" class="product-comingsoon">Coming soon</span>
          <span v-else-if="isNew(releaseDate)" class="product-new">New</span>
          <a :href="'/products/' + id + '?name=' + name"><img :src="image" :alt="name" class="pa-1" /></a>
        </div>
      </div>
      <div class="info__details flex-grow-1 d-flex flex-column">
        <div class="categories categories--pc d-flex px-3 py-1">
          <div class="search-tag d-flex text-body-2 mr-5">
            <v-icon class="mr-2" small>mdi-check</v-icon>{{ categoryName01 }}
          </div>
          <div v-if="isCategoryName2" class="search-tag d-flex text-body-2">
            <v-icon class="mr-2" small>mdi-check</v-icon>{{ categoryName02 }}
          </div>
        </div>
        <div class="name mt-2 mt-md-5">
          <div class="name__maker text-caption text-sm-body-2">{{ maker }}</div>
          <div class="name__product mt-1">
            <div class="text-subtitle-2 text-sm-subtitle-1 letter-space-015em font-weight-medium">
              <a :href="'/products/' + id + '?name=' + name">{{ name }}</a>
            </div>
            <div class="text-subtitle-1 text-sm-h6 letter-space-015em font-weight-bold">
              <a :href="'/products/' + id + '?name=' + name">{{ typeNumber }}</a>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="price price--pc d-flex justify-space-between justify-sm-start flex-wrap mt-3">
          <div class="d-md-flex align-center mr-2 mr-sm-4 text-caption text-md-body-2">
            <div class="price__head pa-2 px-md-3 py-md-1 text-no-wrap text-center">レンタル価格</div>
            <div class="price__day letter-space-015em pa-2 px-md-3 py-md-1 text-center text-no-wrap">1日/税別</div>
          </div>
          <div class="price__product d-flex align-center mr-3 mr-sm-5">
            <div class="price__product-inner d-flex align-baseline">
              <span class="price__val letter-space-015em font-weight-medium">{{ getPrice }}</span>
              <span v-if="isPriceUnit" class="price__unit font-weight-light">{{ priceUnit }}</span>
            </div>
          </div>
          <button
            class="price__more d-flex align-center px-md-3"
            :disabled="!isTariffBtn"
            @click="openTariffModal(id, tariffId)">
            <span class="price__class mb-1 mb-md-0 mr-md-2">{{ tariffName }}</span>
            <span class="text-md-body-2 lh-crop-15">2日目以降<span class="word-keep">の料金</span></span>
          </button>
        </div>
      </div>
    </div>
    <div class="price price--sp d-flex justify-space-between justify-sm-start flex-wrap mt-5 mt-md-6 mt-lg-10">
      <div class="d-md-flex align-center mr-2 mr-sm-4 mb-2 text-caption text-md-body-2">
        <div class="price__head pa-2 px-md-3 py-md-1 text-no-wrap text-center">レンタル価格</div>
        <div class="price__day letter-space-015em pa-2 px-md-3 py-md-1 text-center text-no-wrap">1日/税別</div>
      </div>
      <div class="price__product d-flex align-center mr-3 mr-sm-5 mb-2">
        <div class="price__product-inner d-flex align-baseline">
          <span class="price__val letter-space-015em font-weight-medium">{{ getPrice }}</span>
          <span v-if="isPriceUnit" class="price__unit font-weight-light">{{ priceUnit }}</span>
        </div>
      </div>
      <button
        class="price__more d-flex align-center mb-2 px-md-3"
        :disabled="!isTariffBtn"
        @click.stop="openTariffModal(id, tariffId)">
        <span class="price__class mb-1 mb-md-0 mr-md-2">{{ tariffName }}</span>
        <span class="text-md-body-2 lh-crop-15">2日目以降<span class="word-keep">の料金</span></span>
      </button>
    </div>
    <div class="product__tags mt-3 mt-sm-6">
      <v-btn
        v-for="tag in tagLists"
        :key="tag.TagName"
        class="product-tag px-3 py-1 mr-2 mb-2"
        color="cushion"
        elevation="0"
        tile
        small
        @click="searchTag(tag.TagID, tag.TagName)">
        {{ tag.TagName }}
      </v-btn>
    </div>
    <div class="product__descriptions text-caption text-sm-body-1 mt-3 mt-md-2">
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
      default: '',
      required: false,
    },
    tagLists: {
      type: Array,
      default: () => [],
      required: false,
    },
    description: {
      type: String,
      required: false,
      default: 'No description',
    },
    releaseDate: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      productTariffList: [],
    }
  },
  computed: {
    getPrice() {
      switch (this.priceType) {
        case 0:
          return this.priceValue
        case 1:
          return this.priceValue
        case 2:
          return '本体に含む'
        case 9:
          return 'ASK'
        default:
          return 'ASK'
      }
    },
    isCategoryName1() {
      return this.categoryName02 !== null
    },
    isCategoryName2() {
      return this.categoryName02 !== null
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
    isTariffBtn() {
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
    isNew(date) {
      const now = new Date()
      const releaseYear = date.substr(0, 4)
      const releaseMonth = date.substr(4, 2)
      const releaseDay = date.substr(6, 2)
      const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay)
      const diffMilliSec = Math.abs(releaseDate - now)
      const diffDays = parseInt(diffMilliSec / 1000 / 60 / 60 / 24)
      return diffDays < this.$config.UNDER_NEW_PRODUCT_DAY
    },
    isComingsoon(date) {
      const now = new Date()
      const releaseYear = date.substr(0, 4)
      const releaseMonth = date.substr(4, 2)
      const releaseDay = date.substr(6, 2)
      const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay)
      const diffMilliSec = releaseDate - now
      const diffDays = parseInt(diffMilliSec / 1000 / 60 / 60 / 24)
      return diffDays > 0
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';
$bp_xs: 362px;

.product {
  z-index: 10;

  .categories {
    background-color: $cushion;
  }

  .search-tag {
    @include mq(sm) {
      font-size: 10px !important;
    }
  }

  .info__img {
    flex-shrink: 0;
    width: 30%;
    max-width: 185px;
    min-width: 150px;

    @include mq(sm) {
      min-width: 100px;
    }

    .img__inner {
      border: 1px solid $line;
      width: 100%;
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 100%;
        padding-top: 100%;
      }
    }
    .product-new,
    .product-comingsoon {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: $accent;
      color: #ffffff;
      font-size: 0.8rem;
      font-weight: 500;
      z-index: 10;
      animation: flash 3s linear infinite;
      @include mq(sm) {
        font-size: 0.6rem;
        width: 40px;
        height: 18px;
        line-height: 18px;
      }
    }

    .product-comingsoon {
      width: 120px;
    }
    @keyframes flash {
      0%,
      100% {
        opacity: 1;
      }

      50% {
        opacity: 0;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      top: 0;
      left: 0;
      position: absolute;
    }
  }

  .price {
    .price__head {
      background-color: $accent;
      color: #ffffff;
    }

    .price__day {
      background-color: $cushion;
    }

    .price__product {
      .price__product-inner {
        font-size: 30px;

        @include mq(md) {
          font-size: 23px;
        }
      }

      .price__unit {
        font-size: 55%;
      }
    }

    .price__more {
      background-color: $primary;
      border-radius: 5px;
      box-shadow: 2px 2px 3px rgba(#000, 10%);
      color: #ffffff;
      min-width: 75px;
      padding: 5px;

      @include mq(md) {
        box-shadow: none;
        font-size: 11px;
        flex-direction: column;
        justify-content: center;
        width: 75px;
      }
      @media screen and (max-width: $bp_xs) {
        flex-direction: row;
        width: 100%;
      }
    }

    .price__more:disabled {
      background-color: #e0e0e0;
      color: #a6a6a6;

      .price__class {
        background-color: #fffafa;
        color: #a6a6a6;
      }
    }

    .price__class {
      background-color: #ffffff;
      border-radius: 50%;
      color: $primary;
      display: inline-block;
      font-weight: 700;
      font-size: 15px;
      line-height: 20px;
      width: 20px;
      height: 20px;

      @include mq(md) {
        font-size: 11px;
      }
      @media screen and (max-width: $bp_xs) {
        margin-right: 8px;
        margin-bottom: 0 !important;
      }
    }
  }

  .product-tag {
    color: $primary !important;
  }

  // レスポンシブ用のクラス
  .categories--pc {
    @include mq(md) {
      display: none !important;
    }
  }

  .categories--sp {
    display: none !important;

    @include mq(md) {
      display: flex !important;
    }
  }

  .price--pc {
    @include mq(sm) {
      display: none !important;
    }
  }

  .price--sp {
    display: none !important;

    @include mq(sm) {
      display: flex !important;
    }
  }
}
</style>
