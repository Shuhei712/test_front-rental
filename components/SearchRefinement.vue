<template>
  <div class="search-refinement text-center">
    <v-dialog v-model="dialogFlg" width="700" scrollable>
      <v-card class="dialog-card">
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
            @received-maker-lists="updateMakerLists"></search-maker>
          <search-price
            ref="price"
            :search-price-lists="searchPriceLists"
            :price-flg="priceFlg"
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
                  <span v-for="maker in selectedMakerLists" :key="maker.id"> {{ maker.name }} / </span>
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
              <!-- <v-row v-if="searchTagLists[0].FeatureList.length == 0" no-gutters align="center" class="terms__box--disabled mt-2 px-3">
                <v-col cols="12" class="terms__text">
                  <span>特徴はありません</span>
                </v-col>
              </v-row> -->
              <v-row class="terms__box mt-2 px-3" no-gutters align="center" @click="openTag()">
                <v-col cols="11" class="terms__text">
                  <span v-for="tag in selectedTagLists" :key="tag.id"> {{ tag.name }} / </span>
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
                <v-icon class="mr-2" small>mdi-text-search</v-icon>この条件で検索
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
                <v-icon class="mr-2" color="lightGray" small>mdi-selection-ellipse</v-icon>すべての条件をリセット
              </v-btn>
              <v-btn v-else color="primary" elevation="0" block small @click="toggleFlg()">
                <v-icon class="mr-2" small>mdi-chevron-left</v-icon>選択状態で戻る
              </v-btn>
            </v-col>
            <v-col cols="10" sm="5">
              <v-btn color="line" block outlined small @click="closeDialog()">
                <v-icon class="mr-2" color="primary" small>mdi-close</v-icon>
                <span class="text-gray">変更せずに閉じる</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  },
  created() {
    if (this.$route.query.keyword !== undefined && this.$route.query.keyword !== 'undefined') {
      this.keyword = this.$route.query.keyword
    }
    if (this.$route.query.categoryID !== undefined) {
      this.selectedCategoryLists = [{ id: this.$route.query.categoryID, name: this.$route.query.categoryName }]
    }
    if (this.$route.query.tagID !== undefined) {
      this.selectedTagLists = [{ id: this.$route.query.tagID, name: this.$route.query.tagName }]
    }
  },
  methods: {
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
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/css/common.scss';

.dialog-card {
  position: relative;
  overflow: hidden;

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
  height: 460px;
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
