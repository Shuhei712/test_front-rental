<template>
  <div class="terms__maker d-flex flex-column text-body-1 pa-4 pa-lg-8" :class="{ active: makerFlg }">
    <div class="maker__title">
      メーカーを選択
      <v-btn class="ml-5" elevation="0" color="cushion" small>
        <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
      </v-btn>
    </div>
    <div class="maker__lists flex-grow-1 overflow-auto mt-8">
      <v-row>
        <v-col v-for="(list, index) in makerLists" :key="index" cols="11" md="6" class="maker-list py-4">
          <label>
            <input class="terms__checkbox" type="checkbox" :value="list.name" />
            <span class="checkbox__parts text-body-2">{{ list.name }} </span>
          </label>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    makerFlg: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      makerLists: [
        { name: 'アイリスオーヤマ' },
        { name: 'AOKA' },
        { name: 'Insta360' },
        { name: 'エルビーエル' },
        { name: 'Oaxis-Japan' },
        { name: 'オプキックス' },
        { name: 'オリンパス' },
        { name: 'キャノン' },
        { name: 'K&F' },
        { name: 'ケンコー・トキナー' },
        { name: 'コダック' },
        { name: 'GoPro' },
        { name: 'Samsung' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.terms__maker {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;

  .maker__title {
    color: $primary;
  }
}

.terms__maker.active {
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
