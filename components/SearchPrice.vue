<template>
  <div class="terms__price d-flex flex-column text-body-1 pa-4 pa-lg-8" :class="{ active: priceFlg }">
    <div class="price__title">
      価格帯を選択
      <v-btn class="ml-5" elevation="0" color="cushion" small @click="resetSelectedPriceLists()">
        <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
      </v-btn>
    </div>
    <div class="maker__lists flex-grow-1 overflow-auto mt-8">
      <div v-for="(price, index) in searchPriceLists" :key="index" class="price-list py-1">
        <label class="terms__label">
          <input
            v-model="selectedPriceLists"
            class="terms__checkbox"
            type="checkbox"
            :value="{ id: price.PriceRangeID, name: price.PriceRangeName }"
            @change="sendPriceLists()" />
          <span class="checkbox__parts text-body-2">{{ price.PriceRangeName }} </span>
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
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;

  .price__title {
    color: $primary;
  }
}

.index-lable {
  width: 100%;
  background-color: $cushion;
  padding: 2px 4px;
}

.terms__label {
  display: inline-block;
  width: 50%;
  margin: 15px 0;
}

.terms__price.active {
  transform: translate(0, 0);
}

.terms__checkbox {
  display: none;
}

.checkbox__parts {
  padding-left: 40px;
  position: relative;
  margin-right: 40px;
  cursor: pointer;
}

.checkbox__parts::before {
  content: '';
  display: block;
  position: absolute;
  top: -5px;
  left: 0;
  width: 30px;
  height: 30px;
  border: 1px solid $outline;
  border-radius: 5px;
  background-color: $cushion;
}

.terms__checkbox:checked + .checkbox__parts::before {
  background-color: #ffffff;
}

.checkbox__parts::after {
  content: '';
  display: block;
  position: absolute;
  top: -2px;
  left: 10px;
  width: 10px;
  height: 18px;
  transform: rotate(40deg);
  border-bottom: 3px solid $line;
  border-right: 3px solid $line;
}

.terms__checkbox:checked + .checkbox__parts::after {
  border-bottom: 3px solid $primary;
  border-right: 3px solid $primary;
}

.terms__title {
  color: $primary !important;
}

.terms__box {
  border: 1px solid $outline;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
}
</style>
