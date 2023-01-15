<template>
  <v-card class="product py-2 px-3"
    outlined
    elevation="0"
    width="100%"
    height="100%">
    <div class="text-right">
      <v-btn
        v-if="favoriteFlg"
        color="primary"
        icon
        @click="setFavorite(false, id)">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        v-else
        icon
        color="line"
        @click="setFavorite(true, id)">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </div>
    <div class="product__info d-flex flex-column">
      <div class="info__img ma-auto">
        <div class="img__inner">
          <a :href="'/products/' + id + '?name=' + name"><img :src="image" :alt="name" class="pa-1" /></a>
        </div>
      </div>
      <div class="info__details flex-grow-1 d-flex flex-column">
        <div class="name mt-2 mt-md-5">
          <div class="name__maker text-caption text-sm-body-2">{{ maker }}</div>
          <div class="name__product mt-1">
            <div class="text-subtitle-2 text-sm-subtitle-2 font-weight-medium">
              <a :href="'/products/' + id + '?name=' + name">{{ name }}</a>
            </div>
            <div class="text-subtitle-1 text-sm-h6 letter-space-015em font-weight-bold">
              <a :href="'/products/' + id + '?name=' + name">{{ typeNumber }}</a>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="price mt-3">
          <div class="d-flex align-center text-caption text-md-body-3">
            <div class="price__head px-3 py-1 text-no-wrap text-center">レンタル価格</div>
            <div class="price__day letter-space-015em px-3 py-1 text-center text-no-wrap">1日/税別</div>
          </div>
          <div class="price__product d-flex align-center mt-1">
            <div class="price__product-inner d-flex align-baseline red--text">
              <span class="price__val letter-space-015em font-weight-medium">{{ getPrice }}</span>
              <span v-if="isPriceUnit" class="price__unit font-weight-light">{{ priceUnit }}</span>
            </div>
          </div>
        </div>
      </div>
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
    // categoryName01: {
    //   type: String,
    //   required: false,
    //   default: 'No Category',
    // },
    // categoryName02: {
    //   type: String,
    //   required: false,
    //   default: 'No Category',
    // },
    priceValue: {
      type: String,
      required: false,
      default: null
    },
    priceType: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      required: true,
    },
    // tariffId: {
    //   type: Number,
    //   required: true,
    // },
    // tariffName: {
    //   type: String,
    //   default: '',
    //   required: false,
    // },
    // tagLists: {
    //   type: Array,
    //   default: () => [],
    //   required: false,
    // },
    // description: {
    //   type: String,
    //   required: false,
    //   default: 'No description',
    // },
    // releaseDate: {
    //   type: String,
    //   required: true,
    // },
  },
  data() {
    return {
      productTariffList: [],
      favoriteFlg: 1
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
    // isCategoryName1() {
    //   return this.categoryName02 !== null
    // },
    // isCategoryName2() {
    //   return this.categoryName02 !== null
    // },
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
    // isTariffBtn() {
    //   switch (this.priceType) {
    //     case 0:
    //       return true
    //     case 1:
    //       return true
    //     case 2:
    //       return false
    //     case 9:
    //       return false
    //     default:
    //       return true
    //   }
    // },
  },
  methods: {
    async setFavorite(flg, productID){
      let res
      if(flg){
        res = await this.favorite('favorite/registProduct/', productID)

        if (this.$config.DEBUG_MODE) {
          console.log(res)
        }
        if(res==='again'){
          this.setFavorite(flg)
          alert('again')
        }else if(res.data.Status==='TRUE'){
          this.favoriteFlg = 1
        }
      }else{
        res = await this.favorite('favorite/unregistProduct/', productID)
        if(res==='again'){
          this.setFavorite(flg)
          alert('again')
        }else if(res.data.Status==='TRUE'){
          this.favoriteFlg = 0
        }
      }
    },
    async favorite(api, productID){
      const loginID = this.$store.getters["auth/getUser"]
      const token = this.$store.getters["auth/getAccessToken"]
      const param = new URLSearchParams()
      param.append('LoginID', loginID)
      const res = await this.$memberBaseAxios.put( api + productID, param,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (this.$config.DEBUG_MODE) {
        console.log(res)
      }
      if(res.data.Status==='TRUE'){
        return res
      }else if(res.data.ErrorNo===100002){
        // access認証tokenの有効期限が切れています
        const resAccess = await this.$getAccessToken()
        if(resAccess.data.Status==='FALSE'){
          this.$store.dispatch('auth/resetUser')
          location.reload()
          // return false
        }
        return 'again'
      }
    },
    // async getProductTariff(productID, tariffID) {
    //   const param = new URLSearchParams()
    //   param.append('ProjectKey', this.$config.PROJECT_KEY)
    //   param.append('LangType', this.$config.LANG_JAPANESE)
    //   param.append('ProductID', productID)
    //   param.append('TariffID', tariffID)
    //   param.append('TariffType', 0)
    //   const res = await this.$axios.$post('get_product_tariff.php', param)
    //   this.productTariffList = res.TariffList
    // },
    // async openTariffModal(productID, tariffID) {
    //   event.preventDefault()
    //   await this.getProductTariff(productID, tariffID)
    //   this.$emit('send-tariff-data', this.productTariffList)
    // },
    // searchTag(tagID, tagName) {
    //   event.preventDefault()
    //   window.location.href = '/products?type=1&tagID=' + tagID + '&tagName=' + tagName
    // },
    // isNew(date) {
    //   const now = new Date()
    //   const releaseYear = date.substr(0, 4)
    //   const releaseMonth = date.substr(4, 2)
    //   const releaseDay = date.substr(6, 2)
    //   const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay)
    //   const diffMilliSec = Math.abs(releaseDate - now)
    //   const diffDays = parseInt(diffMilliSec / 1000 / 60 / 60 / 24)
    //   return diffDays < this.$config.UNDER_NEW_PRODUCT_DAY
    // },
    // isComingsoon(date) {
    //   const now = new Date()
    //   const releaseYear = date.substr(0, 4)
    //   const releaseMonth = date.substr(4, 2)
    //   const releaseDay = date.substr(6, 2)
    //   const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay)
    //   const diffMilliSec = releaseDate - now
    //   const diffDays = parseInt(diffMilliSec / 1000 / 60 / 60 / 24)
    //   return diffDays > 0
    // },
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

    .img__inner {
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
        font-size: 22px;

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
