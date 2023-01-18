<template>
  <div :class="[fav ? 'border' : ''] ">
    <div v-if="fav" class="text-right">
      <v-btn
        v-if="favoriteFlg"
        color="primary"
        icon
        @click="setFavorite(false, productId)">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn
        v-else
        icon
        color="line"
        @click="setFavorite(true, productId)">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </div>
    <v-card class="item-card px-2 py-3" elevation="0" link :to="link">
      <div class="item__img">
        <img :src="isNullCheckImageURL" />
      </div>
      <v-card-title class="item__maker text-body-2 mb-2 px-0">{{ maker }}</v-card-title>
      <v-card-subtitle class="text-caption text-sm-body-2 pa-0" color="text">
        <span class="item__name">{{ name }}</span>
        &ensp;
        <span class="item__maker item__model word-keep">{{ model }}</span>
      </v-card-subtitle>
      <v-card-title v-if="isPrice" class="item__price text-body-1 mb-2 px-0 py-1">
        {{ getPrice }}
        <span v-if="isPriceUnit" class="item__price-unit">{{ priceUnit }}</span>
      </v-card-title>
    </v-card>
  </div>
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
    productId: {
      type: Number,
      required: false,
      default: 0,
    },
    fav: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      favoriteFlg: 1
    }
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
  methods: {
    async setFavorite(flg, productID){
      let res
      if(flg){
        res = await this.favorite('favorite/registProduct/', productID)
      }else{
        res = await this.favorite('favorite/unregistProduct/', productID)
      }
      if( !res ){
        this.setFavorite(flg)
      }else if(res.data.Status==='TRUE'){
        this.favoriteFlg = flg ? 1 : 0
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
        const resAccess = await this.$getAccessToken()
        return false
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
.border{
  border: 1px solid $line;
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
    font-weight: 300;
    @include mq(sm) {
      font-size: 11px !important;
    }
  }

  .item__name, .item__model {
    font-weight: 400;
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
