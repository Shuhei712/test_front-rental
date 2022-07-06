<template>
  <div class="popup">
    <div class="dialog-content" :class="{ active: dialogFlg }">
      <div v-show="dialogFlg" ref="dialog" class="dialog" :class="{ active: dialogFlg }">
        <v-card ref="dialogCard" class="dialog-card" @mousedown="dragStart($event)">
          <div class="dialog-card__head px-3 pt-4 pt-md-7">
            <v-btn
              class="dialog-back"
              :class="{ active: backBtnFlg }"
              fab
              small
              color="#ffffff"
              elevation="0"
              @click="toggleFlg()">
              <v-icon color="primary" large>mdi-chevron-left</v-icon>
            </v-btn>
            <v-card-title
              class="refinement__title zen-kaku-gothic d-flex justify-center text-body-2 text-sm-subtitle-1 text-lg-h6 font-weight-medium text-gray px-2 py-0">
              検索条件を変更して<span class="word-keep">絞り込む</span>
            </v-card-title>
            <v-btn class="dialog-close" fab small color="#ffffff" elevation="0" @click="closeDialog()">
              <v-icon color="primary" large>mdi-close</v-icon>
            </v-btn>
          </div>
          <v-card-text class="refinement__terms mt-5 pb-0 px-4 px-sm-6 px-lg-8">
            <search-category
              ref="category"
              :search-category-lists="searchCategoryLists"
              :category-flg="categoryFlg"
              :query-category-lists="selectedCategoryLists"
              @received-category-lists="updateCategoryLists">
            </search-category>
            <search-maker
              ref="maker"
              :search-maker-lists="searchMakerLists"
              :maker-flg="makerFlg"
              :query-maker-lists="selectedMakerLists"
              @received-maker-lists="updateMakerLists"></search-maker>
            <search-price
              ref="price"
              :search-price-lists="searchPriceLists"
              :price-flg="priceFlg"
              :query-price-lists="selectedPriceLists"
              @received-price-lists="updatePriceLists"></search-price>
            <search-tag
              ref="tag"
              :search-tag-lists="searchTagLists"
              :tag-flg="tagFlg"
              :query-tag-lists="selectedTagLists"
              @received-tag-lists="updateTagLists"></search-tag>
            <v-row no-gutters>
              <v-col cols="12" class="pb-5">
                <div class="terms__title">キーワード</div>
                <v-text-field
                  v-model="keyword"
                  class="mt-2 text-body-2"
                  label="キーワードを入力できます"
                  dense
                  outlined
                  hide-details="auto"></v-text-field>
              </v-col>
              <v-col cols="12" class="pb-5">
                <div class="terms__title d-flex align-center">
                  カテゴリー
                  <v-spacer></v-spacer>
                  <v-btn class="text-light-gray" elevation="0" color="cushion" small @click="resetCategoryLists()">
                    <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>選択解除
                  </v-btn>
                </div>
                <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openCategory()">
                  <v-col cols="11" class="terms__text">
                    <span v-for="category in selectedCategoryLists" :key="category.id"> {{ category.name }} </span>
                  </v-col>
                  <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pb-5">
                <div class="terms__title d-flex align-center">
                  メーカー
                  <v-spacer></v-spacer>
                  <v-btn class="text-light-gray" elevation="0" color="cushion" small @click="resetMakerLists()">
                    <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>選択解除
                  </v-btn>
                </div>
                <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openMaker()">
                  <v-col cols="11" class="terms__text">
                    <span v-for="maker in selectedMakerLists" :key="maker.MakerID"> {{ maker.MakerName }} / </span>
                  </v-col>
                  <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pb-5">
                <div class="terms__title d-flex align-center">
                  価格
                  <v-spacer></v-spacer>
                  <v-btn class="text-light-gray" elevation="0" color="cushion" small @click="resetPriceLists()">
                    <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>選択解除
                  </v-btn>
                </div>
                <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openPrice()">
                  <v-col cols="11" class="terms__text">
                    <span v-for="price in selectedPriceLists" :key="price.id"> {{ price.name }} </span>
                  </v-col>
                  <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="pb-1">
                <div class="terms__title d-flex align-center">
                  特徴
                  <v-spacer></v-spacer>
                  <v-btn class="text-light-gray" elevation="0" color="cushion" small @click="resetTagLists()">
                    <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>選択解除
                  </v-btn>
                </div>
                <v-row v-if="isSearchTagLists()" no-gutters align="center" class="terms__box--disabled mt-2 px-3">
                  <v-col cols="12" class="terms__text">
                    <span>特徴はありません</span>
                  </v-col>
                </v-row>
                <v-row v-else class="terms__box mt-2 px-3" no-gutters align="center" @click="openTag()">
                  <v-col cols="11" class="terms__text">
                    <span v-for="tag in selectedTagLists" :key="tag.TagID"> {{ tag.TagName }} / </span>
                  </v-col>
                  <v-col cols="1" class="d-flex justify-end align-center"><v-icon>mdi-chevron-right</v-icon></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pt-4 pt-md-6 pb-4 pb-md-7 px-4 px-sm-6 px-lg-8">
            <v-row justify="center" no-gutters>
              <v-col cols="10" sm="5" class="mb-3 mb-md-5">
                <v-btn color="primary" elevation="0" block small @click="sendSearchConditions()">
                  <v-icon class="mr-2" small>mdi-text-search</v-icon>
                  <span class="lh-crop-12">この条件で検索</span>
                </v-btn>
              </v-col>
              <v-col cols="10" sm="5" class="mb-3 mb-md-5 mx-sm-5">
                <v-btn
                  v-if="!backBtnFlg"
                  class="text-light-gray"
                  color="cushion"
                  elevation="0"
                  block
                  small
                  @click="resetAll()">
                  <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>
                  <span class="lh-crop-12">すべての条件をリセット</span>
                </v-btn>
                <v-btn v-else color="primary" elevation="0" block small @click="toggleFlg()">
                  <v-icon class="mr-2" small>mdi-chevron-left</v-icon>
                  <span class="lh-crop-12">選択状態で戻る</span>
                </v-btn>
              </v-col>
              <v-col cols="10" sm="5">
                <v-btn color="line" block outlined small @click="closeDialog()">
                  <v-icon class="mr-2" color="primary" small>mdi-close</v-icon>
                  <span class="text-gray lh-crop-12">変更せずに閉じる</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
    searchCategoryLists: {
      type: Array,
      required: true,
    },
    searchMakerLists: {
      type: Array,
      required: true,
    },
    searchTagLists: {
      type: Array,
      required: true,
    },
    searchPriceLists: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      windowWidth: '',
      active: false,
      categoryFlg: false,
      makerFlg: false,
      priceFlg: false,
      tagFlg: false,
      backBtnFlg: false,
      selectedCategoryLists: [],
      selectedMakerLists: [],
      selectedTagLists: [],
      selectedPriceLists: [],
      keyword: '',
      isDraged: false,
      pos: {
        x: null,
        y: null,
      },
    }
  },
  computed: {
    dialogFlg: {
      get() {
        return this.$props.dialog
      },
      set(value) {
        this.$emit('change-dialog', value)
      },
    },
    isMobile() {
      const headerBP = 1024
      if (this.windowWidth < headerBP) {
        return true
      } else {
        return false
      }
    },
  },
  created() {
    if(this.$route.query.type === '0') {
      const searchConditionInfo = this.$store.getters['searchCondition/getInfo']
      if(searchConditionInfo.CategoryFlg) {
        this.selectedCategoryLists = [{id: searchConditionInfo.CategoryID, name: searchConditionInfo.CategoryNmae02 }]
      }
      if(searchConditionInfo.MakerFlg) {
        this.selectedMakerLists = searchConditionInfo.MakerList
      }
      if(searchConditionInfo.FeatureFlg) {
        this.selectedTagLists = searchConditionInfo.FeatureList
      }
      if(searchConditionInfo.PriceFlg) {
        this.selectedPriceLists = [{id: searchConditionInfo.PriceRangeID, name: searchConditionInfo.PriceRangeName }]
      }
    } else {
      if (this.$route.query.keyword !== undefined && this.$route.query.keyword !== 'undefined') {
      this.keyword = this.$route.query.keyword
      }
      if (this.$route.query.categoryID !== undefined) {
        this.selectedCategoryLists = [{ id: this.$route.query.categoryID, name: this.$route.query.categoryName }]
      } 
      if (this.$route.query.tagID !== undefined) {
        this.selectedTagLists = [{ TagID: this.$route.query.tagID, TagName: this.$route.query.tagName }]
      }
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.getWindowSize)
    document.addEventListener('mousemove', this.drag)
    document.addEventListener('mouseup', this.dragEnd)
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.drag)
    document.removeEventListener('mouseup', this.dragEnd)
  },
  methods: {
    isSearchTagLists() {
      if (this.searchTagLists.length !== 0) {
        return this.searchTagLists[0].FeatureList.length === 0
      } else {
        return false
      }
    },
    closeDialog() {
      this.dialogFlg = false
    },
    toggleFlg() {
      this.backBtnFlg = !this.backBtnFlg
      this.categoryFlg = false
      this.makerFlg = false
      this.priceFlg = false
      this.tagFlg = false
    },
    openCategory() {
      this.categoryFlg = true
      this.backBtnFlg = true
    },
    openMaker() {
      this.makerFlg = true
      this.backBtnFlg = true
    },
    openPrice() {
      this.priceFlg = true
      this.backBtnFlg = true
    },
    openTag() {
      this.tagFlg = true
      this.backBtnFlg = true
    },
    updateCategoryLists(lists) {
      this.selectedCategoryLists = lists
      this.$emit('update-category-list', lists)
    },
    updateMakerLists(lists) {
      this.selectedMakerLists = lists
    },
    updateTagLists(lists) {
      this.selectedTagLists = lists
    },
    updatePriceLists(lists) {
      this.selectedPriceLists = lists
    },
    sendSearchConditions() {
      this.$emit(
        'received-search-conditions',
        this.selectedCategoryLists,
        this.selectedMakerLists,
        this.selectedTagLists,
        this.selectedPriceLists,
        this.keyword
      )
    },
    resetCategoryLists() {
      this.$refs.category.resetSelectedCategoryLists()
      this.$emit('received-category-reset')
    },
    resetMakerLists() {
      this.$refs.maker.resetSelectedMakerLists()
    },
    resetTagLists() {
      this.$refs.tag.resetSelectedTagLists()
    },
    resetPriceLists() {
      this.$refs.price.resetSelectedPriceLists()
    },
    resetAll() {
      this.$refs.maker.resetSelectedMakerLists()
      this.$refs.category.resetSelectedCategoryLists()
      this.$refs.tag.resetSelectedTagLists()
      this.$refs.price.resetSelectedPriceLists()
      this.keyword = ''
      this.$emit('received-all-reset')
    },
    dragStart(event) {
      this.isDraged = true
      const rect = event.currentTarget.getBoundingClientRect()
      const mouseX = event.clientX
      const mouseY = event.clientY
      this.pos.x = mouseX - rect.left
      this.pos.y = mouseY - rect.top
    },
    drag(event) {
      event.preventDefault()
      if (this.isDraged && !this.isMobile) {
        const dialog = this.$refs.dialog
        dialog.style.position = 'fixed'
        dialog.style.margin = '0px'
        dialog.style.top = event.clientY - this.pos.y + 'px'
        dialog.style.left = event.clientX - this.pos.x + 'px'
      }
    },
    dragEnd() {
      this.isDraged = false
    },
    getWindowSize() {
      this.windowWidth = window.innerWidth
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.dialog-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  outline: none;
  z-index: 6;
}

.dialog-content.active {
  z-index: 602;
}

.dialog {
  max-height: 95%;
  border-radius: 4px;
  display: flex;
  overflow-y: auto;
  pointer-events: auto;
  z-index: inherit;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
}

.dialog.active {
  width: 700px;
  transform-origin: center center;
  z-index: 602;
}

.dialog-card {
  position: relative;
  overflow: hidden;
  cursor: move;

  @include mq(md) {
    cursor: default;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .dialog-back {
    transform: translateX(-60px);
    transition: all 0.25s ease-in-out;
  }

  .dialog-back.active {
    transform: translateX(0);
  }
}

.refinement__terms {
  height: 480px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  @include scrollbar();
}

.terms__title {
  color: $primary;
}

.terms__box {
  border: 1px solid $outline;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
}

.terms__box:hover {
  background-color: $cushion;
}

.terms__text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 絞り込む項目情報がない場合
.terms__box--disabled {
  background-color: $cushion;
  border: 1px solid $lightGray;
  border-radius: 5px;
  height: 40px;
  cursor: default;

  .terms__text {
    color: $lightGray;
  }
}
</style>
