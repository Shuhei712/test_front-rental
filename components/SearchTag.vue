<template>
  <div class="terms__tag text-body-1 d-flex flex-column" :class="{ active: tagFlg }">
    <div class="tag__title d-flex align-center text-body-2 text-md-body-1 px-4 px-sm-6 px-lg-8 py-3">
      <span>特徴を<span class="word-keep">選択</span></span>
      <v-btn class="text-light-gray ml-5" elevation="0" color="cushion" small @click="resetSelectedTagLists()">
        <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>選択解除
      </v-btn>
    </div>
    <div class="tag__lists flex-grow-1 px-4 px-sm-6 px-lg-8">
      <div v-for="(list, index) in searchTagLists" :key="index" class="tag-list pb-5">
        <div class="index-label d-flex mb-3 text-subtitle-2 text-gray px-3 py-1">
          <v-icon class="mr-2" small>mdi-check</v-icon>{{ list.TagCategoryName }}
        </div>
        <div class="d-flex flex-wrap">
          <label v-for="tag in list.FeatureList" :key="tag.TagID" class="terms__label">
            <input
              v-model="selectedTagLists"
              class="terms__checkbox"
              type="checkbox"
              :value="{ TagID: tag.TagID, TagName: tag.TagName }"
              @change="sendTagLists()" />
            <div class="checkbox d-flex align-flex-start">
              <span class="checkbox__parts"></span>
              <span class="text-body-2 text-gray pt-1 px-3">{{ tag.TagName }}</span>
            </div>
          </label>
        </div>
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
  min-height: 460px;
  z-index: 10;
  transform: translate(100%, 0);
  background-color: #ffffff;
  transition: all 0.25s ease-in-out;
  overflow: hidden;

  .tag__title {
    color: $primary;
  }
}

.index-label {
  width: 100%;
  background-color: $cushion;
}

.terms__tag.active {
  transform: translate(0, 0);
  overflow: visible;
}

.terms__label {
  display: inline-block;
  margin-bottom: 20px;
  min-width: 50%;

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
