<template>
  <div class="terms__price d-flex flex-column text-body-1" :class="{ active: priceFlg }">
    <div class="price__title d-flex align-center text-body-2 text-md-body-1 px-4 px-sm-6 px-lg-8 py-3">
      <span>価格帯を<span class="word-keep">選択</span></span>
      <v-btn class="text-light-gray ml-5" elevation="0" color="cushion" small @click="resetSelectedPriceLists()">
        <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>選択解除
      </v-btn>
    </div>
    <div class="price__lists flex-grow-1 px-4 px-sm-6 px-lg-8">
      <div v-for="(price, index) in searchPriceLists" :key="index" class="price-list">
        <label class="terms__label">
          <input
            v-model="selectedPriceLists"
            class="terms__checkbox"
            type="checkbox"
            :value="{ id: price.PriceRangeID, name: price.PriceRangeName }"
            @change="sendPriceLists()" />
            <div class="checkbox d-flex align-center">
              <span class="radio__parts"></span>
              <span class="text-body-2 text-gray px-3">{{ price.PriceRangeName }}</span>
            </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    priceFlg: {
      type: Boolean,
      required: true,
    },
    searchPriceLists: {
      type: Array,
      required: true,
    },
    queryPriceLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedPriceLists: this.queryPriceLists,
    }
  },
  methods: {
    sendPriceLists() {
      if (this.selectedPriceLists.length > 1) this.selectedPriceLists.shift()
      this.$emit('received-price-lists', this.selectedPriceLists)
    },
    resetSelectedPriceLists() {
      this.selectedPriceLists = []
      this.sendPriceLists()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.terms__price {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 460px;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;
  overflow: hidden;

  .price__title {
    color: $primary;
  }
}

.index-lable {
  width: 100%;
  background-color: $cushion;
  padding: 2px 4px;
}

.terms__price.active {
  transform: translate(0, 0);
  overflow: visible;
}

.terms__label {
  display: inline-block;
  margin-bottom: 20px;
  margin-top: 4px;

  .terms__checkbox {
    display: none;
  }

  .checkbox {
    cursor: pointer;
  }

  .radio__parts {
    display: block;
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    background-color: $cushion;
    border: 2px solid $line;
    border-radius: 50%;
    position: relative;
  }

  .radio__parts::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  .terms__checkbox:checked + .checkbox .radio__parts {
    background-color: #ffffff;
  }

  .terms__checkbox:checked + .checkbox .radio__parts{
    border-color: $primary;
    &::after {
      background-color: $primary;
    }
  }
}
</style>
