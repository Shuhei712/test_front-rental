<template>
  <div class="terms__category d-flex flex-column" :class="{ active: categoryFlg }">
    <div class="category__title d-flex align-center text-body-2 text-md-body-1 px-4 px-sm-6 px-lg-8 py-3">
      <span>カテゴリーを<span class="word-keep">選択</span></span>
      <v-btn class="text-light-gray ml-5" elevation="0" color="cushion" small @click="resetSelectedCategoryLists()">
        <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>
        選択解除
      </v-btn>
    </div>
    <div class="category__lists flex-grow-1 px-4 px-sm-6 px-lg-8">
      <div v-for="root in searchCategoryLists" :key="root.CategoryID" class="category-list pb-5">
        <div class="index-label d-flex mb-3 text-subtitle-2 text-gray px-3 py-1">
          <v-icon class="mr-2" small>mdi-check</v-icon>{{ root.CategoryName }}
        </div>
        <div v-for="child in root.SubCategoryList" :key="child.CategoryID" cols="11" class="category-list">
          <label class="terms__label">
            <input
              v-model="selectedCategoryLists"
              class="terms__checkbox"
              type="checkbox"
              :value="{ id: child.CategoryID, name: child.CategoryName }"
              @change="sendCategoryLists()" />
              <div class="checkbox d-flex align-flex-start">
                <span class="checkbox__parts"></span>
                <span class="text-body-2 text-gray pt-1 px-3">{{ child.CategoryName }}</span>
              </div>
          </label>
          <div v-for="grandChild in child.SubCategoryList" :key="grandChild.CategoryID" cols="11" class="category-list">
            <label class="terms__label">
              <input
                v-model="selectedCategoryLists"
                class="terms__checkbox"
                type="checkbox"
                :value="{ id: grandChild.CategoryID, name: grandChild.CategoryName }"
                @change="sendCategoryLists()" />
              <div class="checkbox d-flex align-flex-start">
                <span class="checkbox__parts"></span>
                <span class="text-body-2 text-gray pt-1 px-3">{{ grandChild.CategoryName }}</span>
              </div>
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
  min-height: 460px;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;
  overflow: hidden;

  .category__title {
    color: $primary;
  }
}

.index-label {
  width: 100%;
  background-color: $cushion;
}

.terms__category.active {
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
    background-color: $cushion;
    border: 1px solid $outline;
    border-radius: 5px;
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
