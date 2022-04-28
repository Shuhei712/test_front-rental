<template>
  <div class="terms__category d-flex flex-column text-body-1 pa-4 pa-lg-8" :class="{ active: categoryFlg }">
    <div class="category__title">
      カテゴリーを選択
      <v-btn class="ml-5" elevation="0" color="cushion" small @click="resetSelectedCategoryLists()">
        <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>
        選択解除
      </v-btn>
    </div>
    <div class="category__lists flex-grow-1 overflow-auto mt-8">
      <div v-for="root in searchCategoryLists" :key="root.CategoryID" class="category-list">
        <label class="terms__label">
          <input
            v-model="selectedCategoryLists"
            class="terms__checkbox"
            type="checkbox"
            :value="{ id: root.CategoryID, name: root.CategoryName }"
            @change="sendCategoryLists()" />
          <span class="checkbox__parts text-body-2">{{ root.CategoryName }}</span>
        </label>
        <div v-for="child in root.SubCategoryList" :key="child.CategoryID" cols="11" class="category-list">
          <label class="terms__label">
            <input
              v-model="selectedCategoryLists"
              class="terms__checkbox"
              type="checkbox"
              :value="{ id: child.CategoryID, name: child.CategoryName }"
              @change="sendCategoryLists()" />
            <span class="checkbox__parts text-body-2">{{ child.CategoryName }}</span>
          </label>
          <div v-for="grandChild in child.SubCategoryList" :key="grandChild.CategoryID" cols="11" class="category-list">
            <label class="terms__label">
              <input
                v-model="selectedCategoryLists"
                class="terms__checkbox"
                type="checkbox"
                :value="{ id: grandChild.CategoryID, name: grandChild.CategoryName }"
                @change="sendCategoryLists()" />
              <span class="checkbox__parts text-body-2">{{ grandChild.CategoryName }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryFlg: {
      type: Boolean,
      required: true,
    },
    searchCategoryLists: {
      type: Array,
      required: true,
    },
    queryCategoryLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedCategoryLists: this.queryCategoryLists,
    }
  },
  methods: {
    resetSelectedCategoryLists() {
      this.selectedCategoryLists = []
      this.sendCategoryLists()
    },
    sendCategoryLists() {
      if (this.selectedCategoryLists.length > 1) this.selectedCategoryLists.shift()
      this.$emit('received-category-lists', this.selectedCategoryLists)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.terms__category {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;

  .category__title {
    color: $primary;
  }
}

.terms__category.active {
  transform: translate(0, 0);
}

.terms__label {
  display: inline-block;
  margin: 15px 0;
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
