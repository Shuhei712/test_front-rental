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
            <div class="checkbox d-flex align-flex-start">
              <span class="checkbox__parts"></span>
              <span class="text-body-2 text-gray pt-1 px-3">{{ price.PriceRangeName }}</span>
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
  },
  data() {
    return {
      selectedPriceLists: [],
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

  .terms__checkbox {
    display: none;
  }

  .checkbox {
    cursor: pointer;
  }

  .checkbox__parts {
    display: block;
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border: 1px solid $outline;
    border-radius: 5px;
    background-color: $cushion;
    position: relative;
  }

  .checkbox__parts::after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 9px;
    width: 10px;
    height: 18px;
    transform: rotate(40deg);
    border-bottom: 3px solid $line;
    border-right: 3px solid $line;
  }

  .terms__checkbox:checked + .checkbox .checkbox__parts {
    background-color: #ffffff;
  }

  .terms__checkbox:checked + .checkbox .checkbox__parts::after {
    border-bottom: 3px solid $primary;
    border-right: 3px solid $primary;
  }
}
</style>
