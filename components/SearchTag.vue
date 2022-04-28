<template>
  <div class="terms__tag text-body-1 d-flex flex-column pa-4 pa-lg-8" :class="{ active: tagFlg }">
    <div class="tag__title">
      特徴を選択
      <v-btn class="ml-5" elevation="0" color="cushion" small @click="resetSelectedTagLists()">
        <v-icon class="mr-2" color="outline" small>mdi-selection-ellipse</v-icon>選択解除
      </v-btn>
    </div>
    <div class="tag__lists flex-grow-1 overflow-auto mt-8">
      <div v-for="(list, index) in searchTagLists" :key="index" class="tag-list py-4">
        <div class="index-lable mb-6 text-subtitle-2">
          <v-icon class="mr-2">mdi-check</v-icon>{{ list.TagCategoryName }}
        </div>
        <label v-for="tag in list.FeatureList" :key="tag.TagID" class="terms__label">
          <input
            v-model="selectedTagLists"
            class="terms__checkbox"
            type="checkbox"
            :value="{ id: tag.TagID, name: tag.TagName }"
            @change="sendTagLists()" />
          <span class="checkbox__parts text-body-2">{{ tag.TagName }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tagFlg: {
      type: Boolean,
      required: true,
    },
    searchTagLists: {
      type: Array,
      required: true,
    },
    queryTagLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedTagLists: this.queryTagLists,
    }
  },
  methods: {
    sendTagLists() {
      this.$emit('received-tag-lists', this.selectedTagLists)
    },
    resetSelectedTagLists() {
      this.selectedTagLists = []
      this.sendTagLists()
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.terms__tag {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;

  .tag__title {
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

.terms__tag.active {
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
