<template>
  <div class="terms__price text-body-1 d-flex flex-column pa-4 pa-lg-8" :class="{ active: priceFlg }">
    <div class="price__title">
      価格を選択
      <v-btn class="ml-5" elevation="0" color="cushion" small>
        <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
      </v-btn>
    </div>
    <div class="price__lists flex-grow-1 overflow-auto mt-8 pa-5">
      <v-row>
        <v-col cols="12">
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            hide-details
            prepend-icon="mdi-cash-check"></v-range-slider>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :value="range[0]"
            class="ml-0"
            hide-details
            type="number"
            label="Min"
            suffix="円"
            @change="$set(range, 0, $event)"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field
            :value="range[1]"
            class="mr-0"
            hide-details
            type="number"
            label="Max"
            suffix="円"
            @change="$set(range, 1, $event)"></v-text-field>
        </v-col>
      </v-row>
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
  },
  data() {
    return {
      min: 100,
      max: 1500000,
      range: [100, 1500000],
    }
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
